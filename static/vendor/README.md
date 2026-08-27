# Vendor

Selbst gehostete Bibliotheken. Vorher kamen sie von `cdnjs.cloudflare.com`,
wodurch die IP-Adresse jeder Besucherin ohne Einwilligung an einen Dritten
übertragen wurde. Genau dafür wurde in Deutschland die Einbindung von Google
Fonts über deren CDN als unzulässig bewertet; für ein CDN gilt dasselbe.

Die Seite stellt jetzt **keine Anfragen an Dritte** mehr. Der einzige externe
Verweis ist der Link zum GitHub-Repository — ein Link, den man anklickt, kein
automatisch geladenes Element.

| Datei | Version | Lizenz |
|---|---|---|
| `css/bootstrap.min.css`, `js/bootstrap.min.js` | Bootstrap 3.3.5 | MIT, Twitter Inc. |
| `js/jquery.min.js` | jQuery 2.1.4 | MIT, jQuery Foundation |
| `js/knockout-min.js` | Knockout 3.3.0 | MIT, Steven Sanderson |
| `fonts/glyphicons-halflings-regular.*` | Bootstrap 3.3.5 | MIT (Teil von Bootstrap) |

Der Lizenztext steht jeweils im Kopf der Dateien und ist dort unverändert
erhalten — das ist bei MIT die geforderte Weitergabe.

## Warum die Fonts dabei sind

`bootstrap.min.css` lädt die Glyphicons über `url(../fonts/…)`. Der Pfad ist
relativ zur CSS-Datei, deshalb muss `fonts/` **neben** `css/` liegen. Fehlen
die Dateien, bleiben die Icons leer.

## Aktualisieren

Version in der Tabelle oben ändern, die Dateien von cdnjs unter der neuen
Versionsnummer holen, danach die Seite starten und prüfen, dass weder Konsole
noch Netzwerk-Tab eine externe Anfrage zeigen.
