/**
 * Dynamically load images into gallery
 */
(function() {
    fetch(`/`)
        .then(res => res.json())
        .then(images => displayImages(images));

    let container = document.getElementById('container');

    function displayImages(images) {
        images.forEach(image => displayImage(image));
    }

    function displayImage(image) {
        let cardDiv = document.createElement('div');
        col.classList.add('card col-md-4');
        // let cardContent = document.createElement('div');
        // card.classList.add('card-content');
        let anchor = document.createElement('a');
        anchor.classList.add('lightbox');
        anchor.href = image.name;
        let img = document.createElement('img');
        img.src = image.name;
        img.alt = "Image not found";

        anchor.appendChild(img);
        cardContent.appendChild(anchor);
        cardDiv.appendChild(cardContent);
        container.appendChild(cardDiv);
    }
}())