/* Image directory */
const dir = './pics/';

/* Read directory */
const fs = require('fs');

/* Get image metadata */
const ExifImage = require('exif').ExifImage;

/* Framework */
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* Statically serve files */
// app.use(express.static('public'));

let imgArr = [];

/* Read images from local directory */
function loadImages(directory) {
    let imgs = fs.readdirSync(directory);

    imgs.forEach(image => {
        if (image.includes(".JPG") || image.includes(".jpg")) {
            try {
                new ExifImage ({ image: directory + image}, (err, exifData) => {
                    if (err) {
                        console.log(err);
                    } else {
                        if (exifData.exif.CreateDate != undefined) {
                            let newImg = {
                                name: dir + image,
                                time: exifData.exif.CreateDate.substring(0, 10)
                            }
                            imgArr.push(newImg);
                        }
                    }
                });
            } catch (err) {
                console.log(err);
            }
        }
    });
    return imgArr;
}

/* Send image array to script.js */
app.get('/', (req, res) => {
    let absDir = "/Users/chris/Desktop/Chris 2018/Projects/Launchpad/public/pics/";
    let arr = loadImages(absDir);
    /* To deploy to Heroku */
    // let arr = loadImages(dir);
    res.status(200).send(arr);
});

const port = process.env.PORT || 4000;

/* Listen on specified port for requests */
app.listen(port, () => {
    console.log('Listening locally on port 4000 at http://localhost:4000/ or on Heroku at ' + port);
});