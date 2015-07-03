// Object with all images
var imageRepository = new function() {
  // Define images
  this.background = new Image();
  this.buddha = new Image();
  this.buddhasad = new Image();
  this.flameright = new Image();
  this.flameleft = new Image();
  this.obstacle01 = new Image();
  this.obstacle02 = new Image();

  var numImages = 5;
  var numLoaded = 0;

  function imageLoaded() {
    numLoaded++;
    if (numLoaded === numImages) {
      window.init();
    }
  }

  this.background.onload = function() {
    imageLoaded();
  }

  this.buddha.onload = function() {
    imageLoaded();
  }

  this.buddhasad.onload = function() {
    imageLoaded();
  }

  this.flameright.onload = function() {
    imageLoaded();
  }

  this.flameleft.onload = function() {
    imageLoaded();
  }

  this.obstacle01.onload = function() {
    imageLoaded();
  }

  this.obstacle02.onload = function() {
    imageLoaded();
  }

  // Set images src
  this.background.src = 'images/starland.png';
  this.buddha.src = 'images/buddhaface.png';
  this.buddhasad.src = 'images/buddhaface_sad.png';
  this.flameright.src = 'images/fire_right.png'
  this.flameleft.src = 'images/fire_left.png'
  this.obstacle01.src = 'images/ball_2.png'
  this.obstacle02.src = 'images/obstacle_02.png'

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
  }

  return that;
}
