(function () {
  if(window.Asteroids === undefined) {
    window.Asteroids = {};
  }
  
  var Util = Asteroids.Util = {};
  
  Util.inherits = function(superClass, subClass) {
    function Surrogate() { this.constructor = subClass};
    Surrogate.prototype = superClass.prototype;
    subClass.prototype = new Surrogate();
  }
  
  Util.randomVec = function(vLength){
    return [Math.random() * vLength, Math.random() * vLength]
  }
  
  Util.distance = function(pos1, pos2){
	  var a = Math.abs(pos1[0] - pos2[0]);
	  var b = Math.abs(pos1[1] - pos2[1]);
	  return Math.sqrt((a * a) + (b * b));
  }
  
  Util.addVel = function(vel1, vel2) {
  	return [vel1[0] + vel2[0], vel1[1] + vel2[1]]
  }
  
  Util.samePos = function(pos1, pos2){
	  return (pos1[0] === pos2[0]) && (pos1[1] === pos2[1]);
  }

})();