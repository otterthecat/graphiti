var Animator = require('./animator');
var Sketch = require('./sketch');
var sketch = new Sketch();

var Chart = function(){
	this.canvas = null;
	this.context = null;
	this.data = null;
	this.maxWidth = 100;
	this.type = null;
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
		var callback = this.defaults[fn].call(this) || fn
		requestAnimationFrame(callback);
		return this;
	},

	generateAnimatorArray: function(){
		var aniArray = [];
		for(var i = 0; i < this.data.length; i += 1){
			var val = this.data[i]
			var animator = new Animator();
			animator.animate({end: val});
			aniArray.push(animator);
		}

		return aniArray;
	},

	defaults: {
		horizontal: function(){

			var animatorArray = this.generateAnimatorArray();
			var self = this;
			var hChart = function(){
				sketch.use({element: self.canvas, context: self.context}).clear();
				self.data.forEach(function(plot, idx){
					var xpos = idx > 0 ? (self.calculateSpacing() * (idx + 1)) + (self.calculateWidth() * idx) : self.calculateSpacing();

					sketch.draw('shape')('rectangle')(xpos, (self.canvas.height - animatorArray[idx].increase()), self.calculateWidth(), animatorArray[idx].increase());
				});

				requestAnimationFrame(hChart);
			};
			return hChart;
		},

		vertical: function(){

		}
	}
};

module.exports = Chart;
