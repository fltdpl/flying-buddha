# Deployment (Uberspace 7)

Die App läuft als Daemon (supervisord) hinter gunicorn und wird per Web-Backend
unter dem Pfad `/flying-buddha` geroutet. `PORT` ist frei wählbar (1024–65535),
hier `8000`. Der Pfad-Präfix wird über die Env-Variable `URL_PREFIX` gesetzt —
Flask erzeugt damit alle Asset-/Link-URLs korrekt unter `/flying-buddha`.

## Einmalig einrichten

```bash
# per SSH einloggen
ssh <user>@<host>.uberspace.de

# Code holen
cd ~ && git clone https://github.com/fltdpl/flying-buddha.git
cd ~/flying-buddha

# venv + Abhängigkeiten (gunicorn nur auf dem Server nötig)
python3.11 -m venv ~/venvs/flying-buddha
~/venvs/flying-buddha/bin/pip install -r requirements.txt gunicorn
```

Daemon-Konfiguration nach `~/etc/services.d/flying-buddha.ini`:

```ini
[program:flying-buddha]
command=%(ENV_HOME)s/venvs/flying-buddha/bin/gunicorn -b 0.0.0.0:8000 app:app
directory=%(ENV_HOME)s/flying-buddha
environment=SECRET_KEY="bitte-ein-eigenes-secret-setzen",URL_PREFIX="/flying-buddha"
autostart=true
autorestart=true
```

Daemon registrieren und Domain-Root auf den Port routen:

```bash
supervisorctl reread && supervisorctl update
supervisorctl status flying-buddha

uberspace web backend set /flying-buddha --http --port 8000
```

Fertig — die Seite liegt unter `https://<host>.uberspace.de/flying-buddha`.
Die Middleware in `app.py` (aktiv durch `URL_PREFIX`) entfernt den Präfix intern,
sodass die Flask-Routen (`/`, `/buddha/api/...`) unverändert greifen und alle
generierten URLs den Präfix tragen. Kein `--remove-prefix` nötig.

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
