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
