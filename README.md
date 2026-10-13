# Portal Akademik Terpadu — Institut Teknologi & Sains Mandiri (ITSM)

Aplikasi web portal kampus fiktif untuk latihan keamanan sistem informasi, pengujian penetrasi web (*penetration testing*), dan analisis kerentanan aplikasi.

## 👤 Identitas Pengembang
- **Nama Mahasiswa**: M. Putara Meca Abzanro
- **NIM**: 24781078
- **Kelas**: MI 5C
- **Program Studi**: Manajemen Informatika
- **Perguruan Tinggi**: Politeknik Negeri Lampung

---

## 🏛️ Profil Kampus Fiktif
- **Nama Institusi**: **Institut Teknologi & Sains Mandiri (ITSM)**
- **Sistem**: Sistem Informasi Akademik Terpadu (SIAKAD ITSM)
- **Tautan Live Demo**: [https://mecaabzanro.github.io/portal-kampus-itsm/](https://mecaabzanro.github.io/portal-kampus-itsm/)
- **Tautan Repositori GitHub**: [https://github.com/MecaAbzanro/portal-kampus-itsm](https://github.com/MecaAbzanro/portal-kampus-itsm)

---

## 👥 Akun & Data Sintetis Pengguna

Seluruh data akun dan nilai di bawah ini adalah data sintetis fiktif untuk keperluan latihan:

| No | Nama Pengguna | Username | Kata Sandi | Role / Peran | NIM / NIDN / NIP | Keterangan |
|---|---|---|---|---|---|---|
| 1 | **M. Putara Meca Abzanro** | `meca` | `mhs123` | **Mahasiswa** | 24781078 | Akun Utama Mahasiswa (IPK: 3.88) |
| 2 | **Siti Nurhaliza** | `siti` | `mhs123` | **Mahasiswa** | 24781015 | Akun Mahasiswa 2 (Target IDOR) |
| 3 | **Budi Darmawan** | `budi` | `mhs123` | **Mahasiswa** | 24781023 | Akun Mahasiswa 3 (Percobaan Akademik) |
| 4 | **Dr. Ir. Hendra Wijaya, M.Kom.** | `dosen_hendra` | `dosen123` | **Dosen** | 0219088501 | Dosen Pengampu Keamanan Siber & Web |
| 5 | **Ratna Kusuma, M.T.** | `dosen_ratna` | `dosen123` | **Dosen** | 0214048902 | Dosen Pengampu Basis Data & RPL |
| 6 | **Administrator Sistem (IT Center)** | `admin_itsm` | `adminSuperSecret!` | **Admin** | 198501102010121001 | Super Administrator Pengelola Akun |

> 💡 **Fitur Quick Login**: Terdapat tombol 1-klik di bagian atas web untuk langsung masuk sebagai role yang diinginkan tanpa harus mengetik kata sandi manual.

---

## 🎯 Fitur Berdasarkan Hak Peran (RBAC)
1. **Mahasiswa**:
   - **Masuk Portal**: Autentikasi akun mahasiswa.
   - **Melihat Nilai & KHS**: Menampilkan tabel mata kuliah, nilai tugas, UTS, UAS, nilai huruf, SKS, dan IPK.
   - **Mengunggah Tugas**: Mengirimkan file berkas tugas untuk dinilai dosen.
   - **Berdiskusi**: Berpartisipasi dalam Forum Diskusi Akademik perkuliahan.
   - **Pengaturan Profil**: Mengelola data diri profil mahasiswa.
2. **Dosen**:
   - **Memberi Nilai**: Input dan kalkulasi nilai tugas, UTS, UAS, serta penentuan nilai huruf mahasiswa.
   - **Review Berkas Tugas**: Memeriksa dan membuka file tugas yang diunggah mahasiswa.
   - **Berdiskusi**: Menjawab pertanyaan mahasiswa di forum kelas.
3. **Admin**:
   - **Mengelola Akun**: Menambah pengguna baru, menghapus akun, mengubah data akun civitas akademika.
   - **Audit Log Keamanan**: Memantau catatan aktivitas dan deteksi insiden keamanan sistem.

---

## 🛡️ 4 Kerentanan yang Dibuat Secara Sengaja

Aplikasi ini sengaja ditanami 4 kerentanan web standar OWASP untuk keperluan pengujian dan evaluasi:

### 1. Stored XSS (Cross-Site Scripting)
- **Lokasi Fitur**: Forum Diskusi Akademik (Kolom Komentar Thread).
- **Akar Masalah**: Teks komentar disimpan di basis data/penyimpanan lokal dan dirender ke dokumen HTML menggunakan `innerHTML` tanpa proses sanitasi (*HTML entity encoding*).
- **Dampak**: Skrip JavaScript jahat tersimpan permanen dan tereksekusi di browser seluruh pengguna lain yang membuka thread tersebut.
- **Proof of Concept (PoC)**:
  1. Masuk sebagai mahasiswa (`meca`).
  2. Buka tab **💬 Forum Diskusi**.
  3. Pada salah satu thread, masukkan payload berikut di kolom komentar:
     ```html
     <img src=x onerror="alert('🔴 [STORED XSS BERHASIL]\nPengguna: ' + document.title)">
     ```
  4. Klik **Kirim**. Dialog peringatan `alert()` akan langsung muncul dan tersimpan.

---

### 2. IDOR (Insecure Direct Object Reference) / Kontrol Akses Lemah
- **Lokasi Fitur**: Halaman Lihat Nilai & KHS Mahasiswa.
- **Akar Masalah**: Sistem mengambil data transkrip nilai berdasarkan parameter `targetNim` / parameter URL `?nim=...` tanpa memvalidasi apakah pengakses berhak atas data identitas tersebut.
- **Dampak**: Mahasiswa A (Meca / NIM `24781078`) dapat mengintip nilai akademik, SKS, dan IPK rahasia mahasiswa B (Siti / NIM `24781015`) dan Budi (NIM `24781023`).
- **Proof of Concept (PoC)**:
  1. Masuk sebagai `meca` (NIM 24781078).
  2. Buka tab **📊 Lihat Nilai & KHS**.
  3. Pada panel simulasi IDOR di atas tabel, ganti pilihan NIM ke `24781015` (Siti) atau ubah URL browser menjadi `?nim=24781015`.
  4. Transkrip nilai rahasia mahasiswa lain langsung terbuka.

---

### 3. Eskalasi Hak Akses (Privilege Escalation / Mass Assignment)
- **Lokasi Fitur**: Form Pengaturan Profil Mahasiswa.
- **Akar Masalah**: Endpoint pembaruan profil menerima parameter `role` dari sisi klien tanpa memverifikasi wewenang perubahan hak akses di sisi server.
- **Dampak**: Mahasiswa biasa dapat menaikkan hak akses dirinya (*horizontal/vertical privilege escalation*) menjadi **Dosen** atau **Admin**, sehingga langsung membuka panel pemberian nilai dan manajemen seluruh akun kampus.
- **Proof of Concept (PoC)**:
  1. Masuk sebagai mahasiswa (`meca`).
  2. Buka tab **⚙️ Pengaturan Profil**.
  3. Pada opsi Role Pengguna, ubah dari `mahasiswa` menjadi `admin` atau `dosen`.
  4. Klik **Simpan Perubahan Profil** (atau klik tombol *⚡ Eskalasi Cepat ke Super Admin*).
  5. Menu Admin (Kelola Akun & Audit Log) langsung terbuka dan dapat digunakan penuh.

---

### 4. Validasi Berkas Lemah (Unrestricted File Upload)
- **Lokasi Fitur**: Formulir Pengumpulan Tugas Kuliah.
- **Akar Masalah**: Input file tidak melakukan validasi ekstensi berkas (*whitelist*) maupun pemeriksaan tipe MIME. File web berbahaya (`.html`, `.svg`, `.js`, `.php`) dapat diunggah bebas dan disimpan di penyimpanan aplikasi.
- **Dampak**: *Stored HTML Injection / Client-Side Code Execution* yang dapat mengeksekusi skrip di origin domain saat dosen memeriksa dan membuka berkas tugas.
- **Proof of Concept (PoC)**:
  1. Masuk sebagai mahasiswa (`meca`).
  2. Buka tab **📤 Unggah Tugas**.
  3. Klik tombol **⚡ Contoh Upload Berkas Berbahaya (.html XSS)** atau unggah file berformat `.html`.
  4. Klik tombol **👁️ Buka / Jalankan File Tugas**. Skrip jahat di dalam file HTML akan tereksekusi langsung di tab browser baru.

---

### 🎁 Bonus: SQL Injection (Login Bypass)
- **Lokasi Fitur**: Formulir Masuk (Login).
- **Akar Masalah**: Otentikasi mensimulasikan format query rentan `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`.
- **Proof of Concept (PoC)**:
  1. Buka halaman login.
  2. Masukkan Username: `' OR '1'='1 --`
  3. Masukkan Kata Sandi: bebas (misal: `123456`)
  4. Klik Masuk. Anda akan langsung otomatis login sebagai **Super Administrator**.

---

## 🚀 Cara Menjalankan Secara Mandiri
1. Clone repositori ini:
   ```bash
   git clone https://github.com/MecaAbzanro/portal-kampus-itsm.git
   ```
2. Buka berkas `index.html` langsung di peramban web (browser).
3. Anda dapat langsung menggunakan fitur Quick Login dan membuka drawer **🛡️ Uji 4 Kerentanan Web** untuk panduan PoC instan.
