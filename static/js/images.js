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
  this.bigheart = new Image();

  var numImages = 17;
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

  this.bigheart.onload = function() {
    imageLoaded();
  };


  // Set images src
  this.background.src = 'static/img/starland.png';
  this.buddha.src = 'static/img/buddhaface.png';
  this.buddhasad.src = 'static/img/buddhaface_sad.png';
  this.buddhaO.src = 'static/img/buddhaface_O.png';
  this.flameright.src = 'static/img/fire_right.png';
  this.flameleft.src = 'static/img/fire_left.png';
  this.obstacle01.src = 'static/img/obst_1.png';
  this.obstacle02.src = 'static/img/obst_2.png';
  this.obstacle03.src = 'static/img/obst_3.png';
  this.obstacle04.src = 'static/img/obst_4.png';
  this.obstacle05.src = 'static/img/obst_5.png';
  this.star01.src = 'static/img/star_1.png';
  this.star02.src = 'static/img/star_2.png';
  this.star03.src = 'static/img/star_3.png';
  this.star04.src = 'static/img/star_4.png';
  this.star05.src = 'static/img/star_5.png';
  this.bigheart.src = 'static/img/bigheart.png';


};

function obstPic() {
  var obstpool = [];
  var picObject = 0;
  var picType = 0;
  // wich kind of obstacle (40%: stone, 40%: good, 20%: special)
  var pic = getRandomInt(0, 99);
  if (pic < 45) {
    // stone
    obstpool = [imageRepository.obstacle01,
      imageRepository.obstacle02,
      imageRepository.obstacle03,
      imageRepository.obstacle04,
      imageRepository.obstacle05];
    picObject = obstpool[getRandomInt(0, obstpool.length - 1)];
    picType = 2;
  } else if (pic >= 45 && pic < 90) {
    // star
    obstpool = [imageRepository.star01,
      imageRepository.star02,
      imageRepository.star03,
      imageRepository.star04,
      imageRepository.star05];
    picObject = obstpool[getRandomInt(0, obstpool.length - 1)];
    picType = 3;
  } else {
    //special
    obstpool = [imageRepository.bigheart];
    picObject = obstpool[getRandomInt(0, obstpool.length - 1)];
    picType = 4;
  }
  return [picObject, picType];
}

function stonePic() {
  var pool = [imageRepository.obstacle01,
    imageRepository.obstacle02,
    imageRepository.obstacle03,
    imageRepository.obstacle04,
    imageRepository.obstacle05];
  var pic = getRandomInt(0, pool.length - 1);
  return [pool[pic], 2];
}

function starPic() {
  var pool = [imageRepository.star01,
    imageRepository.star02,
    imageRepository.star03,
    imageRepository.star04,
    imageRepository.star05];
  var pic = getRandomInt(0, pool.length - 1);
  return [pool[pic], 3];
}

function specialPic() {
  var pool = [imageRepository.bigheart];
  var typ = [4];
  var pic = getRandomInt(0, pool.length - 1);
  return [pool[pic], typ[pic]];
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
