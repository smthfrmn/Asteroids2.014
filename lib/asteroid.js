(function (){
  if(window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  
  var Asteroid = Asteroids.Asteroid = function(pos, game){
    var vLength = 5;
    var vel = Asteroids.Util.randomVec(vLength);
    Asteroids.MovingObject.call(this, 
      {
        pos: pos, 
        vel: vel, 
        radius: Asteroid.RADIUS, 
        color: Asteroid.COLOR,
        game: game
      }
    );
  }
  
  Asteroid.COLOR = "#660066";
  Asteroid.RADIUS = 10;
  
  Asteroids.Util.inherits(Asteroids.MovingObject, Asteroid);
  
  Asteroid.prototype.collideWith = function(otherObject){
	  if(otherObject instanceof Asteroids.Ship){
		  otherObject.relocate();
	  }
  }
  
 
  
})();