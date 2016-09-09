// Shell script using Node.js
// Relevant Documentation:
// https://nodejs.org/docs/latest/api/process.html
'use strict';

// Import promise library
const Promise = require('bluebird');

// Import the `imagemagick` library to compress our images
// more speficially the convert function
const convert = require('imagemagick').convert;
Promise.promisifyAll(convert);

// Import node's `file system` library to interact with files
const fs = require('fs-extra');

// Current working directory
const cwd = require('process').cwd;

// Import node's `child_process` library to create
// a windows cmd shell that will execute our commands
const exec = require('child_process').exec;

// Import library for extended file directory functions
const dir = require('node-dir');
Promise.promisifyAll(dir);

// Import data structure utils
const R = require('ramda');

// Removes all images from the list that are not compressed
// noted by signature on filename `-C`
const compressed = R.filter(item => item.includes('-C'));
// Removes all images from the list that is not a jpg picture
const isPicture = R.filter(item => item.toLowerCase().includes('jpg'));

/*dir.files(cwd(), (err, files) => {
	if (err) throw err;
	const pics = isPicture(files);
	const compressedPics = compressed(pics);
	const rawPics = R.not(compressed(pics));

	R.forEach(
		convert([files[i], '-resize', '1280x720', [files[i].replace(/(\.[\w\d_-]+)$/i, '-C$1')] ],
		err => if (err) throw err;
		)
});*/

dir.files(cwd()
	.then(
		const pics = isPicture(files);
		const compressedPics = compressed(pics);
		const rawPics = R.not(compressed(pics));
	).then(
		R.forEach));