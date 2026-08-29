# Deployment (Uberspace 7)

Die App läuft als Daemon (supervisord) hinter gunicorn auf Port `8000` und
liegt seit 2026-08-28 unter der eigenen Subdomain **`buddha.fltdpl.de`**.

**`URL_PREFIX` wird nicht mehr gesetzt.** Die Middleware in `app.py` bleibt als
Möglichkeit erhalten, ist aber unbenutzt: unter einer eigenen Domain beginnt
jede Route bei `/`, und ein gesetzter Präfix ließe sämtliche erzeugten URLs ins
Leere zeigen.

**Ein Port pro Backend.** Diese App hält `8000`, das Schwester-Projekt `wetter`
läuft auf `8001`. Zwei Programme auf einem Port heißt: das zweite stirbt und
supervisord startet es endlos neu. Vorher `uberspace web backend list`.

## Einmalig einrichten

```bash
# per SSH einloggen
ssh <user>@<host>.uberspace.de

# Code holen
cd ~ && git clone https://github.com/fltdpl/flying-buddha.git
cd ~/flying-buddha

# venv + Abhängigkeiten (gunicorn nur auf dem Server nötig)
ls /usr/bin/python3.1*        # vorhandene Interpreter zeigen
python3.11 -m venv ~/flying-buddha/venv
~/flying-buddha/venv/bin/pip install -r requirements.txt gunicorn
```

Daemon-Konfiguration nach `~/etc/services.d/flying-buddha.ini`:

```ini
[program:flying-buddha]
command=%(ENV_HOME)s/flying-buddha/venv/bin/gunicorn -b 0.0.0.0:8000 app:app
directory=%(ENV_HOME)s/flying-buddha
environment=SECRET_KEY="bitte-ein-eigenes-secret-setzen"
autostart=true
autorestart=true
```

**Der Pfad zum venv ist der real laufende**, geprüft am 2026-08-29 gegen
`uberspace web backend list`:
`/home/fltdpl/flying-buddha/venv/bin/gunicorn`. Frühere Fassungen dieser Datei
nannten `~/venvs/flying-buddha` — das existiert auf dem Server nicht. Wer die
`.ini` von dort abschreibt, zeigt auf ein leeres Verzeichnis und legt beim
nächsten Neustart das laufende Spiel lahm.

Das venv liegt **im Projektordner**. Das ist seit dem 2026-08-29 die
**Server-Konvention für alle Seiten**: ein Verzeichnis enthält eine Anwendung
vollständig, und wer es löscht, lässt nichts in einem parallelen `~/venvs/`
zurück. `wetter` hält seines dort ebenso (`~/wetter/venv`); dieses Projekt war
schon vorher so aufgebaut und musste nicht umziehen.

`venv/` steht in `.gitignore`, das Repository sieht es also nie. Die Kehrseite:
das venv ist eine ignorierte Datei **innerhalb** eines git-Checkouts, und
**`git clean -fdx` löscht es** — zusammen mit `buddha.db`, also der kompletten
Bestenliste. Ohne `-x` ist der Befehl harmlos.

Lokal auf dem Entwicklungsrechner darf das venv weiter außerhalb liegen; die
beiden Seiten unterscheiden sich absichtlich.

`0.0.0.0`, nie `127.0.0.1` — auf Uberspace ist ein an localhost gebundenes
Backend stillschweigend unerreichbar, der Prozess sieht dabei gesund aus.

`SECRET_KEY` wird derzeit von nichts benutzt: `flask.session` wird nirgends
importiert, die `SessionID` ist eine eigene Kennung in SQLite und kein
signiertes Cookie. Trotzdem einen eigenen Wert setzen — sobald irgendwo
`session` oder `flash` dazukommt, wäre der Platzhalter aus einem öffentlichen
Repository der Schlüssel.

Daemon registrieren und die Subdomain auf den Port routen:

```bash
supervisorctl reread && supervisorctl update
supervisorctl status flying-buddha

uberspace web domain add buddha.fltdpl.de
uberspace web backend set buddha.fltdpl.de --http --port 8000
uberspace web backend list
```

Kein `--remove-prefix` — es gibt keinen Präfix mehr.

## Umzug vom Pfad auf die Subdomain

Reihenfolge, damit die Seite nicht zwischendurch tot ist:

```bash
# 1. Subdomain anlegen und routen, der alte Pfad läuft noch weiter
uberspace web domain add buddha.fltdpl.de
uberspace web backend set buddha.fltdpl.de --http --port 8000

# 2. URL_PREFIX aus ~/etc/services.d/flying-buddha.ini entfernen, dann
supervisorctl update && supervisorctl restart flying-buddha

# 3. erst prüfen, dann abschalten
curl -sI https://buddha.fltdpl.de/ | head -1        # muss 200 sein
uberspace web backend del /flying-buddha
```

Zwischen Schritt 2 und 3 ist `fltdpl.de/flying-buddha` kaputt (die Routen
liegen dann bei `/`, geroutet wird aber noch der Pfad). Das Fenster ist kurz;
wer es vermeiden will, macht Schritt 3 direkt nach Schritt 2.

Den 301 vom alten Pfad übernimmt danach `.htaccess` im Repository
`fltdpl-root`, das `~/html` ausliefert. Der Pfad erreicht die statische
Auslieferung erst, wenn sein Web-Backend gelöscht ist — deshalb Schritt 3.

Zertifikate stellt Uberspace automatisch aus, sobald die Subdomain auf den Host
zeigt. **`uberspace web domain add` verlangt dafür A *und* AAAA** und lehnt
einen Namen mit nur einem A-Record ab; der Name liefert dann Uberspaces
„Diese Domain kennen wir leider nicht" aus — als **HTTP 200** und mit dem
allgemeinen `*.uberspace.de`-Zertifikat, was nach TLS aussieht und DNS ist.
Seit 2026-08-29 hat `*.fltdpl.de` bei INWX beides (A `185.26.156.230`, AAAA
`2a00:d0c0:200:0:4878:80ff:fe16:d045`), `buddha` ist davon mit abgedeckt.

Vorsicht mit Wildcards: ein **expliziter** Eintrag für `buddha` würde den
`*`-Eintrag für diesen Namen verdrängen. Wer einen setzt, muss A **und** AAAA
setzen, sonst fällt das jeweils andere Protokoll aus.

## Erst ausrollen, dann pruefen — nicht nur den Statuscode

Am 2026-08-29 lief auf dem Server noch Code von **vor** `7cfd80a`: die Seite
antwortete mit 200, lud jQuery, Knockout und Bootstrap aber weiter von
`cdnjs.cloudflare.com`. Der Statuscode sagt darueber nichts. Nach jedem Umzug
oder Deploy deshalb den ausgelieferten HTML-Quelltext ansehen:

```bash
curl -s https://buddha.fltdpl.de/ | grep -c cdnjs     # muss 0 sein
curl -s https://buddha.fltdpl.de/ | grep -o 'src="/[^"]*"' | sort -u
```

Die erste Zeile ist die wichtige: solange dort etwas anderes als `0` steht,
gehen die IP-Adressen der Besucher an einen Dritten, waehrend das Impressum das
Gegenteil behauptet.

## Neuen Stand ausrollen

```bash
cd ~/flying-buddha && git pull
supervisorctl restart flying-buddha
```

## Nützlich

```bash
supervisorctl status              # läuft der Daemon?
supervisorctl tail flying-buddha stderr   # Logfehler ansehen (auch in ~/logs/)
uberspace web backend list        # aktives Routing prüfen
```

Die SQLite-Datei `buddha.db` wird beim ersten Start automatisch im Projektordner
angelegt und ist nicht im Repo (siehe `.gitignore`).
