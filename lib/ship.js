(function () {
	if(window.Asteroids === undefined) {
		window.Asteroids = {};
	}

	var Ship = Asteroids.Ship = function (pos, game) {
		Asteroids.MovingObject.call(this, {
			pos: pos,
			vel: 0,
			radius: Ship.RADIUS,
			color: Ship.COLOR,
			game: game
		})
	}
	
	Ship.prototype.relocate = function(){
		this.pos = game.randomPosition();
		this.vel = 0;
	}
	
	Ship.prototype
  

})();