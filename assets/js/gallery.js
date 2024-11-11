// Throttle 함수 정의
function throttle(func, delay) {
    let lastCall = 0;
    return function (...args) {
        const now = new Date().getTime();
        if (now - lastCall >= delay) {
            lastCall = now;
            return func(...args);
        }
    };
}

document.addEventListener("DOMContentLoaded", function () {
    const grid = document.querySelector(".gallery-grid");
    let currentPage = 1;
    const imagesPerPage = 10;
    let photos = [];

    async function fetchPhotos() {
        try {
            const response = await fetch(`./_data/photos.json`);
            photos = await response.json();
        } catch (error) {
            console.error("Failed to load photos.json:", error);
        }
    }

    function loadImages(page) {
        const startIndex = (page - 1) * imagesPerPage;
        const endIndex = page * imagesPerPage;
        const images = photos.slice(startIndex, endIndex);

        images.forEach(photo => {
            const item = document.createElement("div");
            item.className = "gallery-item";
            const img = document.createElement("img");
            img.src = `/assets/images/gallery/${photo.src}`;
            img.alt = photo.alt;
            img.loading = "lazy";
            item.appendChild(img);
            grid.appendChild(item);

            img.addEventListener('click', () => {
                lightbox.classList.add('active');
                const lightboxImg = document.createElement('img');
                lightboxImg.src = img.src;
                lightbox.innerHTML = '';
                lightbox.appendChild(lightboxImg);
            });
        });

        arrangeImages();
    }

    // Throttle을 적용한 스크롤 이벤트
    window.addEventListener("scroll", throttle(() => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            currentPage++;
            loadImages(currentPage);
        }
    }, 200)); // 200ms 간격으로 스크롤 이벤트 발생 제한

    function arrangeImages() {
        const items = document.querySelectorAll(".gallery-item img");

        Promise.all(Array.from(items).map(img => new Promise(resolve => {
            if (img.complete) {
                resolve();
            } else {
                img.onload = resolve;
                img.onerror = resolve;
            }
        }))).then(() => {
            items.forEach(img => {
                const item = img.closest('.gallery-item');
                const aspectRatio = img.naturalWidth / img.naturalHeight;

                if ((img.naturalWidth > img.naturalHeight) || aspectRatio > 1.5) {
                    item.classList.add("wide");
                } else {
                    item.classList.remove("wide");
                }
            });
        });
    }

    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    document.body.appendChild(lightbox);

    function closeLightbox() {
        lightbox.classList.remove('active');
    }

    lightbox.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', (event) => {
        if (event.key === "Escape") {
            closeLightbox();
        }
    });

    fetchPhotos().then(() => loadImages(currentPage));
});
