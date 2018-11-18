// dynamically load images into gallery while has images
(function() {
    fetch(`/`)
        .then(res => res.json())
        .then(image => console.log(image));
    // function displayImg(image) {
        // console.log(image);
        // let gallery = document.getElementById('gallery');
        // let row = document.createElement('div');
        // row.classList.add('row');
        // let col = document.createElement('div');
        // col.classList.add('col-md-4');
        // let card = document.createElement('div');
        // card.classList.add('card');
        // let img = document.createElement('img');
        // img.src = ""; /* get img src from array or database */
    // }
}())