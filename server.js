/**
 * https://medium.com/@deepika.gunda/all-you-need-to-know-about-uploading-and-displaying-pictures-using-node-js-express-js-pug-jade-d89fbeb19947
 */
/* Baguette Box */
const baguetteBox = require('baguettebox.js');

/* Image directory */
const dir = './pics/';

/* Read directory */
const fs = require('fs');

/* Get image metadata */
const ExifImage = require('exif').ExifImage;

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

let imgArr = [];

function loadImages(directory) {
    let imgs = fs.readdirSync(directory);

    imgs.forEach(image => {
        if (image.includes(".JPG")) {
            try {
                new ExifImage ({ image: directory + image}, (err, exifData) => {
                    if (err) {
                        console.log(err);
                    } else {
                        let newImg = {
                            name: dir + image,
                            time: exifData.exif.CreateDate.substring(0, 10)
                        }
                        imgArr.push(newImg);
                    }
                });
            } catch (err) {
                console.log(err);
            }
        }
    });
    return imgArr;
}

function filter(date) {
    let filtered = imgArr.filter(img => img.time === date);
    return filtered;
}

app.get('/pictures', (req, res) => {
    let absDir = "/Users/chris/Desktop/Chris 2018/Projects/Launchpad/public/pics/";
    let arr = loadImages(absDir);
    res.status(200).send(arr);
});

const hostname = 'localhost';
const port = 4000;

app.listen(port, hostname, () => {
    console.log('Listening on port 4000 at http://localhost:4000/');
});