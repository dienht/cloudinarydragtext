window.addEventListener('DOMContentLoaded', (event) => {
    const dragText = document.getElementById('drag-text');
    const imageContainer = document.getElementById('image-container');
    const image = imageContainer.querySelector('img');
    const cloudinaryXElement = document.getElementById('cloudinary-x');
    const cloudinaryYElement = document.getElementById('cloudinary-y');

    // Set default position of drag-text to the center of the image
    const imageWidth = image.offsetWidth;
    const imageHeight = image.offsetHeight;
    const dragTextWidth = dragText.offsetWidth;
    const dragTextHeight = dragText.offsetHeight;

    const initialX = (imageWidth / 2) - (dragTextWidth / 2);
    const initialY = (imageHeight / 2) - (dragTextHeight / 2);

    dragText.style.left = initialX + 'px';
    dragText.style.top = initialY + 'px';

    let isDragging = false;
    let offsetX, offsetY;

    dragText.addEventListener('mousedown', startDragging);
    dragText.addEventListener('mouseup', stopDragging);
    dragText.addEventListener('mousemove', drag);

    function startDragging(event) {
        isDragging = true;
        offsetX = event.clientX - dragText.getBoundingClientRect().left;
        offsetY = event.clientY - dragText.getBoundingClientRect().top;
    }

    function stopDragging() {
        isDragging = false;
    }

    function drag(event) {
        if (!isDragging) return;

        const x = event.clientX - offsetX;
        const y = event.clientY - offsetY;

        // Check boundaries to prevent dragging outside the image
        const maxX = imageWidth - dragTextWidth;
        const maxY = imageHeight - dragTextHeight;
        const clampedX = Math.max(0, Math.min(maxX, x));
        const clampedY = Math.max(0, Math.min(maxY, y));

        dragText.style.left = clampedX + 'px';
        dragText.style.top = clampedY + 'px';

        // Calculate cloudinary coordinates
        const cloudinaryX = clampedX - (imageWidth / 2);
        const cloudinaryY = clampedY - (imageHeight / 2);

        cloudinaryXElement.textContent = cloudinaryX.toFixed(2);
        cloudinaryYElement.textContent = cloudinaryY.toFixed(2);
    }
});
