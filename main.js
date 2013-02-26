
function animateSquare() {
	var test = document.getElementById('test'),
		start = Date.now();

	window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                                   window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

	function step() {
		var now = Date.now(),
			progress = now - start;

		if (progress > 5000) {
			progress = 0;
			start = now;
		}

		test.style.left = (progress / 10) + "px";

		requestAnimationFrame(step);
	}

	requestAnimationFrame(step);
}

animateSquare();


var actionStart;

function logStart(msg) {
	actionStart = Date.now();
	document.getElementById('log').innerHTML += msg || 'Loading... ';
}

function log(msg) {
	var now = Date.now(),
		duration = Math.round(now - actionStart) + ' ms';

	document.getElementById('log').innerHTML += msg + ' in ' + duration + '<br />';

	actionStart = now;
}

document.getElementById('load-worker').onclick = function () {
	logStart();

	var worker = new Worker('worker.js');

	worker.onmessage = function (e) {
		log('Data loaded in worker');
	};

	worker.postMessage(true);
};

document.getElementById('load-async').onclick = function () {
	logStart();

	var script = document.createElement('script');
	script.src = 'http://agafonkin.com/workers-test/test.js';
	document.body.appendChild(script);
};

document.getElementById('load-async-worker').onclick = function () {
	logStart('Sending... ');

	var worker = new Worker('worker2.js');

	worker.onmessage = function (e) {
		log('Data sent to worker');
	};

	worker.postMessage(data);
};

function onDataLoad() {
	log('Data loaded asynchronously');
}
