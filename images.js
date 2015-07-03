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
  this.flameright.src = 'images/flame_r1.png'
  this.flameleft.src = 'images/flame_l1.png'
  this.obstacle01.src = 'images/ball_2.png'
  this.obstacle02.src = 'images/obstacle_02.png'

}
