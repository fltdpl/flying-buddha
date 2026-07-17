# -*- coding: utf-8 -*-

import os
import sqlite3

DB_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'buddha.db')

MAX_STORED = 300   # keep at most this many scores
TOP_N = 10         # scores returned to the client


def _connect():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    # create tables on first use (replaces the old highscore.txt/sessions.txt)
    with _connect() as conn:
        conn.execute(
            'CREATE TABLE IF NOT EXISTS highscore ('
            ' id INTEGER PRIMARY KEY AUTOINCREMENT,'
            ' name TEXT NOT NULL,'
            ' points INTEGER NOT NULL,'
            ' playtime INTEGER NOT NULL)'  # seconds
        )
        conn.execute(
            'CREATE TABLE IF NOT EXISTS sessions ('
            ' sessionid TEXT PRIMARY KEY,'
            ' starttime INTEGER NOT NULL)'  # minute-of-hour in seconds
        )


def _parse_playtime(playtime):
    # client sends "MM:SS"; store as whole seconds
    minutes, seconds = playtime.split(':')
    return int(minutes) * 60 + int(seconds)


def printHighscore():
    # top scores, highest first, as a list of dicts for jsonify
    with _connect() as conn:
        rows = conn.execute(
            'SELECT name, points, playtime FROM highscore'
            ' ORDER BY points DESC LIMIT ?', (TOP_N,)
        ).fetchall()
    return [{'name': r['name'], 'points': r['points'],
             'playtime': r['playtime']} for r in rows]


def newHighscore(newName, newPoints, newTime):
    with _connect() as conn:
        conn.execute(
            'INSERT INTO highscore (name, points, playtime) VALUES (?, ?, ?)',
            (newName, int(newPoints), _parse_playtime(newTime))
        )
        # trim to the best MAX_STORED entries
        conn.execute(
            'DELETE FROM highscore WHERE id NOT IN ('
            ' SELECT id FROM highscore ORDER BY points DESC LIMIT ?)',
            (MAX_STORED,)
        )


def append2sessionlist(sessionid, starttime):
    with _connect() as conn:
        conn.execute(
            'INSERT OR REPLACE INTO sessions (sessionid, starttime)'
            ' VALUES (?, ?)', (sessionid, int(starttime))
        )


def timecheck(session, newTime, timeEnd):
    # compare server-measured play duration with the client's claim;
    # returns the absolute difference in seconds. Unknown session -> rejected.
    with _connect() as conn:
        row = conn.execute(
            'SELECT starttime FROM sessions WHERE sessionid = ?', (session,)
        ).fetchone()
        if row is None:
            return 10 ** 9  # no matching session -> never accept the score
        # one-shot: consume the session so it can't be replayed
        conn.execute('DELETE FROM sessions WHERE sessionid = ?', (session,))

    clientTime = _parse_playtime(newTime)
    serverTime = int(timeEnd) - int(row['starttime'])
    return abs(serverTime - clientTime)


# make sure the database exists as soon as the module is imported
init_db()
