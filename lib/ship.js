(function () {
	if(window.Asteroids === undefined) {
		window.Asteroids = {};
	}
	

	var Ship = Asteroids.Ship = function (game) {
		
		
		Asteroids.MovingObject.call(this, {
			pos: [500, 300],
			vel: [0,0],
			radius: Ship.RADIUS,
			color: Ship.COLOR,
			game: game
		})
		
		this.hasMoved = false
		// this.ori = 0
		this.ori = Math.PI / 2
		// this.scaledOri = this.scaleOri(this.ori, 20);
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
	
	Ship.prototype.relocate = function(){
		this.pos = game.randomPosition();
		this.vel = [0,0];
	}
	
	// Ship.prototype.scaleOri = function(ori, scale){
	// 	var oriValue = Ship.ORI[ori]
	// 	if(ori === 'sw' || ori === 'se' || ori === 's' ){
	// 		return [oriValue[0] * scale, oriValue[1] * scale * 2]
	// 	} else {
	// 		return [oriValue[0] * scale, oriValue[1] * scale]
	// 	}
	// }
	
	
	
	// Ship.prototype.power = function(k){
	// 	if(k === 'up'){
	// 		this.hasMoved = true;
	// 		this.topOfCircle = Asteroids.Util.addVel(this.pos, this.vel)
	// 	} else if (k === 'right') {
	// 		this.ori = (this.ori + 1) % 8
	// 		this.scaledOri = this.scaleOri(this.ori,  20);
	// 	} else if (k === 'left') {
	// 		this.ori -= 1;
	// 		if (this.ori < 0) {
	// 			this.ori = 7;
	// 		}
	// 		this.scaledOri = this.scaleOri(this.ori, 20);
	// 	}
	//
	// 	this.vel = Ship.ORI[this.ori]
	// }
	
	Ship.prototype.scaledOri = function(){
		return [this.vel[0], this.vel[1]]
	}
	
	Ship.prototype.power = function(k){
		if(k === 'up'){
			this.hasMoved = true;
			this.topOfCircle = Asteroids.Util.addVel(this.pos, this.vel)
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
		
		this.vel = [Math.cos(this.ori - (Math.PI)) * 10, Math.sin(this.ori - (Math.PI)) * 10]
		this.pos = Asteroids.Util.addVel(this.pos, this.scaledOri());
		
	}
	
	Ship.prototype.fireBullet = function(){
		if(!this.hasMoved){
			return
		}
		var pos = Asteroids.Util.addVel(this.pos, this.vel);
		var bullet = new Asteroids.Bullet(this.vel, pos, this.game);
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
		ctx.moveTo(0, 0);
		ctx.lineTo(-20, 20);
		ctx.lineTo(20, 20);
		ctx.closePath();
		ctx.stroke();
		ctx.restore();
		
	}

})();