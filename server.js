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

app.use(express.static('public'));

let imgArr = [];

function loadImages(dir) {
    let imgs = fs.readdirSync(dir);

    imgs.forEach(image => {
        if (image.includes(".jpg")) {
            try {
                new ExifImage ({ image: dir + image}, (err, exifData) => {
                    if (err) {
                        console.log(err);
                    } else {
                        let newImg = {
                            name: dir + image,
                            time: exifData.exif.CreateDate
                        }
                        console.log(newImg);
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

app.get('/', (req, res) => {
    loadImages(dir);
    res.status(200).send(imgArr);
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