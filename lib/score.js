(function (){
  if(window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  var Score = Asteroids.Score = function(){
  	this.points = 0
	this.lives = 3
  }
  
  Score.prototype.draw = function(ctx){
	  ctx.font = "20px OCR A Std";
	  ctx.fillStyle = "#FFFFFF";
	  var score = 'SCORE: ' + this.points;
	  ctx.fillText(score, 15, 35);
	  ctx.fillText('LIVES: '+ this.lives, 15, 65);
  }

  
})();