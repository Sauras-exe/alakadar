/**
 * GALLERY FUNCTIONALITY
 * Handle display foto, modal, dan download
 */

let currentPhotoIndex = 0;
let currentOptionsIndex = 0;   // ← baru

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

    loadingMessage.style.display = 'none';

    // CARD BARU: gambar + bottom hitam
    galleryGrid.innerHTML = GALLERY_PHOTOS.map((photo, index) => `
        <div class="photo-card fade-in" style="animation-delay: ${index * 0.1}s" onclick="showOptionsMenu(${index})">
            <div class="photo-card-image-wrapper relative">
                <img src="${photo.imagePath}" 
                     alt="${photo.title}" 
                     class="photo-card-image"
                     onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23333%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23999%22 font-size=%2220%22%3EImage not found%3C/text%3E%3C/svg%3E'">
                
                <!-- Bagian bawah hitam -->
                <div class="photo-card-info absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm px-4 py-4 text-white">
                    <div class="photo-card-photographer text-sm font-medium">${photo.photographer}</div>
                    <div class="photo-card-location text-xs opacity-90 mt-0.5">${photo.location}</div>
                </div>
            </div>
        </div>
    `).join('');
}

/* ================== OPTIONS MENU ================== */
function showOptionsMenu(index) {
    currentOptionsIndex = index;
    const menu = document.getElementById('optionsMenu');
    menu.classList.remove('hidden');
}

function hideOptionsMenu() {
    const menu = document.getElementById('optionsMenu');
    menu.classList.add('hidden');
}

function selectOption(action) {
    hideOptionsMenu();
    const photo = GALLERY_PHOTOS[currentOptionsIndex];
    if (!photo) return;

    if (action === 'view') {
        openPhotoModal(currentOptionsIndex);
    } 
    else if (action === 'download') {
        const link = document.createElement('a');
        link.href = photo.downloadUrl;
        link.download = `${photo.title.replace(/\s+/g, '-').toLowerCase()}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

/* ================== FUNGSI MODAL (tetap sama) ================== */
function openPhotoModal(index) {
    const photo = GALLERY_PHOTOS[index];
    currentPhotoIndex = index;

    if (!photo) return;

    const modal = document.getElementById('photoModal');
    const modalImage = document.getElementById('modalImage');
    const modalLocation = document.getElementById('modalLocation');
    const modalPhotographer = document.getElementById('modalPhotographer');
    const modalDownloadBtn = document.getElementById('modalDownloadBtn');

    modalImage.src = photo.imagePath;
    modalImage.alt = photo.title;
    modalLocation.textContent = photo.location;
    modalPhotographer.textContent = photo.photographer;
    
    modalDownloadBtn.href = photo.downloadUrl;
    modalDownloadBtn.download = `${photo.title.replace(/\s+/g, '-').toLowerCase()}.jpg`;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePhotoModal() {
    const modal = document.getElementById('photoModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function nextPhoto() {
    if (currentPhotoIndex < GALLERY_PHOTOS.length - 1) {
        openPhotoModal(currentPhotoIndex + 1);
    }
}

function previousPhoto() {
    if (currentPhotoIndex > 0) {
        openPhotoModal(currentPhotoIndex - 1);
    }
}

/* Close modal & keyboard navigation (tetap sama) */
document.addEventListener('click', function(event) {
    const modal = document.getElementById('photoModal');
    const modalContent = document.querySelector('.modal-content');
    
    if (modal && modal.classList.contains('active') && !modalContent.contains(event.target)) {
        closePhotoModal();
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modal = document.getElementById('photoModal');
        if (modal.classList.contains('active')) closePhotoModal();
        else hideOptionsMenu();
    }
    
    if (document.getElementById('photoModal').classList.contains('active')) {
        if (event.key === 'ArrowRight') nextPhoto();
        else if (event.key === 'ArrowLeft') previousPhoto();
    }
});