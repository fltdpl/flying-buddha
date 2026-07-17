# flying-buddha

Kleines Browser-Game (Canvas/JS) mit Flask-Backend für die Highscore-Liste.
Scores liegen in `buddha.db` (SQLite, wird beim ersten Start angelegt).

## Lokal starten

```bash
python3 -m venv ~/venvs/flying-buddha
~/venvs/flying-buddha/bin/pip install -r requirements.txt
FLASK_DEBUG=1 ~/venvs/flying-buddha/bin/python app.py
```

Dann http://127.0.0.1:5000/ öffnen. Die alte Version liegt unter `legacy/`.

## Deployment

Siehe [DEPLOY.md](DEPLOY.md).
