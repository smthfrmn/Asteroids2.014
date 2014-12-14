(function () {
	if(window.Asteroids === undefined) {
		window.Asteroids = {};
	}
	

	var Bullet = Asteroids.Bullet = function (vel, pos, game) {
		Asteroids.MovingObject.call(this, {
			pos: pos,
	        vel: [vel[0] * 10 , vel[1] * 10],
			radius: Bullet.RADIUS,
			color: Bullet.COLOR,
			game: game
		})
	}
	
	Bullet.RADIUS = 2;
	Bullet.COLOR = '#FFFFFF';

	Asteroids.Util.inherits(Asteroids.MovingObject, Bullet);
	
	Bullet.prototype.isWrappable = false;

})();