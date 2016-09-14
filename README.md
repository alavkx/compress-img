# compress-img
Use node image magick library to recursively compress every image in a file directory

### Installation
- When you are doing the next step, be sure to check `install legacy options` and `add to system path` during the installation process
- install image-magick by clicking the file `ImageMagick-7.0.3-0-Q16-x64-dll.exe`
- Copy the `Scripts` folder (the one you are currently in) and place where ever you like (Recommended: `C:\`)
- Add `...\Scripts\compress-img` to system path by doing the following:
- Search windows (windows key) for `environment`
- Navigate to `Settings` -> `Edit the system environment variables`
- Click `Environment Variables` in bottom right of window
- In `System Variables`, scroll to `Path`
- Highlight `Path`, and click `Edit...`
- Enter the full path to the location you saved `Scripts` folder, adding a `;` at the end (`;` only applies to windows 8) 
- Ex: `C:\path\you\put\this\folder\Scripts\compress-img;`
***be careful not to erase any previous entries*** 

- Apply, Save, Finished!

### Usage
To run the script:
- Using the Windows File Explorer, navigate to the file(s) you want to compress
- In the explorer's address bar, type one of the following commands depending on your intention

`compress filename` :: Compress the file titled exactly as it is written

`compress all`      :: Compress every file in current directory

`compress all -r`   :: Compress every file in current directory AND all subdirectories

