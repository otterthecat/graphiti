(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
var Canvas = function(){
	this.attributes = {
		targetEl: '.chartbreaker',
		width: 400,
		height: 300,
		contextType: '2d',
		size: function(){
			return {
				w: this.width,
				h: this.height
			}
		}
	}
};

Canvas.prototype = {
	create: function(){
		var canvasElement = document.createElement('canvas');
		canvasElement.width = this.attributes.width;
		canvasElement.height = this.attributes.height;
		return {
			element: canvasElement,
			context: canvasElement.getContext(this.attributes.contextType)
		}
	},
	insert: function(){
		var canvasObj = this.create();
		document.querySelector(this.attributes.targetEl).appendChild(canvasObj.element);
		return canvasObj;
	}
};

module.exports = Canvas;

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
var Canvas = require('./canvas');
var Sketch = require('./sketch');
var Animator = require('./animator');
var Chart = require('./chart');

var canvas = new Canvas().insert();
var sketch = new Sketch();
var chart = new Chart();
chart.use({
	canvas: canvas,
	data: [240, 180, 220, 40],
	maxWidth: 50
});

var generateAnimatorArray = function(data){
	var aniArray = [];
	for(var i = 0; i < data.length; i += 1){
		var val = data[i]
		var animator = new Animator();
		animator.animate({end: val});
		aniArray.push(animator);
	}

	return aniArray;
}

var animatiorArray = generateAnimatorArray(chart.data);
var doChart = function(){

	sketch.use(canvas).clear();
	chart.data.forEach(function(plot, idx){
		var xpos = idx > 0 ? (chart.calculateSpacing() * (idx + 1)) + (chart.calculateWidth() * idx) : chart.calculateSpacing();
		sketch.draw('shape')('rectangle')(xpos, (canvas.element.height - animatiorArray[idx].increase()), chart.calculateWidth(), animatiorArray[idx].increase());
	});

	requestAnimationFrame(doChart);
}

chart.animate(doChart);

},{"./animator":1,"./canvas":2,"./chart":3,"./sketch":5}],5:[function(require,module,exports){
var Sketch = function(){

	this.canvas = null;
};

var methods = {
	shape: function(type){
		this.canvas.context.fillStyle = '#ff0033';
		return shapes[type].bind(this);
	}
};

var shapes = {
	rectangle: function(x, y, w, h){
		this.canvas.context.fillRect(x, y, w, h);
		return this;
	}
}

Sketch.prototype = {
	use: function(canvas){
		this.canvas = canvas;
		return this;
	},

	draw: function(type){
		return methods[type].bind(this);
	},

	clear: function(){
		this.canvas.context.clearRect(0, 0, this.canvas.element.width, this.canvas.element.height);
		return this;
	}
};

module.exports = Sketch;

},{}]},{},[4]);
