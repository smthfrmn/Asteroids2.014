(function (){
  if(window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function (){
  	this.score = new Asteroids.Score();
  	this.levelingUp = true;
	this.opening = true;
  	this.levelingUpCounter = 5;
  	this.ships = [];
  	this.addObj(new Asteroids.Ship(this));
	this.bullets = [];
    this.asteroids = this.addAsteroids();
  };

  Game.DIM_X = 1000;
  Game.DIM_Y = 600;

  Game.prototype.addObj = function(obj){
	  if( obj instanceof Asteroids.Asteroid){
	  	 this.asteroids.push(obj);
	  } else if (obj instanceof Asteroids.Bullet){
	  	this.bullets.push(obj);
	  } else if (obj instanceof Asteroids.Ship){
		  this.ships.push(obj);
	  } else {
	  		alert("ugh");
	  }
  };

  Game.prototype.remove = function(obj){
	  if( obj instanceof Asteroids.Asteroid){
	  	 this.asteroids = this.asteroids.filter(function(el){
	  	 	return el !== obj;
	  	 });
	  } else if (obj instanceof Asteroids.Bullet){
 	  	 this.bullets = this.bullets.filter(function(el){
 	  	 	return el !== obj;
 	  	 });
	  } else if (obj instanceof Asteroids.Ship){
		  this.ships = [];
	  } else {
	  		alert("ugh");
	  }
  };

  Game.prototype.removeLife = function(){
	if(this.ships[0].reset){
	  return;
	}
  	this.score.lives -= 1;
	var ship = this.ships[0];
	ship.restart('lostlife');
  };

  Game.prototype.addPoints = function(){
  		this.score.points += this.score.level * 2;
  };

  Game.prototype.addAsteroids = function() {
    var asteroids = [];
	var numAsteroids = this.score.level * 3;
    for(var i = 0; i < numAsteroids; i++){
      asteroids.push(new Asteroids.Asteroid(this.randomPosition(), this));
    }
    return asteroids;
  };

  Game.prototype.randomPosition = function(){
    return [Math.random() * Game.DIM_X, Math.random() * Game.DIM_Y];
  };

  Game.prototype.opener =  function(){
	ctx.font = "80px OCR A Std";
	ctx.fillStyle = "#FFFFFF";
	ctx.fillText('ASTEROIDS2.016', 100, 275);
	ctx.font = '25px OCR A Std';
	ctx.fillText('up arrow : power up', 325, 400);
	ctx.fillText('-> : turn right', 325, 430);
	ctx.fillText('<- : turn left', 325, 460);
	ctx.fillText('space bar: shoot', 325, 490);
  };

  Game.prototype.draw = function(ctx, state){
	ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
	ctx.drawImage(img, 0, 0);

  	if(state === 'opener'){
		this.opener();
  	} else {
		this.score.draw(ctx);
		this.allObjects().forEach(function(object){
		  object.draw(ctx);
		});
	}
  };

  Game.prototype.moveObjects = function() {
    this.allObjects().forEach(function(object){
		object.move();
    });
  };

  Game.prototype.wrap = function(pos) {
	  return [wrap(pos[0], Game.DIM_X), wrap(pos[1], Game.DIM_Y)];

	  function wrap(coord, max){
		  if (coord < 0){
			  return max - (coord % max);
		  } else if (coord > max) {
			  return coord % max;
		  } else {
		  	return coord;
		  }
	  }
  };

  Game.prototype.checkCollision = function(){
	if(this.ships[0].reset){
		return;
	}

	if(this.levelingUpCounter > 0){
		this.levelingUpCounter -= 1;
		return;
	} else {
		this.levelingUp = false;
	}

	var game = this;
  	this.allObjects().forEach(function(o1){
  		game.allObjects().forEach(function(o2){
			if(o1 === o2){
				return;
			}
  			if(o1.isCollidedWith(o2)){
				o1.collideWith(o2);
  			}
  		});
  	});
  };

  Game.prototype.step = function(){
	  this.checkLevelUp();
	  this.checkGameOver();
	  this.moveObjects();
	  this.checkCollision();
  };


  Game.prototype.allObjects = function(){
	 return this.asteroids.concat(this.bullets).concat(this.ships);
  };

  Game.prototype.isOutOfBounds = function(pos){
	  var x = pos[0];
	  var y = pos[1];

	  var xBool = (x < 0) || (x > Game.DIM_X);
	  var yBool = (y < 0) || (y > Game.DIM_Y);

	  return xBool || yBool;
  };

  Game.prototype.checkLevelUp = function(){

	  if(this.asteroids.length === 0){
		  var ship = this.ships[0];
		  ship.restart('newlevel');
		  this.levelingUp = true;
		  this.levelingUpCounter = 5;
		  this.score.level += 1;
		  this.asteroids = this.addAsteroids();
	  }
  };

  Game.prototype.checkGameOver = function(){
	  if (this.score.lives <= 0){
		  return true;
	  }
	  return false;
  };

})();
