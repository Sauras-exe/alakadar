/**
 * GALLERY FUNCTIONALITY
 * Handle display foto, modal, dan download
 */

let currentPhotoIndex = 0;

// Initialize gallery ketika page load
document.addEventListener('DOMContentLoaded', function() {
    renderGallery();
});

/**
 * Render foto gallery dari config
 */
function renderGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    const loadingMessage = document.getElementById('loadingMessage');

    if (!GALLERY_PHOTOS || GALLERY_PHOTOS.length === 0) {
        galleryGrid.innerHTML = '<p style="text-align: center; color: var(--muted); grid-column: 1/-1;">Belum ada foto di galeri.</p>';
        loadingMessage.style.display = 'none';
        return;
    }

    // Clear loading message
    loadingMessage.style.display = 'none';

    // Generate HTML untuk setiap foto
    galleryGrid.innerHTML = GALLERY_PHOTOS.map((photo, index) => `
        <div class="photo-card fade-in" style="animation-delay: ${index * 0.1}s" onclick="openPhotoModal(${index})">
            <div class="photo-card-image-wrapper">
                <img src="${photo.imagePath}" alt="${photo.title}" class="photo-card-image" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23333%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23999%22 font-size=%2220%22%3EImage not found%3C/text%3E%3C/svg%3E'">
            </div>
            <div class="photo-card-overlay">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
            </div>
            <div class="photo-card-info">
                <div class="photo-card-photographer">${photo.photographer}</div>
                <div class="photo-card-location">${photo.location}</div>
            </div>
        </div>
    `).join('');
}

/**
 * Buka modal foto
 */
function openPhotoModal(index) {
    const photo = GALLERY_PHOTOS[index];
    currentPhotoIndex = index;

    if (!photo) return;

    const modal = document.getElementById('photoModal');
    const modalImage = document.getElementById('modalImage');
    const modalLocation = document.getElementById('modalLocation');
    const modalPhotographer = document.getElementById('modalPhotographer');
    const modalDownloadBtn = document.getElementById('modalDownloadBtn');

    // Set modal content
    modalImage.src = photo.imagePath;
    modalImage.alt = photo.title;
    modalLocation.textContent = photo.location;
    modalPhotographer.textContent = photo.photographer;
    
    // Set download button
    modalDownloadBtn.href = photo.downloadUrl;
    modalDownloadBtn.download = `${photo.title.replace(/\s+/g, '-').toLowerCase()}.jpg`;

    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Close modal foto
 */
function closePhotoModal() {
    const modal = document.getElementById('photoModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

/**
 * Navigate photo di modal (next)
 */
function nextPhoto() {
    if (currentPhotoIndex < GALLERY_PHOTOS.length - 1) {
        openPhotoModal(currentPhotoIndex + 1);
    }
}

/**
 * Navigate photo di modal (previous)
 */
function previousPhoto() {
    if (currentPhotoIndex > 0) {
        openPhotoModal(currentPhotoIndex - 1);
    }
}

/**
 * Close modal ketika click di luar area modal
 */
document.addEventListener('click', function(event) {
    const modal = document.getElementById('photoModal');
    const modalContent = document.querySelector('.modal-content');
    
    if (modal && modal.classList.contains('active') && !modalContent.contains(event.target)) {
        closePhotoModal();
    }
});

/**
 * Close modal dengan keyboard ESC
 */
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closePhotoModal();
    }
    
    // Navigate dengan arrow keys
    if (document.getElementById('photoModal').classList.contains('active')) {
        if (event.key === 'ArrowRight') {
            nextPhoto();
        } else if (event.key === 'ArrowLeft') {
            previousPhoto();
        }
    }
});