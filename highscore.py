def append2list(filename, name, points, time):
    # append the new highscore to the end of the list
    highscorefile = open(filename, 'a')
    highscorefile.write(name + ' ' + str(points) + ' ' + str(time) + '\n')
    highscorefile.close()


def separate(filename):
    # Function for reading the highscore file and seperate strgs and ints
    points = []
    names = []
    times = []
    with open(filename) as myfile:
        for line in myfile:
            item = line.split(' ')
            namesvalue = item[0]
            pointsvalue = int(item[1])
            timesvalue = int(item[2])

            points.append(pointsvalue)
            names.append(namesvalue)
            times.append(timesvalue)

    return points, names, times


def deleteContent(fName):
    # delete the content of a file
    with open(fName, "w"):
        pass


def refreshfile(filename, datatupel):
    # refresh the data in the highscore file
    deleteContent(filename)
    highscorefile = open(filename, 'a')
    highscorefile.write('\n'.join('%s %s %s' % x for x in datatupel) + '\n')
    highscorefile.close()


def printHighscore():
    scores_file = "highscore.txt"

    # reading highscore data
    points, names, times = separate(scores_file)

    # form a tupel from data
    Data = []
    for a in range(len(points)):
        tmp = [(names[a], points[a], times[a])]
        Data.extend(tmp)

    # sort data by points, begin with the highest
    Data = sorted(Data, key=lambda Data: Data[1], reverse=True)

    # limit the data for printing
    if len(Data) >= (11):
        Data = Data[0:10]

    # building some json
    JData = []
    for a in range(len(Data)):
        tmp = Data[a]
        nme = tmp[0]
        pnt = tmp[1]
        tme = tmp[2]
        JData.append({'name': nme, 'points': pnt, 'playtime': tme})

    return(JData)


def newHighscore(newName, newPoints, newTime):
    scores_file = "highscore.txt"
    scores_max = 300

    # format of time
    timeitem = newTime.split(':')
    newTime = int(timeitem[0]) * 60 + int(timeitem[1])

    # appending the new score to the highscore file
    append2list(scores_file, newName, newPoints, newTime)

    # reading highscore data
    points, names, times = separate(scores_file)

    # form a tupel from data
    Data = []
    for a in range(len(points)):
        tmp = [(names[a], points[a], times[a])]
        Data.extend(tmp)

    # sort data by points, begin with the highest
    Data = sorted(Data, key=lambda Data: Data[1], reverse=True)

    # limit the data to scores_max
    if len(Data) >= (scores_max + 1):
        Data = Data[0:scores_max]

    # refresh the file
    refreshfile(scores_file, Data)


def append2sessionlist(filename, sessionid, starttime):
    # append the new session to the end of the list
    sessionfile = open(filename, 'a')
    sessionfile.write(sessionid + ' ' + str(starttime) + '\n')
    sessionfile.close()


def timecheck(session, newTime, timeEnd):
    sessionfile = open("sessions.txt", "r+")
    d = sessionfile.readlines()
    sessionfile.seek(0)

    # deleting old stuff
    if len(d) > 40:
        d = d[int(round(len(d)/2)):len(d)]

    for line in d:
        item = line.split(' ')
        if item[0] == session:
            timeitem = newTime.split(':')
            clientTime = int(timeitem[0]) * 60 + int(timeitem[1])
            serverTime = int(timeEnd) - int(item[1])
            diff = abs(serverTime - clientTime)
            return diff
        else:
            sessionfile.write(line)

    sessionfile.truncate()
    sessionfile.close()
