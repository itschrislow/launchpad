const fs = require('fs');
const ExifImage = require('exif').ExifImage;

const dir = "./Pics/"
let imgArr = [];

fs.readdir(dir, (err, image) => {
    image.forEach(imageName => {
        if(imageName.includes(".jpg")) {
            try {
                new ExifImage({ image : dir + imageName}, (err, exifData) => {
                    if (err) {
                        console.log("ERROR:" + err + "\nIMAGE: " + imageName);
                    } else {
                        let newImg = {
                            name: imageName,
                            time: exifData.exif.CreateDate
                        };
                        // console.log(newImg.name);
                        imgArr.push(newImg);
                    }
                });
            } catch (err) {
                console.log(err);
            }
        }
    })
});
console.log(imgArr);