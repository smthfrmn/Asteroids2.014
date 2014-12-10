(function (){
  if(window.Asteroids === undefined) {
    window.Asteroids = {};
  }
  
  var Game = Asteroids.Game = function (){
    this.asteroids = this.addAsteroids();
	this.ship = new Asteroids.Ship(this.randomPosition(), this);
  };
  
  Game.DIM_X = 800;
  Game.DIM_Y = 800;
  Game.NUM_ASTEROIDS = 5;
  
  
  Game.prototype.addAsteroids = function() {
    var asteroids = [];
    for(var i = 0; i < Game.NUM_ASTEROIDS; i++){
      asteroids.push(new Asteroids.Asteroid(this.randomPosition(), this));
    }
    return asteroids;
  }

  Game.prototype.randomPosition = function(){
    return [Math.random() * Game.DIM_X, Math.random() * Game.DIM_Y];
  }
  
  Game.prototype.draw = function(ctx){
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y); 
    this.allObjects().forEach(function(object){
      object.draw(ctx);
    })
  }
  
  Game.prototype.moveObjects = function() {
    this.allObjects().forEach(function(object){
		object.move();
    })
  }
  
  Game.prototype.wrap = function(pos) {
    return [pos[0] % Game.DIM_X, pos[1] % Game.DIM_Y]; 
  }
  
  Game.prototype.checkCollision = function(){
	var game = this;
  	this.allObjects().forEach(function(a1){
  		game.asteroids.forEach(function(a2){
  			if(a1.isCollideWith(a2)){
  				a1.collideWith(a2);
  			}
  		})
  	})
  }
  
  Game.prototype.step = function(){
	  this.moveObjects();
	  this.checkCollision();
  }
  
  Game.prototype.remove = function(asteroid){
  	this.asteroids = this.asteroids.filter(function (el) {
  		return !Asteroids.Util.samePos(asteroid.pos, el.pos)
  	})
  }
  
  Game.prototype.allObjects = function(){
	  var result = [];
	  result.push(this.ship)
	  return result.concat(this.asteroids);
  }
  
 
  
})();