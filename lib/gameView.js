(function (){
  if(window.Asteroids === undefined) {
    window.Asteroids = {};
  }
  
  var GameView = Asteroids.GameView = function(game, context) {
    this.game = game;
    this.ctx = context;
	this.ship = this.game.ships[0];
  }
  
  GameView.prototype.opener = function(){
  	  
  }
  
  GameView.prototype.start = function() {
    var that = this;
    setInterval(function(){
      that.game.step();
      that.game.draw(that.ctx);
    }, 20);    
  }
  

  
})();