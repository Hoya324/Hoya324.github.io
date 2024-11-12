document.addEventListener("DOMContentLoaded", function () {
    const grid = document.querySelector(".gallery-grid");
    let currentPage = 1;
    const imagesPerPage = 10;
    let photos = [];

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
            img.onclick = () => openLightbox(img.src); // openLightbox 호출 추가
            item.appendChild(img);
            grid.appendChild(item);
        });

        arrangeImages();
    }

    // Lightbox 열기 함수 (window에 할당하여 전역 접근 가능하게 설정)
    window.openLightbox = function (src) {
        lightbox.classList.add('active');
        const lightboxImg = document.createElement('img');
        lightboxImg.src = src;
        lightbox.innerHTML = '';
        lightbox.appendChild(lightboxImg);
    }

    // Lightbox 닫기 함수
    function closeLightbox() {
        lightbox.classList.remove('active');
    }

    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    document.body.appendChild(lightbox);

    lightbox.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', (event) => {
        if (event.key === "Escape") {
            closeLightbox();
        }
    });

    // Throttle을 적용한 스크롤 이벤트
    window.addEventListener("scroll", throttle(() => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            currentPage++;
            loadImages(currentPage);
        }
    }, 200));

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

    fetchPhotos().then(() => loadImages(currentPage));

    // Typewriter 효과 함수
    function typeWriter(element, text, delay = 50) {
        let index = 0;
        const cursor = document.createElement("span");
        cursor.classList.add("cursor");
        element.appendChild(cursor);

        function type() {
            if (index < text.length) {
                if (text.substring(index, index + 4) === "<br>") {
                    element.innerHTML += "<br>";
                    index += 4;
                } else {
                    element.innerHTML += text.charAt(index);
                    index++;
                }
                setTimeout(type, delay);
            } else {
                cursor.style.display = "inline-block"; // Show blinking cursor after typing
            }
        }

        element.innerHTML = ""; // Clear any existing content
        type();
    }

    // Typewriter 효과 적용
    const typewriterElements = document.querySelectorAll(".typewriter-text");

    if (typewriterElements.length > 0) {
        typewriterElements.forEach((element, index) => {
            const text = element.innerHTML;
            element.innerHTML = ""; // Clear initial content for animation
            setTimeout(() => typeWriter(element, text, 50), index * 1000);
        });
    } else {
        console.warn("Typewriter elements not found in the DOM.");
    }
});
