(function () {
	if(window.Asteroids === undefined) {
		window.Asteroids = {};
	}
	

	var Bullet = Asteroids.Bullet = function (vel, pos, game) {
		Asteroids.MovingObject.call(this, {
			pos: pos,
	        vel: vel,
			radius: Bullet.RADIUS,
			color: Bullet.COLOR,
			game: game
		})
	}
	
	Bullet.RADIUS = 20;
	Bullet.COLOR = '#000000';
	

	Asteroids.Util.inherits(Asteroids.MovingObject, Bullet);
	
	Bullet.prototype.collideWith = function(otherObject){
		var bullet = this;
		if( otherObject instanceof Asteroids.Asteroid){
			this.game.remove(otherObject);
			this.game.remove(bullet);
		}
	}

})();