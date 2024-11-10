document.addEventListener("DOMContentLoaded", function () {
        const grid = document.getElementById("galleryGrid");
    let currentPage = 1;
    const imagesPerPage = 10; // 한 번에 로드할 이미지 수

    // 이미지 로드 함수
    async function loadImages(page) {
        const response = await fetch(`/assets/data/photos.json`);
        const photos = await response.json();
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
        });
    }

    // 초기 이미지 로드
    loadImages(currentPage);

    // 스크롤 이벤트로 페이지 네이션 로드
    window.addEventListener("scroll", () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            currentPage++;
            loadImages(currentPage);
        }
    });

    // Lightbox 생성
    let lightbox = document.getElementById('lightbox');
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        document.body.appendChild(lightbox);
    }

    // Lightbox 기능 구현
    document.addEventListener('click', (event) => {
        const target = event.target;
        if (target.tagName === 'IMG' && target.closest('.gallery-item')) {
            lightbox.classList.add('active');
            const img = document.createElement('img');
            img.src = target.src;
            lightbox.innerHTML = ''; // 이전 콘텐츠 제거
            lightbox.appendChild(img);
        }
    });

    // Lightbox 닫기 기능
    function closeLightbox() {
        lightbox.classList.remove('active');
    }

    lightbox.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', (event) => {
        if (event.key === "Escape") {
            closeLightbox();
        }
    });

    // Typewriter effect with support for <br> tags and blinking cursor
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

    // Apply typewriter effect only if elements exist
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
