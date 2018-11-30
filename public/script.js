let imgArr = [];

/* Recieve image array from server.js */
(function() {
    fetch(`/pictures`)
        .then(res => res.json())
        .then(images => {
            imgArr = images;
            addDates(imgArr);
            displayImages(images);
        })
        .catch(err => console.log(err));
}())

let container = document.getElementById('container');

/* Reset filter */
function displayAll() {
    displayImages(imgArr);
}

/* Add images dynamically */
function displayImages(images) {
    container.innerHTML = "";
    images.forEach(image => displayImage(image));
    baguetteBox.run('.gallery');
}

function displayImage(image) {
    let cardDiv = document.createElement('div');
    cardDiv.classList.add('col-md-4');
    let anchor = document.createElement('a');
    anchor.classList.add('lightbox');
    anchor.href = image.name;
    let img = document.createElement('img');
    img.src = image.name;
    img.alt = "Image not found";

    anchor.appendChild(img);
    cardDiv.appendChild(anchor);
    container.appendChild(cardDiv);
}

let dropdownMenu = document.getElementById('dropdown-menu');

/* Add dates dynamically */
function addDates(dates) {
    let uniqueDate = [];
    dates.forEach(date => {
        if(uniqueDate.indexOf(date.time) === -1) {
            uniqueDate.push(date.time);
        }
    })
    uniqueDate.sort();
    uniqueDate.forEach(date => addDate(date));
}

function addDate(date) {
    let btn = document.createElement('button');
    btn.classList.add('dropdown-item');
    btn.type = 'button';
    btn.innerHTML = date;
    btn.addEventListener("click", function() {
        filter(date);
    });

    dropdownMenu.appendChild(btn);
}

/* Filter images based on date */
function filter(date) {
    let filtered = imgArr.filter(img => img.time === date);
    displayImages(filtered);
}