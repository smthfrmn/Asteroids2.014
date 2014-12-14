(function () {
	if(window.Asteroids === undefined) {
		window.Asteroids = {};
	}
	

	var Ship = Asteroids.Ship = function (game, reset) {
		
		Asteroids.MovingObject.call(this, {
			pos: [500, 300],
			vel: [0,0],
			radius: Ship.RADIUS,
			color: Ship.COLOR,
			game: game
		})

		this.resetCounter = 50;
		this.reset = true;
		this.velCounter = 0;
		this.hasMoved = false

		this.ori = Math.PI / 2
		this.topOfCircle = [this.pos[0], this.pos[1]];
		
		this.bindKeyHandlers();
	}
	
	Ship.COLOR = "#4d5d53";
	Ship.RADIUS = 20;
	
	Asteroids.Util.inherits(Asteroids.MovingObject, Ship);
	Ship.prototype.isWrappable = true;
	
	Ship.DIRS = {
	  	'up' : [0, -1],
		'right' : [1, 0],
		'down' : [0, 1],
		'left' : [-1, 0]
  	}
	
	pos = Math.sqrt(2) / 2
	
	Ship.ORI = {
		0 : [0,-1],
		1 : [pos, -pos],
		2 : [1,0],
		3 : [pos, pos],
		4 : [0,1],
		5 : [-pos, pos],
		6 : [-1,0],
		7 : [-pos, -pos]
	}
	
    Ship.prototype.bindKeyHandlers = function(){
  		var ship = this;
    	Object.keys(Ship.DIRS).forEach(function(k){
	  		key(k, function(){ 
	  			ship.power(k); 
	  		});
    	})
	
  		key('space', function() {ship.fireBullet()});
    }
	
	Ship.prototype.unbindKeyHandlers = function(){
		var ship = this;
		Object.keys(Ship.DIRS).forEach(function(k){
			key.unbind(k);
		})
		
		key.unbind('space');
	}
	
	Ship.prototype.relocate = function(){
		this.pos = game.randomPosition();
		this.vel = [0,0];
	}
	
	Ship.prototype.scaledOri = function(){
		return [this.vel[0], this.vel[1]]
	}
	
	Ship.prototype.restart = function(state){
		this.pos = [500, 300];
		this.vel = [0,0];
		this.ori = Math.PI / 2
		this.topOfCircle = [this.pos[0], this.pos[1]];
		this.reset = true;
		this.hasMoved = false;
		if(state === 'newlevel'){
			this.resetCounter = 100;
		} else {
			this.resetCounter = 50;
		}
		
	}
	
	Ship.prototype.power = function(k){
		if(this.reset){
			return
		}
		if(k === 'up'){
			this.hasMoved = true;
			this.topOfCircle = Asteroids.Util.addVel(this.pos, this.vel)
			this.velCounter = 2.2;
			this.vel = [Math.cos(this.ori - (Math.PI)), Math.sin(this.ori - (Math.PI))]
		} else if (k === 'right'){
			this.ori += (Math.PI) / 10
		} else if (k === 'left'){
			this.ori -= (Math.PI) / 10
		}
		
		if(this.ori > (2 * Math.PI)){
			this.ori = 0
		} 
		
		if(this.ori < 0){
			this.ori = (11 * Math.PI / 6)
		}
	}
	
	Ship.prototype.scaleVelocity = function(){
		var absX = Math.abs(this.vel[0]);
		var absY = Math.abs(this.vel[1]);
		if(!this.hasMoved){
			return
		} else if (absX < 0.5 && absY < 0.5) {
			this.vel = [this.vel[0] * 1.4, this.vel[1] * 1.4]
		} else {
			this.velCounter = this.velCounter * 8/9
			this.vel = [this.vel[0] * this.velCounter, this.vel[1] * this.velCounter];
		}
	}
	
	
	Ship.prototype.fireBullet = function(){
		if(!this.hasMoved){
			return
		}
		
		var vel = [Math.cos(this.ori - (Math.PI)), Math.sin(this.ori - (Math.PI))];
		var pos = Asteroids.Util.addVel(this.pos, vel);
		var bullet = new Asteroids.Bullet(vel, pos, this.game);
		this.game.addObj(bullet);
	}
	
	Ship.prototype.draw = function(ctx){
		var x = this.pos[0];
		var y = this.pos[1];
		ctx.save();
		ctx.translate(x, y);
		ctx.rotate((this.ori) - (Math.PI/2));
		
		ctx.strokeStyle = "#FFFFFF";
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(0, -15);
		ctx.lineTo(-10, 15);
		ctx.lineTo(10, 15);
		ctx.closePath();
		if(this.resetCounter > 0){
			if(this.resetCounter % 2 === 0){
				ctx.fillStyle = "#FFFFFF"
				ctx.fill()
			}
			this.resetCounter -= 1;
		} else {
			this.reset = false
			ctx.stroke();
		}
		
		ctx.restore();
	}

})();