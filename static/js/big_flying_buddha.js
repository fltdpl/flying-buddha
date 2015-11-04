//Initialize the Game and starts it.
var game = new Game();

function init() {
  if (game.init())
    game.start();
}

// Returns a random integer between min (included) and max (excluded)
function getRandomInt(min, max) {
  if (min > max) {
    return -1;
  }

  if (min == max) {
    return min;
  }

  var r;

  do {
    r = Math.random();
  }
  while (r == 1.0);

  return min + parseInt(r * (max - min + 1));
}

// calculate readable time
String.prototype.toHHMMSS = function() {
  var secnum = parseInt(this, 10);
  var hours = Math.floor(secnum / 3600);
  var minutes = Math.floor((secnum - (hours * 3600)) / 60);
  var seconds = secnum - (hours * 3600) - (minutes * 60);

  if (hours < 10) {
    hours = '0' + hours;
  }

  if (minutes < 10) {
    minutes = '0' + minutes;
  }

  if (seconds < 10) {
    seconds = '0' + seconds;
  }

  if (hours < 1) {
    return minutes + ':' + seconds;
  } else {
    return hours + ':' + minutes + ':' + seconds;
  }

};


/**
 * Life
 */
function ShowStatusLife(stat) {
  if (stat == 3) {
    document.getElementById('statuslife3full').style.display = 'block';
    document.getElementById('statuslife2full').style.display = 'none';
    document.getElementById('statuslife1full').style.display = 'none';
    document.getElementById('statuslife0full').style.display = 'none';
  }
  if (stat == 2) {
    document.getElementById('statuslife3full').style.display = 'none';
    document.getElementById('statuslife2full').style.display = 'block';
    document.getElementById('statuslife1full').style.display = 'none';
    document.getElementById('statuslife0full').style.display = 'none';
  }
  if (stat == 1) {
    document.getElementById('statuslife3full').style.display = 'none';
    document.getElementById('statuslife2full').style.display = 'none';
    document.getElementById('statuslife1full').style.display = 'block';
    document.getElementById('statuslife0full').style.display = 'none';
  }
  if (stat === 0) {
    document.getElementById('statuslife3full').style.display = 'none';
    document.getElementById('statuslife2full').style.display = 'none';
    document.getElementById('statuslife1full').style.display = 'none';
    document.getElementById('statuslife0full').style.display = 'block';
  }
}


/**
 * Creates the Drawable object which will be the base class for
 * all drawable objects in the game. Sets up defualt variables
 * that all child objects will inherit, as well as the defualt
 * functions.
 */
function Drawable () {
  this.init = function(x, y, width, height) {
    // Defualt variables
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  };

  this.speed = 0;
  this.canvasWidth = 0;
  this.canvasHeight = 0;

  // Define abstract function to be implemented in child objects
  this.draw = function() {};

  this.move = function() {};
}

/*
 * Background object
 */
function Background() {
  this.speed = 1; // Redefine speed of the background for panning

  // Implement abstract function
  this.draw = function() {
    // Pan background
    this.y += this.speed;
    this.context.drawImage(imageRepository.background, this.x, this.y);

    // Draw another image at the top edge of the first image
    this.context.drawImage(imageRepository.background, this.x, this.y - this.canvasHeight);

    // If the image scrolled off the screen, reset
    if (this.y >= this.canvasHeight)
      this.y = 0;
  };
}

Background.prototype = new Drawable();

/**
 * Background story object
 */
 function BGObstacle(obstacle) {
   this.alive = false;
   this.obstacle = obstacle;
   this.speed = 1;

   // Sets the obstacle values
   this.spawn = function(x, y, speedx, speedy) {
     this.x = x;
     this.y = y;
     this.speedx = speedx;
     this.speedy = speedy;
     this.alive = true;
   };

   this.draw = function() {
     this.x += this.speedx;
     this.y += this.speedy;

     this.context.drawImage(this.obstacle, this.x, this.y);
     return [this.x, this.y]

   };
 }
 BGObstacle.prototype = new Drawable();

 /*
  * Holds Background obstacles
  */
function BGPool() {

  this.init = function() {
    enterpriseL = new BGObstacle(imageRepository.imgenterpriseL);
    enterpriseL.init(800, 300,
      imageRepository.imgenterpriseL.width,
      imageRepository.imgenterpriseL.height);
    enterpriseR = new BGObstacle(imageRepository.imgenterpriseR);
    enterpriseR.init(0-imageRepository.imgenterpriseR.width, 300,
      imageRepository.imgenterpriseR.width,
      imageRepository.imgenterpriseR.height);
    warbirdR = new BGObstacle(imageRepository.imgwarbirdR);
    warbirdR.init(0-imageRepository.imgwarbirdR.width, 300,
      imageRepository.imgwarbirdR.width,
      imageRepository.imgwarbirdR.height);
    podL = new BGObstacle(imageRepository.imgpodL);
    podL.init(800, 450,
      imageRepository.imgpodL.width,
      imageRepository.imgpodL.height);
    podR = new BGObstacle(imageRepository.imgpodR);
    podR.init(0-imageRepository.imgpodR.width, 250,
      imageRepository.imgpodR.width,
      imageRepository.imgpodR.height);
    rosetta = new BGObstacle(imageRepository.imgRosetta);
    rosetta.init(0-imageRepository.imgRosetta.width, 250,
      imageRepository.imgRosetta.width,
      imageRepository.imgRosetta.height);
  };

  this.animate = function() {
    var position;

    if (game.gametime >= 20 && game.bgstory === 0) {
      if (rosetta.alive === false) {
        rosetta.spawn(0-imageRepository.imgRosetta.width, 100, 0.5, -0.1);
      } else {
        position = rosetta.draw();
        if (position[0] >= 800) {
          rosetta.alive = false;
          game.bgstory = 1;
        }
      }
    }

    if (game.gametime >= 60 && game.bgstory === 1) {
      if (podL.alive === false) {
        podL.spawn(800, 400, -0.5, -0.3);
      } else {
        position = podL.draw();
        if (position[0] <= 0-imageRepository.imgpodL.width) {
          podL.alive = false;
          game.bgstory = 2;
        }
      }
    }

    if (game.gametime >= 120 && game.bgstory === 2) {
      if (enterpriseL.alive === false) {
        enterpriseL.spawn(800, 300, -1, 0);
      } else {
        position = enterpriseL.draw();
        if (position[0] <= 0-imageRepository.imgenterpriseL.width) {
          enterpriseL.alive = false;
          game.bgstory = 3;
        }
      }
    }

    if (game.gametime >= 150 && game.bgstory === 3) {
      if (enterpriseR.alive === false) {
        enterpriseR.spawn(0-imageRepository.imgenterpriseR.width , 200, 2, 0);
      } else {
        enterpriseR.draw();
      }

      if (warbirdR.alive === false) {
        warbirdR.spawn(0-imageRepository.imgenterpriseR.width-600 , 200, 2.3, 0);
      } else {
        position = warbirdR.draw();
        if (position[0] >= 800) {
          enterpriseR.alive = false;
          warbirdR.alive = false;
          game.bgstory = 4;
        }
      }
    }

    if (game.gametime >= 210 && game.bgstory === 4) {
      if (podR.alive === false) {
        podR.spawn(0-imageRepository.imgpodR.width, 300, 0.5, 0.1);
      } else {
        position = podR.draw();
        if (position[0] >= 800) {
          podR.alive = false;
          game.bgstory = 5;
        }
      }
    }

    if (game.gametime >= 300 && game.bgstory === 5) {
      if (rosetta.alive === false) {
        rosetta.spawn(800, 200, -0.5, 0.1);
      } else {
        position = rosetta.draw();
        if (position[0] <=  0-imageRepository.imgRosetta.width) {
          rosetta.alive = false;
          game.bgstory = 6;
        }
      }
    }


  };

}

/**
 * Obstacle object
 */
function Obstacle(obstacle) {
  this.alive = false; // Is true if the obstacle is currently in use
  this.obstacle = obstacle;
  this.speed = 2;

  // Sets the obstacle values
  this.spawn = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.alive = true;
  };

  this.draw = function() {
    this.y += this.speed;

    if (this.y >= this.canvasHeight) {
      this.y = 0;
      return true;
    } else {
      this.context.drawImage(this.obstacle, this.x, this.y);
      return false;
    }

  };

  this.clearObArea = function() {
    this.context.clearRect(this.x - 1, this.y - 1,
      this.width + 2, this.height + 2);
  };

  this.handleCollisions = function() {
    var bwidth = imageRepository.buddha.width;
    var bheight = imageRepository.buddha.height;
    var fit = 30;
    var bx = game.buddhaO.x + bwidth / 2;
    var by = game.buddhaO.y + bheight / 2;
    var ox = this.x + this.width / 2;
    var oy = this.y + this.height / 2;
    var coll = collisionTest(ox, oy, this.width - fit, bx, by, bwidth - fit);
    if (coll === true) {
      this.context.clearRect(this.x - 1, this.y - 1,
        this.width + 2, this.height + 2);
      return true;
    } else {
      return false;
    }
  };

  // Resets the obstacle values
  this.clear = function() {
    this.x = 0;
    this.y = 0;
    this.speed = 0;
    this.alive = false;
  };

}

Obstacle.prototype = new Drawable();


/**
 * Pool holds obstacles to be managed to prevent garbage collection.
 */
function Pool(maxSize) {
  //var size = maxSize; // Max obstacles allowed in the pool
  var size = 15;
  var stonePool = [];
  var starPool = [];
  var plus10pool = [];
  var plus100;
  var plusheart;
  var heartObstacle;
  var bigstarObstacle;
  this.counter = 0;
  this.starfieldtime;

  // populate the pool array with obstacles
  this.init = function() {
    for (var i = 0; i < size; i++) {
      var stonepic = stonePic();
      var starpic = starPic();
      var stoneObstacle = new Obstacle(stonepic);
      var starObstacle = new Obstacle(starpic);
      stoneObstacle.init(0, 0, stonepic.width, stonepic.height);
      starObstacle.init(0, 0, starpic.width, starpic.height);
      stonePool[i] = stoneObstacle;
      starPool[i] = starObstacle;
      plus10pool[i] = new sprite({
        context: game.obstaclesContext,
        width: 610,
        height: 35,
        image: imageRepository.imgplus10,
        numberOfFrames: 10,
        ticksPerFrame: 1
      });
    }
    heartObstacle = new Obstacle(imageRepository.bigheart);
    bigstarObstacle = new Obstacle(imageRepository.bigstar);
    starfieldObstacle = new Obstacle(imageRepository.imgstarfield);
    heartObstacle.init(0, 0, imageRepository.bigheart.width,
      imageRepository.bigheart.height);
    bigstarObstacle.init(0, 0, imageRepository.bigstar.width,
      imageRepository.bigstar.height);
    starfieldObstacle.init(0, 0, imageRepository.imgstarfield.width,
      imageRepository.imgstarfield.height);
    plus100 = new sprite({
      context: game.obstaclesContext,
      width: 880,
      height: 35,
      image: imageRepository.imgplus100,
      numberOfFrames: 10,
      ticksPerFrame: 1
    });
    plusheart = new sprite({
      context: game.obstaclesContext,
      width: 510,
      height: 35,
      image: imageRepository.imgplusheart,
      numberOfFrames: 10,
      ticksPerFrame: 1
    });
  };


  // Initialize new Item
  this.get = function(speed) {
    var border = [];
    var timediv = game.gametime;
    var randnumber = Math.random();
    // border 0<= randnumber < 1: [stones, stars, bigheart, bigstar, starfield]
    //border = [0, 0, 0, 0, 1.3];
    if (timediv <= 60) {
      border = [0.40, 1, 1.1, 1.2, 1.3];
    } else if (timediv > 60 && timediv <= 180) {
      border = [0.40, 0.96, 0.98, 1, 1.1];
    } else if (timediv > 180 && timediv <= 240) {
      border = [0.40, 0.96, 0.98, 1, 1.1];
    } else if (timediv > 240 && timediv <= 300) {
      border = [0.45, 0.96, 0.98, 1, 1.1];
    } else if (timediv > 300 && timediv <= 330) {
      border = [0.50, 0.93, 0.95, 0.99, 1];
    } else if (timediv > 330 && timediv <= 360) {
      border = [0.55, 0.93, 0.95, 0.99, 1];
    } else if (timediv > 330 && timediv <= 360) {
      border = [0.60, 0.90, 0.92, 0.99, 1];
    } else {
      border = [0.65, 0.90, 0.92, 0.99, 1];
    }
    if (game.starfield === true) {
      border = [0, 0.8, 0.9, 1, 1.1];
    }

    if (randnumber <= border[0]) {
      // stone
      if (!stonePool[size - 1].alive) {
        x = getRandomInt(0, 800 - stonePool[size - 1].width);
        stonePool[size - 1].spawn(x, 0, speed);
        stonePool.unshift(stonePool.pop());
      }
    } else if (randnumber > border[0] && randnumber <= border[1]) {
      // star
      if (!starPool[size - 1].alive) {
        x = getRandomInt(0, 800 - starPool[size - 1].width);
        starPool[size - 1].spawn(x, 0, speed);
        starPool.unshift(starPool.pop());
        if (game.starfield === true) {
          game.starfieldcounter += 1;
          if (game.starfieldcounter >= 100) {
            game.starfield = false;
            game.starfieldcounter = 0;
          }
        }
      }
    } else if (randnumber > border[1] && randnumber <= border[2]) {
      // special
      if (!heartObstacle.alive && game.life < 3) {
        x = getRandomInt(0, 800 - heartObstacle.width);
        heartObstacle.spawn(x, 0, speed);
      }
    } else if (randnumber > border[2] && randnumber <= border[3]) {
      // special
      if (!bigstarObstacle.alive) {
        x = getRandomInt(0, 800 - bigstarObstacle.width);
        bigstarObstacle.spawn(x, 0, speed);
      }
    } else if (randnumber > border[3] && randnumber <= border[4]) {
      // special
      if (!starfieldObstacle.alive) {
        x = getRandomInt(0, 800 - starfieldObstacle.width);
        starfieldObstacle.spawn(x, 0, speed);
      }
    }

  };

  // Clear Obstacle areas
  this.clearobstscreen = function() {
    for (var i = 0; i < size; i++) {
      if (stonePool[i].alive) {
        stonePool[i].clearObArea();
      }
      if (starPool[i].alive) {
        starPool[i].clearObArea();
      }
      if (plus10pool[i].alive) {
        plus10pool[i].clear(plus10pool[i].x, plus10pool[i].y);
      }
    }
    if (heartObstacle.alive) {
      heartObstacle.clearObArea();
    }
    if (bigstarObstacle.alive) {
      bigstarObstacle.clearObArea();
    }
    if (starfieldObstacle.alive) {
      starfieldObstacle.clearObArea();
    }
    if (plus100.alive) {
      plus100.clear(plus100.x, plus100.y);
    }
    if (plusheart.alive) {
      plusheart.clear(plusheart.x, plusheart.y);
    }
  };

  // Draws any in use obstacle.
  this.animate = function() {
    this.counter++;
    var timediv = game.gametime;
    var xRand = 0;
    var yRand = 0;
    var minspeed;
    var speedrate;
    var Rate;
    var i;

    if (timediv < 60) {
      minspeed = 1;
      speedrate = 2;
      Rate = 70;
    } else if (timediv >= 60 && timediv < 90) {
      minspeed = 1;
      speedrate = 2;
      Rate = 60;
    } else if (timediv >= 90 && timediv < 120) {
      minspeed = 1;
      speedrate = 2;
      Rate = 55;
    } else if (timediv >= 120 && timediv < 150) {
      minspeed = 1.5;
      speedrate = 2;
      Rate = 50;
    } else if (timediv >= 150 && timediv < 180) {
      minspeed = 1.5;
      speedrate = 3;
      Rate = 45;
    } else if (timediv >= 180 && timediv < 210) {
      minspeed = 1.5;
      speedrate = 3;
      Rate = 40;
    } else if (timediv >= 210 && timediv < 240) {
      minspeed = 1.5;
      speedrate = 3;
      Rate = 45;
    } else if (timediv >= 240 && timediv < 270) {
      minspeed = 2;
      speedrate = 3;
      Rate = 40;
    } else if (timediv >= 270 && timediv < 300) {
      minspeed = 2;
      speedrate = 3;
      Rate = 35;
    } else {
      minspeed = 2;
      speedrate = 3;
      Rate = 30;
    }

    if (game.starfield === true) {
      Rate = 15;
    }

    // Draw obstacles or create new ones
    // stone
    for (i = 0; i < size; i++) {
      if (stonePool[i].alive){
        if (stonePool[i].draw()) {
          stonePool[i].clear();
          stonePool.push((stonePool.splice(i, 1))[0]);
        }
        if (stonePool[i].handleCollisions()) {
          stonePool[i].clear();
          stonePool.push((stonePool.splice(i, 1))[0]);
          game.hitface = true;
          game.hitfacetime = new Date().getTime();
          if (game.life == 3) {
            ShowStatusLife(2);
            game.life = 2;
          } else if (game.life == 2) {
            ShowStatusLife(1);
            game.life = 1;
          } else if (game.life == 1) {
            ShowStatusLife(0);
            game.life = 0;
            game.gameover = true;
            break;
          }
        }
      } else {
        break;
      }
    }

    // star
    for (i = 0; i < size; i++) {
      if (starPool[i].alive){
        if (starPool[i].draw()) {
          starPool[i].clear();
          starPool.push((starPool.splice(i, 1))[0]);
        }
        if (starPool[i].handleCollisions()) {
          var xplus10 = starPool[i].x;
          var yplus10 = starPool[i].y;
          starPool[i].clear();
          starPool.push((starPool.splice(i, 1))[0]);
          plus10pool[size - 1].spawn(xplus10, yplus10);
          plus10pool.unshift(plus10pool.pop());
          game.score += 10;
        }
      } else {
        break;
      }
    }
    // animation +10
    for (i = 0; i < size; i++) {
      if (plus10pool[i].alive){
        if (!plus10pool[i].update()) {
          plus10pool[i].render(plus10pool[i].x, plus10pool[i].y);
        } else {
          plus10pool[i].alive = false;
          plus10pool.push((plus10pool.splice(i, 1))[0]);
        }
      }
    }

    // bigheart
    if (heartObstacle.alive) {
        if (heartObstacle.draw()) {
          heartObstacle.clear();
        }
        if (heartObstacle.handleCollisions()) {
          var xplusheart = heartObstacle.x;
          var yplusheart = heartObstacle.y;
          plusheart.spawn(xplusheart, yplusheart);
          heartObstacle.clear();
          if (game.life == 1) {
            ShowStatusLife(2);
            game.life = 2;
          } else if (game.life == 2) {
            ShowStatusLife(3);
            game.life = 3;
          }
        }
    }
    // animation +heart
    if (plusheart.alive){
      if (!plusheart.update()) {
        plusheart.render(plusheart.x, plusheart.y);
      } else {
        plusheart.alive = false;
      }
    }

    // bigstar
    if (bigstarObstacle.alive) {
        if (bigstarObstacle.draw()) {
          bigstarObstacle.clear();
        }
        if (bigstarObstacle.handleCollisions()) {
          var xplus100 = bigstarObstacle.x;
          var yplus100 = bigstarObstacle.y;
          plus100.spawn(xplus100, yplus100);
          bigstarObstacle.clear();
          game.score += 100;
        }
    }
    // animation +100
    if (plus100.alive){
      if (!plus100.update()) {
        plus100.render(plus100.x, plus100.y);
      } else {
        plus100.alive = false;
      }
    }

    // starfield
    if (starfieldObstacle.alive) {
        if (starfieldObstacle.draw()) {
          starfieldObstacle.clear();
        }
        if (starfieldObstacle.handleCollisions()) {
          var xplus100 = starfieldObstacle.x;
          var yplus100 = starfieldObstacle.y;
          starfieldObstacle.clear();
          game.starfield = true;
          this.starfieldtime = timediv;
          game.starfieldwaitflag = true;
        }
    }

    // spawn new obstacles
    if (game.starfieldwaitflag === true) {
      if (timediv - this.starfieldtime >= 3) {
        game.starfieldwaitflag = false;
      }
    }

    if (game.starfieldwaitflag === false && this.counter >= Rate) {
      yspeed = minspeed + Math.random() * speedrate;
      this.counter = 0;
      this.get(yspeed);
    }

  }; // animate

}



/**
 * Buddha object
 */
function Buddha() {
  this.speed = 5;
  this.omt = false;
  this.flameleft = new sprite({
    context: game.buddhaContext,
    width: 243,
    height: 45,
    image: imageRepository.flameleft,
    numberOfFrames: 3,
    ticksPerFrame: 12
  });
  this.flameright = new sprite({
    context: game.buddhaContext,
    width: 243,
    height: 45,
    image: imageRepository.flameright,
    numberOfFrames: 3,
    ticksPerFrame: 12
  });

  this.draw = function() {
    if (game.hitface === true) {
      this.context.drawImage(imageRepository.buddhaO , this.x, this.y);
    } else {
      this.context.drawImage(imageRepository.buddha , this.x, this.y);
    }

    if (this.fleft) {
      this.flameleft.update();
      this.flameleft.render(this.x + 168, this.y + 80);
      this.omt = true;
      this.start = new Date().getTime();
    } else if (this.fright) {
      this.flameright.update();
      this.flameright.render(this.x - 55, this.y + 72);
      this.omt = true;
      this.start = new Date().getTime();
    }

  };

  this.drawsimple = function() {
    this.context.drawImage(imageRepository.buddhasad, this.x, this.y);
  };

  this.move = function() {
    this.fleft = false;
    this.fright = false;

    // Determine if the action is move action
    if (KEY_STATUS.left || KEY_STATUS.right ||
      KEY_STATUS.down || KEY_STATUS.up) {
      // Erase it's current image
      this.flameleft.clear(this.x + 168, this.y + 80);
      this.flameright.clear(this.x - 55, this.y + 72);
      this.context.clearRect(this.x, this.y, this.width, this.height);

      // Update x and y according to the direction to move and
      // redraw the ship. Change the else if's to if statements
      // to have diagonal movement.
      if (KEY_STATUS.left) {
        this.fleft = true;
        this.fright = false;
        this.x -= this.speed;
        if (this.x <= 0) // Keep player within the screen
          this.x = 0;

      } else if (KEY_STATUS.right) {
        this.fleft = false;
        this.fright = true;
        this.x += this.speed;
        if (this.x >= this.canvasWidth - this.width)
          this.x = this.canvasWidth - this.width;

      }
      if (KEY_STATUS.up) {
        this.y -= this.speed;
        if (this.y <= this.canvasHeight / 3)
          this.y = this.canvasHeight / 3;

      } else if (KEY_STATUS.down) {
        this.y += this.speed;
        if (this.y >= this.canvasHeight - this.height)
          this.y = this.canvasHeight - this.height;

      }

      // Finish by redrawing the Buddha
      this.draw();
    }

    if (this.omt) {
      var end = new Date().getTime();
      var diff = (end - this.start);
      if (diff >= 50) {
        this.omt = false;
        this.flameleft.clear(this.x + 168, this.y + 80);
        this.flameright.clear(this.x - 55, this.y + 72);
        if (game.hitface === true) {
          this.context.drawImage(imageRepository.buddhaO , this.x, this.y);
        } else {
          this.context.drawImage(imageRepository.buddha , this.x, this.y);
        }
      }
    }

    if (game.hitface === true) {
      var endhitface = new Date().getTime();
      var diffhitface = (endhitface - game.hitfacetime);
      if (diffhitface >= 800) {
        game.hitface = false;
        this.context.drawImage(imageRepository.buddha , this.x, this.y);
      } else {
        this.context.drawImage(imageRepository.buddhaO , this.x, this.y);
      }
    }

  };
}

Buddha.prototype = new Drawable();

/**
 * Creates the Game object which will hold all objects and data for the game.
 */
function Game() {
  /*
   * Gets canvas information and context and sets up all game
   * objects.
   * Returns true if the canvas is supported and false if it
   * is not. This is to stop the animation script from constantly
   * running on older browsers.
   */
  this.init = function() {
    // Get the canvas element
    this.backgroundCanvas = document.getElementById('backgroundID');
    this.buddhaCanvas = document.getElementById('buddhaID');
    this.obstaclesCanvas = document.getElementById('obstaclesID');

    // Test to see if canvas is supported
    if (this.backgroundCanvas.getContext) {
      this.backgroundContext = this.backgroundCanvas.getContext('2d');
      this.buddhaContext = this.buddhaCanvas.getContext('2d');
      this.obstaclesContext = this.obstaclesCanvas.getContext('2d');

      // Initialize objects to contain their context and canvas
      // information

      Background.prototype.context = this.backgroundContext;
      Background.prototype.canvasWidth = this.backgroundCanvas.width;
      Background.prototype.canvasHeight = this.backgroundCanvas.height;

      BGObstacle.prototype.context = this.backgroundContext;
      BGObstacle.prototype.canvasWidth = this.backgroundCanvas.width;
      BGObstacle.prototype.canvasHeight = this.backgroundCanvas.height;

      Buddha.prototype.context = this.buddhaContext;
      Buddha.prototype.canvasWidth = this.buddhaCanvas.width;
      Buddha.prototype.canvasHeight = this.buddhaCanvas.height;

      Obstacle.prototype.context = this.obstaclesContext;
      Obstacle.prototype.canvasWidth = this.obstaclesCanvas.width;
      Obstacle.prototype.canvasHeight = this.obstaclesCanvas.height;

      // Initialize the background object
      this.background = new Background();
      this.background.init(0, 0); // Set draw point to 0,0

      // Initialize the enterprise
      this.backgroundPool = new BGPool();
      this.backgroundPool.init();

      // Initilize the obstacles object
      this.obstaclePool = new Pool(30);
      this.obstaclePool.init();

      // Initialize the buddha object
      this.buddhaO = new Buddha();

      this.buddhaStartX = this.buddhaCanvas.width / 2 - imageRepository.buddha
        .width / 2;
      this.buddhaStartY = this.buddhaCanvas.height / 3;
      this.buddhaO.init(this.buddhaStartX, this.buddhaStartY,
        imageRepository.buddha.width, imageRepository.buddha.height);

      this.gamestarttime = new Date().getTime();
      this.gametime = 0;
      this.bgstory = 0;
      this.playtime = 0;
      this.score = 0;
      this.life = 3;
      this.ingame = false;
      this.gameover = false;
      this.played = false;
      this.hitface = false;
      this.starfield = false;
      this.starfieldcounter = 0;
      this.starfieldwaitflag = false;
      this.hitfacetime = 0;

      return true;
    } else {
      return false;
    }
  };

  // Start the animation loop
  this.start = function() {
    this.buddhaO.draw();
    animate();
  };

  // startbutton
  this.startbutton = function() {
    window.scrollTo(0, 0);
    document.getElementById('gametitle').style.display = 'none';
    document.getElementById('timescoreclass').style.display = 'block';
    document.getElementById('scoreclass').style.display = 'block';
    this.gamestarttime = new Date().getTime();
    this.gametime = 0;
    ShowStatusLife(this.life);
    this.bgstory = 0;
    this.timedivB = 5;
    this.playtime = 0;
    this.score = 0;
    this.ingame = true;

    document.getElementById('game-over').style.display = 'none';
    this.life = 3;
    ShowStatusLife(this.life);
    this.obstaclePool.init();
    this.hitface = false;
    this.starfield = false;
    this.starfieldcounter = 0;
    this.starfieldwaitflag = false;
    this.hitfacetime = 0;
  };

  // Game over
  this.gameOver = function() {
    document.getElementById('game-over').style.display = 'block';
    this.ingame = false;
    this.gameover = false;
    this.played = true;

    this.backgroundContext.clearRect(
      0, 0, this.backgroundCanvas.width, this.backgroundCanvas.height);
    this.obstaclesContext.clearRect(
      0, 0, this.obstaclesCanvas.width, this.obstaclesCanvas.height);
    this.buddhaContext.clearRect(
      0, 0, this.buddhaCanvas.width, this.buddhaCanvas.height);
    this.buddhaO.init(this.buddhaStartX, this.buddhaStartY,
      imageRepository.buddhasad.width, imageRepository.buddhasad.height);
    this.buddhaO.drawsimple();

    // Modal for highscore list
    if (ScoresViewModel.highscore < this.score) {
      ScoresViewModel.beginAdd();
    }

  };

  // Score
  this.funcscore = function() {
    var timediv = (new Date().getTime() - this.gamestarttime) / 1000;
    this.playtime = timediv.toString().toHHMMSS();
    if (timediv - this.timedivB >= 10) {
      this.timedivB = timediv;
      this.score += 5;
    }
  };

}


/**
 * The animation loop
 */
function animate() {
  if (game.gameover === true) {
    game.gameOver();
  }

  if (game.ingame === true) {
    game.gametime = (new Date().getTime() - game.gamestarttime) / 1000;
    requestAnimFrame(animate);
    game.background.draw();
    game.backgroundPool.animate();
    game.buddhaO.move();
    game.obstaclePool.clearobstscreen();
    game.obstaclePool.animate();
    game.funcscore();
    document.getElementById('timescore').innerHTML = game.playtime;
    document.getElementById('score').innerHTML = game.score;
  } else {
    requestAnimFrame(animate);
    game.background.draw();

    if (KEY_STATUS.space) {
      if (game.played === false) {
        game.startbutton();
      } else {
        if (!(document.getElementById('addScoreModal').style.display === 'block')) {
          game.startbutton();
        }
      }
    }
  }
}

// The keycodes that will be mapped when a user presses a button.
// Original code by Doug McInnes
KEY_CODES = {
  32: 'space',
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down'
};

// Creates the array to hold the KEY_CODES and sets all their values
// to false. Checking true/flase is the quickest way to check status
// of a key press and which one was pressed when determining
// when to move and which direction.
KEY_STATUS = {};
for (var code in KEY_CODES) {
  KEY_STATUS[KEY_CODES[code]] = false;
}
/**
 * Sets up the document to listen to onkeydown events (fired when
 * any key on the keyboard is pressed down). When a key is pressed,
 * it sets the appropriate direction to true to let us know which
 * key it was.
 */
document.onkeydown = function(e) {
  // Firefox and opera use charCode instead of keyCode to
  // return which key was pressed.
  var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
  if (KEY_CODES[keyCode]) {
    e.preventDefault();
    KEY_STATUS[KEY_CODES[keyCode]] = true;
  }
};

/**
 * Sets up the document to listen to ownkeyup events (fired when
 * any key on the keyboard is released). When a key is released,
 * it sets teh appropriate direction to false to let us know which
 * key it was.
 */
document.onkeyup = function(e) {
  var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
  if (KEY_CODES[keyCode]) {
    e.preventDefault();
    KEY_STATUS[KEY_CODES[keyCode]] = false;
  }
};

/**
 * requestAnim shim layer by Paul Irish
 * Finds the first API that works to optimize the animation loop,
 * otherwise defaults to setTimeout().
 */
window.requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(/* function */ callback, /* DOMElement */ element) {
      window.setTimeout(callback, 1000 / 60);
    };
})();
