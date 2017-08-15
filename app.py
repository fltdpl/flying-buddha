#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from flask import Flask, render_template, jsonify, request
from flask import abort, make_response
import highscore
import time


app = Flask(__name__)
app.config.update(
  DEBUG=True,
  SECRET_KEY='ub1jvg94jd9ghz490'
)


@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)


@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')


@app.route('/void')
def void():
    return render_template('index0.html')


@app.route('/buddha/api/highscore', methods=['GET'])
def get_scores():
    scores = highscore.printHighscore()
    if len(scores) == 0:
        abort(404)
    else:
        return jsonify({'scores': scores})


@app.route('/buddha/api/highscore', methods=['POST'])
def create_score():
    if not request.json or 'name' not in request.json:
        abort(400)
    session = request.json['SessionID']
    newName = request.json['name']
    newPoints = request.json['points']
    newTime = request.json['playtime']

    t = time.localtime()
    timeEnd = t[5] + t[4]*60
    timediff = highscore.timecheck(session, newTime, timeEnd)
    if timediff <= 60:
        highscore.newHighscore(newName, newPoints, newTime)

    scores = highscore.printHighscore()
    if len(scores) == 0:
        abort(404)
    else:
        return jsonify({'scores': scores})


@app.route('/buddha/api/session', methods=['POST'])
def create_session():
    if not request.json or 'SessionID' not in request.json:
        abort(400)
    newSession = request.json['SessionID']
    t = time.localtime()
    timeStart = t[5] + t[4]*60
    highscore.append2sessionlist(newSession, timeStart)

    return jsonify({'session': newSession})


if __name__ == '__main__':
    app.run()
