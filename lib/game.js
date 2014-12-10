(function (){
  if(window.Asteroids === undefined) {
    window.Asteroids = {};
  }
  
  var Game = Asteroids.Game = function (){
	this.bullets = [];
    this.asteroids = this.addAsteroids();
	this.ships = [];
	this.addObj(new Asteroids.Ship(this.randomPosition(), this));
  };
  
  Game.DIM_X = 800;
  Game.DIM_Y = 800;
  Game.NUM_ASTEROIDS = 0;
  
  Game.prototype.addObj = function(obj){
	  if( obj instanceof Asteroids.Asteroid){
	  	 this.asteroids.push(obj)
	  } else if (obj instanceof Asteroids.Bullet){
	  	this.bullets.push(obj)
	  } else if (obj instanceof Asteroids.Ship){
		  this.ships.push(obj)
	  } else {
	  		alert("ugh")
	  }
  }
  
  Game.prototype.remove = function(obj){
	  if( obj instanceof Asteroid){
	  	 this.asteroids = this.asteroids.filter(function(el){
	  	 	return el !== obj
	  	 })
	  } else if (obj instanceof Bullet){
 	  	 this.bullets = this.bullets.filter(function(el){
 	  	 	return el !== obj
 	  	 })
	  } else if (obj instanceof Ship){
 	  	 this.ships = this.ships.filter(function(el){
 	  	 	return el !== obj
 	  	 })
	  } else {
	  		alert("ugh")
	  }
  }
  
  
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
  	this.allObjects().forEach(function(o1){
  		game.allObjects().forEach(function(o2){
			if(o1 === o2){
				return
			}
  			if(o1.isCollidedWith(o2)){
				o1.collideWith(o2);
  			}
  		})
  	})
  }
  
  Game.prototype.step = function(){
	  this.moveObjects();
	  this.checkCollision();
  }

  
  Game.prototype.allObjects = function(){
	 return this.asteroids.concat(this.bullets).concat(this.ships)
  }
  
  Game.prototype.isOutOfBounds = function(pos){
	  var x = pos[0];
	  var y = pos[1];
	  
	  var xBool = (x < 0) || (x > Game.DIM_X)
	  var yBool = (y < 0) || (y > Game.DIM_Y)
	  
	  return xBool && yBool;
  }
  
 
  
})();