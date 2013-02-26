onmessage = function (e) {
	importScripts('http://agafonkin.com/workers-test/test.js');
	postMessage(true);
};
