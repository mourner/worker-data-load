var fs = require('fs');

var len = 1600000;

var data = 'var data = ([\n';

for (var i = 0; i < len; i++) {
	var value = Math.round(Math.random() * 100000);

	data += value;

	data += i < len - 1 ?
		(i > 0 && i % (480 * 1024 - 1) === 0 ?
			'\n]).concat([\n' :
			',' + ((i + 1) % 100 === 0 ? '\n' : '')) :
		'\n]);\n';
}

data += 'if (typeof window !== "undefined" && window.onDataLoad) { window.onDataLoad(); }\n';

fs.writeFileSync('test.js', data);
