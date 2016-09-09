// Shell script using Node.js
// Relevant Documentation:
// https://nodejs.org/docs/latest/api/process.html
'use strict';

// Import promise library
const Promise = require('bluebird');

// Import the `imagemagick` library to compress our images
// more speficially the convert function
const convert = require('imagemagick').convert;

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
const uncompressed = R.reject(item => item.includes('-C'));
// Removes all images from the list that is not a jpg picture
const isPicture = R.filter(item => item.toLowerCase().includes('jpg'));
const sanitize = R.compose(uncompressed, isPicture);

dir.files(cwd(), (err, files) => {
	if (err) throw err;
	const pics = sanitize(files);

	R.forEach(
		convert([files[i], '-resize', '1280x720', [files[i].replace(/(\.[\w\d_-]+)$/i, '-C$1')] ],
		err => if (err) throw err;
		)
});

// - sanitize incoming list to only include
//   uncompressed images
// - break list in to two lists,
//   compressed and uncompressed
// - compress images in unc