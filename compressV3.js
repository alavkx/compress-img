// Shell script using Node.js
// Relevant Documentation:
// https://nodejs.org/docs/latest/api/process.html
'use strict';

const convert = require('imagemagick').convert;
const fs = require('fs-extra');
const cwd = require('process').cwd;
const dir = require('node-dir');
const R = require('ramda');


// CHECK ARGUMENTS ////////////////////////////////////////////////////////////////////
if (!process.argv[2]) { // testing for the presence of an argument
	// Instruct user how to properly input command
    console.log('\n===============================USAGE===============================\n' + 
    '`compress filename` :: Compress the file titled exactly as it is written\n' + 
    '`compress all`      :: Compress every file in current directory\n' + 
    '`compress all -r`   :: Compress every file in current directory AND all subdirectories' + 
    '\n-------------------------------------------------------------------\n');
    // Abort execution with error
    process.exit(1);
}


console.log('\nWorking...\n');
// Save first argument for use
const arg = process.argv[2];


// CREATE FILTER FUNCTIONS ////////////////////////////////////////////////////////////
// Removes all images from a list that are not compressed
// noted by signature on filename `-C`,
// or being located in folder `Uncompressed-Pictures`
const uncompressed = R.reject(item => item.includes('-C') 
			    || item.includes('Uncompressed-Pictures'));
// Removes all images from a list that is not a jpg picture
const isPicture = R.filter(item => item.toLowerCase().includes('jpg'));
const sanitize = R.compose(uncompressed, isPicture);


// FILTER -> COMPRESS -> MOVE PICTURES ////////////////////////////////////////////////
const compressMove = files => {
	const pics = sanitize(files);

	R.forEach(name => {
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
					console.log(name.substring(n) +  ' moved to ' + 'Uncompressed-Pictures\n');
	        	});
	        });
	    });
	}, pics);
}

// DETERMINE MODE ///////////////////////////////////////////////////////////////////
if (arg === 'all') {
	// RECURSIVE
	// The big shabam
	if (process.argv[3] === '-r') {
		// Read files recursively and create an array of `filepath/filename`
		dir.files(cwd(), (err, files) => {
			if (err) throw err;
			compressMove(files);
		});
	}
	// NON-RECURSIVE
	// Compress all files in current directory
	else {
		fs.readdir(cwd(), (err, files) => {
			if( err ) throw err;
			compressMove(files);			
		});
	}
} else { // SINGLE ITERATION

	/*------------------------------------------------* 
	 * Executes the compilation script for one image...
	 * Substituting the argument that was captured
	 * directly in to the command.
	 *------------------------------------------------*/

	const filename = process.argv[2] + '.jpg';
	console.log('Compressing ' + filename) + '...';

	// Make the conversion to the currently selected `files[i]`
	// out of list `files`
	// `replace(/(\.[\w\d_-]+)$/i, '-C$1')` means: 
	// Place -C at the end of filename before the file extension 
	convert([filename, '-resize', '1280x720', filename.replace(/(\.[\w\d_-]+)$/i, '-C$1')],
	err => { 
		if (err) throw err; 
		console.log(filename + ' compressed successfully');

		// Create folder to store original pictures
		fs.mkdirs(cwd() + '/Uncompressed-Pictures', err => {
			if (err) throw err;
			// Move uncompressed file to new folder
			fs.move(filename, cwd() + '\\Uncompressed-Pictures\\' + filename, err => {
				if (err) throw err;
				console.log(filename +  ' moved to ' + 'Uncompressed-Pictures\n');
        	});
        });
	});
}