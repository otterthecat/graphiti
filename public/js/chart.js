var Chart = function(){
	this.canvas = null;
	this.context = null;
	this.data = null;
	this.maxWidth = 100;
};


Chart.prototype = {

	use: function(obj){
		this.canvas = obj.canvas.element;
		this.context = obj.canvas.context;
		this.data = obj.data;
		this.maxWidth = obj.maxWidth
		return this;
	},

	calculateWidth: function(){
		return this.maxWidth >= this.canvas.width / this.data.length ? this.canvas.width / this.data.length : this.maxWidth;
	},

	calculateSpacing: function(){
		return (this.canvas.width - (this.data.length * this.calculateWidth())) / (this.data.length + 1);
	},

	animate:function(fn){
		requestAnimationFrame(fn);
		return this;
	}
};

module.exports = Chart;
