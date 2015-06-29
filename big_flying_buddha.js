//Initialize the Game and starts it.
var game = new Game();

function init() {
  if (game.init())
    game.start();
}

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Creates the Drawable object which will be the base class for
 * all drawable objects in the game. Sets up defualt variables
 * that all child objects will inherit, as well as the defualt
 * functions.
 */
function Drawable() {
  this.init = function(x, y, width, height) {
    // Defualt variables
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  this.speed = 0;
  this.canvasWidth = 0;
  this.canvasHeight = 0;

  // Define abstract function to be implemented in child objects
  this.draw = function() {
    };

  this.move = function() {
    };
}

/**
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
 * Pool holds obstacles to be managed to prevent garbage collection.
 */
function Pool(maxSize) {
  var size = maxSize; // Max obstacles allowed in the pool
  var pool = [];
  this.obstacleRate = 100;
  this.obstacleSpeed = 2;
  this.counter = 0;

  // populate the pool array with obstacles
  this.init = function() {
    for (var i = 0; i < size; i++) {
      // Initalize the obstacle object
      var obstacle = new Obstacle();
      obstacle.init(0, 0, imageRepository.obstacle01.width,
        imageRepository.obstacle01.height);
      pool[i] = obstacle;
    }
  };

  /*
   * Grabs the last item in the list and initializes it and
   * pushes it to the front of the array.
   */
  this.get = function(x, y, speed) {
    if (!pool[size - 1].alive) {
      pool[size - 1].spawn(x, y, speed);
      pool.unshift(pool.pop());
    }
  };

  /*
	 * Draws any in use obstacle. If a obstacle goes off the screen,
	 * clears it and pushes it to the front of the array.
	 */
  this.animate = function() {
    this.counter++;
    for (var i = 0; i < size; i++) {

      // Only draw until we find a obstacle that is not alive
      if (pool[i].alive) {
        if (pool[i].draw()) {
          pool[i].clear();
          pool.push((pool.splice(i, 1))[0]);
        }
      } else {
        var xmin = 0;
        var xmax = 800;
        var xRand = getRandomInt(xmin, xmax);
        var yspeed = Math.random() * 2 + (3 / 2);
        if (this.counter >= this.obstacleRate) {
          if (!pool[size - 1].alive) {
            this.counter = 0;
            this.get(xRand, 0, yspeed);
          }
        }

        break;
      }
    }
  };

}


/**
 * Obstacle object
 */
function Obstacle() {
  this.alive = false; // Is true if the obstacle is currently in use
  this.obstacle = imageRepository.obstacle01;
  this.speed = 2;

  // Sets the obstacle values
  this.spawn = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.alive = true;
  };

  this.draw = function() {
    this.context.clearRect(this.x - 1, this.y - 1, this.width + 2, this.height + 2);
    this.y += this.speed;

    if (this.y >= this.canvasHeight) {
      this.y = 0;
      return true;
    } else {
      this.context.drawImage(this.obstacle, this.x, this.y);
      return false;
    }

  }

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
 * Buddha object
 */
function Buddha() {
  this.speed = 3;
  this.omt = false;

  this.draw = function() {
    this.context.drawImage(imageRepository.buddha, this.x, this.y);

    if (this.fleft) {
      this.context.drawImage(imageRepository.flameright, this.x + 172, this.y + 82);
      this.omt = true;
      this.start = new Date().getTime();
    } else if (this.fright) {
      this.context.drawImage(imageRepository.flameleft, this.x - 128, this.y + 74);
      this.omt = true;
      this.start = new Date().getTime();
    }

  };

  this.move = function() {
    this.fleft = false;
    this.fright = false;

    // Determine if the action is move action
    if (KEY_STATUS.left || KEY_STATUS.right ||
    KEY_STATUS.down || KEY_STATUS.up) {
      // The ship moved, so erase it's current image so it can
      // be redrawn in it's new location
      this.context.clearRect(this.x - 350 / 2, this.y, this.width + 350, this.height);

      // Update x and y according to the direction to move and
      // redraw the ship. Change the else if's to if statements
      // to have diagonal movement.
      if (KEY_STATUS.left) {
        this.fleft = true;
        this.fright = false;
        this.x -= this.speed
        if (this.x <= 0) // Keep player within the screen
        this.x = 0;

      } else if (KEY_STATUS.right) {
        this.fleft = false;
        this.fright = true;
        this.x += this.speed
        if (this.x >= this.canvasWidth - this.width)
        this.x = this.canvasWidth - this.width;

      } else if (KEY_STATUS.up) {
        this.y -= this.speed
        if (this.y <= this.canvasHeight / 3)
        this.y = this.canvasHeight / 3;

      } else if (KEY_STATUS.down) {
        this.y += this.speed
        if (this.y >= this.canvasHeight - this.height)
        this.y = this.canvasHeight - this.height;

      }

      // Finish by redrawing the ship
      this.draw();
    }

    if (this.omt) {
      var end = new Date().getTime();
      var diff = (end - this.start);
      if (diff >= 150) {
        this.omt = false;
        this.context.clearRect(this.x - 350 / 2, this.y, this.width + 350, this.height);
        this.context.drawImage(imageRepository.buddha, this.x, this.y);
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

      Buddha.prototype.context = this.buddhaContext;
      Buddha.prototype.canvasWidth = this.buddhaCanvas.width;
      Buddha.prototype.canvasHeight = this.buddhaCanvas.height;

      Obstacle.prototype.context = this.obstaclesContext;
      Obstacle.prototype.canvasWidth = this.obstaclesCanvas.width;
      Obstacle.prototype.canvasHeight = this.obstaclesCanvas.height;

      // Initialize the background object
      this.background = new Background();
      this.background.init(0, 0); // Set draw point to 0,0

      // Initilize the obstacles object
      this.obstaclePool = new Pool(30);
      this.obstaclePool.init();

      //this.obstacles = new Obstacle();
      //var obstaclesStartX = this.obstaclesCanvas.width / 2;
      //this.obstacles.init(obstaclesStartX, 0, imageRepository.obstacle01.width,
      //  imageRepository.obstacle01.height); // Set draw point to 0,0

      // Initialize the buddha object
      this.buddhaO = new Buddha();

      var buddhaStartX = this.buddhaCanvas.width / 2 - imageRepository.buddha.width / 2;
      var buddhaStartY = this.buddhaCanvas.height / (4) + imageRepository.buddha.height * 2;
      this.buddhaO.init(buddhaStartX, buddhaStartY, imageRepository.buddha.width,
        imageRepository.buddha.height);

      return true;
    } else {
      return false;
    }
  };

  // Start the animation loop
  this.start = function() {
    this.buddhaO.draw();

    //this.obstacles.draw();
    animate();
  };
}

/**
 * The animation loop. Calls the requestAnimationFrame shim to
 * optimize the game loop and draws all game objects. This
 * function must be a gobal function and cannot be within an
 * object.
 */
function animate() {
  requestAnimFrame(animate);
  game.background.draw();
  game.obstaclePool.animate();

  //game.obstacles.draw();
  game.buddhaO.move();
}

// The keycodes that will be mapped when a user presses a button.
// Original code by Doug McInnes
KEY_CODES = {
  32: 'space',
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down'
}

// Creates the array to hold the KEY_CODES and sets all their values
// to false. Checking true/flase is the quickest way to check status
// of a key press and which one was pressed when determining
// when to move and which direction.
KEY_STATUS = {};
for (code in KEY_CODES) {
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
}
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
}

/**
 * requestAnim shim layer by Paul Irish
 * Finds the first API that works to optimize the animation loop,
 * otherwise defaults to setTimeout().
 */
window.requestAnimFrame = (function() {
  return window.requestAnimationFrame       ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame    ||
  window.oRequestAnimationFrame      ||
  window.msRequestAnimationFrame     ||
			function(/* function */ callback, /* DOMElement */ element) {
  window.setTimeout(callback, 1000 / 60);
			};
})();
