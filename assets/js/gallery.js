document.addEventListener("DOMContentLoaded", function () {
    // Check if the .gallery-grid element exists before proceeding
    const grid = document.querySelector(".gallery-grid");

    if (grid) {
        function arrangeImages() {
            const items = document.querySelectorAll(".gallery-item img");

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
    } else {
        console.warn("Gallery grid not found in the DOM.");
    }

    // Lightbox functionality with error handling
    try {
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        document.body.appendChild(lightbox);

        document.querySelectorAll('.gallery-item img').forEach(image => {
            image.addEventListener('click', () => {
                lightbox.classList.add('active');
                const img = document.createElement('img');
                img.src = image.src;
                lightbox.innerHTML = ''; // Clear previous content
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
    } catch (error) {
        console.error("Error setting up lightbox:", error);
    }

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
