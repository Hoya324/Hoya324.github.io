document.addEventListener("DOMContentLoaded", function () {
    const grid = document.querySelector(".gallery-grid");
    let currentPage = 1;
    const imagesPerPage = 10; // 한 번에 로드할 이미지 수
    let photos = []; // 캐시된 데이터 저장용 배열

    // 초기 데이터 로드 함수
    async function fetchPhotos() {
        try {
            const response = await fetch(`./_data/photos.json`);
            photos = await response.json(); // 전체 데이터 캐시
        } catch (error) {
            console.error("Failed to load photos.json:", error);
        }
    }

    // 페이지별 이미지 로드 함수
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

            // Lightbox 기능 추가
            img.addEventListener('click', () => {
                lightbox.classList.add('active');
                const lightboxImg = document.createElement('img');
                lightboxImg.src = img.src;
                lightbox.innerHTML = '';
                lightbox.appendChild(lightboxImg);
            });
        });

        arrangeImages(); // 이미지 레이아웃 적용
    }

    // 스크롤 이벤트에 따라 다음 페이지 로드
    window.addEventListener("scroll", () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            currentPage++;
            loadImages(currentPage);
        }
    });

    // 이미지 비율에 따라 'wide' 클래스 적용
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

    // Lightbox 생성 및 기능 추가
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

    // 초기 데이터 가져오기 및 첫 페이지 로드
    fetchPhotos().then(() => loadImages(currentPage));
});
