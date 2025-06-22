# Take Home Test API - SIMS PPOB

Selamat datang di repositori REST API untuk **SIMS PPOB**. Proyek ini dibangun sebagai bagian dari proses seleksi teknis untuk posisi **Node.js Developer**.

## ✨ Fitur Utama

API ini menyediakan fungsionalitas dasar untuk aplikasi PPOB, antara lain:
-   👤 **Autentikasi Pengguna**: Registrasi dan Login dengan JWT (JSON Web Token).
-   🖼️ **Manajemen Profil**: Melihat dan memperbarui data profil serta foto profil.
-   🎟️ **Layanan PPOB**: Menampilkan daftar layanan yang tersedia.
-   💳 **Manajemen Saldo**: Menampilkan saldo pengguna.
-   Transaction **Transaksi**: Melakukan transaksi pembelian produk PPOB.
-   📜 **Riwayat Transaksi**: Menampilkan riwayat semua transaksi yang pernah dilakukan.

## 🛠️ Teknologi yang Digunakan

Proyek ini dibangun dengan menggunakan teknologi modern dan andal dari ekosistem JavaScript.

| Teknologi | Deskripsi |
| :--- | :--- |
| **Node.js** | Lingkungan eksekusi JavaScript di sisi server. |
| **Express.js** | Kerangka kerja web yang minimalis dan fleksibel untuk Node.js. |
| **PostgreSQL** | Sistem manajemen basis data relasional yang kuat dan open-source. |
| **JWT** | Standar terbuka (RFC 7519) untuk membuat token akses yang aman. |
| **Bcrypt** | Library untuk hashing password sebelum disimpan ke database. |
| **Multer** | Middleware untuk menangani `multipart/form-data` (upload file). |

<p align="left">
  <img src="https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js">
  <img src="https://img.shields.io/badge/PostgreSQL-16-336791?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
</p>

## 🚀 Instalasi & Menjalankan Proyek

Ikuti langkah-langkah di bawah ini untuk menjalankan API ini di lingkungan lokal Anda.

### 1. Kebutuhan Sistem
Pastikan perangkat Anda telah terinstal:
-   [Node.js](https://nodejs.org/)
-   [PostgreSQL](https://www.postgresql.org/download/)

### 2. Langkah-langkah Instalasi

1.  **Clone Repositori**
    ```bash
    git clone https://github.com/anugrah-ir/take-home-test-api.git
    cd take-home-test-api
    ```

2.  **Install Dependensi**
    Gunakan `npm` untuk menginstal semua dependensi yang dibutuhkan.
    ```bash
    npm install
    ```

3.  **Konfigurasi Environment**
    Salin file `.env.example` menjadi `.env` dan sesuaikan nilainya dengan konfigurasi lokal Anda, terutama untuk koneksi database.
    ```bash
    cp .env.example .env
    ```
    Isi dari file `.env` akan terlihat seperti ini:
    ```env
    PORT=8000
    DB_USERNAME=postgres
    DB_PASSWORD=your_password
    DB_HOST=localhost
    DB_NAME=sims_ppob_db
    DB_PORT=5432
    JWT_SECRET_KEY=your_secret_key
    ```

4.  **Setup Database**
    Jalankan perintah ini untuk membuat tabel-tabel yang dibutuhkan (migrasi) di database PostgreSQL Anda.
    ```bash
    npm run setup-db
    ```

5.  **Jalankan Server**
    Setelah semua langkah di atas selesai, jalankan server dengan perintah berikut.
    ```bash
    npm start
    ```
    🎉 Server API akan berjalan di `http://localhost:8000` (atau port yang Anda tentukan di `.env`).

## 📚 Dokumentasi API

Dokumentasi lengkap mengenai semua *endpoint* yang tersedia, format *request*, dan contoh *response* dapat diakses melalui Postman.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/19677420/2sB2xBEqPu)

**Link Dokumentasi:** [https://documenter.getpostman.com/view/19677420/2sB2xBEqPu](https://documenter.getpostman.com/view/19677420/2sB2xBEqPu)

---
Dibuat dengan ❤️ untuk proses seleksi.
