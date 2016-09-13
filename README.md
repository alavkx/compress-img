# compress-img
Use node image magick library to recursively compress every image in a file directory

### Installation
- When you are doing the next step, be sure to check `install legacy options` and `add to system path` during the installation process
- Download and install image-magick from http://www.imagemagick.org/download/binaries/ImageMagick-7.0.3-0-Q16-x64-dll.exe
- Copy the `Scripts` folder that this file is contained in and place where ever you like (Recommended: `C:\`)
- Next, you will be adding the path that you saved `Scripts` in to the system path, this allows the operating system to find the script
- Search windows (windows key) for `environment`
- Navigate to `Settings` -> `Edit the system environment variables`
- Click `Environment Variables` in bottom right of window
- In `System Variables`, scroll to `Path`
- Highlight `Path`, and click `Edit...`
- Enter the full path to the location you saved `Scripts` folder, adding a `;` at the end (`;` only applies to windows 8) 

***be careful not to erase any previous entries*** 

- Ex: `C:\Scripts\compress-img;`
- Apply, Save, Finished!

### Usage
To run the script:
- Using the Windows File Explorer, navigate to the file(s) you want to compress
- In the explorer's address bar, type one of the following commands depending on your intention

`compress filename` :: Compress the file titled exactly as it is written

`compress all`      :: Compress every file in current directory

`compress all -r`   :: Compress every file in current directory AND all subdirectories

