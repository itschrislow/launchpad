/**
 * To allow user to upload and display pictures:
 * https://medium.com/@deepika.gunda/all-you-need-to-know-about-uploading-and-displaying-pictures-using-node-js-express-js-pug-jade-d89fbeb19947
 */
/* Read directory */
const fs = require('fs');
/* Get image metadata */
const ExifImage = require('exif').ExifImage;

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', express.static('public'));

const dir = "./Pics/"
let imgArr = [];

let imgs = fs.readdirSync(dir);

imgs.forEach(image => {
    if (image.includes(".jpg")) {
        try {
            new ExifImage ({ image: dir + image}, (err, exifData) => {
                if (err) {
                    console.log(err);
                } else {
                    let newImg = {
                        name: image,
                        time: exifData.exif.CreateDate
                    }
                    console.log(newImg);
                    imgArr.push(newImg);
                    // shows array here
                    // console.log(imgArr);
                }
            });
        } catch (err) {
            console.log(err);
        }
    }
});
// but if i console.log(imgArr) here it prints out an empty array

// TODO: sort array

app.get('/', (req, res) => {
    res.send(imgArr);
});

const hostname = 'localhost';
const port = 4000;

app.listen(port, hostname, () => {
    console.log('Listening on port 4000');
});