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
