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
var Canvas = require('./canvas');
var Sketch = require('./sketch');
var Animator = require('./animator');

var canvas = new Canvas().insert();
var sketch = new Sketch();

var plotData = [240, 180, 220, 40];

var rectW = 50 >= canvas.element.width / plotData.length ? canvas.element.width / plotData.length : 50;
var spacer = (canvas.element.width - (plotData.length * rectW)) / (plotData.length + 1);

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

var animatiorArray = generateAnimatorArray(plotData);

var reduceHandler = function(preVal, curVal){
	return preVal + curVal;
};

var doChart = function(){

	sketch.use(canvas).clear();
	plotData.forEach(function(plot, idx){
		var xpos = idx > 0 ? (spacer * (idx + 1)) + (rectW * idx) : spacer;
		var newPos = animatiorArray[idx].increase();
		sketch.draw('shape')('rectangle')(xpos, (canvas.element.height - newPos), rectW, newPos);
	});

	requestAnimationFrame(doChart);

}

requestAnimationFrame(doChart);

},{"./animator":1,"./canvas":2,"./sketch":4}],4:[function(require,module,exports){
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

},{}]},{},[3]);
