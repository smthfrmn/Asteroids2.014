(function () {
  if(window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject = function (argsObject) {
    this.pos = argsObject['pos'];
    this.vel = argsObject['vel'];
    this.radius  = argsObject['radius'];
    this.color = argsObject['color'];
    this.game = argsObject['game'];
  
  }

  MovingObject.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
  
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );
  
    ctx.fill();
  };
  
  MovingObject.prototype.isWrappable = true;

  MovingObject.prototype.move = function() {
	var obj = this
	if(this instanceof Asteroids.Ship){
		this.pos = Asteroids.Util.addVel(obj.topOfCircle, obj.scaledOri);
	} 
	
	this.pos[0] += this.vel[0];  
	this.pos[1] += this.vel[1];
	var pos = this.pos
	if(this.game.isOutOfBounds(pos)){
		if(this.isWrappable){
			this.pos = this.game.wrap(pos);
		} else {
			this.game.remove(obj);
		}
	}
  };
  
  
  MovingObject.prototype.isCollidedWith = function(otherObject){
	var sumRadii = this.radius + otherObject.radius;
	var dist = Asteroids.Util.distance(this.pos, otherObject.pos);
	return dist < sumRadii;
  };
  
  MovingObject.prototype.collideWith = function(otherObject){

  };

})();

