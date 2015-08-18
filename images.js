// Object with all images
var imageRepository = new function() {
  // Define images
  this.background = new Image();
  this.buddha = new Image();
  this.buddhasad = new Image();
  this.buddhaO = new Image();
  this.flameright = new Image();
  this.flameleft = new Image();
  this.obstacle01 = new Image();
  this.obstacle02 = new Image();
  this.obstacle03 = new Image();
  this.obstacle04 = new Image();
  this.obstacle05 = new Image();
  this.star01 = new Image();
  this.star02 = new Image();
  this.star03 = new Image();
  this.star04 = new Image();
  this.star05 = new Image();

  var numImages = 11;
  var numLoaded = 0;

  function imageLoaded() {
    numLoaded++;
    if (numLoaded === numImages) {
      window.init();
    }
  }

  this.background.onload = function() {
    imageLoaded();
  };

  this.buddha.onload = function() {
    imageLoaded();
  };

  this.buddhasad.onload = function() {
    imageLoaded();
  };

  this.buddhaO.onload = function() {
    imageLoaded();
  };

  this.flameright.onload = function() {
    imageLoaded();
  };

  this.flameleft.onload = function() {
    imageLoaded();
  };

  this.obstacle01.onload = function() {
    imageLoaded();
  };

  this.obstacle02.onload = function() {
    imageLoaded();
  };

  this.obstacle03.onload = function() {
    imageLoaded();
  };

  this.obstacle04.onload = function() {
    imageLoaded();
  };

  this.obstacle05.onload = function() {
    imageLoaded();
  };

  this.star01.onload = function() {
    imageLoaded();
  };

  this.star02.onload = function() {
    imageLoaded();
  };

  this.star03.onload = function() {
    imageLoaded();
  };

  this.star04.onload = function() {
    imageLoaded();
  };

  this.star05.onload = function() {
    imageLoaded();
  };


  // Set images src
  this.background.src = 'images/starland.png';
  this.buddha.src = 'images/buddhaface.png';
  this.buddhasad.src = 'images/buddhaface_sad.png';
  this.buddhaO.src = 'images/buddhaface_O.png';
  this.flameright.src = 'images/fire_right.png';
  this.flameleft.src = 'images/fire_left.png';
  this.obstacle01.src = 'images/obst_1.png';
  this.obstacle02.src = 'images/obst_2.png';
  this.obstacle03.src = 'images/obst_3.png';
  this.obstacle04.src = 'images/obst_4.png';
  this.obstacle05.src = 'images/obst_5.png';
  this.star01.src = 'images/star_1.png';
  this.star02.src = 'images/star_2.png';
  this.star03.src = 'images/star_3.png';
  this.star04.src = 'images/star_4.png';
  this.star05.src = 'images/star_5.png';

};

function obstaclePic() {
  var obstpool = new Array(imageRepository.obstacle01,
    imageRepository.obstacle02,
    imageRepository.obstacle03,
    imageRepository.obstacle04,
    imageRepository.obstacle05);
  var pic = getRandomInt(0, obstpool.length - 1);
  return obstpool[pic];
}

function starPic() {
  var starpool = new Array(imageRepository.star01,
    imageRepository.star02,
    imageRepository.star03,
    imageRepository.star04,
    imageRepository.star05);
  var pic = getRandomInt(0, starpool.length - 1);
  return starpool[pic];
}

function sprite(options) {

  var that = {};
  frameIndex = 0,
    tickCount = 0,
    ticksPerFrame = options.ticksPerFrame || 0,
    numberOfFrames = options.numberOfFrames || 1;

  that.context = options.context;
  that.width = options.width;
  that.height = options.height;
  that.image = options.image;

  that.update = function() {
    tickCount += 1;
    if (tickCount > ticksPerFrame) {
      tickCount = 0;

      // If the current frame index is in range
      if (frameIndex < numberOfFrames - 1) {
        // Go to the next frame
        frameIndex += 1;
      } else {
        frameIndex = 0;
      }
    }
  };

  that.render = function(x, y) {
    // Clear the canvas
    //that.clear(x, y);

    // Draw the animation
    that.context.drawImage(
      that.image,
      frameIndex * that.width / numberOfFrames,
      0,
      that.width / numberOfFrames,
      that.height,
      x,
      y,
      that.width / numberOfFrames,
      that.height);
  };

  that.clear = function(x, y) {
    clearx = x - 1;
    cleary = y - 1;
    clearwidth = that.width / numberOfFrames + 2;
    clearheight = that.height + 2;
    that.context.clearRect(clearx, cleary, clearwidth, clearheight);
  };

  return that;
}
