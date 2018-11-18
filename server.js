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

app.use(express.static('public'));
app.use(express.static('test'));

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
                        name: dir + image,
                        time: exifData.exif.CreateDate
                    }
                    imgArr.push(newImg);
                }
            });
        } catch (err) {
            console.log(err);
        }
    }
});



app.get('/', (req, res) => {
    console.log(imgArr);
    res.status(200).send(imgArr);
});

const hostname = 'localhost';
const port = 4000;

app.listen(port, hostname, () => {
    console.log('Listening on port 4000');
});