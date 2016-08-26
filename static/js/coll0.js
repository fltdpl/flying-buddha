
function collisionTest(x1, y1, w1, x2, y2, w2)
{
  /*
  *  CircleCircleCollision
  * -----------------------
  * x1, y1 = x and y coordinates of object 1
  * w1     = width of object 1
  * x2, y2 = x and y coordinates of object 2
  * w2     = width of object 2
  *
  * distX = x1 - x2
  * distY = y1 - y2
	* dist = sqrt((distX * distX) + (distY * distY))
	* return dist <= (radius1 + radius2)
  *
  * Optimized (without sqrt):
  * squaredist = (distX * distX) + (distY * distY)
  * return squaredist <= (R1 + R2) * (R1 + R2)
  */

  var radius1 = w1 / 2;
  var radius2 = w2 / 2;
  var distX = x1 - x2;
  var distY = y1 - y2;

  var squaredist = (distX * distX) + (distY * distY);
  var squaresumr = (radius1 + radius2) * (radius1 + radius2);

  if (squaredist <= squaresumr) {
    return true;

  } else {
    return false;

  }
}
