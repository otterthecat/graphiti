var Canvas = require('./canvas');
var Chart = require('./chart');

var canvas = new Canvas().insert();
var chart = new Chart();
chart.use({
	canvas: canvas,
	data: [240, 180, 220, 40, 240],
	maxWidth: 50
});

chart.animate('vertical');
