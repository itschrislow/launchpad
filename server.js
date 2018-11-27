/**
 * https://medium.com/@deepika.gunda/all-you-need-to-know-about-uploading-and-displaying-pictures-using-node-js-express-js-pug-jade-d89fbeb19947
 */
/* Image directory */
const dir = "./pics/"

/* Read directory */
const fs = require('fs');

/* Get image metadata */
const ExifImage = require('exif').ExifImage;

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* Overrides get '/' endpoint */
app.use(express.static('public'));

let imgArr = [];

function loadImages(directory) {
    let imgs = fs.readdirSync(directory);
    console.log(imgs);

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
                        console.log(newImg);
                        imgArr.push(newImg);
                        console.log(imgArr);
                    }
                });
            } catch (err) {
                console.log(err);
            }
        }
    });
    // console.log(imgArr);
    return imgArr;
}

function filter() {
    imgArr.filter(img => {
        
    });
}

/* Change endpoint to '/' and remove static serving serve from this endpoint */
app.get('/pictures', (req, res) => {
    let absDir = "/Users/chris/Desktop/Chris 2018/Projects/Launchpad/public/pics/";
    let arr = loadImages(absDir);
    res.status(200).send(arr);
});

app.get('/pics/:img', (req, res) => {
    let image = imgArr.find(img => img.name===req.params.img);
    res.status(200).send(image);
});

const hostname = 'localhost';
const port = 4000;

app.listen(port, hostname, () => {
    console.log('Listening on port 4000 at http://localhost:4000/');
});