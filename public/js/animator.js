var Animator = function(){
	this.current = 0;
	this.max = 100;
	this.min = 0;
	this.end = 100;
	return this;
};

Animator.prototype = {

	animate: function(obj){
		for(item in obj){
			if(this.hasOwnProperty(item)){
				this[item] = obj[item];
			}
		}
		return this;
	},

	increase: function(){
		var calculatedVal = this.current;
		if(calculatedVal >= this.end){
			calculatedVal = this.end;
		} else {
			calculatedVal = (calculatedVal += Math.ceil((this.end - this.current) / 25));
		}

		this.current = calculatedVal;
		return this.current;
	},

	decrease: function(){

	}
};


module.exports = Animator;
