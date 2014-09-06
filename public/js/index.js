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
