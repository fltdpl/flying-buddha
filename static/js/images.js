// Object with all images
var imageRepository = new function() {
  // Define images
  this.background = new Image();
  this.background_static = new Image();
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
  this.bigstar = new Image();
  this.imgplus10 = new Image();
  this.imgplus100 = new Image();
  this.imgplusheart = new Image();
  this.imgstarfield = new Image();
//new ghosts:
  this.ghostoldbuddha = new Image();
  this.ghosteye = new Image();
  this.ghostcat = new Image();
  this.ghostskull = new Image();
  this.ghostnative = new Image();
  this.ghoststier = new Image();
  this.ghostpastafari = new Image();
  this.ghostlol = new Image();
  this.ghostclippy = new Image();
  this.ghostpac = new Image();
  this.ghostthisman = new Image();

  var numImages = 34;
  var numLoaded = 0;

  function imageLoaded() {
    numLoaded++;
    if (numLoaded === numImages) {
      window.init();
      loading.loadPic = true;
      loading.ready();
    }
  }

  this.background.onload = function() {
    imageLoaded();
  };
  this.background_static.onload = function() {
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
  this.bigstar.onload = function() {
    imageLoaded();
  };
  this.imgplus10.onload = function() {
    imageLoaded();
  };
  this.imgplus100.onload = function() {
    imageLoaded();
  };
  this.imgplusheart.onload = function() {
    imageLoaded();
  };
  this.imgstarfield.onload = function() {
    imageLoaded();
  };
  this.ghostoldbuddha.onload = function() {
    imageLoaded();
  };
  this.ghosteye.onload = function() {
    imageLoaded();
  };
  this.ghostcat.onload = function() {
    imageLoaded();
  };
  this.ghostskull.onload = function() {
    imageLoaded();
  };
  this.ghostnative.onload = function() {
    imageLoaded();
  };
  this.ghoststier.onload = function() {
    imageLoaded();
  };
  this.ghostpastafari.onload = function() {
    imageLoaded();
  };
  this.ghostlol.onload = function() {
    imageLoaded();
  };
  this.ghostclippy.onload = function() {
    imageLoaded();
  };
  this.ghostpac.onload = function() {
    imageLoaded();
  };
  this.ghostthisman.onload = function() {
    imageLoaded();
  };



  // Set images src
  this.background.src = 'static/img/starland.png';
  this.background_static.src = 'static/img/bg_static.png'
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
  this.bigstar.src = 'static/img/bigstar.png';
  this.imgplus10.src = 'static/img/plus10_sprite.png';
  this.imgplus100.src = 'static/img/plus100_sprite.png';
  this.imgplusheart.src = 'static/img/plusheart_sprite.png';
  this.imgstarfield.src = 'static/img/starfield.png';
  this.ghostoldbuddha.src = 'static/img/ghost_00_oldbuddha.png';
  this.ghosteye.src = 'static/img/ghost_01_eye.png';
  this.ghostcat.src = 'static/img/ghost_02_cat.png';
  this.ghostskull.src = 'static/img/ghost_03_skull.png';
  this.ghostnative.src = 'static/img/ghost_04_native.png';
  this.ghoststier.src = 'static/img/ghost_05_stier.png';
  this.ghostpastafari.src = 'static/img/ghost_06_pastafari.png';
  this.ghostlol.src = 'static/img/ghost_07_lol.png';
  this.ghostclippy.src = 'static/img/ghost_08_clippy.png';
  this.ghostpac.src = 'static/img/ghost_09_pac.png';
  this.ghostthisman.src = 'static/img/ghost_10_thisman.png';

};


function stonePic() {
  var pool = [imageRepository.obstacle01,
    imageRepository.obstacle02,
    imageRepository.obstacle03,
    imageRepository.obstacle04,
    imageRepository.obstacle05];
  var pic = getRandomInt(0, pool.length - 1);
  return pool[pic];
}

function starPic() {
  var pool = [imageRepository.star01,
    imageRepository.star02,
    imageRepository.star03,
    imageRepository.star04,
    imageRepository.star05];
  var pic = getRandomInt(0, pool.length - 1);
  return pool[pic];
}

function sprite(options) {

  var that = {};
  that.frameIndex = 0,
    that.alive = false,
    that.x = 0,
    that.y = 0,
    that.tickCount = 0,
    that.ticksPerFrame = options.ticksPerFrame || 0,
    that.numberOfFrames = options.numberOfFrames || 1;

  that.context = options.context;
  that.width = options.width;
  that.height = options.height;
  that.image = options.image;

  that.spawn = function(x, y) {
    that.x = x;
    that.y = y;
    that.alive = true;
  };

  that.update = function() {
    that.tickCount += 1;
    if (that.tickCount > that.ticksPerFrame) {
      that.tickCount = 0;

      // If the current frame index is in range
      if (that.frameIndex < that.numberOfFrames - 1) {
        // Go to the next frame
        that.frameIndex += 1;
      } else {
        that.frameIndex = 0;
        return true;
      }
    }
  };


  that.render = function(x, y) {
    // Clear the canvas
    //that.clear(x, y);

    // Draw the animation
    that.context.drawImage(
      that.image,
      that.frameIndex * that.width / that.numberOfFrames,
      0,
      that.width / that.numberOfFrames,
      that.height,
      x,
      y,
      that.width / that.numberOfFrames,
      that.height);
  };

  that.clear = function(x, y) {
    clearx = x - 1;
    cleary = y - 1;
    clearwidth = that.width / that.numberOfFrames + 2;
    clearheight = that.height + 2;
    that.context.clearRect(clearx, cleary, clearwidth, clearheight);
  };

  return that;
}
