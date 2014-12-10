(function () {
	if(window.Asteroids === undefined) {
		window.Asteroids = {};
	}
	

	var Ship = Asteroids.Ship = function (pos, game) {
		Asteroids.MovingObject.call(this, {
			pos: pos,
			vel: [0,0],
			radius: Ship.RADIUS,
			color: Ship.COLOR,
			game: game
		})
	}
	
	Ship.COLOR = "#4d5d53";
	Ship.RADIUS = 20;
	
	Asteroids.Util.inherits(Asteroids.MovingObject, Ship);
	
	Ship.prototype.relocate = function(){
		this.pos = game.randomPosition();
		this.vel = [0,0];
	}
	
	Ship.prototype.power = function(impulse){
		this.vel = Asteroids.Util.addVel(this.vel, impulse);
	}
	
	Ship.prototype.fireBullet = function(){
		debugger
		var pos = Asteroids.Util.addVel(this.pos, this.vel);
		var bullet = new Asteroids.Bullet(this.vel, pos, this.game);
		this.game.addObj(bullet);
	}
	
	
  

})();