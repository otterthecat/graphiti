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
