const fs = require('fs');
const ExifImage = require('exif').ExifImage;

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
                    console.log(imgArr);
                }
            });
        } catch (err) {
            console.log(err);
        }
    }
});
// but if i console.log(imgArr) here it prints out an empty array
