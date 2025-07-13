# GGS_Web: Aplikasi Web Gorontalo Green School

Aplikasi web berbasis **MERN Stack** (MongoDB, Express.js, React.js, Node.js) yang dirancang untuk manajemen kegiatan, profil organisasi, anggota, dan galeri untuk Gorontalo Green School. Dilengkapi dengan fitur interaktif seperti komentar, _like/dislike_, dan dukungan multibahasa.

## 🌟 Fitur Utama

- **Manajemen Profil Organisasi**  
  Membuat, melihat, mengedit, dan menghapus profil organisasi (nama, tanggal berdiri, visi, misi, tentang), termasuk unggah logo.

- **Manajemen Kegiatan**  
  Buat, lihat, edit, hapus kegiatan dengan unggah foto dan simulasi penghapusan latar belakang.

- **Manajemen Anggota**  
  Jadikan pengguna sebagai anggota organisasi dan kelola daftar anggota.

- **Galeri Kegiatan**  
  Tampilkan kegiatan dalam bentuk galeri menarik.

- **Sistem Komentar**  
  Komentar dengan pagination untuk tiap kegiatan.

- **Like & Dislike**  
  Sistem reaksi yang mencegah reaksi ganda dan bisa dibatalkan.

- **Multibahasa**  
  Dukungan Bahasa Indonesia dan Inggris menggunakan `react-i18next`.

- **Autentikasi Pengguna**  
  Sistem login aman menggunakan JWT.

- **Panel Admin**  
  Panel khusus admin untuk mengelola semua data.

## 🛠️ Teknologi yang Digunakan

### Frontend

- React.js
- Redux Toolkit
- React Router DOM
- Ant Design & Tailwind CSS
- HeroUI & react-icons
- dayjs, axios, react-i18next

### Backend

- Node.js & Express.js
- MongoDB & Mongoose
- JWT, bcryptjs
- multer, dotenv, Cloudinary (opsional)

## ⚙️ Prasyarat

Pastikan telah menginstal:

- Node.js (v14+)
- npm atau Yarn
- MongoDB (lokal atau Atlas)
- Git

## 🚀 Instalasi & Konfigurasi

### 1. Klon Repositori

```bash
git clone https://github.com/ruspian/GGS_Web.git
cd GGS_Web
```

### 2. Konfigurasi Backend

```bash
cd backend
npm install
```

Buat file `.env`:

```env
PORT=8080
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/dbname
JWT_SECRET=your_jwt_secret_key

# (Opsional) Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Konfigurasi Frontend

```bash
cd ../frontend
npm install
```

Tidak perlu `.env`, semua API diarahkan ke backend lokal.

### 4. Menjalankan Aplikasi

#### Backend

```bash
cd backend
npm start
```

atau gunakan nodemon

```bash
cd backend

# Install nodemon
npm install -g nodemon

# Jalankan nodemon
nodemon index.js
```

#### Frontend

```bash
cd frontend
npm run dev
```

Frontend: http://localhost:5173  
Backend: http://localhost:3000 (atau sesuai `PORT`)

## 📂 Struktur Proyek

```
GGS_Web/
├── frontend/
│   ├── public/
│   │   └── locales/
│   ├── src/
│   │   ├── assets/
│   │   ├── common/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── utils/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── i18n.js
│   └── package.json
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── .env.example
│   ├── index.js
│   └── package.json
├── .gitignore
├── README.md
```

## 🌐 API Endpoint Penting

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/user/all`
- `POST /api/anggota/create`
- `POST /api/anggota/all`
- `DELETE /api/anggota/delete/:id`
- `POST /api/about/create`
- `GET /api/about/get`
- `PUT /api/about/edit`
- `POST /api/kegiatan/create`
- `GET /api/kegiatan/all`
- `GET /api/kegiatan/get/:id`
- `PUT /api/kegiatan/edit`
- `DELETE /api/kegiatan/delete/:id`
- `POST /api/kegiatan/like-dislike`
- `POST /api/comment/create`
- `POST /api/comment/get-paginated`
- `POST /api/file/upload-image`
- `POST /api/image/remove-background`

## 🤝 Kontribusi

1. Fork repositori
2. Buat branch fitur: `git checkout -b feature/nama-fitur`
3. Commit: `git commit -m 'feat: tambah fitur'`
4. Push: `git push origin feature/nama-fitur`
5. Buka Pull Request

## 📄 Lisensi

Lisensi MIT. Lihat file `LICENSE`.

## 📧 Kontak

Hubungi saya di GitHub: [ruspian](https://github.com/ruspian)
