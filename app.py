#!/usr/bin/env python2.7
# -*- coding: utf8 -*-

from flask import Flask, render_template, jsonify, request
from flask import abort, make_response
import highscore


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


@app.route('/buddha/api/highscore', methods=['GET'])
def get_scores():
    scores = highscore.printHighscore()
    if len(scores) == 0:
        abort(404)
    else:
        return jsonify({'scores': scores})


@app.route('/buddha/api/highscore', methods=['POST'])
def create_score():
    if not request.json or not 'name' in request.json:
        abort(400)
    newName = request.json['name']
    newPoints = request.json['points']
    highscore.newHighscore(newName, newPoints)
    newscore = {
        'name': newName,
        'points': newPoints,
    }
    scores = highscore.printHighscore()
    if len(scores) == 0:
        abort(404)
    else:
        return jsonify({'scores': scores})


if __name__ == '__main__':
    app.run()
