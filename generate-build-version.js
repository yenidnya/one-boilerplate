const fs = require('fs');
const path = require('path');
const packageJson = require(`${process.cwd()}/package.json`);
const metaJson = path.join(process.cwd(), 'public', 'meta.json');
const appVersion = packageJson.version;

const jsonData = {
	version: appVersion,
};

var jsonContent = JSON.stringify(jsonData);

fs.writeFile(metaJson, jsonContent, 'utf8', function (err) {
	if (err) {
		console.log('An error occured while writing JSON Object to meta.json');
		return console.log(err);
	}

	console.log('meta.json file has been saved with latest version number');
});
