GGS_Web: Aplikasi Web Gorontalo Green School
Aplikasi web berbasis MERN Stack (MongoDB, Express.js, React.js, Node.js) yang dirancang untuk manajemen kegiatan, profil organisasi, anggota, dan galeri untuk Gorontalo Green School. Dilengkapi dengan fitur interaktif seperti komentar, like/dislike, dan dukungan multibahasa.

🌟 Fitur Utama
Manajemen Profil Organisasi:

Membuat, melihat, mengedit, dan menghapus profil organisasi (nama, tanggal berdiri, visi, misi, tentang).

Unggah dan kelola logo profil.

Manajemen Kegiatan:

Membuat, melihat, mengedit, dan menghapus detail kegiatan (nama, tanggal, deskripsi, foto).

Unggah beberapa foto untuk setiap kegiatan dengan opsi simulasi penghapusan latar belakang.

Manajemen Anggota:

Menjadikan pengguna terdaftar sebagai anggota organisasi.

Melihat daftar anggota dan menghapus anggota.

Galeri Kegiatan:

Menampilkan kegiatan dalam format galeri yang menarik.

Sistem Komentar:

Pengguna dapat menambahkan komentar pada setiap kegiatan.

Menampilkan komentar dengan fitur pagination.

Fungsionalitas Like & Dislike:

Pengguna dapat memberikan like atau dislike pada kegiatan.

Mencegah like/dislike ganda dan memungkinkan pembatalan.

Dukungan Multibahasa:

Tampilan aplikasi dapat dialihkan antara Bahasa Indonesia dan Bahasa Inggris menggunakan react-i18next.

Autentikasi Pengguna:

Sistem login dan logout yang aman menggunakan JWT.

Panel Admin:

Antarmuka khusus untuk administrator untuk mengelola data.

🛠️ Teknologi yang Digunakan
Proyek ini dibangun menggunakan MERN Stack dengan beberapa pustaka dan framework tambahan:

Frontend (Client)
React.js: Pustaka JavaScript untuk membangun antarmuka pengguna.

Redux Toolkit: Untuk manajemen state yang efisien dan terprediksi.

React Router DOM: Untuk navigasi antar halaman.

Ant Design: Komponen UI berkualitas tinggi untuk tampilan yang modern.

Tailwind CSS: Framework CSS utilitas untuk styling yang cepat dan responsif.

HeroUI: Komponen UI tambahan.

react-icons: Koleksi ikon populer.

dayjs: Pustaka ringan untuk memanipulasi dan memformat tanggal.

axios: Klien HTTP berbasis Promise untuk membuat permintaan API.

react-i18next: Framework internasionalisasi untuk React.

Backend (Server)
Node.js: Lingkungan runtime JavaScript.

Express.js: Framework web untuk Node.js.

MongoDB: Database NoSQL yang fleksibel.

Mongoose: Pemodelan objek MongoDB untuk Node.js.

JWT (JSON Web Tokens): Untuk autentikasi pengguna yang aman.

bcryptjs: Untuk hashing kata sandi.

multer: Middleware Node.js untuk menangani multipart/form-data (khususnya file upload).

dotenv: Untuk memuat variabel lingkungan dari file .env.

Cloudinary: (Implied) Layanan penyimpanan cloud untuk gambar.

⚙️ Prasyarat
Sebelum menjalankan aplikasi ini, pastikan Anda telah menginstal yang berikut:

Node.js (versi 14 atau lebih baru direkomendasikan)

npm atau Yarn (manajer paket Node.js)

MongoDB (server database lokal atau akses ke MongoDB Atlas)

Git

🚀 Instalasi & Konfigurasi
Ikuti langkah-langkah di bawah ini untuk menyiapkan dan menjalankan proyek di lingkungan lokal Anda.

1. Klon Repositori
git clone https://github.com/ruspian/GGS_Web.git
cd GGS_Web

2. Konfigurasi Backend (Server)
cd backend
npm install # atau yarn install

Buat file .env di dalam folder backend/ dan tambahkan variabel lingkungan berikut:

PORT=8080 # Port untuk backend Anda, bisa disesuaikan
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key # Ganti dengan kunci rahasia yang kuat
# Konfigurasi Cloudinary (jika Anda menggunakannya untuk upload gambar)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

Ganti <username>, <password>, <cluster-url>, dan <database-name> dengan detail koneksi MongoDB Anda (misalnya dari MongoDB Atlas).

Ganti your_jwt_secret_key dengan string acak yang kuat.

Jika Anda menggunakan Cloudinary, ganti placeholder dengan kredensial Cloudinary Anda.

3. Konfigurasi Frontend (Client)
cd ../frontend
npm install # atau yarn install

Tidak ada file .env yang diperlukan di sisi client karena semua konfigurasi API ditangani melalui getAPI.js yang mengarah ke backend lokal.

4. Menjalankan Aplikasi
Pastikan Anda menjalankan server backend dan frontend secara terpisah.

Menjalankan Backend
Buka terminal baru, navigasikan ke folder backend/, dan jalankan:

cd backend
npm start # atau node index.js

# gunakan nodemon jika sudah terinstal
nodemon index

Server akan berjalan di http://localhost:3000 (atau port yang Anda konfigurasikan).

Menjalankan Frontend
Buka terminal lain, navigasikan ke folder frontend/, dan jalankan:

cd frontend
npm start # atau yarn start

# atau 
npm run dev

Aplikasi React akan terbuka di browser Anda, biasanya di http://localhost:5173.

📂 Struktur Proyek
GGS_Web/
├── frontend/                 # Aplikasi Frontend React
│   ├── public/             # File statis dan file terjemahan
│   │   └── locales/        # Folder untuk file terjemahan i18next (id/, en/)
│   ├── src/                # Kode sumber React
│   │   ├── assets/         # Gambar, ikon, dll.
│   │   ├── common/         # Utilitas umum (misal: getAPI.js)
│   │   ├── components/     # Komponen UI yang dapat digunakan kembali
│   │   ├── pages/          # Komponen halaman utama
│   │   ├── store/          # Konfigurasi Redux (slices, store)
│   │   ├── utils/          # Fungsi utilitas (misal: AxiosUtil, uploadImageToBackend)
│   │   ├── App.js          # Komponen utama aplikasi
│   │   ├── index.js        # Entry point React
│   │   └── i18n.js         # Konfigurasi i18next
│   └── package.json
├── backend/                 # Aplikasi Backend Node.js/Express
│   ├── config/             # Konfigurasi database, Cloudinary
│   ├── controllers/        # Logika bisnis untuk API
│   ├── middleware/         # Middleware Express (autentikasi, error handling)
│   ├── models/             # Skema Mongoose untuk MongoDB
│   ├── routes/             # Definisi rute API
│   ├── uploads/            # (Opsional) Folder untuk menyimpan file yang diunggah secara lokal
│   ├── .env.example        # Contoh file .env
│   ├── index.js            # Entry point server
│   └── package.json
├── .gitignore
├── README.md               # Dokumentasi proyek ini
└── package.json            # File package.json utama (jika ada)

🌐 API Endpoint Penting (Contoh)
Berikut adalah beberapa endpoint API kunci yang digunakan dalam aplikasi ini:

POST /api/auth/register - Registrasi Pengguna

POST /api/auth/login - Login Pengguna

GET /api/user/all - Mendapatkan semua data pengguna (untuk manajemen anggota)

POST /api/anggota/create - Menjadikan pengguna sebagai anggota

POST /api/anggota/all - Mendapatkan semua data anggota dengan pagination

DELETE /api/anggota/delete/:id - Menghapus anggota

POST /api/about/create - Membuat profil organisasi

GET /api/about/get - Mendapatkan profil organisasi

PUT /api/about/edit - Mengedit profil organisasi

POST /api/kegiatan/create - Membuat kegiatan baru

GET /api/kegiatan/all - Mendapatkan semua kegiatan

GET /api/kegiatan/get/:id - Mendapatkan detail kegiatan berdasarkan ID

PUT /api/kegiatan/edit - Mengedit kegiatan

DELETE /api/kegiatan/delete/:id - Menghapus kegiatan

POST /api/kegiatan/like-dislike - Memberikan like atau dislike pada kegiatan

POST /api/comment/create - Menambahkan komentar pada kegiatan

POST /api/comment/get-paginated - Mendapatkan komentar dengan pagination

POST /api/file/upload-image - Mengunggah gambar ke Cloudinary (melalui backend)

POST /api/image/remove-background - (Simulasi) Endpoint untuk menghapus latar belakang gambar. Perhatian: Ini adalah placeholder. Untuk produksi, Anda perlu mengimplementasikan logika backend nyata untuk memanggil layanan penghapus latar belakang (misalnya, rembg di Python) dan mengembalikan URL gambar transparan.

🤝 Kontribusi
Kontribusi sangat dihargai! Jika Anda ingin berkontribusi pada proyek ini, silakan ikuti langkah-langkah berikut:

Fork repositori ini.

Buat branch baru: git checkout -b feature/nama-fitur-baru

Lakukan perubahan Anda dan commit perubahan tersebut: git commit -m 'feat: tambahkan fitur baru'

Push ke branch Anda: git push origin feature/nama-fitur-baru

Buka Pull Request.

📄 Lisensi
Proyek ini dilisensikan di bawah Lisensi MIT. Lihat file LICENSE untuk detail lebih lanjut.

📧 Kontak
Jika Anda memiliki pertanyaan atau saran, jangan ragu untuk menghubungi saya melalui profil GitHub saya: ruspian.
