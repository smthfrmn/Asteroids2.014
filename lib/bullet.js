(function () {
	if(window.Asteroids === undefined) {
		window.Asteroids = {};
	}
	

	var Bullet = Asteroids.Bullet = function (vel, pos, game) {
		Asteroids.MovingObject.call(this, {
			pos: pos,
	        vel: [vel[0] * 1.5, vel[1] * 1.5],
			radius: Bullet.RADIUS,
			color: Bullet.COLOR,
			game: game
		})
	}
	
	Bullet.RADIUS = 2;
	Bullet.COLOR = '#FFFFFF';

	Asteroids.Util.inherits(Asteroids.MovingObject, Bullet);
	
	Bullet.prototype.isWrappable = false;
	
	Bullet.prototype.collideWith = function(otherObject){
		var bullet = this;
		if( otherObject instanceof Asteroids.Asteroid){
			this.game.remove(otherObject);
			this.game.remove(bullet);
		}
	}
	

})();