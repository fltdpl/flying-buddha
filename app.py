#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from flask import Flask, render_template, jsonify, request
from flask import abort, make_response
import highscore
import os
import time


app = Flask(__name__)
app.config.update(
  DEBUG=os.environ.get('FLASK_DEBUG') == '1',
  SECRET_KEY=os.environ.get('SECRET_KEY', 'dev-only-not-secret')
)


@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)


@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')


@app.route('/buddha/api/highscore', methods=['GET'])
def get_scores():
    return jsonify({'scores': highscore.printHighscore()})


@app.route('/buddha/api/highscore', methods=['POST'])
def create_score():
    data = request.get_json(silent=True) or {}
    required = ('SessionID', 'name', 'points', 'playtime')
    if not all(key in data for key in required):
        abort(400)
    session = data['SessionID']
    newName = data['name']
    newPoints = data['points']
    newTime = data['playtime']

    t = time.localtime()
    timeEnd = t[5] + t[4]*60
    timediff = highscore.timecheck(session, newTime, timeEnd)
    if timediff <= 60:
        highscore.newHighscore(newName, newPoints, newTime)

    return jsonify({'scores': highscore.printHighscore()})


@app.route('/buddha/api/session', methods=['POST'])
def create_session():
    data = request.get_json(silent=True) or {}
    if 'SessionID' not in data:
        abort(400)
    newSession = data['SessionID']
    t = time.localtime()
    timeStart = t[5] + t[4]*60
    highscore.append2sessionlist(newSession, timeStart)

    return jsonify({'session': newSession})


# Serve the app under a URL prefix (e.g. /flying-buddha) when URL_PREFIX is set.
# Local development leaves it unset, so the app stays at /.
url_prefix = os.environ.get('URL_PREFIX', '').rstrip('/')
if url_prefix:
    inner_wsgi_app = app.wsgi_app

    def prefixed_wsgi_app(environ, start_response):
        environ['SCRIPT_NAME'] = url_prefix
        path = environ.get('PATH_INFO', '')
        if path.startswith(url_prefix):
            environ['PATH_INFO'] = path[len(url_prefix):]
        return inner_wsgi_app(environ, start_response)

    app.wsgi_app = prefixed_wsgi_app


if __name__ == '__main__':
    app.run()
