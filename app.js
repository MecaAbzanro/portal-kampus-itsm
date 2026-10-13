/**
 * SISTEM INFORMASI AKADEMIK TERPADU (SIAKAD 4.0)
 * INSTITUT TEKNOLOGI & SAINS MANDIRI (ITSM)
 * Praktikum Keamanan Sistem Informasi (P06)
 */

const DB_VERSION = "itsm_db_v4_siakad";

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
    status: "Aktif (Reguler Pagi)",
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
    status: "Aktif (Reguler Pagi)",
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

// Inisialisasi DB
if (!localStorage.getItem(DB_VERSION)) {
  localStorage.setItem(DB_VERSION, "true");
  setStorage("itsm_users", DEFAULT_USERS);
  setStorage("itsm_grades", DEFAULT_GRADES);
  setStorage("itsm_threads", DEFAULT_THREADS);
  setStorage("itsm_submissions", DEFAULT_SUBMISSIONS);
  setStorage("itsm_logs", [
    { time: new Date().toLocaleTimeString(), action: "SIAKAD 4.0 Started", user: "system", ip: "127.0.0.1" }
  ]);
}

// Cek apakah pengguna sebelumnya melakukan logout
let isLoggedOut = localStorage.getItem("itsm_logged_out") === "true";
let currentUser = getStorage("itsm_current_user", null);

if (!isLoggedOut && !currentUser) {
  // Default login pertama kali sebagai Meca agar dashboard langsung tampil
  currentUser = { ...DEFAULT_USERS[0] };
  setStorage("itsm_current_user", currentUser);
}

let currentPage = "beranda";

document.addEventListener("DOMContentLoaded", () => {
  startClock();
  if (currentUser) {
    renderDashboardScreen();
  } else {
    renderAuthScreen();
  }
});

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

function showToast(msg, isWarn = false) {
  const container = document.getElementById("toastContainer");
  if (!container) return;
  const t = document.createElement("div");
  t.className = "toast-msg";
  if (isWarn) t.style.borderLeftColor = "#ef4444";
  t.innerHTML = msg;
  container.appendChild(t);
  setTimeout(() => {
    t.style.opacity = "0";
    setTimeout(() => t.remove(), 250);
  }, 4000);
}

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

// TAMPILKAN LAYAR LOGIN SSO
function renderAuthScreen() {
  const authSec = document.getElementById("authSection");
  const portalView = document.getElementById("portalViewport");
  const navTabs = document.querySelector(".portal-navbar-tabs");
  const switcher = document.querySelector(".role-switcher-card");
  const profileWidget = document.getElementById("headerProfileWidget");
  const btnLogout = document.querySelector("button[onclick='logout()']");

  if (authSec) authSec.style.display = "flex";
  if (portalView) portalView.style.display = "none";
  if (navTabs) navTabs.style.display = "none";
  if (switcher) switcher.style.display = "none";
  if (profileWidget) profileWidget.style.display = "none";
  if (btnLogout) {
    btnLogout.innerText = "Masuk";
    btnLogout.onclick = () => renderAuthScreen();
  }
}

// TAMPILKAN LAYAR DASHBOARD UTAMA
function renderDashboardScreen() {
  const authSec = document.getElementById("authSection");
  const portalView = document.getElementById("portalViewport");
  const navTabs = document.querySelector(".portal-navbar-tabs");
  const switcher = document.querySelector(".role-switcher-card");
  const profileWidget = document.getElementById("headerProfileWidget");
  const btnLogout = document.querySelector("button[onclick='logout()'], button[onclick='renderAuthScreen()']");

  if (authSec) authSec.style.display = "none";
  if (portalView) portalView.style.display = "block";
  if (navTabs) navTabs.style.display = "block";
  if (switcher) switcher.style.display = "flex";
  if (profileWidget) profileWidget.style.display = "flex";
  if (btnLogout) {
    btnLogout.innerText = "Keluar";
    btnLogout.onclick = () => logout();
  }

  updateHeaderProfile();
  updateNavRoleTabs();
  navTo(currentPage || "beranda");
}

function updateHeaderProfile() {
  if (!currentUser) return;
  const avatarElem = document.getElementById("headerAvatarText");
  const nameElem = document.getElementById("headerUserName");
  const subElem = document.getElementById("headerUserSub");
  const switcher = document.getElementById("headerRoleSwitcher");

  if (avatarElem) avatarElem.innerText = currentUser.nama ? currentUser.nama.charAt(0) : "U";
  if (nameElem) nameElem.innerText = currentUser.nama || "Pengguna";
  if (subElem) subElem.innerText = `${currentUser.nomor_induk} · ${currentUser.role.toUpperCase()}`;
  if (switcher) switcher.value = currentUser.username || "meca";
}

function updateNavRoleTabs() {
  if (!currentUser) return;
  const tabGrading = document.getElementById("tab-grading");
  const tabReview = document.getElementById("tab-review_tugas");
  const tabAdminUsers = document.getElementById("tab-admin_users");
  const tabAuditLogs = document.getElementById("tab-audit_logs");

  const isDosen = currentUser.role === "dosen" || currentUser.role === "admin";
  const isAdmin = currentUser.role === "admin";

  if (tabGrading) tabGrading.style.display = isDosen ? "flex" : "none";
  if (tabReview) tabReview.style.display = isDosen ? "flex" : "none";
  if (tabAdminUsers) tabAdminUsers.style.display = isAdmin ? "flex" : "none";
  if (tabAuditLogs) tabAuditLogs.style.display = isAdmin ? "flex" : "none";
}

// FUNGSI SUBMIT LOGIN SSO (DENGAN SIMULASI SQL INJECTION)
function submitLogin() {
  const uInput = document.getElementById("loginUsername");
  const pInput = document.getElementById("loginPassword");
  if (!uInput || !pInput) return;

  const username = uInput.value.trim();
  const password = pInput.value.trim();
  const users = getStorage("itsm_users", DEFAULT_USERS);

  // SIMULASI VULNERABILITAS SQL INJECTION
  if (username.includes("' OR '1'='1") || username.includes("' OR 1=1") || username.includes("'--")) {
    logActivity("⚠️ SQL INJECTION AUTH BYPASS", `Statement: "${username}" berhasil membypass login!`);
    showToast("⚠️ <b>SQL Injection Terpicu!</b> Autentikasi berhasil dibypass via statement <code>' OR '1'='1</code>. Masuk sebagai Super Administrator!", true);
    const adminUser = users.find(u => u.role === "admin") || users[0];
    localStorage.removeItem("itsm_logged_out");
    currentUser = { ...adminUser };
    setStorage("itsm_current_user", currentUser);
    renderDashboardScreen();
    return;
  }

  const found = users.find(u => (u.username === username || u.nomor_induk === username) && u.password === password);
  if (found) {
    localStorage.removeItem("itsm_logged_out");
    currentUser = { ...found };
    setStorage("itsm_current_user", currentUser);
    showToast(`Selamat datang kembali, <b>${found.nama}</b>!`);
    logActivity("Login Berhasil", `User: ${found.username} (${found.role})`);
    renderDashboardScreen();
  } else {
    showToast("❌ Nomor Induk atau kata sandi tidak valid. Silakan coba lagi.", true);
  }
}

// FUNGSI CEPAT GANTI AKUN
function quickLogin(username) {
  const users = getStorage("itsm_users", DEFAULT_USERS);
  const u = users.find(x => x.username === username);
  if (u) {
    localStorage.removeItem("itsm_logged_out");
    currentUser = { ...u };
    setStorage("itsm_current_user", currentUser);
    showToast(`Beralih ke akun: <b>${u.nama}</b> [${u.role.toUpperCase()}]`);
    renderDashboardScreen();
  }
}

// FUNGSI LOGOUT SEBENARNYA
function logout() {
  logActivity("Logout Pengguna", `User: ${currentUser ? currentUser.nama : "Anonim"}`);
  currentUser = null;
  localStorage.removeItem("itsm_current_user");
  localStorage.setItem("itsm_logged_out", "true");
  showToast("Anda telah keluar dari sesi SIAKAD ITSM.");
  renderAuthScreen();
}

function navTo(pageId) {
  if (!currentUser) {
    renderAuthScreen();
    return;
  }
  currentPage = pageId;
  document.querySelectorAll(".nav-tab-item").forEach(item => {
    item.classList.remove("active");
  });
  const activeTab = document.getElementById(`tab-${pageId}`);
  if (activeTab) activeTab.classList.add("active");

  const container = document.getElementById("siakadMainContent");
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
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ==========================================
// 1. DASHBOARD UTAMA
// ==========================================
function renderBerandaView(container) {
  const isMahasiswa = currentUser.role === "mahasiswa";

  container.innerHTML = `
    <!-- HERO STUDENT PROFILE BANNER (KTM DIGITAL) -->
    <div class="student-hero-banner">
      <div class="student-hero-left">
        <div class="student-photo-frame">
          ${currentUser.nama.charAt(0)}
        </div>
        <div class="student-hero-meta">
          <div style="font-size:11.5px; text-transform:uppercase; color:#93c5fd; font-weight:700; letter-spacing:0.5px;">
            PORTAL CIVITAS AKADEMIKA
          </div>
          <h2>${escapeHTML(currentUser.nama)}</h2>
          <p>
            Nomor Induk: <b>${escapeHTML(currentUser.nomor_induk)}</b> &middot; 
            Program Studi: <b>${escapeHTML(currentUser.prodi || 'Teknologi Informasi')}</b>
            <span class="status-tag-active">${currentUser.status || 'Aktif'}</span>
          </p>
        </div>
      </div>
      <div style="text-align:right; font-size:12px;">
        <div style="color:#bfdbfe;">Dosen Pembimbing Akademik:</div>
        <div style="font-size:14px; font-weight:700;">${escapeHTML(currentUser.dosen_pa || 'Dr. Ir. Hendra Wijaya, M.Kom.')}</div>
      </div>
    </div>

    <!-- STATS ROW -->
    <div class="stats-grid-row">
      <div class="stat-item-box">
        <div class="stat-icon-wrapper icon-blue">📈</div>
        <div class="stat-text-wrap">
          <div class="stat-label-title">IPK Kumulatif</div>
          <div class="stat-number-big">${isMahasiswa ? (currentUser.ipk || "3.88") : "4.00"}</div>
          <div class="stat-sub-note">Skala 4.00 (Sangat Memuaskan)</div>
        </div>
      </div>

      <div class="stat-item-box">
        <div class="stat-icon-wrapper icon-green">📚</div>
        <div class="stat-text-wrap">
          <div class="stat-label-title">Total SKS Tempuh</div>
          <div class="stat-number-big">${isMahasiswa ? (currentUser.sks || "94") : "24"} SKS</div>
          <div class="stat-sub-note">Syarat Kelulusan: 110 SKS</div>
        </div>
      </div>

      <div class="stat-item-box">
        <div class="stat-icon-wrapper icon-amber">📅</div>
        <div class="stat-text-wrap">
          <div class="stat-label-title">Presensi Kehadiran</div>
          <div class="stat-number-big">96.8%</div>
          <div class="stat-sub-note">Kehadiran Perkuliahan</div>
        </div>
      </div>

      <div class="stat-item-box">
        <div class="stat-icon-wrapper icon-purple">💳</div>
        <div class="stat-text-wrap">
          <div class="stat-label-title">Status Registrasi UKT</div>
          <div class="stat-number-big" style="color:#059669; font-size:17px;">LUNAS (REGULER)</div>
          <div class="stat-sub-note">Semester Ganjil 2026/2027</div>
        </div>
      </div>
    </div>

    <!-- JADWAL PERKULIAHAN -->
    <div class="academic-card">
      <div class="card-header-line">
        <div class="card-title-text">
          <span>📅</span> <span>Jadwal Perkuliahan &amp; Praktikum Laboratorium Semester Ini</span>
        </div>
        <button class="btn-siakad btn-secondary btn-sm" onclick="navTo('nilai')">Lihat KHS Lengkap &rarr;</button>
      </div>

      <div class="table-responsive-box">
        <table class="siakad-table">
          <thead>
            <tr>
              <th>Hari &amp; Jam</th>
              <th>Kode</th>
              <th>Mata Kuliah</th>
              <th>SKS</th>
              <th>Ruang Kuliah / Lab</th>
              <th>Dosen Pengampu</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${DEFAULT_SCHEDULE.map((sch, i) => `
              <tr>
                <td><b>${sch.hari}</b><br><small style="color:#64748b;">${sch.jam}</small></td>
                <td><code>${sch.kode}</code></td>
                <td><b style="color:#1e40af;">${sch.matkul}</b></td>
                <td>${sch.sks} SKS</td>
                <td><span style="background:#eff6ff; color:#1d4ed8; font-weight:700; padding:2px 8px; border-radius:4px; font-size:11.5px;">${sch.ruang}</span></td>
                <td>${sch.dosen}</td>
                <td><span style="background:#ecfdf5; color:#059669; font-weight:700; padding:2px 8px; border-radius:4px; font-size:11px;">Pertemuan ${i + 7}</span></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>

    <!-- PENGUMUMAN BAAK -->
    <div class="academic-card">
      <div class="card-header-line">
        <div class="card-title-text">
          <span>📢</span> <span>Pemberitahuan Resmi Biro Administrasi Akademik (BAAK)</span>
        </div>
        <span style="font-size:11.5px; color:#64748b;">Semester Ganjil 2026/2027</span>
      </div>

      <div style="display:flex; flex-direction:column; gap:12px;">
        <div style="padding:12px 14px; background:#f8fafc; border-left:4px solid #2563eb; border-radius:6px;">
          <b style="color:#0f172a; font-size:13px;">Pengumpulan Berkas Laporan Praktikum Evaluasi Keamanan Web (P06)</b>
          <p style="font-size:12px; color:#475569; margin-top:3px;">
            Seluruh mahasiswa program studi Teknologi Informasi diwajibkan mengunggah berkas laporan pengujian celah keamanan web sebelum jadwal penutupan portal e-learning.
          </p>
          <div style="font-size:11px; color:#94a3b8; margin-top:4px;">Diposting oleh: Biro Akademik &middot; 13 Oktober 2026</div>
        </div>

        <div style="padding:12px 14px; background:#f8fafc; border-left:4px solid #10b981; border-radius:6px;">
          <b style="color:#0f172a; font-size:13px;">Pendaftaran Uji Sertifikasi Kompetensi Cyber Security &amp; Web Defense</b>
          <p style="font-size:12px; color:#475569; margin-top:3px;">
            Pusat Sertifikasi Profesi ITSM membuka pendaftaran uji sertifikasi kompetensi bidang Cybersecurity bagi mahasiswa tingkat akhir dengan IPK minimum 3.00.
          </p>
          <div style="font-size:11px; color:#94a3b8; margin-top:4px;">Diposting oleh: Pusat Komputer &amp; IT Center &middot; 10 Oktober 2026</div>
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
    <!-- IDOR SIMULATOR BAR -->
    <div style="background:#fff1f2; border:1px solid #fecdd3; border-radius:8px; padding:12px 16px; margin-bottom:18px;">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
        <div>
          <b style="color:#9f1239; font-size:12.5px;">⚠️ Simulasi Celah IDOR (Insecure Direct Object Reference)</b>
          <div style="font-size:11.5px; color:#475569; margin-top:2px;">
            Sistem menampilkan transkrip berdasarkan parameter <code>target_nim</code> tanpa otentikasi hak milik akun.
          </div>
        </div>
        <div style="display:flex; gap:8px; align-items:center;">
          <label style="font-size:11.5px; font-weight:700; color:#334155;">Target NIM:</label>
          <select class="form-input-control" style="width:auto; padding:4px 8px; font-size:12px;" onchange="changeIdorNim(this.value)">
            <option value="24781078" ${targetNim === "24781078" ? "selected" : ""}>24781078 - Meca Abzanro (Milik Anda)</option>
            <option value="24781015" ${targetNim === "24781015" ? "selected" : ""}>24781015 - Siti Nurhaliza (Target IDOR)</option>
            <option value="24781023" ${targetNim === "24781023" ? "selected" : ""}>24781023 - Budi Darmawan (Target IDOR)</option>
          </select>
        </div>
      </div>
      ${isIDORActive ? `
        <div style="margin-top:8px; background:#e11d48; color:#fff; font-size:11.5px; padding:5px 10px; border-radius:4px; font-weight:700;">
          🚨 EKSPLOITASI IDOR BERHASIL: Anda (NIM: ${currentUser.nomor_induk}) berhasil membuka KHS rahasia milik: ${userTarget.nama} (NIM: ${targetNim})!
        </div>
      ` : ''}
    </div>

    <!-- IDENTITAS MAHASISWA -->
    <div class="academic-card" style="padding:18px;">
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:14px;">
        <div>
          <div style="font-size:11px; color:#64748b; font-weight:700; text-transform:uppercase;">Nama Mahasiswa</div>
          <div style="font-size:15px; font-weight:800; color:#0f2b5c;">${escapeHTML(userTarget.nama)}</div>
        </div>
        <div>
          <div style="font-size:11px; color:#64748b; font-weight:700; text-transform:uppercase;">Nomor Induk Mahasiswa</div>
          <div style="font-size:14px; font-weight:700; color:#1e40af;">${escapeHTML(userTarget.nomor_induk)}</div>
        </div>
        <div>
          <div style="font-size:11px; color:#64748b; font-weight:700; text-transform:uppercase;">Program Studi</div>
          <div style="font-size:13px; font-weight:600; color:#334155;">${escapeHTML(userTarget.prodi || 'D3 Manajemen Informatika')}</div>
        </div>
        <div>
          <div style="font-size:11px; color:#64748b; font-weight:700; text-transform:uppercase;">Indeks Prestasi Semester (IPS)</div>
          <div style="font-size:18px; font-weight:800; color:#059669;">${ipkCalc} <small style="font-size:11px; color:#64748b;">(${totalSKS} SKS)</small></div>
        </div>
      </div>
    </div>

    <!-- TABEL KHS -->
    <div class="academic-card">
      <div class="card-header-line">
        <div class="card-title-text">
          <span>📊</span> <span>Kartu Hasil Studi (KHS) Semester Ganjil 2026/2027</span>
        </div>
        <button class="btn-siakad btn-secondary btn-sm" onclick="window.print()">🖨️ Cetak KHS PDF</button>
      </div>

      <div class="table-responsive-box">
        <table class="siakad-table">
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
                <td><span class="grade-badge-cell badge-${g.huruf.charAt(0)}">${g.huruf}</span></td>
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
  renderNilaiView(document.getElementById("siakadMainContent"));
}

// ==========================================
// 3. E-LEARNING & TUGAS (VULN: UNRESTRICTED UPLOAD)
// ==========================================
function renderTugasView(container) {
  const submissions = getStorage("itsm_submissions", DEFAULT_SUBMISSIONS);
  const mySubmissions = submissions.filter(s => s.nim === currentUser.nomor_induk);

  container.innerHTML = `
    <!-- UNRESTRICTED UPLOAD BAR -->
    <div style="background:#fff1f2; border:1px solid #fecdd3; border-radius:8px; padding:12px 16px; margin-bottom:18px;">
      <b style="color:#9f1239; font-size:12.5px;">⚠️ Celah Keamanan: Validasi Ekstensi &amp; MIME Berkas Lemah (Unrestricted Upload)</b>
      <div style="font-size:11.5px; color:#475569; margin-top:2px;">
        Sistem tidak memeriksa ekstensi file yang diunggah. Berkas web (.html, .svg, .js) berisi script jahat dapat diunggah dan dieksekusi saat dibuka.
      </div>
    </div>

    <!-- FORM UPLOAD -->
    <div class="academic-card">
      <div class="card-header-line">
        <div class="card-title-text">
          <span>📤</span> <span>Pengumpulan Berkas Tugas Mahasiswa</span>
        </div>
      </div>

      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:16px;">
        <div class="form-field-row">
          <label>Mata Kuliah:</label>
          <select id="uploadMatkul" class="form-input-control">
            <option value="Keamanan Sistem Informasi & Siber">Keamanan Sistem Informasi & Siber</option>
            <option value="Pemrograman Web Lanjut & API">Pemrograman Web Lanjut & API</option>
            <option value="Manajemen Basis Data & SQL">Manajemen Basis Data & SQL</option>
          </select>
        </div>
        <div class="form-field-row">
          <label>Judul / Catatan Tugas:</label>
          <input type="text" id="uploadJudul" class="form-input-control" placeholder="Contoh: Laporan Praktikum Evaluasi OWASP">
        </div>
      </div>

      <div class="form-field-row">
        <label>Pilih Berkas Tugas (Menerima Ekstensi Apa Saja):</label>
        <input type="file" id="uploadFile" class="form-input-control" style="padding:6px 10px;">
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-top:14px;">
        <button class="btn-siakad btn-primary" onclick="submitTugasFile()">
          🚀 Unggah Berkas Tugas
        </button>
        <button class="btn-siakad btn-secondary btn-sm" onclick="simulateMaliciousUpload()">
          ⚡ Uji Upload File Berbahaya (.html XSS)
        </button>
      </div>
    </div>

    <!-- DAFTAR PENGUMPULAN TUGAS -->
    <div class="academic-card">
      <div class="card-header-line">
        <div class="card-title-text">
          <span>📂</span> <span>Riwayat Pengumpulan Berkas Tugas</span>
        </div>
      </div>

      <div class="table-responsive-box">
        <table class="siakad-table">
          <thead>
            <tr>
              <th>Mata Kuliah</th>
              <th>Judul Tugas</th>
              <th>Nama Berkas</th>
              <th>Waktu Unggah</th>
              <th>Status</th>
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
                <td><span style="background:#ecfdf5; color:#059669; font-weight:700; padding:2px 8px; border-radius:4px; font-size:11px;">${s.status} (${s.nilai || 'Menunggu'})</span></td>
                <td>
                  <button class="btn-siakad btn-secondary btn-sm" onclick="previewUploadedFile(${s.id})">
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
  const maliciousHTML = `<!DOCTYPE html><html><body><h1 style="color:red">⚠️ Malicious Script Executed via Unrestricted Upload!</h1><p>Berkas HTML ini dieksekusi di domain kampus tanpa filter.</p><script>alert('🔴 [UNRESTRICTED UPLOAD BERHASIL]\\nFile .html dieksekusi di origin!\\nSession: ' + localStorage.getItem('itsm_db_v4_siakad'));</script></body></html>`;
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

  renderTugasView(document.getElementById("siakadMainContent"));
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
    <!-- STORED XSS BAR -->
    <div style="background:#fff1f2; border:1px solid #fecdd3; border-radius:8px; padding:12px 16px; margin-bottom:18px;">
      <b style="color:#9f1239; font-size:12.5px;">⚠️ Celah Keamanan: Stored XSS (Cross-Site Scripting)</b>
      <div style="font-size:11.5px; color:#475569; margin-top:2px;">
        Komentar forum disimpan apa adanya di database dan dirender langsung ke DOM melalui <code>innerHTML</code> tanpa sanitasi.
      </div>
    </div>

    <!-- DAFTAR THREAD FORUM -->
    <div class="academic-card">
      <div class="card-header-line">
        <div class="card-title-text">
          <span>💬</span> <span>Forum Diskusi Kelas Perkuliahan</span>
        </div>
      </div>

      <div style="display:flex; flex-direction:column; gap:16px;">
        ${threads.map(th => `
          <div style="border:1px solid #e2e8f0; border-radius:8px; padding:16px; background:#ffffff;">
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:8px;">
              <div class="user-avatar-circle" style="width:32px; height:32px; font-size:12px;">${th.author.charAt(0)}</div>
              <div>
                <b style="color:#0f2b5c; font-size:13px;">${escapeHTML(th.author)}</b>
                <span style="background:#eff6ff; color:#1d4ed8; font-weight:700; padding:1px 6px; border-radius:4px; font-size:10px; margin-left:6px;">${th.role.toUpperCase()}</span>
                <div style="font-size:11px; color:#64748b;">${escapeHTML(th.matkul)} &middot; ${th.time}</div>
              </div>
            </div>

            <h4 style="font-size:14px; color:#1e40af; margin-bottom:6px;">${escapeHTML(th.title)}</h4>
            <p style="font-size:12.5px; color:#334155; line-height:1.6;">${escapeHTML(th.content)}</p>

            <!-- KOMENTAR: STORED XSS -->
            <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:12px; margin-top:12px;">
              <b style="font-size:11.5px; color:#1e40af; display:block; margin-bottom:6px;">Tanggapan Forum (${th.comments.length}):</b>
              
              <div style="display:flex; flex-direction:column; gap:6px;">
                ${th.comments.map(c => `
                  <div style="padding:6px 0; border-bottom:1px solid #e2e8f0; font-size:12px;">
                    <b>${escapeHTML(c.author)}</b> <span style="font-size:10.5px; color:#94a3b8;">(${c.time}):</span>
                    <!-- RENDER LANGSUNG INNERHTML (STORED XSS) -->
                    <div style="margin-top:2px; color:#1e293b;">${c.text}</div>
                  </div>
                `).join("")}
              </div>

              <!-- INPUT BALAS KOMENTAR -->
              <div style="margin-top:10px; display:flex; gap:8px;">
                <input type="text" id="reply-input-${th.id}" class="form-input-control" placeholder="Tuliskan tanggapan Anda... (Coba masukkan script XSS)" style="font-size:12px; padding:6px 10px;">
                <button class="btn-siakad btn-primary btn-sm" onclick="submitComment(${th.id})">Kirim</button>
                <button class="btn-siakad btn-secondary btn-sm" onclick="fillXSSPayload(${th.id})" title="Isi otomatis skrip XSS">⚡ Inject XSS</button>
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
      text: text,
      time: "Baru saja"
    });
    setStorage("itsm_threads", threads);

    if (/<script|<img|<svg|onerror|onload/i.test(text)) {
      logActivity("⚠️ STORED XSS TERINJEKSI", `Payload: ${text} pada Thread #${threadId}`);
      showToast("⚠️ <b>Stored XSS Tersimpan!</b> Komentar akan dieksekusi di browser siapapun yang membuka forum ini.", true);
    } else {
      showToast("Tanggapan berhasil diposting.");
    }

    renderForumView(document.getElementById("siakadMainContent"));
  }
}

function fillXSSPayload(threadId) {
  const input = document.getElementById(`reply-input-${threadId}`);
  input.value = `<img src=x onerror="alert('🔴 [STORED XSS BERHASIL]\\nCookie/Token Terbaca: ' + localStorage.getItem('itsm_db_v4_siakad') + '\\nPengguna: ${currentUser.nama}')">`;
  input.focus();
}

// ==========================================
// 5. BIODATA & PROFIL (VULN: PRIVILEGE ESCALATION)
// ==========================================
function renderProfilView(container) {
  container.innerHTML = `
    <!-- ESKALASI ROLE BAR -->
    <div style="background:#fff1f2; border:1px solid #fecdd3; border-radius:8px; padding:12px 16px; margin-bottom:18px;">
      <b style="color:#9f1239; font-size:12.5px;">⚠️ Celah Keamanan: Eskalasi Hak Akses (Privilege Escalation / Mass Assignment)</b>
      <div style="font-size:11.5px; color:#475569; margin-top:2px;">
        Parameter <code>role</code> pada formulir pembaruan profil dikirim dari browser tanpa validasi otorisasi di backend. Mahasiswa dapat menaikkan hak akses dirinya menjadi <b>Dosen</b> atau <b>Admin</b>.
      </div>
    </div>

    <!-- FORM BIODATA -->
    <div class="academic-card">
      <div class="card-header-line">
        <div class="card-title-text">
          <span>👤</span> <span>Biodata Civitas Akademika (PDDIKTI)</span>
        </div>
      </div>

      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:16px;">
        <div class="form-field-row">
          <label>Nama Lengkap:</label>
          <input type="text" id="profNama" class="form-input-control" value="${escapeHTML(currentUser.nama)}">
        </div>
        <div class="form-field-row">
          <label>Nomor Induk Mahasiswa / Pegawai:</label>
          <input type="text" class="form-input-control" value="${escapeHTML(currentUser.nomor_induk)}" disabled style="background:#f1f5f9;">
        </div>
        <div class="form-field-row">
          <label>Program Studi:</label>
          <input type="text" class="form-input-control" value="${escapeHTML(currentUser.prodi || '')}" disabled style="background:#f1f5f9;">
        </div>
        <div class="form-field-row">
          <label>Alamat Email Kampus:</label>
          <input type="email" id="profEmail" class="form-input-control" value="${escapeHTML(currentUser.email || '')}">
        </div>
      </div>

      <!-- VULNERABLE ROLE SELECTOR -->
      <div class="form-field-row" style="background:#fff1f2; padding:12px; border:1px dashed #f43f5e; border-radius:6px; margin-top:8px;">
        <label style="color:#be123c; font-weight:800;">Hak Akses / Peran Sistem (Celah Mass Assignment):</label>
        <p style="font-size:11px; color:#475569; margin-bottom:8px;">
          Pilih role baru untuk mengeskalasi akses akun Anda ke dashboard Dosen atau Administrator:
        </p>
        <select id="profRole" class="form-input-control" style="border-color:#f43f5e; font-weight:700;">
          <option value="mahasiswa" ${currentUser.role === "mahasiswa" ? "selected" : ""}>Mahasiswa (Akses Standar)</option>
          <option value="dosen" ${currentUser.role === "dosen" ? "selected" : ""}>Dosen (Hak Input Nilai & Review Tugas)</option>
          <option value="admin" ${currentUser.role === "admin" ? "selected" : ""}>Admin IT Center (Hak Penuh Kelola Akun & Pengguna)</option>
        </select>
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-top:16px;">
        <button class="btn-siakad btn-primary" onclick="saveProfileChanges()">
          💾 Simpan Perubahan Biodata
        </button>
        <button class="btn-siakad btn-danger btn-sm" onclick="escalateToAdminQuick()">
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
      showToast(`🚨 <b>Eskalasi Role Berhasil!</b> Akun Anda dinaikkan menjadi <b>${newRole.toUpperCase()}</b>. Menu baru terbuka di navbar!`, true);
    } else {
      showToast("Biodata profil berhasil disimpan.");
    }

    updateHeaderProfile();
    updateNavRoleTabs();
    renderProfilView(document.getElementById("siakadMainContent"));
  }
}

function escalateToAdminQuick() {
  const roleSelect = document.getElementById("profRole");
  if (roleSelect) roleSelect.value = "admin";
  saveProfileChanges();
}

// ==========================================
// 6. PANEL DOSEN
// ==========================================
function renderGradingView(container) {
  const grades = getStorage("itsm_grades", DEFAULT_GRADES);
  const users = getStorage("itsm_users", DEFAULT_USERS);

  container.innerHTML = `
    <div class="academic-card">
      <div class="card-header-line">
        <div class="card-title-text">
          <span>📝</span> <span>Panel Dosen: Input Nilai KHS Mahasiswa</span>
        </div>
      </div>

      <div class="table-responsive-box">
        <table class="siakad-table">
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
                  <td><input type="number" id="tugas-${idx}" class="form-input-control" value="${g.tugas}" style="width:70px; padding:3px 6px;"></td>
                  <td><input type="number" id="uts-${idx}" class="form-input-control" value="${g.uts}" style="width:70px; padding:3px 6px;"></td>
                  <td><input type="number" id="uas-${idx}" class="form-input-control" value="${g.uas}" style="width:70px; padding:3px 6px;"></td>
                  <td>
                    <select id="huruf-${idx}" class="form-input-control" style="width:75px; padding:3px;">
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
                    <button class="btn-siakad btn-primary btn-sm" onclick="saveGrade(${idx})">💾 Simpan</button>
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
    <div class="academic-card">
      <div class="card-header-line">
        <div class="card-title-text">
          <span>📂</span> <span>Panel Dosen: Review Berkas Tugas Mahasiswa</span>
        </div>
      </div>

      <div class="table-responsive-box">
        <table class="siakad-table">
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
                  <button class="btn-siakad btn-secondary btn-sm" onclick="previewUploadedFile(${s.id})">👁️ Buka File</button>
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
// 7. PANEL ADMIN
// ==========================================
function renderAdminUsersView(container) {
  const users = getStorage("itsm_users", DEFAULT_USERS);

  container.innerHTML = `
    <div class="academic-card">
      <div class="card-header-line">
        <div class="card-title-text">
          <span>👥</span> <span>Panel Admin: Manajemen Akun Civitas Akademika</span>
        </div>
        <button class="btn-siakad btn-primary btn-sm" onclick="openCreateUserModal()">+ Tambah Pengguna Baru</button>
      </div>

      <div class="table-responsive-box">
        <table class="siakad-table">
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
                <td><span style="background:#eff6ff; color:#1e40af; font-weight:700; padding:2px 6px; border-radius:4px; font-size:10.5px;">${u.role.toUpperCase()}</span></td>
                <td><span style="color:#059669; font-weight:700;">${escapeHTML(u.status || 'Aktif')}</span></td>
                <td>
                  <button class="btn-siakad btn-secondary btn-sm" onclick="quickLogin('${u.username}')">🔑 Login</button>
                  ${u.username !== 'admin_itsm' ? `
                    <button class="btn-siakad btn-danger btn-sm" onclick="deleteUser(${u.id})">🗑️ Hapus</button>
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
  renderAdminUsersView(document.getElementById("siakadMainContent"));
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
  renderAdminUsersView(document.getElementById("siakadMainContent"));
}

function renderAuditLogsView(container) {
  const logs = getStorage("itsm_logs", []);

  container.innerHTML = `
    <div class="academic-card">
      <div class="card-header-line">
        <div class="card-title-text">
          <span>🛡️</span> <span>Panel Admin: Audit Log &amp; Rekam Jejak Keamanan</span>
        </div>
        <button class="btn-siakad btn-secondary btn-sm" onclick="clearLogs()">Bersihkan Log</button>
      </div>

      <div class="table-responsive-box">
        <table class="siakad-table">
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
                <td style="font-family:var(--font-mono); font-size:11.5px; color:#475569;">${escapeHTML(l.details || '-')}</td>
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
  renderAuditLogsView(document.getElementById("siakadMainContent"));
  showToast("Audit log berhasil dibersihkan.");
}

function toggleSecurityModal(show) {
  const modal = document.getElementById("securityModalOverlay");
  if (modal) modal.style.display = show ? "flex" : "none";
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
