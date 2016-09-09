// Shell script using Node.js
// Relevant Documentation:
// https://nodejs.org/docs/latest/api/process.html
'use strict';


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



/*----------------------------------------*
 * Gather input after the file name (first argument) from the command
 * In this case the command you wish to enter may look like:
 *
 * compress nameofpictureyouwantcompressed      ! do not include file extension !
 *
 *   OR
 *
 * compress all
 *----------------------------------------*/



if (!process.argv[2]) { // testing for the presence of an argument
	// Instruct user how to properly input command
    console.log('Missing parameters\nFormat the command like > compress `filename`\n`filename` being the name of the file you wish to compress\n');
}
else { // Argument(s) exist
	console.log('\nWorking...\n');
	// Save first argument for use
	const arg = process.argv[2];

	// Creating a new folder `Uncompressed-Pictures` (if none exists)
	// to place the old file(s) in
	exec('mkdir Uncompressed-Pictures');



	/*------------------------------------------------* 
	 * Executes the compilation script for all images
	 * in the current directory. Checking if image is
	 * already compressed. Moves original in to new folder
	 *------------------------------------------------*/

	if (arg == "all") { // Compress every image in the folder

		// Make a list of all the files in the directory
		// Will allow iteration through images
		fs.readdir( cwd()/* <- Current working directory */, ( err, files ) => {
	        if( err ) throw err;
	        
	    	// Step through the list of files
	    	const len = files.length;
	        for (let i=0; i < len; i++) {

	        	// -C in the filename indicates:
        		//   already compressed, skip instructions below
        		//   and check next file
        		if (files[i].includes("-C")) { 
        			console.log(files[i] + " already compressed\n");
        			continue; // breaks out of current loop iteration
        		}

	        	// Removes any existing spaces from the filename	        	
	        	if (files[i].includes(" ")) {
	        		let filename_nospace = files[i].replace(/\s+/g, '');
	        		// Renames the file and matching string in `files`
        			fs.renameSync(files[i], filename_nospace);
        			files[i] = filename_nospace;	        
	        	}

	        	if (files[i].toLowerCase().includes("jpg")) {
	        		// Make the conversion to the currently selected `files[i]`
	        		// out of list `files`
	        		// `replace(/(\.[\w\d_-]+)$/i, '-C$1')` means: 
	        		// Place -C at the end of filename before the file extension 
	        		convert([files[i], '-resize', '1280x720', [files[i].replace(/(\.[\w\d_-]+)$/i, '-C$1')] ],
					(err, stdout) => { 
						if (err) throw err; 
						console.log(files[i] + ' compressed successfully');

						// Move unaltered file to `Uncompressed-Pictures` folder
						fs.move(files[i], cwd() +  '/Uncompressed-Pictures/' + files[i], (err) => {
	        				if (err) throw err;
	        				console.log(files[i] +  'moved to ' + 'Uncompressed-Pictures');
	        			});
					});
	 

	        	}
	        }
    	});
    } 


	/*------------------------------------------------* 
	 * Executes the compilation script for one image...
	 * Substituting the argument that was captured
	 * directly in to the command.
	 *------------------------------------------------*/

    else { // Compress specified file
    	const filename = process.argv[2] + '.jpg';

		// Make the conversion to the currently selected `files[i]`
		// out of list `files`
		// `replace(/(\.[\w\d_-]+)$/i, '-C$1')` means: 
		// Place -C at the end of filename before the file extension 
		convert([filename, '-resize', '1280x720', [filename.replace(/(\.[\w\d_-]+)$/i, '-C$1')] ],
		(err, stdout) => { 
			if (err) throw err; 
			console.log(filename + ' compressed successfully');

			// Move unaltered file to `Uncompressed-Pictures` folder
			fs.move(filename, cwd() +  '/Uncompressed-Pictures/' + filename, (err) => {
				if (err) throw err;
				console.log(filename +  'moved to ' + 'Uncompressed-Pictures');
			});
		});
	}
}