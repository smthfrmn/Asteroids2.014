(function (){
  if(window.Asteroids === undefined) {
    window.Asteroids = {};
  }
  
  var GameView = Asteroids.GameView = function(game, context) {
    this.game = game;
    this.ctx = context;
	this.intervalId = null
	this.state = 'opener'
	this.openerCounter = 200
  }
  

  
  
  GameView.prototype.start = function() {
    var that = this;
	this.intervalId = setInterval(function(){
	  that.game.step();
	  that.game.draw(that.ctx, that.state);
	  if(that.game.levelingUp && !that.game.opening){
	  		  that.levelUp();
	  }
	  if(that.game.checkGameOver()){
	  		  that.gameOver();
	  }
	  
	  that.openerCounter -= 1;
	  if(that.openerCounter <= 0){
	  	that.state = 'notopening'
		that.game.opening = false;
	  }
	 }, 20);   
  }
  
  GameView.prototype.levelUp = function(){
	  ctx.font = "40px OCR A Std";
	  ctx.fillStyle = "#FFFFFF";
	  var level = this.game.score.level;
	  ctx.fillText('LEVEL: ' + level, 400, 250);
  }
  
  GameView.prototype.gameOver = function(){
	  clearInterval(this.intervalId);
	  ctx.drawImage(img, 0, 0);
	  ctx.font = "40px OCR A Std";
	  ctx.fillStyle = "#FFFFFF";
	  ctx.fillText('GAME OVER', 350, 300);
	  var score = 'SCORE: ' + this.game.score.points;
	  ctx.fillText(score, 350, 350);
	  
	  // ctx.lineWidth = 3
 // 	  ctx.strokeStyle = '#FFFFFF'
 // 	  ctx.strokeRect(375, 390, 200, 50)
 // 	  ctx.font = '20px OCR A Std'
	  // ctx.fillText('Play Again', 400, 425);
// 	  this.addMouseListener();
  }
  
  GameView.prototype.addMouseListener = function() {
	  var ctx = this.ctx
	  var view = this;
	  
	  canvas = document.getElementById('game-canvas')
	  
	  function playAgainClick(event){
		  var mousePos = [event.offsetX, event.offsetY];
		  var boundsBool = view.checkMouseLocation(mousePos);
		  if(boundsBool){
		  	  ctx.clearRect(0, 0, 1000, 600); 
		  	  ctx.drawImage(img, 0, 0);
			  canvas.removeEventListener('mousedown', playAgainClick);
			  view.start();
		  }
	  }
	  
	  canvas.addEventListener('mousedown', playAgainClick) 
  };
  
  GameView.PLAYAGAIN_DIMX = [375, 575]
  GameView.PLAYAGAIN_DIMY = [390, 440]
  
  GameView.prototype.checkMouseLocation = function(pos){
	  var xBool = pos[0] > GameView.PLAYAGAIN_DIMX[0] && pos[0] < GameView.PLAYAGAIN_DIMX[1];
	  var yBool = pos[1] > GameView.PLAYAGAIN_DIMY[0] && pos[1] < GameView.PLAYAGAIN_DIMY[1];
	  return xBool && yBool;
  }

  
})();