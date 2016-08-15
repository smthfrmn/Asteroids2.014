(function (){
  if(window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function(pos, game, rad){
    var vLength = 3 ;
	var vel = Asteroids.Util.randomVec(vLength);
	var radius = rad;
	if(radius === undefined){
		radius = Asteroids.Util.randomRad();
	}
    Asteroids.MovingObject.call(this,
      {
        pos: pos,
        vel: vel,
        radius: radius,
        color: Asteroid.COLOR,
        game: game
      }

    );
  };

  Asteroid.COLOR = "#00FF7F";

  Asteroids.Util.inherits(Asteroids.MovingObject, Asteroid);

  Asteroid.prototype.collideWith = function(otherObject){

	  if(otherObject instanceof Asteroids.Ship){
		  this.game.removeLife();
	  } else if(otherObject instanceof Asteroids.Bullet){
		  var asteroid = this;
		  this.game.remove(otherObject);
		  this.game.addPoints();
		  this.game.remove(asteroid);
	  } else if (otherObject instanceof Asteroids.Asteroid){
		  this.collision(otherObject);
	  }
  };

  Asteroid.prototype.collision = function(otherAsteroid){

	  var vel = this.vel;
	  var oVel = otherAsteroid.vel;
	  this.vel = [vel[0] * -1, vel[1]];
	  otherAsteroid.vel = [oVel[0], oVel[1] * -1];
  };

})();
