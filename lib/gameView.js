(function (){
  if(window.Asteroids === undefined) {
    window.Asteroids = {};
  }
  
  var GameView = Asteroids.GameView = function(game, context) {
    this.game = game;
    this.ctx = context;
	this.ship = this.game.ships[0];
  }
  
  GameView.DIRS = {
  	'i' : [0, -1],
	'j' : [-1, 0],
	'k' : [0, 1],
	'l' : [1, 0]
  }
  
  GameView.prototype.start = function() {
    var that = this;
    setInterval(function(){
      that.game.step();
      that.game.draw(that.ctx);
    }, 20);
	
	this.bindKeyHandlers();    
  }
  
  GameView.prototype.bindKeyHandlers = function(){
	var ship = this.ship;
  	Object.keys(GameView.DIRS).forEach(function(k){
  		var dir = GameView.DIRS[k];
		key(k, function(){ 
			ship.power(dir); 
		});
  	})
	
	key('space', function() {ship.fireBullet()});
  }
  
})();