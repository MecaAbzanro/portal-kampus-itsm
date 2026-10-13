/**
 * SISTEM INFORMASI AKADEMIK TERPADU (SIAKAD 4.0)
 * INSTITUT TEKNOLOGI & SAINS MANDIRI (ITSM)
 * Praktikum Keamanan Sistem Informasi
 * 
 * Fitur Role Realistis:
 * - Mahasiswa: Beranda Dashboard, KHS & Transkrip, E-Learning/Tugas, Forum Kelas, Biodata
 * - Dosen: Penilaian Mahasiswa, Review Tugas
 * - Admin: Manajemen Akun Pengguna, Audit Log Keamanan
 * 
 * 4 Kerentanan Sengaja:
 * 1. Stored XSS (Forum Diskusi Kelas)
 * 2. IDOR (KHS & Transkrip Nilai)
 * 3. Eskalasi Hak Akses (Biodata & Pengaturan Profil)
 * 4. Validasi Berkas Lemah (E-Learning & Unggah Tugas)
 * + Bonus: SQL Injection pada Login SSO
 */

const DB_VERSION = "itsm_siakad_v3";

const DEFAULT_USERS = [
  {
    id: 1,
    username: "meca",
    password: "mhs123",
    nama: "M. Putara Meca Abzanro",
    nomor_induk: "24781078",
    role: "mahasiswa",
    prodi: "D3 Manajemen Informatika",
    jurusan: "Teknologi Informasi",
    semester: 5,
    email: "meca.24781078@student.itsm.ac.id",
    status: "Aktif",
    dosen_pa: "Dr. Ir. Hendra Wijaya, M.Kom.",
    ipk: 3.88,
    sks: 94
  },
  {
    id: 2,
    username: "siti",
    password: "mhs123",
    nama: "Siti Nurhaliza",
    nomor_induk: "24781015",
    role: "mahasiswa",
    prodi: "D3 Manajemen Informatika",
    jurusan: "Teknologi Informasi",
    semester: 5,
    email: "siti.24781015@student.itsm.ac.id",
    status: "Aktif",
    dosen_pa: "Ratna Kusuma, M.T.",
    ipk: 3.42,
    sks: 94
  },
  {
    id: 3,
    username: "budi",
    password: "mhs123",
    nama: "Budi Darmawan",
    nomor_induk: "24781023",
    role: "mahasiswa",
    prodi: "S1 Teknik Informatika",
    jurusan: "Ilmu Komputer",
    semester: 5,
    email: "budi.24781023@student.itsm.ac.id",
    status: "Percobaan Akademik",
    dosen_pa: "Dr. Ir. Hendra Wijaya, M.Kom.",
    ipk: 2.15,
    sks: 82
  },
  {
    id: 4,
    username: "dosen_hendra",
    password: "dosen123",
    nama: "Dr. Ir. Hendra Wijaya, M.Kom.",
    nomor_induk: "0219088501",
    role: "dosen",
    prodi: "Teknologi Informasi",
    jurusan: "Teknologi Informasi",
    email: "hendra.wijaya@itsm.ac.id",
    status: "Dosen Tetap Lektor",
    matkul_ampu: ["Keamanan Sistem Informasi & Siber", "Pemrograman Web Lanjut & API"]
  },
  {
    id: 5,
    username: "dosen_ratna",
    password: "dosen123",
    nama: "Ratna Kusuma, M.T.",
    nomor_induk: "0214048902",
    role: "dosen",
    prodi: "Manajemen Informatika",
    jurusan: "Teknologi Informasi",
    email: "ratna.kusuma@itsm.ac.id",
    status: "Dosen Tetap Asisten Ahli",
    matkul_ampu: ["Manajemen Basis Data & SQL", "Rekayasa Perangkat Lunak"]
  },
  {
    id: 6,
    username: "admin_itsm",
    password: "adminSuperSecret!",
    nama: "Administrator Sistem (IT Center)",
    nomor_induk: "198501102010121001",
    role: "admin",
    prodi: "Pusat Komputer & SI",
    jurusan: "Biro Administrasi Akademik",
    email: "puskom@itsm.ac.id",
    status: "Super Administrator"
  }
];

const DEFAULT_GRADES = [
  // Meca (NIM: 24781078)
  { nim: "24781078", kode: "IF501", matkul: "Keamanan Sistem Informasi & Siber", sks: 3, tugas: 95, uts: 92, uas: 90, huruf: "A", bobot: 4.0, dosen: "Dr. Ir. Hendra Wijaya, M.Kom." },
  { nim: "24781078", kode: "IF502", matkul: "Pemrograman Web Lanjut & API", sks: 3, tugas: 90, uts: 88, uas: 92, huruf: "A", bobot: 4.0, dosen: "Dr. Ir. Hendra Wijaya, M.Kom." },
  { nim: "24781078", kode: "IF503", matkul: "Manajemen Basis Data & SQL", sks: 3, tugas: 85, uts: 86, uas: 88, huruf: "A-", bobot: 3.75, dosen: "Ratna Kusuma, M.T." },
  { nim: "24781078", kode: "IF504", matkul: "Rekayasa Perangkat Lunak", sks: 3, tugas: 88, uts: 90, uas: 87, huruf: "A-", bobot: 3.75, dosen: "Ratna Kusuma, M.T." },
  
  // Siti (NIM: 24781015)
  { nim: "24781015", kode: "IF501", matkul: "Keamanan Sistem Informasi & Siber", sks: 3, tugas: 82, uts: 78, uas: 80, huruf: "B+", bobot: 3.5, dosen: "Dr. Ir. Hendra Wijaya, M.Kom." },
  { nim: "24781015", kode: "IF502", matkul: "Pemrograman Web Lanjut & API", sks: 3, tugas: 85, uts: 80, uas: 84, huruf: "B+", bobot: 3.5, dosen: "Dr. Ir. Hendra Wijaya, M.Kom." },
  { nim: "24781015", kode: "IF503", matkul: "Manajemen Basis Data & SQL", sks: 3, tugas: 76, uts: 74, uas: 75, huruf: "B", bobot: 3.0, dosen: "Ratna Kusuma, M.T." },
  { nim: "24781015", kode: "IF504", matkul: "Rekayasa Perangkat Lunak", sks: 3, tugas: 80, uts: 79, uas: 81, huruf: "B+", bobot: 3.5, dosen: "Ratna Kusuma, M.T." },

  // Budi (NIM: 24781023)
  { nim: "24781023", kode: "IF501", matkul: "Keamanan Sistem Informasi & Siber", sks: 3, tugas: 50, uts: 55, uas: 48, huruf: "D", bobot: 1.0, dosen: "Dr. Ir. Hendra Wijaya, M.Kom." },
  { nim: "24781023", kode: "IF502", matkul: "Pemrograman Web Lanjut & API", sks: 3, tugas: 60, uts: 62, uas: 65, huruf: "C", bobot: 2.0, dosen: "Dr. Ir. Hendra Wijaya, M.Kom." },
  { nim: "24781023", kode: "IF503", matkul: "Manajemen Basis Data & SQL", sks: 3, tugas: 45, uts: 50, uas: 40, huruf: "E", bobot: 0.0, dosen: "Ratna Kusuma, M.T." },
  { nim: "24781023", kode: "IF504", matkul: "Rekayasa Perangkat Lunak", sks: 3, tugas: 65, uts: 60, uas: 62, huruf: "C+", bobot: 2.5, dosen: "Ratna Kusuma, M.T." }
];

const DEFAULT_SCHEDULE = [
  { hari: "Senin", jam: "08:00 - 10:30 WIB", kode: "IF501", matkul: "Keamanan Sistem Informasi & Siber", sks: 3, ruang: "Lab Cyber Security 302", dosen: "Dr. Ir. Hendra Wijaya, M.Kom." },
  { hari: "Selasa", jam: "10:00 - 12:30 WIB", kode: "IF502", matkul: "Pemrograman Web Lanjut & API", sks: 3, ruang: "Lab Rekayasa Web 201", dosen: "Dr. Ir. Hendra Wijaya, M.Kom." },
  { hari: "Rabu", jam: "13:00 - 15:30 WIB", kode: "IF503", matkul: "Manajemen Basis Data & SQL", sks: 3, ruang: "Lab Database 104", dosen: "Ratna Kusuma, M.T." },
  { hari: "Kamis", jam: "08:00 - 10:30 WIB", kode: "IF504", matkul: "Rekayasa Perangkat Lunak", sks: 3, ruang: "Gedung Teori Lt. 4 (R.405)", dosen: "Ratna Kusuma, M.T." }
];

const DEFAULT_THREADS = [
  {
    id: 1,
    author: "Dr. Ir. Hendra Wijaya, M.Kom.",
    role: "dosen",
    matkul: "Keamanan Sistem Informasi & Siber",
    title: "Pengumpulan Tugas Analisis Kerentanan Web & Prompt Injection",
    content: "Silakan unggah dokumen laporan beserta tautan video pengujian sebelum batas akhir hari Jumat pukul 23:59 WIB. Jika ada pertanyaan mengenai skema payload dan validasi input, silakan diskusikan di kolom komentar bawah ini.",
    time: "Hari ini, 09:30 WIB",
    comments: [
      {
        author: "M. Putara Meca Abzanro",
        role: "mahasiswa",
        text: "Pak, apakah pengujian pada web dummy diperbolehkan menyertakan payload Stored XSS dan manipulasi IDOR?",
        time: "Hari ini, 10:15 WIB"
      },
      {
        author: "Dr. Ir. Hendra Wijaya, M.Kom.",
        role: "dosen",
        text: "Tentu Meca, justru itu menjadi poin penilaian utama dalam mendemonstrasikan aspek kerentanan aplikasi.",
        time: "Hari ini, 10:45 WIB"
      }
    ]
  },
  {
    id: 2,
    author: "Ratna Kusuma, M.T.",
    role: "dosen",
    matkul: "Pemrograman Web Lanjut & API",
    title: "Materi Kuliah: Arsitektur Defense-in-Depth pada Form Upload & Otentikasi",
    content: "Mahasiswa diharapkan memahami mengapa input validation dan role-based access control (RBAC) harus ditegakkan di sisi server/backend, bukan sekadar filter UI di browser.",
    time: "Kemarin, 14:00 WIB",
    comments: [
      {
        author: "Siti Nurhaliza",
        role: "mahasiswa",
        text: "Terima kasih materinya Bu Ratna, sangat bermanfaat untuk pemahaman tugas kami.",
        time: "Kemarin, 15:20 WIB"
      }
    ]
  }
];

const DEFAULT_SUBMISSIONS = [
  {
    id: 1,
    nim: "24781078",
    nama: "M. Putara Meca Abzanro",
    matkul: "Keamanan Sistem Informasi & Siber",
    judul: "Tugas 1 - Laporan Analisis Kerentanan Web OWASP",
    nama_file: "laporan_keamanan_meca.pdf",
    tipe_file: "application/pdf",
    konten_file: "JVBERi0xLjQKJ...(Simulasi Berkas Dokumen PDF)",
    waktu: "12 Okt 2026, 14:20 WIB",
    status: "Sudah Dinilai",
    nilai: 95
  },
  {
    id: 2,
    nim: "24781015",
    nama: "Siti Nurhaliza",
    matkul: "Keamanan Sistem Informasi & Siber",
    judul: "Tugas 1 - Laporan Analisis Kerentanan Web OWASP",
    nama_file: "laporan_siti_tugas1.docx",
    tipe_file: "application/vnd.openxmlformats-officedocument",
    konten_file: "PK...(Simulasi Berkas Dokumen Word)",
    waktu: "12 Okt 2026, 16:45 WIB",
    status: "Sudah Dinilai",
    nilai: 82
  }
];

// Helper Storage
function getStorage(key, fallback) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (e) {
    return fallback;
  }
}

function setStorage(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {}
}

// Inisialisasi Database
if (!localStorage.getItem(DB_VERSION)) {
  localStorage.setItem(DB_VERSION, "true");
  setStorage("itsm_users", DEFAULT_USERS);
  setStorage("itsm_grades", DEFAULT_GRADES);
  setStorage("itsm_threads", DEFAULT_THREADS);
  setStorage("itsm_submissions", DEFAULT_SUBMISSIONS);
  setStorage("itsm_logs", [
    { time: new Date().toLocaleTimeString(), action: "SIAKAD ITSM Booted", user: "system", ip: "127.0.0.1" }
  ]);
}

let currentUser = getStorage("itsm_current_user", null);
let currentPage = "beranda";

// Inisialisasi Dokumen
document.addEventListener("DOMContentLoaded", () => {
  startClock();
  setupEvents();

  if (currentUser) {
    showDashboard();
  } else {
    // Default masuk sebagai Meca agar langsung menampilkan dashboard realistik
    quickLogin("meca");
  }
});

// Jam Digital
function startClock() {
  const clockElem = document.getElementById("liveTimeClock");
  function tick() {
    if (clockElem) {
      const now = new Date();
      clockElem.innerText = now.toLocaleTimeString("id-ID", { hour12: false }) + " WIB";
    }
  }
  tick();
  setInterval(tick, 1000);
}

// Toast Notifikasi
function showToast(msg, isWarn = false) {
  const container = document.getElementById("toastContainer");
  if (!container) return;
  const t = document.createElement("div");
  t.className = "toast-item";
  if (isWarn) t.style.borderLeftColor = "#ef4444";
  t.innerHTML = msg;
  container.appendChild(t);
  setTimeout(() => {
    t.style.opacity = "0";
    setTimeout(() => t.remove(), 250);
  }, 4000);
}

// Log Aktivitas
function logActivity(action, details = "") {
  const logs = getStorage("itsm_logs", []);
  logs.unshift({
    time: new Date().toLocaleTimeString("id-ID") + " WIB",
    user: currentUser ? `${currentUser.nama} (${currentUser.role})` : "Guest",
    action: action,
    details: details
  });
  setStorage("itsm_logs", logs.slice(0, 50));
}

// Render User Section di Header
function renderHeaderUser() {
  const area = document.getElementById("headerUserSection");
  if (!area) return;

  if (!currentUser) {
    area.innerHTML = `
      <button class="btn-gov btn-gov-primary btn-gov-sm" onclick="showAuth()">Masuk SSO</button>
    `;
    return;
  }

  const initial = currentUser.nama ? currentUser.nama.charAt(0) : "U";
  area.innerHTML = `
    <div class="user-profile-widget" onclick="navTo('profil')">
      <div class="avatar-img">${initial}</div>
      <div class="user-meta-text">
        <div class="user-name-title">${escapeHTML(currentUser.nama)}</div>
        <div class="user-sub-id">${escapeHTML(currentUser.nomor_induk)} · <b style="text-transform:uppercase; color:#2563eb;">${currentUser.role}</b></div>
      </div>
    </div>
    <button class="btn-gov btn-gov-secondary btn-gov-sm" onclick="logout()" title="Keluar dari sesi portal">
      🚪 Keluar
    </button>
  `;
}

// Auth Controller
function showAuth() {
  document.getElementById("authSection").style.display = "flex";
  document.getElementById("dashboardSection").style.display = "none";
}

function showDashboard() {
  document.getElementById("authSection").style.display = "none";
  document.getElementById("dashboardSection").style.display = "flex";
  renderHeaderUser();
  updateSidebarMenu();
  navTo(currentPage);
}

function login(username, password) {
  const users = getStorage("itsm_users", DEFAULT_USERS);

  // SIMULASI SQL INJECTION
  if (username.includes("' OR '1'='1") || username.includes("' OR 1=1") || username.includes("'--")) {
    logActivity("⚠️ SQL INJECTION AUTH BYPASS", `Statement: "${username}" berhasil membypass login!`);
    showToast("⚠️ <b>SQL Injection Terpicu!</b> Autentikasi berhasil dibypass via <code>' OR '1'='1</code>. Masuk sebagai Super Administrator!", true);
    const adminUser = users.find(u => u.role === "admin") || users[0];
    setCurrentUser(adminUser);
    return;
  }

  const found = users.find(u => (u.username === username || u.nomor_induk === username) && u.password === password);
  if (found) {
    setCurrentUser(found);
    showToast(`Selamat datang kembali, <b>${found.nama}</b>!`);
    logActivity("Login Berhasil", `User: ${found.username} (${found.role})`);
  } else {
    showToast("❌ Kredensial tidak valid. Silakan periksa kembali nomor induk atau sandi Anda.", true);
  }
}

function setCurrentUser(user) {
  currentUser = { ...user };
  setStorage("itsm_current_user", currentUser);
  currentPage = "beranda";
  showDashboard();
}

function logout() {
  logActivity("Logout Pengguna", `User: ${currentUser?.username || "Anonim"}`);
  currentUser = null;
  localStorage.removeItem("itsm_current_user");
  renderHeaderUser();
  showAuth();
  showToast("Anda telah keluar dari Portal SIAKAD ITSM.");
}

function quickLogin(uname) {
  const users = getStorage("itsm_users", DEFAULT_USERS);
  const u = users.find(x => x.username === uname);
  if (u) {
    setCurrentUser(u);
    showToast(`Beralih ke akun resmi: <b>${u.nama}</b> [${u.role.toUpperCase()}]`);
  }
}

// Navigasi Sidebar
function updateSidebarMenu() {
  const dosenGroup = document.getElementById("sidebarDosenGroup");
  const adminGroup = document.getElementById("sidebarAdminGroup");

  if (dosenGroup) {
    dosenGroup.style.display = (currentUser.role === "dosen" || currentUser.role === "admin") ? "block" : "none";
  }
  if (adminGroup) {
    adminGroup.style.display = (currentUser.role === "admin") ? "block" : "none";
  }
}

function navTo(pageId) {
  currentPage = pageId;
  document.querySelectorAll(".sidebar-nav-item").forEach(item => {
    item.classList.remove("active");
  });
  const activeNav = document.getElementById(`nav-${pageId}`);
  if (activeNav) activeNav.classList.add("active");

  const container = document.getElementById("portalMainContent");
  if (!container) return;

  switch (pageId) {
    case "beranda":
      renderBerandaView(container);
      break;
    case "nilai":
      renderNilaiView(container);
      break;
    case "tugas":
      renderTugasView(container);
      break;
    case "forum":
      renderForumView(container);
      break;
    case "profil":
      renderProfilView(container);
      break;
    case "grading":
      renderGradingView(container);
      break;
    case "review_tugas":
      renderReviewTugasView(container);
      break;
    case "admin_users":
      renderAdminUsersView(container);
      break;
    case "audit_logs":
      renderAuditLogsView(container);
      break;
    default:
      renderBerandaView(container);
  }
}

// ==========================================
// 1. BERANDA DASHBOARD AKADEMIK REALISTIS
// ==========================================
function renderBerandaView(container) {
  const isMahasiswa = currentUser.role === "mahasiswa";

  container.innerHTML = `
    <!-- Header Halaman -->
    <div class="page-header-row">
      <div class="page-title">
        <h2>Dashboard Akademik Terpadu</h2>
        <p>Selamat Datang di Sistem Informasi Akademik Institut Teknologi &amp; Sains Mandiri</p>
      </div>
      <div class="academic-period-badge">
        📅 Semester Ganjil 2026/2027 · Minggu Efektif Ke-8
      </div>
    </div>

    <!-- Banner Sambutan Resmi -->
    <div class="academic-card" style="background: linear-gradient(135deg, #1e3a8a, #1e40af); color:#ffffff; border:none;">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
        <div>
          <div style="font-size:12px; text-transform:uppercase; color:#93c5fd; font-weight:700; letter-spacing:0.5px;">Selamat Datang Kembali,</div>
          <h3 style="font-size:22px; font-weight:800; margin-top:2px;">${escapeHTML(currentUser.nama)}</h3>
          <p style="font-size:13px; color:#bfdbfe; margin-top:4px;">
            ${escapeHTML(currentUser.nomor_induk)} · ${escapeHTML(currentUser.prodi || 'Civitas Akademika')} · Status: <span style="background:#10b981; color:#fff; padding:2px 8px; border-radius:4px; font-weight:700; font-size:11px;">${currentUser.status || 'Aktif'}</span>
          </p>
        </div>
        <div style="text-align:right;">
          <div style="font-size:11.5px; color:#93c5fd;">Dosen Pembimbing Akademik (PA):</div>
          <div style="font-size:14px; font-weight:700;">${escapeHTML(currentUser.dosen_pa || 'Dr. Ir. Hendra Wijaya, M.Kom.')}</div>
        </div>
      </div>
    </div>

    <!-- STATS CARDS REALISTIS -->
    <div class="stats-grid-4">
      <div class="stat-box">
        <div class="stat-icon-wrap stat-icon-blue">📈</div>
        <div class="stat-content">
          <div class="stat-label">IPK Kumulatif</div>
          <div class="stat-value">${isMahasiswa ? (currentUser.ipk || "3.88") : "4.00"}</div>
          <div class="stat-desc">Skala 4.00 (Sangat Memuaskan)</div>
        </div>
      </div>

      <div class="stat-box">
        <div class="stat-icon-wrap stat-icon-green">📚</div>
        <div class="stat-content">
          <div class="stat-label">Total SKS Tempuh</div>
          <div class="stat-value">${isMahasiswa ? (currentUser.sks || "94") : "24"} SKS</div>
          <div class="stat-desc">Batas Maksimal: 144 SKS</div>
        </div>
      </div>

      <div class="stat-box">
        <div class="stat-icon-wrap stat-icon-amber">📅</div>
        <div class="stat-content">
          <div class="stat-label">Presensi Kehadiran</div>
          <div class="stat-value">96.8%</div>
          <div class="stat-desc">Syarat Minimum Ujian: 80%</div>
        </div>
      </div>

      <div class="stat-box">
        <div class="stat-icon-wrap stat-icon-purple">💳</div>
        <div class="stat-content">
          <div class="stat-label">Status Keuangan UKT</div>
          <div class="stat-value" style="font-size:16px; color:#10b981; font-weight:800;">LUNAS (REGULER)</div>
          <div class="stat-desc">Virtual Account BNI Virtual</div>
        </div>
      </div>
    </div>

    <!-- JADWAL KULIAH HARI INI -->
    <div class="academic-card">
      <div class="card-header-styled">
        <h3>📅 Jadwal Perkuliahan &amp; Praktikum Semester Ini</h3>
        <button class="btn-gov btn-gov-secondary btn-gov-sm" onclick="navTo('nilai')">Lihat KHS Lengkap &rarr;</button>
      </div>

      <div class="table-container">
        <table class="academic-table">
          <thead>
            <tr>
              <th>Hari &amp; Jam</th>
              <th>Kode</th>
              <th>Mata Kuliah</th>
              <th>SKS</th>
              <th>Ruang Kuliah</th>
              <th>Dosen Pengampu</th>
              <th>Status Pertemuan</th>
            </tr>
          </thead>
          <tbody>
            ${DEFAULT_SCHEDULE.map((sch, i) => `
              <tr>
                <td><b>${sch.hari}</b><br><small style="color:#64748b;">${sch.jam}</small></td>
                <td><code>${sch.kode}</code></td>
                <td><b style="color:#1e3a8a;">${sch.matkul}</b></td>
                <td>${sch.sks} SKS</td>
                <td><span class="status-pill pill-info">${sch.ruang}</span></td>
                <td>${sch.dosen}</td>
                <td><span class="status-pill pill-success">Pertemuan Ke-${i + 7}</span></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>

    <!-- PENGUMUMAN RESMI KAMPUS -->
    <div class="academic-card">
      <div class="card-header-styled">
        <h3>📢 Pengumuman Resmi Biro Administrasi Akademik (BAAK)</h3>
        <span style="font-size:12px; color:#64748b;">Pemberitahuan Terkini</span>
      </div>

      <div style="display:flex; flex-direction:column; gap:12px;">
        <div style="padding:12px 14px; background:#f8fafc; border-left:4px solid #2563eb; border-radius:6px;">
          <b style="color:#0f172a; font-size:13.5px;">Batas Akhir Unggah Berkas Laporan Praktikum Analisis Keamanan Web</b>
          <p style="font-size:12.5px; color:#475569; margin-top:2px;">
            Mahasiswa diwajibkan mengumpulkan laporan pengujian penetrasi web dan skenario uji celah keamanan sebelum batas waktu evaluasi semester ganjil.
          </p>
          <div style="font-size:11px; color:#94a3b8; margin-top:4px;">Diposting oleh: Biro Akademik · 13 Oktober 2026</div>
        </div>

        <div style="padding:12px 14px; background:#f8fafc; border-left:4px solid #10b981; border-radius:6px;">
          <b style="color:#0f172a; font-size:13.5px;">Pendaftaran Uji Kompetensi Keamanan Siber &amp; Ethical Hacking</b>
          <p style="font-size:12.5px; color:#475569; margin-top:2px;">
            Pusat Sertifikasi ITSM membuka pendaftaran sertifikasi kompetensi bidang Cybersecurity bagi mahasiswa tingkat akhir dengan IPK minimum 3.00.
          </p>
          <div style="font-size:11px; color:#94a3b8; margin-top:4px;">Diposting oleh: Pusat Komputer ITSM · 10 Oktober 2026</div>
        </div>
      </div>
    </div>
  `;
}

// ==========================================
// 2. KHS & TRANSKRIP NILAI (VULN: IDOR)
// ==========================================
function renderNilaiView(container) {
  const allGrades = getStorage("itsm_grades", DEFAULT_GRADES);
  const allUsers = getStorage("itsm_users", DEFAULT_USERS);

  let targetNim = currentUser.nomor_induk;
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("nim")) {
    targetNim = urlParams.get("nim");
  }

  const userTarget = allUsers.find(u => u.nomor_induk === targetNim) || currentUser;
  const userGrades = allGrades.filter(g => g.nim === targetNim);

  const totalSKS = userGrades.reduce((sum, g) => sum + g.sks, 0);
  const totalBobot = userGrades.reduce((sum, g) => sum + (g.bobot * g.sks), 0);
  const ipkCalc = totalSKS > 0 ? (totalBobot / totalSKS).toFixed(2) : "0.00";

  const isIDORActive = targetNim !== currentUser.nomor_induk;

  container.innerHTML = `
    <div class="page-header-row">
      <div class="page-title">
        <h2>Kartu Hasil Studi (KHS) &amp; Transkrip Akademik</h2>
        <p>Laporan Capaian Nilai dan Indeks Prestasi Mahasiswa per Semester</p>
      </div>
      <div class="academic-period-badge">
        Semester Ganjil 2026/2027
      </div>
    </div>

    <!-- IDOR SIMULATION TOOLBAR -->
    <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:8px; padding:14px 18px; margin-bottom:20px;">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
        <div>
          <b style="color:#991b1b; font-size:13px;">⚠️ Simulasi Celah IDOR (Insecure Direct Object Reference)</b>
          <div style="font-size:12px; color:#7f1d1d; margin-top:2px;">
            Sistem menampilkan transkrip berdasarkan parameter identitas <code>target_nim</code> tanpa memeriksa otorisasi sesi pemilik akun aktif.
          </div>
        </div>
        <div style="display:flex; gap:8px; align-items:center;">
          <label style="font-size:12px; font-weight:700; color:#334155;">Pilih NIM Mahasiswa:</label>
          <select id="idorNimSelect" class="gov-input" style="width:auto; padding:5px 10px; font-size:12.5px;" onchange="changeIdorNim(this.value)">
            <option value="24781078" ${targetNim === "24781078" ? "selected" : ""}>24781078 - Meca (Akun Anda)</option>
            <option value="24781015" ${targetNim === "24781015" ? "selected" : ""}>24781015 - Siti Nurhaliza (Target IDOR)</option>
            <option value="24781023" ${targetNim === "24781023" ? "selected" : ""}>24781023 - Budi Darmawan (Target IDOR)</option>
          </select>
        </div>
      </div>
      ${isIDORActive ? `
        <div style="margin-top:10px; background:#dc2626; color:#ffffff; font-size:12px; padding:6px 12px; border-radius:6px; font-weight:700;">
          🚨 EKSPLOITASI IDOR BERHASIL: Anda (NIM: ${currentUser.nomor_induk}) berhasil mengakses transkrip nilai privat milik: ${userTarget.nama} (NIM: ${targetNim})!
        </div>
      ` : ''}
    </div>

    <!-- IDENTITAS MAHASISWA PADA KHS -->
    <div class="academic-card" style="padding:18px;">
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:16px;">
        <div>
          <div style="font-size:11px; color:#64748b; font-weight:700; text-transform:uppercase;">Nama Mahasiswa</div>
          <div style="font-size:15px; font-weight:800; color:#0f172a;">${escapeHTML(userTarget.nama)}</div>
        </div>
        <div>
          <div style="font-size:11px; color:#64748b; font-weight:700; text-transform:uppercase;">Nomor Induk Mahasiswa (NIM)</div>
          <div style="font-size:14px; font-weight:700; color:#1e3a8a;">${escapeHTML(userTarget.nomor_induk)}</div>
        </div>
        <div>
          <div style="font-size:11px; color:#64748b; font-weight:700; text-transform:uppercase;">Program Studi / Jurusan</div>
          <div style="font-size:13.5px; font-weight:600; color:#334155;">${escapeHTML(userTarget.prodi || 'Teknologi Informasi')}</div>
        </div>
        <div>
          <div style="font-size:11px; color:#64748b; font-weight:700; text-transform:uppercase;">Indeks Prestasi Semester (IPS)</div>
          <div style="font-size:18px; font-weight:800; color:#059669;">${ipkCalc} <small style="font-size:11px; color:#64748b;">(${totalSKS} SKS)</small></div>
        </div>
      </div>
    </div>

    <!-- TABEL KHS RESMI -->
    <div class="academic-card">
      <div class="card-header-styled">
        <h3>Daftar Nilai Hasil Studi</h3>
        <button class="btn-gov btn-gov-secondary btn-gov-sm" onclick="window.print()">🖨️ Cetak KHS Resmi</button>
      </div>

      <div class="table-container">
        <table class="academic-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Kode</th>
              <th>Mata Kuliah</th>
              <th>SKS</th>
              <th>Tugas</th>
              <th>UTS</th>
              <th>UAS</th>
              <th>Nilai Huruf</th>
              <th>Bobot Mutu</th>
            </tr>
          </thead>
          <tbody>
            ${userGrades.map((g, idx) => `
              <tr>
                <td>${idx + 1}</td>
                <td><code>${g.kode}</code></td>
                <td><b>${g.matkul}</b><br><small style="color:#64748b;">${g.dosen || 'Dosen Pengampu'}</small></td>
                <td>${g.sks}</td>
                <td>${g.tugas}</td>
                <td>${g.uts}</td>
                <td>${g.uas}</td>
                <td><span class="grade-box grade-${g.huruf.charAt(0)}">${g.huruf}</span></td>
                <td><b>${g.bobot.toFixed(2)}</b></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function changeIdorNim(newNim) {
  if (newNim !== currentUser.nomor_induk) {
    logActivity("⚠️ AKSES IDOR TERDETEKSI", `User ${currentUser.nomor_induk} mengakses data transkrip NIM ${newNim}`);
    showToast(`⚠️ <b>IDOR Terpicu:</b> Melihat KHS mahasiswa NIM <b>${newNim}</b> tanpa otorisasi!`, true);
  }
  const url = new URL(window.location);
  url.searchParams.set("nim", newNim);
  window.history.pushState({}, "", url);
  renderNilaiView(document.getElementById("portalMainContent"));
}

// ==========================================
// 3. E-LEARNING & TUGAS (VULN: UNRESTRICTED UPLOAD)
// ==========================================
function renderTugasView(container) {
  const submissions = getStorage("itsm_submissions", DEFAULT_SUBMISSIONS);
  const mySubmissions = submissions.filter(s => s.nim === currentUser.nomor_induk);

  container.innerHTML = `
    <div class="page-header-row">
      <div class="page-title">
        <h2>E-Learning &amp; Pengumpulan Tugas Perkuliahan</h2>
        <p>Layanan Pengunggahan Berkas Portofolio dan Tugas Mahasiswa Terpadu</p>
      </div>
      <div class="academic-period-badge">
        Portal Mahasiswa
      </div>
    </div>

    <!-- KERENTANAN UNRESTRICTED FILE UPLOAD -->
    <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:8px; padding:12px 16px; margin-bottom:20px; font-size:12.5px;">
      <b style="color:#991b1b;">⚠️ Celah Keamanan: Validasi Ekstensi &amp; MIME Berkas Lemah (Unrestricted Upload)</b>
      <div style="color:#7f1d1d; margin-top:2px;">
        Sistem tidak memeriksa tipe berkas atau ekstensi file yang diunggah. Mahasiswa dapat mengunggah berkas web eksekutabel (seperti <code>.html</code>, <code>.svg</code>) berisi script jahat yang akan tereksekusi langsung di origin domain saat dibuka.
      </div>
    </div>

    <!-- FORM PENGUMPULAN TUGAS -->
    <div class="academic-card">
      <div class="card-header-styled">
        <h3>📤 Formulir Pengunggahan Berkas Tugas Kuliah</h3>
      </div>

      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:16px;">
        <div class="gov-form-group">
          <label>Mata Kuliah:</label>
          <select id="uploadMatkul" class="gov-input">
            <option value="Keamanan Sistem Informasi & Siber">Keamanan Sistem Informasi & Siber</option>
            <option value="Pemrograman Web Lanjut & API">Pemrograman Web Lanjut & API</option>
            <option value="Manajemen Basis Data & SQL">Manajemen Basis Data & SQL</option>
          </select>
        </div>
        <div class="gov-form-group">
          <label>Judul / Catatan Tugas:</label>
          <input type="text" id="uploadJudul" class="gov-input" placeholder="Contoh: Tugas 1 - Laporan Analisis Kerentanan">
        </div>
      </div>

      <div class="gov-form-group">
        <label>Pilih Berkas Tugas (Menerima Format Apapun Tanpa Filter):</label>
        <input type="file" id="uploadFile" class="gov-input" style="padding:6px 10px;">
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-top:16px;">
        <button class="btn-gov btn-gov-primary" onclick="submitTugasFile()">
          🚀 Unggah Berkas ke E-Learning
        </button>
        <button class="btn-gov btn-gov-secondary btn-gov-sm" onclick="simulateMaliciousUpload()">
          ⚡ Uji Upload File Berbahaya (.html XSS)
        </button>
      </div>
    </div>

    <!-- TABEL RIWAYAT PENGUMPULAN TUGAS -->
    <div class="academic-card">
      <div class="card-header-styled">
        <h3>Daftar Berkas Tugas yang Sudah Terunggah</h3>
      </div>

      <div class="table-container">
        <table class="academic-table">
          <thead>
            <tr>
              <th>Mata Kuliah</th>
              <th>Judul Tugas</th>
              <th>Nama Berkas</th>
              <th>Waktu Unggah</th>
              <th>Status Penilaian</th>
              <th>Aksi Berkas</th>
            </tr>
          </thead>
          <tbody>
            ${mySubmissions.map(s => `
              <tr>
                <td><b>${escapeHTML(s.matkul)}</b></td>
                <td>${escapeHTML(s.judul)}</td>
                <td><code style="color:#2563eb; font-weight:700;">${escapeHTML(s.nama_file)}</code></td>
                <td>${s.waktu}</td>
                <td><span class="status-pill pill-success">${s.status} (${s.nilai || 'Menunggu'})</span></td>
                <td>
                  <button class="btn-gov btn-gov-secondary btn-gov-sm" onclick="previewUploadedFile(${s.id})">
                    👁️ Buka / Jalankan File
                  </button>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function submitTugasFile() {
  const matkul = document.getElementById("uploadMatkul").value;
  const judul = document.getElementById("uploadJudul").value.trim() || "Tugas Kuliah";
  const fileInput = document.getElementById("uploadFile");

  if (!fileInput.files || fileInput.files.length === 0) {
    showToast("Silakan pilih berkas tugas terlebih dahulu.", true);
    return;
  }

  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
    saveSubmission(matkul, judul, file.name, file.type, e.target.result);
  };
  reader.readAsText(file);
}

function simulateMaliciousUpload() {
  const maliciousHTML = `<!DOCTYPE html><html><body><h1 style="color:red">⚠️ Malicious Script Executed via Unrestricted Upload!</h1><p>Berkas HTML ini dieksekusi di domain kampus tanpa filter.</p><script>alert('🔴 [UNRESTRICTED UPLOAD BERHASIL]\\nFile .html dieksekusi di origin!\\nSession: ' + localStorage.getItem('itsm_siakad_v3'));</script></body></html>`;
  saveSubmission("Keamanan Sistem Informasi & Siber", "PoC Exploit - File Upload RCE/XSS", "payload_backdoor.html", "text/html", maliciousHTML);
}

function saveSubmission(matkul, judul, filename, mime, content) {
  const submissions = getStorage("itsm_submissions", DEFAULT_SUBMISSIONS);
  const newSub = {
    id: Date.now(),
    nim: currentUser.nomor_induk,
    nama: currentUser.nama,
    matkul: matkul,
    judul: judul,
    nama_file: filename,
    tipe_file: mime || "text/plain",
    konten_file: content,
    waktu: new Date().toLocaleDateString("id-ID") + " " + new Date().toLocaleTimeString("id-ID"),
    status: "Menunggu Penilaian",
    nilai: null
  };

  submissions.unshift(newSub);
  setStorage("itsm_submissions", submissions);

  const ext = filename.split('.').pop().toLowerCase();
  if (['html', 'htm', 'php', 'exe', 'js', 'svg', 'sh'].includes(ext)) {
    logActivity("⚠️ UNRESTRICTED FILE UPLOAD", `File berbahaya ${filename} diunggah oleh ${currentUser.nomor_induk}`);
    showToast(`⚠️ <b>Validasi Berkas Lemah:</b> Berkas <code>${filename}</code> berhasil diunggah tanpa filter ekstensi!`, true);
  } else {
    showToast("Berkas tugas berhasil dikirimkan ke dosen.");
  }

  renderTugasView(document.getElementById("portalMainContent"));
}

function previewUploadedFile(subId) {
  const submissions = getStorage("itsm_submissions", DEFAULT_SUBMISSIONS);
  const item = submissions.find(s => s.id === subId);
  if (!item) return;

  const blob = new Blob([item.konten_file], { type: item.tipe_file || "text/html" });
  const blobUrl = URL.createObjectURL(blob);
  window.open(blobUrl, "_blank");
}

// ==========================================
// 4. FORUM DISKUSI (VULN: STORED XSS)
// ==========================================
function renderForumView(container) {
  const threads = getStorage("itsm_threads", DEFAULT_THREADS);

  container.innerHTML = `
    <div class="page-header-row">
      <div class="page-title">
        <h2>Forum Diskusi Akademik Terbuka</h2>
        <p>Ruang Komunikasi Interaktif Dosen dan Mahasiswa ITSM</p>
      </div>
      <div class="academic-period-badge">
        Forum Kelas Terbuka
      </div>
    </div>

    <!-- KERENTANAN STORED XSS -->
    <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:8px; padding:12px 16px; margin-bottom:20px; font-size:12.5px;">
      <b style="color:#991b1b;">⚠️ Celah Keamanan: Stored XSS (Cross-Site Scripting)</b>
      <div style="color:#7f1d1d; margin-top:2px;">
        Komentar forum disimpan apa adanya di basis data dan dirender langsung ke DOM melalui <code>innerHTML</code> tanpa enkoding HTML.
      </div>
    </div>

    <!-- DAFTAR THREAD FORUM -->
    <div class="academic-card">
      <div class="card-header-styled">
        <h3>Daftar Topik Perkuliahan Aktif</h3>
      </div>

      <div style="display:flex; flex-direction:column; gap:16px;">
        ${threads.map(th => `
          <div class="forum-card-thread">
            <div class="forum-author-row">
              <div class="avatar-img" style="width:34px; height:34px; font-size:12px;">${th.author.charAt(0)}</div>
              <div>
                <b style="color:#0f172a; font-size:13.5px;">${escapeHTML(th.author)}</b>
                <span class="status-pill ${th.role === 'dosen' ? 'pill-info' : 'pill-success'}" style="font-size:9.5px; margin-left:6px;">${th.role.toUpperCase()}</span>
                <div style="font-size:11px; color:#64748b;">${escapeHTML(th.matkul)} · ${th.time}</div>
              </div>
            </div>

            <h4 style="font-size:15px; color:#1e3a8a; margin-bottom:6px;">${escapeHTML(th.title)}</h4>
            <p style="font-size:13px; color:#334155; line-height:1.6;">${escapeHTML(th.content)}</p>

            <!-- TANGGAPAN / KOMENTAR: TEMPAT STORED XSS DIEKSEKUSI -->
            <div class="comment-box-gray">
              <b style="font-size:12px; color:#1e3a8a; display:block; margin-bottom:6px;">Tanggapan Forum (${th.comments.length}):</b>
              
              <div style="display:flex; flex-direction:column; gap:8px;">
                ${th.comments.map(c => `
                  <div style="padding:6px 0; border-bottom:1px solid #e2e8f0; font-size:12.5px;">
                    <b>${escapeHTML(c.author)}</b> <span style="font-size:10.5px; color:#94a3b8;">(${c.time}):</span>
                    <!-- KERENTANAN SENGANJA: teks komentar dirender via innerHTML tanpa escape -->
                    <div style="margin-top:2px; color:#1e293b;">${c.text}</div>
                  </div>
                `).join("")}
              </div>

              <!-- INPUT BALAS KOMENTAR -->
              <div style="margin-top:12px; display:flex; gap:8px;">
                <input type="text" id="reply-input-${th.id}" class="gov-input" placeholder="Tuliskan tanggapan Anda... (Coba masukkan script XSS)" style="font-size:12.5px; padding:7px 12px;">
                <button class="btn-gov btn-gov-primary btn-gov-sm" onclick="submitComment(${th.id})">Kirim</button>
                <button class="btn-gov btn-gov-secondary btn-gov-sm" onclick="fillXSSPayload(${th.id})" title="Isi otomatis skrip XSS">⚡ Inject XSS</button>
              </div>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function submitComment(threadId) {
  const input = document.getElementById(`reply-input-${threadId}`);
  const text = input.value.trim();
  if (!text) return;

  const threads = getStorage("itsm_threads", DEFAULT_THREADS);
  const target = threads.find(t => t.id === threadId);
  if (target) {
    target.comments.push({
      author: currentUser.nama,
      role: currentUser.role,
      text: text, // DISIMPAN APA ADANYA
      time: "Baru saja"
    });
    setStorage("itsm_threads", threads);

    if (/<script|<img|<svg|onerror|onload/i.test(text)) {
      logActivity("⚠️ STORED XSS TERINJEKSI", `Payload: ${text} pada Thread #${threadId}`);
      showToast("⚠️ <b>Stored XSS Tersimpan!</b> Komentar akan dieksekusi di browser siapapun yang membuka forum ini.", true);
    } else {
      showToast("Tanggapan berhasil diposting.");
    }

    renderForumView(document.getElementById("portalMainContent"));
  }
}

function fillXSSPayload(threadId) {
  const input = document.getElementById(`reply-input-${threadId}`);
  input.value = `<img src=x onerror="alert('🔴 [STORED XSS BERHASIL]\\nCookie/Token Terbaca: ' + localStorage.getItem('itsm_siakad_v3') + '\\nPengguna: ${currentUser.nama}')">`;
  input.focus();
}

// ==========================================
// 5. BIODATA & PROFIL (VULN: PRIVILEGE ESCALATION)
// ==========================================
function renderProfilView(container) {
  container.innerHTML = `
    <div class="page-header-row">
      <div class="page-title">
        <h2>Biodata &amp; Pengaturan Profil Akun</h2>
        <p>Informasi Data Pokok Mahasiswa Terpadu (PDDIKTI)</p>
      </div>
      <div class="academic-period-badge">
        Role: <b style="text-transform:uppercase;">${currentUser.role}</b>
      </div>
    </div>

    <!-- KERENTANAN PRIVILEGE ESCALATION -->
    <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:8px; padding:12px 16px; margin-bottom:20px; font-size:12.5px;">
      <b style="color:#991b1b;">⚠️ Celah Keamanan: Eskalasi Hak Akses (Privilege Escalation / Mass Assignment)</b>
      <div style="color:#7f1d1d; margin-top:2px;">
        Parameter <code>role</code> pada formulir pembaruan profil dikirim dari browser tanpa validasi otorisasi di backend. Mahasiswa dapat menaikkan hak akses dirinya menjadi <b>Dosen</b> atau <b>Admin</b>.
      </div>
    </div>

    <!-- FORM BIODATA -->
    <div class="academic-card">
      <div class="card-header-styled">
        <h3>Identitas Pokok Civitas Akademika</h3>
      </div>

      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:16px;">
        <div class="gov-form-group">
          <label>Nama Lengkap:</label>
          <input type="text" id="profNama" class="gov-input" value="${escapeHTML(currentUser.nama)}">
        </div>
        <div class="gov-form-group">
          <label>NIM / Identitas Pegawai:</label>
          <input type="text" class="gov-input" value="${escapeHTML(currentUser.nomor_induk)}" disabled style="background:#f1f5f9;">
        </div>
        <div class="gov-form-group">
          <label>Program Studi:</label>
          <input type="text" class="gov-input" value="${escapeHTML(currentUser.prodi || '')}" disabled style="background:#f1f5f9;">
        </div>
        <div class="gov-form-group">
          <label>Alamat Email Kampus:</label>
          <input type="email" id="profEmail" class="gov-input" value="${escapeHTML(currentUser.email || '')}">
        </div>
      </div>

      <!-- VULNERABLE ROLE SELECTOR -->
      <div class="gov-form-group" style="background:#fff1f2; padding:14px; border:1px dashed #f43f5e; border-radius:6px; margin-top:8px;">
        <label style="color:#be123c; font-weight:800;">Hak Akses / Peran Sistem (Celah Mass Assignment):</label>
        <p style="font-size:11.5px; color:#475569; margin-bottom:8px;">
          Pilih role baru untuk mengeskalasi akses akun Anda ke dashboard Dosen atau Administrator:
        </p>
        <select id="profRole" class="gov-input" style="border-color:#f43f5e; font-weight:700;">
          <option value="mahasiswa" ${currentUser.role === "mahasiswa" ? "selected" : ""}>Mahasiswa (Akses Standar)</option>
          <option value="dosen" ${currentUser.role === "dosen" ? "selected" : ""}>Dosen (Hak Input Nilai & Review Tugas)</option>
          <option value="admin" ${currentUser.role === "admin" ? "selected" : ""}>Admin IT Center (Hak Penuh Kelola Akun & Pengguna)</option>
        </select>
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-top:16px;">
        <button class="btn-gov btn-gov-primary" onclick="saveProfileChanges()">
          💾 Simpan Perubahan Biodata
        </button>
        <button class="btn-gov btn-gov-danger btn-gov-sm" onclick="escalateToAdminQuick()">
          ⚡ Eskalasi Cepat ke Super Admin
        </button>
      </div>
    </div>
  `;
}

function saveProfileChanges() {
  const newNama = document.getElementById("profNama").value.trim();
  const newEmail = document.getElementById("profEmail").value.trim();
  const newRole = document.getElementById("profRole").value;

  const users = getStorage("itsm_users", DEFAULT_USERS);
  const idx = users.findIndex(u => u.username === currentUser.username);

  if (idx !== -1) {
    const oldRole = users[idx].role;
    users[idx].nama = newNama || users[idx].nama;
    users[idx].email = newEmail || users[idx].email;
    users[idx].role = newRole;

    setStorage("itsm_users", users);
    currentUser = { ...users[idx] };
    setStorage("itsm_current_user", currentUser);

    if (oldRole !== newRole) {
      logActivity("⚠️ ESKALASI ROLE BERHASIL", `User ${currentUser.username} mengubah role menjadi ${newRole}`);
      showToast(`🚨 <b>Eskalasi Role Berhasil!</b> Akun Anda dinaikkan menjadi <b>${newRole.toUpperCase()}</b>. Menu baru terbuka di sidebar!`, true);
    } else {
      showToast("Biodata profil berhasil disimpan.");
    }

    renderHeaderUser();
    updateSidebarMenu();
    renderProfilView(document.getElementById("portalMainContent"));
  }
}

function escalateToAdminQuick() {
  const roleSelect = document.getElementById("profRole");
  if (roleSelect) roleSelect.value = "admin";
  saveProfileChanges();
}

// ==========================================
// 6. PANEL DOSEN: INPUT NILAI MAHASISWA
// ==========================================
function renderGradingView(container) {
  const grades = getStorage("itsm_grades", DEFAULT_GRADES);
  const users = getStorage("itsm_users", DEFAULT_USERS);

  container.innerHTML = `
    <div class="page-header-row">
      <div class="page-title">
        <h2>Panel Dosen: Evaluasi &amp; Input Nilai KHS</h2>
        <p>Wewenang Dosen Pengampu untuk Memasukkan Komponen Nilai Tugas, UTS, dan UAS</p>
      </div>
      <div class="academic-period-badge">
        Dosen Pengampu
      </div>
    </div>

    <div class="academic-card">
      <div class="card-header-styled">
        <h3>Daftar Mahasiswa yang Mengambil Mata Kuliah Anda</h3>
      </div>

      <div class="table-container">
        <table class="academic-table">
          <thead>
            <tr>
              <th>NIM</th>
              <th>Nama Mahasiswa</th>
              <th>Mata Kuliah</th>
              <th>Nilai Tugas</th>
              <th>Nilai UTS</th>
              <th>Nilai UAS</th>
              <th>Nilai Huruf</th>
              <th>Aksi Simpan</th>
            </tr>
          </thead>
          <tbody>
            ${grades.map((g, idx) => {
              const mhs = users.find(u => u.nomor_induk === g.nim);
              return `
                <tr>
                  <td><code>${g.nim}</code></td>
                  <td><b>${mhs ? escapeHTML(mhs.nama) : 'Mahasiswa'}</b></td>
                  <td>${g.matkul}</td>
                  <td><input type="number" id="tugas-${idx}" class="gov-input" value="${g.tugas}" style="width:70px; padding:4px 6px;"></td>
                  <td><input type="number" id="uts-${idx}" class="gov-input" value="${g.uts}" style="width:70px; padding:4px 6px;"></td>
                  <td><input type="number" id="uas-${idx}" class="gov-input" value="${g.uas}" style="width:70px; padding:4px 6px;"></td>
                  <td>
                    <select id="huruf-${idx}" class="gov-input" style="width:75px; padding:4px;">
                      <option value="A" ${g.huruf === 'A' ? 'selected' : ''}>A</option>
                      <option value="A-" ${g.huruf === 'A-' ? 'selected' : ''}>A-</option>
                      <option value="B+" ${g.huruf === 'B+' ? 'selected' : ''}>B+</option>
                      <option value="B" ${g.huruf === 'B' ? 'selected' : ''}>B</option>
                      <option value="C+" ${g.huruf === 'C+' ? 'selected' : ''}>C+</option>
                      <option value="C" ${g.huruf === 'C' ? 'selected' : ''}>C</option>
                      <option value="D" ${g.huruf === 'D' ? 'selected' : ''}>D</option>
                      <option value="E" ${g.huruf === 'E' ? 'selected' : ''}>E</option>
                    </select>
                  </td>
                  <td>
                    <button class="btn-gov btn-gov-primary btn-gov-sm" onclick="saveGrade(${idx})">💾 Simpan</button>
                  </td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function saveGrade(idx) {
  const grades = getStorage("itsm_grades", DEFAULT_GRADES);
  const t = parseFloat(document.getElementById(`tugas-${idx}`).value) || 0;
  const u = parseFloat(document.getElementById(`uts-${idx}`).value) || 0;
  const a = parseFloat(document.getElementById(`uas-${idx}`).value) || 0;
  const h = document.getElementById(`huruf-${idx}`).value;

  const bobotMap = { "A": 4.0, "A-": 3.75, "B+": 3.5, "B": 3.0, "C+": 2.5, "C": 2.0, "D": 1.0, "E": 0.0 };

  grades[idx].tugas = t;
  grades[idx].uts = u;
  grades[idx].uas = a;
  grades[idx].huruf = h;
  grades[idx].bobot = bobotMap[h] || 0.0;

  setStorage("itsm_grades", grades);
  logActivity("Nilai Diperbarui", `Dosen mengubah nilai NIM ${grades[idx].nim} (${grades[idx].matkul})`);
  showToast(`Nilai mahasiswa NIM <b>${grades[idx].nim}</b> berhasil disimpan!`);
}

function renderReviewTugasView(container) {
  const subs = getStorage("itsm_submissions", DEFAULT_SUBMISSIONS);

  container.innerHTML = `
    <div class="page-header-row">
      <div class="page-title">
        <h2>Panel Dosen: Review Berkas Pengumpulan Tugas</h2>
        <p>Memeriksa dan Membuka Dokumen Tugas yang Dikirimkan Mahasiswa</p>
      </div>
    </div>

    <div class="academic-card">
      <div class="table-container">
        <table class="academic-table">
          <thead>
            <tr>
              <th>Nama Mahasiswa</th>
              <th>Mata Kuliah</th>
              <th>Judul Tugas</th>
              <th>Nama Berkas</th>
              <th>Waktu Unggah</th>
              <th>Aksi Berkas</th>
            </tr>
          </thead>
          <tbody>
            ${subs.map(s => `
              <tr>
                <td><b>${escapeHTML(s.nama)}</b><br><small style="color:#64748b;">NIM: ${s.nim}</small></td>
                <td>${escapeHTML(s.matkul)}</td>
                <td>${escapeHTML(s.judul)}</td>
                <td><code style="color:#2563eb;">${escapeHTML(s.nama_file)}</code></td>
                <td>${s.waktu}</td>
                <td>
                  <button class="btn-gov btn-gov-secondary btn-gov-sm" onclick="previewUploadedFile(${s.id})">👁️ Buka File</button>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ==========================================
// 7. PANEL ADMIN: KELOLA PENGGUNA & AUDIT
// ==========================================
function renderAdminUsersView(container) {
  const users = getStorage("itsm_users", DEFAULT_USERS);

  container.innerHTML = `
    <div class="page-header-row">
      <div class="page-title">
        <h2>Panel Administrator: Manajemen Akun Civitas Akademika</h2>
        <p>Pengelolaan Pengguna Sistem Informasi Akademik ITSM</p>
      </div>
      <button class="btn-gov btn-gov-primary btn-gov-sm" onclick="openCreateUserModal()">+ Tambah Pengguna Baru</button>
    </div>

    <div class="academic-card">
      <div class="table-container">
        <table class="academic-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Nama Lengkap</th>
              <th>NIM / NIDN</th>
              <th>Role</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            ${users.map(u => `
              <tr>
                <td><code>${escapeHTML(u.username)}</code></td>
                <td><b>${escapeHTML(u.nama)}</b></td>
                <td>${escapeHTML(u.nomor_induk)}</td>
                <td><span class="status-pill pill-info">${u.role.toUpperCase()}</span></td>
                <td><span style="color:#059669; font-weight:700;">${escapeHTML(u.status || 'Aktif')}</span></td>
                <td>
                  <button class="btn-gov btn-gov-secondary btn-gov-sm" onclick="quickLogin('${u.username}')">🔑 Login Sebagai</button>
                  ${u.username !== 'admin_itsm' ? `
                    <button class="btn-gov btn-gov-danger btn-gov-sm" onclick="deleteUser(${u.id})">🗑️ Hapus</button>
                  ` : ''}
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function deleteUser(userId) {
  if (!confirm("Konfirmasi: Hapus akun pengguna ini dari database SIAKAD?")) return;
  let users = getStorage("itsm_users", DEFAULT_USERS);
  users = users.filter(u => u.id !== userId);
  setStorage("itsm_users", users);
  showToast("Akun pengguna berhasil dihapus.");
  renderAdminUsersView(document.getElementById("portalMainContent"));
}

function openCreateUserModal() {
  const uname = prompt("Masukkan Username:");
  if (!uname) return;
  const nama = prompt("Masukkan Nama Lengkap:");
  if (!nama) return;
  const nim = prompt("Masukkan NIM / NIDN:");
  const role = prompt("Role (mahasiswa / dosen / admin):", "mahasiswa") || "mahasiswa";

  const users = getStorage("itsm_users", DEFAULT_USERS);
  users.push({
    id: Date.now(),
    username: uname,
    password: "password123",
    nama: nama,
    nomor_induk: nim || "24781099",
    role: role,
    status: "Aktif",
    email: `${uname}@itsm.ac.id`
  });
  setStorage("itsm_users", users);
  showToast(`Akun baru <b>${nama}</b> berhasil didaftarkan!`);
  renderAdminUsersView(document.getElementById("portalMainContent"));
}

function renderAuditLogsView(container) {
  const logs = getStorage("itsm_logs", []);

  container.innerHTML = `
    <div class="page-header-row">
      <div class="page-title">
        <h2>Panel Administrator: Audit Log &amp; Rekam Jejak Keamanan</h2>
        <p>Pencatatan Aktivitas Autentikasi dan Potensi Insiden Keamanan Sistem</p>
      </div>
      <button class="btn-gov btn-gov-secondary btn-gov-sm" onclick="clearLogs()">Bersihkan Log</button>
    </div>

    <div class="academic-card">
      <div class="table-container">
        <table class="academic-table">
          <thead>
            <tr>
              <th>Waktu</th>
              <th>Pelaku / Akun</th>
              <th>Aktivitas</th>
              <th>Keterangan / Rincian</th>
            </tr>
          </thead>
          <tbody>
            ${logs.map(l => `
              <tr>
                <td style="font-family:var(--font-mono); font-size:11.5px;">${l.time}</td>
                <td><b>${escapeHTML(l.user)}</b></td>
                <td><span style="color:${l.action.includes('⚠️') ? '#dc2626' : '#2563eb'}; font-weight:700;">${escapeHTML(l.action)}</span></td>
                <td style="font-family:var(--font-mono); font-size:12px; color:#475569;">${escapeHTML(l.details || '-')}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function clearLogs() {
  setStorage("itsm_logs", []);
  renderAuditLogsView(document.getElementById("portalMainContent"));
  showToast("Audit log berhasil dibersihkan.");
}

// Modal PoC
function toggleSecurityModal(show) {
  const modal = document.getElementById("securityModalOverlay");
  if (modal) modal.style.display = show ? "flex" : "none";
}

// Event Setup
function setupEvents() {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const u = document.getElementById("loginUsername").value.trim();
      const p = document.getElementById("loginPassword").value.trim();
      login(u, p);
    });
  }
}

function escapeHTML(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
