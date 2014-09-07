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
	},
	circle: function(centerX, centerY, radius){
		this.canvas.context.beginPath();
		this.canvas.context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
		this.canvas.context.fillStyle = '#ff0033';
		this.canvas.context.fill();
		return this;
	},
	triangle: function(start, middle, end){
		this.canvas.context.beginPath();
		this.canvas.context.moveTo(start.x, start.y);
		this.canvas.context.lineTo(middle.x, middle.y);
		this.canvas.context.lineTo(end.x, end.y);
		this.canvas.context.fillStyle = '#ff0033';
		this.canvas.context.fill();
		return this;
	},
	text: function(txt, x, y){
		this.canvas.context.fillStyle = '#333';
		this.canvas.context.font = '12px sans-serif';
		this.canvas.context.textBaseline = 'top';
		this.canvas.context.textAlign = 'center';
		this.canvas.context.fillText(txt, x, y);
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
