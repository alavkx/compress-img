// Shell script using Node.js
// Relevant Documentation:
// https://nodejs.org/docs/latest/api/process.html
'use strict';

const convert = require('imagemagick').convert;
const fs = require('fs-extra');
const cwd = require('process').cwd;
const dir = require('node-dir');
const R = require('ramda');

// Removes all images from the list that are not compressed
// noted by signature on filename `-C`,
// or being located in folder `Uncompressed-Pictures`
const uncompressed = R.reject(item => item.includes('-C') 
			    || item.includes('Uncompressed-Pictures'));
// Removes all images from the list that is not a jpg picture
const isPicture = R.filter(item => item.toLowerCase().includes('jpg'));
const sanitize = R.compose(uncompressed, isPicture);

// Read files recursively and create an array of `filepath/filename`
dir.files(cwd(), (err, files) => {
	if (err) throw err;
	const pics = sanitize(files);

	R.forEach((name) => {
		// What we're here for
		convert([name, '-resize', '1280x720', name.replace(/(\.[\w\d_-]+)$/i, '-C$1')],
		err => {
			if (err) throw err;
			// Inserting folder in to filepath
			let n = name.lastIndexOf('\\');
			let uncompressed_filepath = name.substring(0,n) +'\\Uncompressed-Pictures';

			// Create folder to store original pictures
			fs.mkdirs(uncompressed_filepath, err => {
				if (err) throw err;
				let uncompressed_filename = uncompressed_filepath + '\\' + name.substring(n);

				// Move uncompressed file to new folder
				fs.move(name, uncompressed_filename, err => {
					if (err) throw err;
					console.log(name.substring(n) +  'moved to ' + 'Uncompressed-Pictures');
	        	});
	        });
	    });
	}, pics);
});