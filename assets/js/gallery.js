document.addEventListener("DOMContentLoaded", function () {
    const grid = document.querySelector(".gallery-grid");

    function arrangeImages() {
        const items = Array.from(document.querySelectorAll(".gallery-item img"));

        items.forEach(img => {
            const item = img.closest('.gallery-item');
            const aspectRatio = img.naturalWidth / img.naturalHeight;

            if ((img.naturalWidth > img.naturalHeight) || aspectRatio > 1.5) {
                item.classList.add("wide");
            } else {
                item.classList.remove("wide");
            }
        });
    }

    arrangeImages();
    window.addEventListener('resize', arrangeImages);

    // Lightbox functionality
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    document.body.appendChild(lightbox);

    document.querySelectorAll('.gallery-item img').forEach(image => {
        image.addEventListener('click', () => {
            lightbox.classList.add('active');
            const img = document.createElement('img');
            img.src = image.src;
            while (lightbox.firstChild) {
                lightbox.removeChild(lightbox.firstChild);
            }
            lightbox.appendChild(img);
        });
    });

    // Close lightbox on click or ESC key
    function closeLightbox() {
        lightbox.classList.remove('active');
    }

    lightbox.addEventListener('click', closeLightbox);

    document.addEventListener('keydown', (event) => {
        if (event.key === "Escape") {
            closeLightbox();
        }
    });
});
