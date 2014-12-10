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
  
  Asteroids.Util.inherits(Asteroids.MovingObject, Asteroids.Asteroid);
  
})();