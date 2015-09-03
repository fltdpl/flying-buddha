

def append2list(filename, name, points):
    # append the new highscore to the end of the list
    highscorefile = open(filename, 'a')
    highscorefile.write(name + ' ' + str(points) + '\n')
    highscorefile.close()

def separate(filename):
    # Function for reading the highscore file and seperate strgs and ints
    ints = []
    strgs = []
    with open(filename) as myfile:
        for line in myfile:
            item = line.split(' ', 1 )
            strvalue = item[0]
            intvalue = int(item[1], 10)

            ints.append(intvalue)
            strgs.append(strvalue)

    return ints, strgs

def deleteContent(fName):
    # delete the content of a file
    with open(fName, "w"):
        pass

def refreshfile(filename, datatupel):
    # refresh the data in the highscore file
    deleteContent(filename)
    highscorefile = open(filename, 'a')
    highscorefile.write('\n'.join('%s %s' % x for x in datatupel) + '\n')
    highscorefile.close()

def printHighscore():
    scores_file = "highscore.txt";

    # reading highscore data
    points, names = separate(scores_file)

    # form a tupel from data
    Data = []
    for a in range(len(points)):
        tmp = [(names[a], points[a])]
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
        JData.append({'name': nme, 'points': pnt})

    return(JData)


def newHighscore(newName, newPoints):
    scores_file = "highscore.txt";
    scores_max = 100;
    scores_list = 10;

    # encode
    newName = newName.encode("utf-8")

    # appending the new score to the highscore file
    append2list(scores_file, newName, newPoints)

    # reading highscore data
    points, names = separate(scores_file)

    # form a tupel from data
    Data = []
    for a in range(len(points)):
        tmp = [(names[a], points[a])]
        Data.extend(tmp)

    # sort data by points, begin with the highest
    Data = sorted(Data, key=lambda Data: Data[1], reverse=True)

    # limit the data to scores_max
    if len(Data) >= (scores_max + 1):
        Data = Data[0:scores_max]

    # refresh the file
    refreshfile(scores_file, Data)
