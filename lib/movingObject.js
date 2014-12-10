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

  MovingObject.prototype.move = function() {
	  if(this instanceof Asteroids.Asteroid){
	  	this.pos[0] += this.vel[0];  
	  	this.pos[1] += this.vel[1];
	  	this.pos = this.game.wrap(this.pos);
	  }
  };
  
  MovingObject.prototype.isCollideWith = function(otherObject){
	var sumRadii = this.radius + otherObject.radius;
	var dist = Asteroids.Util.distance(this.pos, otherObject.pos);
	return dist < sumRadii && this.pos !== otherObject.pos;
  };
  
  MovingObject.prototype.collideWith = function(otherObject){
	  // var that = this
	  // this.game.remove(that);
	  // this.game.remove(otherObject);
  }
  


})();

