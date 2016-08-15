(function () {
  if(window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  var Util = Asteroids.Util = {};

  Util.inherits = function(superClass, subClass) {
    function Surrogate() { this.constructor = subClass;}
    Surrogate.prototype = superClass.prototype;
    subClass.prototype = new Surrogate();
  };

  Util.randomVec = function(vLength){
	var signRand = Math.random() < 0.5 ? 1 : -1;
	var v1 = Math.random() * vLength;
	var v2 = Math.random() * vLength;
	var decider = Math.random();
	if(decider < 0.25){
		return [v1 * signRand, v2];
	} else if (decider >= 0.25 && decider < 0.5){
		return [v1, v2 * signRand];
	} else if (decider >= 0.5 && decider < 0.75){
		return [v1, v2];
	} else {
		return [v1 * signRand, v2 * signRand];
	}

  };

  Util.distance = function(pos1, pos2){
	  var a = Math.abs(pos1[0] - pos2[0]);
	  var b = Math.abs(pos1[1] - pos2[1]);
	  return Math.sqrt((a * a) + (b * b));
  };

  Util.addVel = function(vel1, vel2) {
  	return [vel1[0] + vel2[0], vel1[1] + vel2[1]];
  };

  Util.randomRad = function(){
  	return (Math.random() + 1) * (Math.random() + 1 * 15);
  };

  Util.averageVec = function(v1, v2){
	  var calculatedV1 = (v1[0] + v2[0]) / 2;
	  var calculatedV2 = (v1[1] + v2[1]) / 2;
	  return [calculatedV1, calculatedV2];
  };

})();
