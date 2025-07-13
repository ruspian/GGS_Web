<<<<<<< HEAD

=======
GGS\_Web: Aplikasi Web Gorontalo Green School
=============================================

Aplikasi web berbasis MERN Stack (MongoDB, Express.js, React.js, Node.js) yang dirancang untuk manajemen kegiatan, profil organisasi, anggota, dan galeri untuk Gorontalo Green School. Dilengkapi dengan fitur interaktif seperti komentar, _like/dislike_, dan dukungan multibahasa.

🌟 Fitur Utama
--------------

*   **Manajemen Profil Organisasi:**
    
    *   Membuat, melihat, mengedit, dan menghapus profil organisasi (nama, tanggal berdiri, visi, misi, tentang).
        
    *   Unggah dan kelola logo profil.
        
*   **Manajemen Kegiatan:**
    
    *   Membuat, melihat, mengedit, dan menghapus detail kegiatan (nama, tanggal, deskripsi, foto).
        
    *   Unggah beberapa foto untuk setiap kegiatan dengan opsi simulasi penghapusan latar belakang.
        
*   **Manajemen Anggota:**
    
    *   Menjadikan pengguna terdaftar sebagai anggota organisasi.
        
    *   Melihat daftar anggota dan menghapus anggota.
        
*   **Galeri Kegiatan:**
    
    *   Menampilkan kegiatan dalam format galeri yang menarik.
        
*   **Sistem Komentar:**
    
    *   Pengguna dapat menambahkan komentar pada setiap kegiatan.
        
    *   Menampilkan komentar dengan fitur _pagination_.
        
*   **Fungsionalitas Like & Dislike:**
    
    *   Pengguna dapat memberikan _like_ atau _dislike_ pada kegiatan.
        
    *   Mencegah _like/dislike_ ganda dan memungkinkan pembatalan.
        
*   **Dukungan Multibahasa:**
    
    *   Tampilan aplikasi dapat dialihkan antara Bahasa Indonesia dan Bahasa Inggris menggunakan react-i18next.
        
*   **Autentikasi Pengguna:**
    
    *   Sistem login dan logout yang aman menggunakan JWT.
        
*   **Panel Admin:**
    
    *   Antarmuka khusus untuk administrator untuk mengelola data.
        

🛠️ Teknologi yang Digunakan
----------------------------

Proyek ini dibangun menggunakan MERN Stack dengan beberapa pustaka dan _framework_ tambahan:

### Frontend (Client)

*   **React.js:** Pustaka JavaScript untuk membangun antarmuka pengguna.
    
*   **Redux Toolkit:** Untuk manajemen _state_ yang efisien dan terprediksi.
    
*   **React Router DOM:** Untuk navigasi antar halaman.
    
*   **Ant Design:** Komponen UI berkualitas tinggi untuk tampilan yang modern.
    
*   **Tailwind CSS:** _Framework_ CSS utilitas untuk _styling_ yang cepat dan responsif.
    
*   **HeroUI:** Komponen UI tambahan.
    
*   **react-icons:** Koleksi ikon populer.
    
*   **dayjs:** Pustaka ringan untuk memanipulasi dan memformat tanggal.
    
*   **axios:** Klien HTTP berbasis _Promise_ untuk membuat permintaan API.
    
*   **react-i18next:** _Framework_ internasionalisasi untuk React.
    

### Backend (Server)

*   **Node.js:** Lingkungan _runtime_ JavaScript.
    
*   **Express.js:** _Framework_ web untuk Node.js.
    
*   **MongoDB:** Database NoSQL yang fleksibel.
    
*   **Mongoose:** Pemodelan objek MongoDB untuk Node.js.
    
*   **JWT (JSON Web Tokens):** Untuk autentikasi pengguna yang aman.
    
*   **bcryptjs:** Untuk _hashing_ kata sandi.
    
*   **multer:** _Middleware_ Node.js untuk menangani _multipart/form-data_ (khususnya _file upload_).
    
*   **dotenv:** Untuk memuat variabel lingkungan dari file .env.
    
*   **Cloudinary:** (Implied) Layanan penyimpanan _cloud_ untuk gambar.
    

⚙️ Prasyarat
------------

Sebelum menjalankan aplikasi ini, pastikan Anda telah menginstal yang berikut:

*   **Node.js** (versi 14 atau lebih baru direkomendasikan)
    
*   **npm** atau **Yarn** (manajer paket Node.js)
    
*   **MongoDB** (server database lokal atau akses ke MongoDB Atlas)
    
*   **Git**
    

🚀 Instalasi & Konfigurasi
--------------------------

Ikuti langkah-langkah di bawah ini untuk menyiapkan dan menjalankan proyek di lingkungan lokal Anda.

### 1\. Klon Repositori

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   git clone https://github.com/ruspian/GGS_Web.git  cd GGS_Web   `

### 2\. Konfigurasi Backend (Server)

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   cd backend  npm install # atau yarn install   `

Buat file .env di dalam folder backend/ dan tambahkan variabel lingkungan berikut:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   PORT=8080 # Port untuk backend Anda, bisa disesuaikan  MONGO_URI=mongodb+srv://:@/?retryWrites=true&w=majority  JWT_SECRET=your_jwt_secret_key # Ganti dengan kunci rahasia yang kuat  # Konfigurasi Cloudinary (jika Anda menggunakannya untuk upload gambar)  CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name  CLOUDINARY_API_KEY=your_cloudinary_api_key  CLOUDINARY_API_SECRET=your_cloudinary_api_secret   `

*   Ganti , , , dan dengan detail koneksi MongoDB Anda (misalnya dari MongoDB Atlas).
    
*   Ganti your\_jwt\_secret\_key dengan string acak yang kuat.
    
*   Jika Anda menggunakan Cloudinary, ganti _placeholder_ dengan kredensial Cloudinary Anda.
    

### 3\. Konfigurasi Frontend (Client)

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   cd ../frontend  npm install # atau yarn install   `

Tidak ada file .env yang diperlukan di sisi _client_ karena semua konfigurasi API ditangani melalui getAPI.js yang mengarah ke _backend_ lokal.

### 4\. Menjalankan Aplikasi

Pastikan Anda menjalankan server _backend_ dan _frontend_ secara terpisah.

#### Menjalankan Backend

Buka terminal baru, navigasikan ke folder backend/, dan jalankan:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   cd backend  npm start # atau node index.js  # gunakan nodemon jika sudah terinstal  nodemon index   `

Server akan berjalan di http://localhost:3000 (atau port yang Anda konfigurasikan).

#### Menjalankan Frontend

Buka terminal lain, navigasikan ke folder frontend/, dan jalankan:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   cd frontend  npm start # atau yarn start  # atau   npm run dev   `

Aplikasi React akan terbuka di _browser_ Anda, biasanya di http://localhost:5173.

📂 Struktur Proyek
------------------

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   GGS_Web/  ├── frontend/                 # Aplikasi Frontend React  │   ├── public/             # File statis dan file terjemahan  │   │   └── locales/        # Folder untuk file terjemahan i18next (id/, en/)  │   ├── src/                # Kode sumber React  │   │   ├── assets/         # Gambar, ikon, dll.  │   │   ├── common/         # Utilitas umum (misal: getAPI.js)  │   │   ├── components/     # Komponen UI yang dapat digunakan kembali  │   │   ├── pages/          # Komponen halaman utama  │   │   ├── store/          # Konfigurasi Redux (slices, store)  │   │   ├── utils/          # Fungsi utilitas (misal: AxiosUtil, uploadImageToBackend)  │   │   ├── App.js          # Komponen utama aplikasi  │   │   ├── index.js        # Entry point React  │   │   └── i18n.js         # Konfigurasi i18next  │   └── package.json  ├── backend/                 # Aplikasi Backend Node.js/Express  │   ├── config/             # Konfigurasi database, Cloudinary  │   ├── controllers/        # Logika bisnis untuk API  │   ├── middleware/         # Middleware Express (autentikasi, error handling)  │   ├── models/             # Skema Mongoose untuk MongoDB  │   ├── routes/             # Definisi rute API  │   ├── uploads/            # (Opsional) Folder untuk menyimpan file yang diunggah secara lokal  │   ├── .env.example        # Contoh file .env  │   ├── index.js            # Entry point server  │   └── package.json  ├── .gitignore  ├── README.md               # Dokumentasi proyek ini  └── package.json            # File package.json utama (jika ada)   `

🌐 API Endpoint Penting (Contoh)
--------------------------------

Berikut adalah beberapa _endpoint_ API kunci yang digunakan dalam aplikasi ini:

*   POST /api/auth/register - Registrasi Pengguna
    
*   POST /api/auth/login - Login Pengguna
    
*   GET /api/user/all - Mendapatkan semua data pengguna (untuk manajemen anggota)
    
*   POST /api/anggota/create - Menjadikan pengguna sebagai anggota
    
*   POST /api/anggota/all - Mendapatkan semua data anggota dengan _pagination_
    
*   DELETE /api/anggota/delete/:id - Menghapus anggota
    
*   POST /api/about/create - Membuat profil organisasi
    
*   GET /api/about/get - Mendapatkan profil organisasi
    
*   PUT /api/about/edit - Mengedit profil organisasi
    
*   POST /api/kegiatan/create - Membuat kegiatan baru
    
*   GET /api/kegiatan/all - Mendapatkan semua kegiatan
    
*   GET /api/kegiatan/get/:id - Mendapatkan detail kegiatan berdasarkan ID
    
*   PUT /api/kegiatan/edit - Mengedit kegiatan
    
*   DELETE /api/kegiatan/delete/:id - Menghapus kegiatan
    
*   POST /api/kegiatan/like-dislike - Memberikan _like_ atau _dislike_ pada kegiatan
    
*   POST /api/comment/create - Menambahkan komentar pada kegiatan
    
*   POST /api/comment/get-paginated - Mendapatkan komentar dengan _pagination_
    
*   POST /api/file/upload-image - Mengunggah gambar ke Cloudinary (melalui _backend_)
    
*   POST /api/image/remove-background - **(Simulasi)** _Endpoint_ untuk menghapus latar belakang gambar. **Perhatian:** Ini adalah _placeholder_. Untuk produksi, Anda perlu mengimplementasikan logika _backend_ nyata untuk memanggil layanan penghapus latar belakang (misalnya, rembg di Python) dan mengembalikan URL gambar transparan.
    

🤝 Kontribusi
-------------

Kontribusi sangat dihargai! Jika Anda ingin berkontribusi pada proyek ini, silakan ikuti langkah-langkah berikut:

1.  _Fork_ repositori ini.
    
2.  Buat _branch_ baru: git checkout -b feature/nama-fitur-baru
    
3.  Lakukan perubahan Anda dan _commit_ perubahan tersebut: git commit -m 'feat: tambahkan fitur baru'
    
4.  _Push_ ke _branch_ Anda: git push origin feature/nama-fitur-baru
    
5.  Buka _Pull Request_.
    

📄 Lisensi
----------

Proyek ini dilisensikan di bawah Lisensi MIT. Lihat file [LICENSE](https://www.google.com/search?q=LICENSE) untuk detail lebih lanjut.

📧 Kontak
---------

Jika Anda memiliki pertanyaan atau saran, jangan ragu untuk menghubungi saya melalui profil GitHub saya: [ruspian](https://www.google.com/search?q=https://github.com/ruspian).
>>>>>>> a78c12d (ADD README)
