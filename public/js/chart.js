var Animator = require('./animator');
var Sketch = require('./sketch');
var sketch = new Sketch();

var Chart = function(){
	this.canvas = null;
	this.context = null;
	this.data = null;
	this.maxWidth = 100;
	this.maxHeight = 100;
	this.type = null;
	this.layout = 'width';
};

Chart.prototype = {

	use: function(obj){
		this.canvas = obj.canvas.element;
		this.context = obj.canvas.context;
		this.data = obj.data;
		this.maxWidth = obj.maxWidth
		return this;
	},

	calculate: function(prop){
		var label = 'max' + prop.charAt(0).toUpperCase() + prop.slice(1);
		return this[label] >= this.canvas[prop] / this.data.length ? this.canvas[prop] / this.data.length : this[label];
	},

	calculateSpacing: function(prop){
		return Math.floor((this.canvas[prop] - (this.data.length * this.calculate(this.layout))) / (this.data.length + 1));
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

	getPosition: function(index){
		index = index || 0;
		return index > 0 ? (this.calculateSpacing(this.layout) * (index + 1)) + (this.calculate(this.layout) * index) : this.calculateSpacing(this.layout);
	},

	iterator:  function(plot, index){
		var xpos = this.layout === 'width' ? this.getPosition(index) : 0;
		var ypos = this.layout === 'width' ? (this.canvas.height - this.animatorArray[index].increase()) : this.getPosition(index);
		var width = this.layout === 'width' ? this.calculate(this.layout) : this.animatorArray[index].increase();
		var height = this.layout === 'width' ? this.animatorArray[index].increase() : this.calculate(this.layout);
		sketch.draw('shape')('rectangle')(xpos, ypos, width, height);
		sketch.draw('shape')('text')(plot, xpos + (width/2), ypos + (height/2));
	},

	defaults: {
		horizontal: function(){
			this.layout = 'width';
			this.animatorArray = this.generateAnimatorArray();
			var self = this;
			var hChart = function(){
				sketch.use({element: self.canvas, context: self.context}).clear();
				self.data.forEach(self.iterator.bind(self));
				requestAnimationFrame(hChart);
			};
			return hChart;
		},

		vertical: function(){
			this.layout = 'height';
			this.animatorArray = this.generateAnimatorArray();
			var self = this;
			var vChart = function(){
				sketch.use({element: self.canvas, context: self.context}).clear();
				self.data.forEach(self.iterator.bind(self));
				requestAnimationFrame(vChart);
			};
			return vChart;
		}
	}
};

module.exports = Chart;
