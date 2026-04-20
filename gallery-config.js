/**
 * GALLERY CONFIGURATION
 * 
 * Cara menambah foto:
 * 1. Letakkan file foto di folder "images/gallery/" 
 * 2. Tambahkan object baru di array "GALLERY_PHOTOS" di bawah
 * 3. Isi semua field sesuai data foto
 * 4. Simpan file ini
 * 
 * Untuk menghapus foto:
 * 1. Hapus object dari array
 * 2. Simpan file ini
 * (File gambar bisa dihapus atau dibiarkan di folder, tidak akan tampil jika tidak ada di config)
 */

const GALLERY_PHOTOS = [
   
];

/**
 * TEMPLATE UNTUK MENAMBAH FOTO BARU
 * 
 * Copy-paste code di bawah dan sesuaikan data:
 * 
 * {
 *     id: [NOMOR_URUT],
 *     title: "[NAMA_FOTO]",
 *     photographer: "[NAMA_FOTOGRAFER]",
 *     location: "[NAMA_LOKASI]",
 *     imagePath: "images/gallery/[NAMA_FILE].jpg",
 *     downloadUrl: "images/gallery/[NAMA_FILE].jpg",
 *     category: "nature" // atau "urban"
 * },
 * 
 * Contoh:
 * {
 *     id: 7,
 *     title: "Sunset at Sea",
 *     photographer: "John Doe",
 *     location: "Lombok Beach, NTB",
 *     imagePath: "images/gallery/sunset-sea-1.jpg",
 *     downloadUrl: "images/gallery/sunset-sea-1.jpg",
 *     category: "nature"
 * },
 */

// FIELD PENJELASAN:
// id               : Nomor unik untuk setiap foto (jangan duplikat)
// title            : Judul/nama foto
// photographer     : Nama fotografer yang mengambil foto
// location         : Nama lokasi/tempat foto diambil
// imagePath        : Path ke file gambar untuk preview (relative atau absolute URL)
// downloadUrl      : Path ke file untuk di-download (bisa sama dengan imagePath atau berbeda)
// category         : Kategori foto ("nature" untuk alam, "urban" untuk perkotaan)
//
// Tips:
// - Path relatif lebih bagus: "images/gallery/nama-file.jpg"
// - Untuk URL eksternal: "https://example.com/image.jpg"
// - Format gambar yang didukung: .jpg, .jpeg, .png, .webp
// - Ukuran gambar ideal: 1200x800px untuk preview yang bagus