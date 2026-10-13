/**
 * PORTAL AKADEMIK TERPADU - INSTITUT TEKNOLOGI & SAINS MANDIRI (ITSM)
 * Praktikum Keamanan Sistem Informasi
 * Implementasi 4 Kerentanan yang Dibuat Secara Sengaja:
 * 1. Stored XSS (Forum Diskusi)
 * 2. IDOR / Kontrol Akses Lemah (Lihat Nilai & Transkrip)
 * 3. Eskalasi Hak Akses (Privilege Escalation via Profil / Role State)
 * 4. Validasi Berkas Lemah (Unrestricted File Upload pada Tugas)
 * + Bonus: SQL Injection pada Form Login
 */

// Inisialisasi Database Sintetis di LocalStorage
const DB_VERSION = "itsm_db_v2";

const DEFAULT_USERS = [
  {
    id: 1,
    username: "meca",
    password: "mhs123",
    nama: "M. Putara Meca Abzanro",
    nomor_induk: "24781078",
    role: "mahasiswa",
    prodi: "Manajemen Informatika (D3)",
    semester: 5,
    email: "meca.24781078@itsm.ac.id",
    status: "Aktif",
    ipk: 3.88
  },
  {
    id: 2,
    username: "siti",
    password: "mhs123",
    nama: "Siti Nurhaliza",
    nomor_induk: "24781015",
    role: "mahasiswa",
    prodi: "Manajemen Informatika (D3)",
    semester: 5,
    email: "siti.24781015@itsm.ac.id",
    status: "Aktif",
    ipk: 3.42
  },
  {
    id: 3,
    username: "budi",
    password: "mhs123",
    nama: "Budi Darmawan",
    nomor_induk: "24781023",
    role: "mahasiswa",
    prodi: "Teknik Informatika (S1)",
    semester: 5,
    email: "budi.24781023@itsm.ac.id",
    status: "Percobaan Akademik",
    ipk: 2.15
  },
  {
    id: 4,
    username: "dosen_hendra",
    password: "dosen123",
    nama: "Dr. Ir. Hendra Wijaya, M.Kom.",
    nomor_induk: "0219088501",
    role: "dosen",
    prodi: "Teknologi Informasi",
    email: "hendra.wijaya@itsm.ac.id",
    status: "Dosen Tetap",
    matkul_ampu: ["Keamanan Siber", "Pemrograman Web Lanjut"]
  },
  {
    id: 5,
    username: "dosen_ratna",
    password: "dosen123",
    nama: "Ratna Kusuma, M.T.",
    nomor_induk: "0214048902",
    role: "dosen",
    prodi: "Manajemen Informatika",
    email: "ratna.kusuma@itsm.ac.id",
    status: "Dosen Tetap",
    matkul_ampu: ["Manajemen Basis Data", "Rekayasa Perangkat Lunak"]
  },
  {
    id: 6,
    username: "admin_itsm",
    password: "adminSuperSecret!",
    nama: "Administrator Sistem (IT Center)",
    nomor_induk: "198501102010121001",
    role: "admin",
    prodi: "Biro Administrasi Akademik",
    email: "admin.siakad@itsm.ac.id",
    status: "Super Administrator"
  }
];

const DEFAULT_GRADES = [
  // Meca (NIM: 24781078)
  { nim: "24781078", kode: "IF501", matkul: "Keamanan Sistem Informasi & Siber", sks: 3, tugas: 95, uts: 92, uas: 90, huruf: "A", bobot: 4.0 },
  { nim: "24781078", kode: "IF502", matkul: "Pemrograman Web Lanjut & API", sks: 3, tugas: 90, uts: 88, uas: 92, huruf: "A", bobot: 4.0 },
  { nim: "24781078", kode: "IF503", matkul: "Manajemen Basis Data & SQL", sks: 3, tugas: 85, uts: 86, uas: 88, huruf: "A-", bobot: 3.75 },
  { nim: "24781078", kode: "IF504", matkul: "Rekayasa Perangkat Lunak", sks: 3, tugas: 88, uts: 90, uas: 87, huruf: "A-", bobot: 3.75 },
  
  // Siti (NIM: 24781015)
  { nim: "24781015", kode: "IF501", matkul: "Keamanan Sistem Informasi & Siber", sks: 3, tugas: 82, uts: 78, uas: 80, huruf: "B+", bobot: 3.5 },
  { nim: "24781015", kode: "IF502", matkul: "Pemrograman Web Lanjut & API", sks: 3, tugas: 85, uts: 80, uas: 84, huruf: "B+", bobot: 3.5 },
  { nim: "24781015", kode: "IF503", matkul: "Manajemen Basis Data & SQL", sks: 3, tugas: 76, uts: 74, uas: 75, huruf: "B", bobot: 3.0 },
  { nim: "24781015", kode: "IF504", matkul: "Rekayasa Perangkat Lunak", sks: 3, tugas: 80, uts: 79, uas: 81, huruf: "B+", bobot: 3.5 },

  // Budi (NIM: 24781023)
  { nim: "24781023", kode: "IF501", matkul: "Keamanan Sistem Informasi & Siber", sks: 3, tugas: 50, uts: 55, uas: 48, huruf: "D", bobot: 1.0 },
  { nim: "24781023", kode: "IF502", matkul: "Pemrograman Web Lanjut & API", sks: 3, tugas: 60, uts: 62, uas: 65, huruf: "C", bobot: 2.0 },
  { nim: "24781023", kode: "IF503", matkul: "Manajemen Basis Data & SQL", sks: 3, tugas: 45, uts: 50, uas: 40, huruf: "E", bobot: 0.0 },
  { nim: "24781023", kode: "IF504", matkul: "Rekayasa Perangkat Lunak", sks: 3, tugas: 65, uts: 60, uas: 62, huruf: "C+", bobot: 2.5 }
];

const DEFAULT_THREADS = [
  {
    id: 1,
    author: "Dr. Ir. Hendra Wijaya, M.Kom.",
    role: "dosen",
    matkul: "Keamanan Sistem Informasi & Siber",
    title: "Pengumpulan Tugas Analisis Kerentanan Web & Prompt Injection",
    content: "Silakan unggah dokumen laporan beserta tautan video PoC sebelum batas akhir hari Jumat pukul 23:59 WIB. Jika ada pertanyaan mengenai skema payload, diskusikan di kolom komentar bawah ini.",
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
    title: "Diskusi Arsitektur Defense-in-Depth pada Form Upload & Otentikasi",
    content: "Mahasiswa diharapkan memahami mengapa input validation dan role-based access control (RBAC) harus ditegakkan di sisi server/backend, bukan hanya sekadar filter UI di browser.",
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
    judul: "Tugas 1 - Laporan Analisis Kerentanan Web",
    nama_file: "laporan_keamanan_meca.pdf",
    tipe_file: "application/pdf",
    konten_file: "JVBERi0xLjQKJ...(Simulasi File Berkas PDF Asli)",
    waktu: "12 Okt 2026, 14:20 WIB",
    status: "Sudah Dinilai",
    nilai: 95
  },
  {
    id: 2,
    nim: "24781015",
    nama: "Siti Nurhaliza",
    matkul: "Keamanan Sistem Informasi & Siber",
    judul: "Tugas 1 - Laporan Analisis Kerentanan Web",
    nama_file: "laporan_siti_tugas1.docx",
    tipe_file: "application/vnd.openxmlformats-officedocument",
    konten_file: "PK...(Simulasi File Berkas Docx Asli)",
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

// Inisialisasi awal DB jika belum ada
if (!localStorage.getItem(DB_VERSION)) {
  localStorage.setItem(DB_VERSION, "true");
  setStorage("itsm_users", DEFAULT_USERS);
  setStorage("itsm_grades", DEFAULT_GRADES);
  setStorage("itsm_threads", DEFAULT_THREADS);
  setStorage("itsm_submissions", DEFAULT_SUBMISSIONS);
  setStorage("itsm_logs", [
    { time: new Date().toLocaleTimeString(), action: "Sistem ITSM diinisialisasi", user: "system", ip: "127.0.0.1" }
  ]);
}

// State Aplikasi
let currentUser = getStorage("itsm_current_user", null);

// Inisialisasi Render Saat Dokumen Siap
document.addEventListener("DOMContentLoaded", () => {
  renderNavbar();
  if (currentUser) {
    showDashboard();
  } else {
    showAuth();
  }
  setupEvents();
});

// Toast Notifikasi
function showToast(msg, isWarn = false) {
  const container = document.getElementById("toastContainer");
  const t = document.createElement("div");
  t.className = "toast";
  if (isWarn) t.style.borderLeftColor = "#f43f5e";
  t.innerHTML = msg;
  container.appendChild(t);
  setTimeout(() => {
    t.style.opacity = "0";
    setTimeout(() => t.remove(), 300);
  }, 4000);
}

// Log Keamanan
function logActivity(action, details = "") {
  const logs = getStorage("itsm_logs", []);
  logs.unshift({
    time: new Date().toLocaleTimeString() + " WIB",
    user: currentUser ? `${currentUser.nama} (${currentUser.role})` : "Guest",
    action: action,
    details: details
  });
  setStorage("itsm_logs", logs.slice(0, 50));
}

// Navbar Render
function renderNavbar() {
  const userArea = document.getElementById("navUserArea");
  if (!currentUser) {
    userArea.innerHTML = `
      <button class="btn btn-primary btn-sm" onclick="showAuth()">Masuk Portal</button>
    `;
    return;
  }
  userArea.innerHTML = `
    <div class="user-badge">
      <span>👤 <b>${escapeHTML(currentUser.nama)}</b></span>
      <span class="role-pill ${currentUser.role}">${currentUser.role}</span>
    </div>
    <button class="btn btn-secondary btn-sm" onclick="logout()">Keluar</button>
  `;
}

// View Controller
function showAuth() {
  document.getElementById("authSection").style.display = "block";
  document.getElementById("dashboardSection").style.display = "none";
}

function showDashboard() {
  document.getElementById("authSection").style.display = "none";
  document.getElementById("dashboardSection").style.display = "block";
  renderTabs();
}

// Autentikasi & Login (Dengan Simulasi SQL Injection)
function login(username, password) {
  const users = getStorage("itsm_users", DEFAULT_USERS);

  // SIMULASI VULNERABILITAS: SQL INJECTION
  // Mengemulasikan query backend rentan: SELECT * FROM users WHERE username = '${username}' AND password = '${password}'
  if (username.includes("' OR '1'='1") || username.includes("' OR 1=1") || username.includes("'--")) {
    logActivity("⚠️ SERANGAN SQL INJECTION TERDETEKSI", `Payload: "${username}" berhasil membypass autentikasi!`);
    showToast("⚠️ <b>SQL Injection Terpicu!</b> Otentikasi dibypass via statement <code>' OR '1'='1</code>. Masuk sebagai Administrator!", true);
    // Login sebagai Admin pertama
    const adminUser = users.find(u => u.role === "admin") || users[0];
    setCurrentUser(adminUser);
    return;
  }

  const found = users.find(u => u.username === username && u.password === password);
  if (found) {
    setCurrentUser(found);
    showToast(`Selamat datang, <b>${found.nama}</b>! Masuk sebagai <i>${found.role}</i>.`);
    logActivity("Login Berhasil", `User: ${found.username} (${found.role})`);
  } else {
    showToast("❌ Username atau kata sandi salah. Silakan coba lagi.", true);
  }
}

function setCurrentUser(user) {
  currentUser = { ...user };
  setStorage("itsm_current_user", currentUser);
  renderNavbar();
  showDashboard();
}

function logout() {
  logActivity("Logout Pengguna", `User: ${currentUser?.username || "Anonim"}`);
  currentUser = null;
  localStorage.removeItem("itsm_current_user");
  renderNavbar();
  showAuth();
  showToast("Anda telah keluar dari Portal Akademik.");
}

// Quick Switcher untuk Penguji / Dosen
function quickLogin(username) {
  const users = getStorage("itsm_users", DEFAULT_USERS);
  const u = users.find(x => x.username === username);
  if (u) {
    setCurrentUser(u);
    showToast(`Beralih cepat ke akun: <b>${u.nama}</b> (${u.role.toUpperCase()})`);
  }
}

// ==========================================
// TABS & ROLE VIEWS
// ==========================================
function renderTabs() {
  const tabsNav = document.getElementById("tabsNav");
  const contentArea = document.getElementById("tabContent");
  
  // Tentukan tab berdasarkan hak role (dan juga tampilkan tab yang bisa diakses jika dieksploitasi)
  let tabs = [];
  
  // Semua role bisa akses Forum Diskusi
  tabs.push({ id: "forum", label: "💬 Forum Diskusi", icon: "💬" });

  if (currentUser.role === "mahasiswa") {
    tabs.unshift({ id: "nilai", label: "📊 Lihat Nilai & KHS", icon: "📊" });
    tabs.splice(1, 0, { id: "tugas", label: "📤 Unggah Tugas", icon: "📤" });
    tabs.push({ id: "profil", label: "⚙️ Pengaturan Profil", icon: "⚙️" });
  } else if (currentUser.role === "dosen") {
    tabs.unshift({ id: "grading", label: "📝 Input & Beri Nilai", icon: "📝" });
    tabs.splice(1, 0, { id: "review_tugas", label: "📂 Review Berkas Tugas", icon: "📂" });
  } else if (currentUser.role === "admin") {
    tabs.unshift({ id: "admin_users", label: "👥 Kelola Akun Pengguna", icon: "👥" });
    tabs.splice(1, 0, { id: "audit_logs", label: "🛡️ Audit Log Keamanan", icon: "🛡️" });
  }

  tabsNav.innerHTML = tabs.map((t, idx) => `
    <button class="tab-btn ${idx === 0 ? 'active' : ''}" onclick="switchTab('${t.id}', this)">
      ${t.label}
    </button>
  `).join("");

  // Buka tab pertama secara default
  if (tabs.length > 0) {
    loadTabContent(tabs[0].id);
  }
}

function switchTab(tabId, btnElem) {
  document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
  if (btnElem) btnElem.classList.add("active");
  loadTabContent(tabId);
}

function loadTabContent(tabId) {
  const container = document.getElementById("tabContent");
  switch (tabId) {
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
      container.innerHTML = `<p>Halaman tidak ditemukan.</p>`;
  }
}

// ==========================================
// VULNERABILITAS 1: STORED XSS (FORUM DISKUSI)
// ==========================================
function renderForumView(container) {
  const threads = getStorage("itsm_threads", DEFAULT_THREADS);

  container.innerHTML = `
    <div class="card">
      <div class="card-header">
        <div class="card-title">💬 Forum Diskusi Akademik Terbuka</div>
        <button class="btn btn-primary btn-sm" onclick="openNewThreadModal()">+ Buat Thread Baru</button>
      </div>
      <p style="font-size:13px; color:var(--text-muted); margin-bottom:16px;">
        Forum perkuliahan ITSM. Berbagi pertanyaan dan materi akademik. 
        <span style="color:#fda4af; font-weight:600;">(⚠️ Celah Keamanan: Input komentar disimpan dan dirender langsung tanpa HTML escaping)</span>
      </p>

      <div class="forum-thread-list">
        ${threads.map(th => `
          <div class="forum-thread" id="thread-${th.id}">
            <div class="thread-author">
              <div class="avatar-circle">${th.author.charAt(0)}</div>
              <div>
                <b style="font-size:13px;">${escapeHTML(th.author)}</b> 
                <span class="role-pill ${th.role}" style="font-size:9.5px;">${th.role}</span>
                <div style="font-size:11px; color:var(--text-muted);">${escapeHTML(th.matkul)} · ${th.time}</div>
              </div>
            </div>
            <h4 style="font-size:15px; margin-bottom:6px; color:#fff;">${escapeHTML(th.title)}</h4>
            <!-- Thread content -->
            <div class="thread-body">${escapeHTML(th.content)}</div>

            <!-- KOMENTAR THREAD: STORED XSS HAPPENS HERE -->
            <div class="thread-comments">
              <b style="font-size:12px; color:var(--sky); display:block; margin-bottom:6px;">Tanggapan & Diskusi:</b>
              <div id="comment-list-${th.id}">
                ${th.comments.map(c => `
                  <div class="comment-item">
                    <b>${escapeHTML(c.author)}</b> <span style="font-size:10px; color:var(--text-muted);">(${c.time}):</span>
                    <!-- KERENTANAN SENGANJA: c.text dirender via innerHTML tanpa escape -->
                    <div class="comment-text" style="margin-top:2px; color:var(--text-main);">${c.text}</div>
                  </div>
                `).join("")}
              </div>

              <!-- Form Balas Komentar -->
              <div style="margin-top:12px; display:flex; gap:8px;">
                <input type="text" id="reply-input-${th.id}" class="input-control" placeholder="Tulis komentar... (Coba ketik payload XSS di sini)" style="font-size:12.5px; padding:6px 12px;">
                <button class="btn btn-primary btn-sm" onclick="submitComment(${th.id})">Kirim</button>
                <button class="btn btn-secondary btn-sm" onclick="fillXSSPayload(${th.id})" title="Isi payload otomatis">⚡ Inject XSS</button>
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
    const newComment = {
      author: currentUser.nama,
      role: currentUser.role,
      text: text, // DISIMPAN APA ADANYA (STORED XSS)
      time: "Baru saja"
    };
    target.comments.push(newComment);
    setStorage("itsm_threads", threads);
    
    // Deteksi jika komentar mengandung XSS payload
    if (/<script|<img|<svg|onerror|onload/i.test(text)) {
      logActivity("⚠️ STORED XSS TERINJEKSI", `Payload: ${text} pada Thread #${threadId}`);
      showToast("⚠️ <b>Stored XSS Tersimpan di DB!</b> Komentar akan dieksekusi oleh siapapun yang melihat thread ini.", true);
    } else {
      showToast("Komentar berhasil dipublikasikan.");
    }

    renderForumView(document.getElementById("tabContent"));
  }
}

function fillXSSPayload(threadId) {
  const input = document.getElementById(`reply-input-${threadId}`);
  input.value = `<img src=x onerror="alert('🔴 [STORED XSS BERHASIL]\\nCookie/Token Terbaca: ' + localStorage.getItem('itsm_db_v2') + '\\nPengguna Aktif: ${currentUser.nama}')">`;
  input.focus();
}

// ==========================================
// VULNERABILITAS 2: IDOR (LIHAT NILAI & KHS)
// ==========================================
function renderNilaiView(container) {
  const allGrades = getStorage("itsm_grades", DEFAULT_GRADES);
  const allUsers = getStorage("itsm_users", DEFAULT_USERS);

  // Secara default menampilkan nilai milik user saat ini
  let targetNim = currentUser.nomor_induk;

  // Cek apakah ada parameter IDOR dari URL / input
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("nim")) {
    targetNim = urlParams.get("nim");
  }

  // Tampilkan data nilai untuk targetNim (TANPA CEK APAKAH TARGET NIM ADALAH MILIK USER AKTIF)
  const userTarget = allUsers.find(u => u.nomor_induk === targetNim) || currentUser;
  const userGrades = allGrades.filter(g => g.nim === targetNim);

  const totalSKS = userGrades.reduce((sum, g) => sum + g.sks, 0);
  const totalBobot = userGrades.reduce((sum, g) => sum + (g.bobot * g.sks), 0);
  const ipkCalc = totalSKS > 0 ? (totalBobot / totalSKS).toFixed(2) : "0.00";

  const isIDORActive = targetNim !== currentUser.nomor_induk;

  container.innerHTML = `
    <div class="card">
      <div class="card-header">
        <div class="card-title">📊 Kartu Hasil Studi (KHS) & Transkrip Akademik</div>
        <span class="role-pill mahasiswa">Semester 5 · TA 2026/2027</span>
      </div>

      <!-- PANEL KERENTANAN IDOR -->
      <div style="background: rgba(244, 63, 94, 0.1); border: 1px solid rgba(244, 63, 94, 0.3); border-radius: 8px; padding: 14px 18px; margin-bottom: 20px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
          <div>
            <b style="color:#fda4af; font-size:13px;">⚠️ Simulasi IDOR (Insecure Direct Object Reference)</b>
            <div style="font-size:12px; color:var(--text-sub); margin-top:2px;">
              Sistem mengambil data transkrip berdasarkan parameter <code>target_nim</code> tanpa memvalidasi apakah pengakses memiliki hak atas NIM tersebut.
            </div>
          </div>
          <div style="display:flex; gap:8px; align-items:center;">
            <label style="font-size:12px; color:var(--text-sub);">Ubah Target NIM:</label>
            <select id="idorNimSelect" class="input-control" style="width:auto; padding:4px 8px; font-size:12px;" onchange="changeIdorNim(this.value)">
              <option value="24781078" ${targetNim === "24781078" ? "selected" : ""}>24781078 - Meca (Milik Anda)</option>
              <option value="24781015" ${targetNim === "24781015" ? "selected" : ""}>24781015 - Siti Nurhaliza (Target IDOR)</option>
              <option value="24781023" ${targetNim === "24781023" ? "selected" : ""}>24781023 - Budi Darmawan (Target IDOR)</option>
            </select>
          </div>
        </div>
        ${isIDORActive ? `
          <div style="margin-top:10px; background:#e11d48; color:#fff; font-size:11.5px; padding:6px 12px; border-radius:4px; font-weight:700;">
            🚨 EKSPLOITASI IDOR BERHASIL: Anda (NIM: ${currentUser.nomor_induk}) sedang melihat Nilai & IPK rahasia milik mahasiswa lain (${userTarget.nama} - NIM: ${targetNim})!
          </div>
        ` : ''}
      </div>

      <!-- Info Mahasiswa Terpilih -->
      <div class="grid-2" style="margin-bottom:20px;">
        <div style="background:var(--bg-card); padding:14px; border-radius:8px; border:1px solid var(--border);">
          <div style="font-size:11.5px; color:var(--text-muted);">Nama Mahasiswa:</div>
          <div style="font-size:14px; font-weight:700; color:#fff;">${escapeHTML(userTarget.nama)}</div>
          <div style="font-size:12px; color:var(--sky); margin-top:2px;">NIM: ${escapeHTML(userTarget.nomor_induk)} · ${escapeHTML(userTarget.prodi)}</div>
        </div>
        <div style="background:var(--bg-card); padding:14px; border-radius:8px; border:1px solid var(--border); display:flex; justify-content:space-around; align-items:center;">
          <div style="text-align:center;">
            <div style="font-size:11px; color:var(--text-muted);">Total SKS</div>
            <div style="font-size:20px; font-weight:800; color:var(--sky);">${totalSKS}</div>
          </div>
          <div style="width:1px; height:32px; background:var(--border);"></div>
          <div style="text-align:center;">
            <div style="font-size:11px; color:var(--text-muted);">Indeks Prestasi (IPK)</div>
            <div style="font-size:20px; font-weight:800; color:var(--emerald);">${ipkCalc}</div>
          </div>
        </div>
      </div>

      <!-- Tabel Nilai -->
      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Kode</th>
              <th>Mata Kuliah</th>
              <th>SKS</th>
              <th>Nilai Tugas</th>
              <th>Nilai UTS</th>
              <th>Nilai UAS</th>
              <th>Huruf</th>
              <th>Bobot</th>
            </tr>
          </thead>
          <tbody>
            ${userGrades.map(g => `
              <tr>
                <td><code>${g.kode}</code></td>
                <td><b>${g.matkul}</b></td>
                <td>${g.sks}</td>
                <td>${g.tugas}</td>
                <td>${g.uts}</td>
                <td>${g.uas}</td>
                <td><span class="grade-badge grade-${g.huruf.charAt(0)}">${g.huruf}</span></td>
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
    logActivity("⚠️ AKSES IDOR TERDETEKSI", `User ${currentUser.nomor_induk} mengakses transkrip NIM ${newNim}`);
    showToast(`⚠️ <b>IDOR Terpicu!</b> Mengakses transkrip nilai mahasiswa NIM: <b>${newNim}</b> tanpa otorisasi!`, true);
  }
  const url = new URL(window.location);
  url.searchParams.set("nim", newNim);
  window.history.pushState({}, "", url);
  renderNilaiView(document.getElementById("tabContent"));
}

// ==========================================
// VULNERABILITAS 3: VALIDASI BERKAS LEMAH (UNRESTRICTED UPLOAD)
// ==========================================
function renderTugasView(container) {
  const submissions = getStorage("itsm_submissions", DEFAULT_SUBMISSIONS);
  const mySubmissions = submissions.filter(s => s.nim === currentUser.nomor_induk);

  container.innerHTML = `
    <div class="card">
      <div class="card-header">
        <div class="card-title">📤 Pengumpulan Tugas Kuliah</div>
        <span class="role-pill mahasiswa">Upload Mandiri</span>
      </div>

      <!-- Catatan Kerentanan -->
      <div style="background: rgba(244, 63, 94, 0.1); border: 1px solid rgba(244, 63, 94, 0.3); border-radius: 8px; padding: 12px 16px; margin-bottom: 20px; font-size:12.5px;">
        <b style="color:#fda4af;">⚠️ Celah Keamanan: Validasi Ekstensi & MIME Berkas Tidak Ada</b>
        <div style="color:var(--text-sub); margin-top:2px;">
          Form upload ini tidak memeriksa ekstensi berkas. Mahasiswa dapat mengunggah berkas web eksekutabel (seperti <code>.html</code>, <code>.svg</code>, atau <code>.php</code>) yang berisi skrip jahat dan dapat dibuka langsung melalui browser dosen!
        </div>
      </div>

      <!-- Form Upload -->
      <div style="background:var(--bg-card); padding:20px; border-radius:8px; border:1px solid var(--border); margin-bottom:24px;">
        <h4 style="font-size:14px; margin-bottom:14px; color:#fff;">Formulir Pengumpulan Tugas Baru</h4>
        <div class="grid-2">
          <div class="form-group">
            <label>Mata Kuliah:</label>
            <select id="uploadMatkul" class="input-control">
              <option value="Keamanan Sistem Informasi & Siber">Keamanan Sistem Informasi & Siber</option>
              <option value="Pemrograman Web Lanjut & API">Pemrograman Web Lanjut & API</option>
              <option value="Manajemen Basis Data & SQL">Manajemen Basis Data & SQL</option>
            </select>
          </div>
          <div class="form-group">
            <label>Judul / Keterangan Tugas:</label>
            <input type="text" id="uploadJudul" class="input-control" placeholder="Contoh: Laporan Uji Praktikum 06">
          </div>
        </div>

        <div class="form-group">
          <label>Pilih Berkas Tugas (Menerima Ekstensi Apapun):</label>
          <input type="file" id="uploadFile" class="input-control" style="padding:7px 12px;">
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-top:16px;">
          <button class="btn btn-primary" onclick="submitTugasFile()">Unggah Berkas Tugas</button>
          <button class="btn btn-secondary btn-sm" onclick="simulateMaliciousUpload()">⚡ Contoh Upload Berkas Berbahaya (.html XSS)</button>
        </div>
      </div>

      <!-- Daftar Tugas Terunggah -->
      <h4 style="font-size:14px; margin-bottom:12px; color:#fff;">Daftar Tugas yang Sudah Anda Kumpulkan</h4>
      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Mata Kuliah</th>
              <th>Judul Tugas</th>
              <th>Nama Berkas</th>
              <th>Waktu Unggah</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            ${mySubmissions.map(s => `
              <tr>
                <td><b>${escapeHTML(s.matkul)}</b></td>
                <td>${escapeHTML(s.judul)}</td>
                <td><code style="color:var(--sky);">${escapeHTML(s.nama_file)}</code></td>
                <td>${s.waktu}</td>
                <td><span class="role-pill dosen">${s.status} (${s.nilai || 'Belum dinilai'})</span></td>
                <td>
                  <button class="btn btn-secondary btn-sm" onclick="previewUploadedFile(${s.id})">👁️ Buka / Jalankan File</button>
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
  const judul = document.getElementById("uploadJudul").value.trim() || "Tugas Mandiri";
  const fileInput = document.getElementById("uploadFile");

  if (!fileInput.files || fileInput.files.length === 0) {
    showToast("Silakan pilih berkas terlebih dahulu.", true);
    return;
  }

  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
    const content = e.target.result;
    saveSubmission(matkul, judul, file.name, file.type, content);
  };

  // Baca sebagai text atau data URL
  reader.readAsText(file);
}

function simulateMaliciousUpload() {
  const maliciousHTML = `<!DOCTYPE html><html><body><h1 style="color:red">⚠️ Malicious Payload Executed!</h1><p>Berkas ini diunggah tanpa validasi filter ekstensi (.html). Dapat mencuri sesi atau mengarahkan ke link berbahaya!</p><script>alert('🔴 [UNRESTRICTED FILE UPLOAD]\\nBerkas HTML dieksekusi di origin kampus!\\nCookie/Storage: ' + localStorage.getItem('itsm_db_v2'));</script></body></html>`;
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
    waktu: new Date().toLocaleString("id-ID"),
    status: "Menunggu Penilaian",
    nilai: null
  };

  submissions.unshift(newSub);
  setStorage("itsm_submissions", submissions);

  // Deteksi ekstensi berbahaya
  const ext = filename.split('.').pop().toLowerCase();
  if (['html', 'htm', 'php', 'exe', 'js', 'svg', 'sh'].includes(ext)) {
    logActivity("⚠️ UNRESTRICTED FILE UPLOAD", `Mahasiswa mengunggah file berbahaya: ${filename}`);
    showToast(`⚠️ <b>Validasi Berkas Lemah:</b> Berkas <code>${filename}</code> berhasil diunggah tanpa penolakan ekstensi!`, true);
  } else {
    showToast("Berkas tugas berhasil diunggah.");
  }

  renderTugasView(document.getElementById("tabContent"));
}

function previewUploadedFile(subId) {
  const submissions = getStorage("itsm_submissions", DEFAULT_SUBMISSIONS);
  const item = submissions.find(s => s.id === subId);
  if (!item) return;

  // Buka konten file langsung di tab baru (mengeksploitasi XSS / eksekusi file)
  const blob = new Blob([item.konten_file], { type: item.tipe_file || "text/html" });
  const blobUrl = URL.createObjectURL(blob);
  window.open(blobUrl, "_blank");
}

// ==========================================
// VULNERABILITAS 4: ESKALASI HAK AKSES (PRIVILEGE ESCALATION)
// ==========================================
function renderProfilView(container) {
  container.innerHTML = `
    <div class="card">
      <div class="card-header">
        <div class="card-title">⚙️ Pengaturan Profil Akun Mahasiswa</div>
        <span class="role-pill ${currentUser.role}">Role Saat Ini: ${currentUser.role.toUpperCase()}</span>
      </div>

      <!-- Penjelasan Kerentanan -->
      <div style="background: rgba(244, 63, 94, 0.1); border: 1px solid rgba(244, 63, 94, 0.3); border-radius: 8px; padding: 12px 16px; margin-bottom: 20px; font-size:12.5px;">
        <b style="color:#fda4af;">⚠️ Celah Keamanan: Eskalasi Hak Akses (Privilege Escalation)</b>
        <div style="color:var(--text-sub); margin-top:2px;">
          Sistem mempercayai parameter <code>role</code> yang dikirim dari klien pada form pembaruan profil tanpa verifikasi hak akses di backend. Mahasiswa dapat mengubah perannya menjadi <b>Dosen</b> atau <b>Admin</b>!
        </div>
      </div>

      <div style="background:var(--bg-card); padding:20px; border-radius:8px; border:1px solid var(--border);">
        <div class="grid-2">
          <div class="form-group">
            <label>Nama Lengkap:</label>
            <input type="text" id="profNama" class="input-control" value="${escapeHTML(currentUser.nama)}">
          </div>
          <div class="form-group">
            <label>NIM / Identitas:</label>
            <input type="text" class="input-control" value="${escapeHTML(currentUser.nomor_induk)}" disabled>
          </div>
          <div class="form-group">
            <label>Program Studi:</label>
            <input type="text" class="input-control" value="${escapeHTML(currentUser.prodi || '')}" disabled>
          </div>
          <div class="form-group">
            <label>Email:</label>
            <input type="email" id="profEmail" class="input-control" value="${escapeHTML(currentUser.email || '')}">
          </div>
        </div>

        <!-- HIDDEN / VULNERABLE ROLE FIELD -->
        <div class="form-group" style="background:rgba(225, 29, 72, 0.15); padding:12px; border-radius:6px; border:1px dashed var(--rose); margin-top:10px;">
          <label style="color:#fda4af; font-weight:700;">Role Pengguna (Celah Mass Assignment / Role Escalation):</label>
          <div style="font-size:11.5px; color:var(--text-sub); margin-bottom:8px;">
            Pilih role baru di bawah ini untuk mengeskalasi hak akun Anda:
          </div>
          <select id="profRole" class="input-control" style="background:#0f172a; border-color:var(--rose);">
            <option value="mahasiswa" ${currentUser.role === "mahasiswa" ? "selected" : ""}>Mahasiswa (Standar)</option>
            <option value="dosen" ${currentUser.role === "dosen" ? "selected" : ""}>Dosen (Bisa Memberi Nilai & Kelola Tugas)</option>
            <option value="admin" ${currentUser.role === "admin" ? "selected" : ""}>Admin (Akses Penuh Kelola Akun & Pengguna)</option>
          </select>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-top:20px;">
          <button class="btn btn-primary" onclick="saveProfileChanges()">Simpan Perubahan Profil</button>
          <button class="btn btn-danger btn-sm" onclick="escalateToAdminQuick()">⚡ Eskalasi Cepat ke Super Admin</button>
        </div>
      </div>
    </div>
  `;
}

function saveProfileChanges() {
  const newNama = document.getElementById("profNama").value.trim();
  const newEmail = document.getElementById("profEmail").value.trim();
  const newRole = document.getElementById("profRole").value;

  const users = getStorage("itsm_users", DEFAULT_USERS);
  const userIdx = users.findIndex(u => u.username === currentUser.username);

  if (userIdx !== -1) {
    const oldRole = users[userIdx].role;
    users[userIdx].nama = newNama || users[userIdx].nama;
    users[userIdx].email = newEmail || users[userIdx].email;
    users[userIdx].role = newRole;

    setStorage("itsm_users", users);
    currentUser = { ...users[userIdx] };
    setStorage("itsm_current_user", currentUser);

    if (oldRole !== newRole) {
      logActivity("⚠️ ESKALASI ROLE BERHASIL", `User ${currentUser.username} mengubah role dari ${oldRole} menjadi ${newRole}`);
      showToast(`🚨 <b>Eskalasi Hak Akses Berhasil!</b> Peran Anda kini menjadi <b>${newRole.toUpperCase()}</b>. Menu baru telah terbuka!`, true);
    } else {
      showToast("Profil berhasil diperbarui.");
    }

    renderNavbar();
    renderTabs();
  }
}

function escalateToAdminQuick() {
  document.getElementById("profRole").value = "admin";
  saveProfileChanges();
}

// ==========================================
// FITUR DOSEN: INPUT & BERI NILAI
// ==========================================
function renderGradingView(container) {
  const grades = getStorage("itsm_grades", DEFAULT_GRADES);
  const users = getStorage("itsm_users", DEFAULT_USERS);

  container.innerHTML = `
    <div class="card">
      <div class="card-header">
        <div class="card-title">📝 Panel Dosen: Input & Evaluasi Nilai Mahasiswa</div>
        <span class="role-pill dosen">Wewenang Dosen Pengampu</span>
      </div>
      <p style="font-size:13px; color:var(--text-muted); margin-bottom:16px;">
        Dosen dapat menginput dan mengubah nilai tugas, UTS, UAS, dan nilai mutu huruf secara langsung.
      </p>

      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>NIM</th>
              <th>Nama Mahasiswa</th>
              <th>Mata Kuliah</th>
              <th>Tugas</th>
              <th>UTS</th>
              <th>UAS</th>
              <th>Nilai Huruf</th>
              <th>Aksi</th>
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
                  <td><input type="number" id="tugas-${idx}" class="input-control" value="${g.tugas}" style="width:70px; padding:4px 6px;"></td>
                  <td><input type="number" id="uts-${idx}" class="input-control" value="${g.uts}" style="width:70px; padding:4px 6px;"></td>
                  <td><input type="number" id="uas-${idx}" class="input-control" value="${g.uas}" style="width:70px; padding:4px 6px;"></td>
                  <td>
                    <select id="huruf-${idx}" class="input-control" style="width:80px; padding:4px;">
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
                    <button class="btn btn-primary btn-sm" onclick="saveGrade(${idx})">💾 Simpan</button>
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
  logActivity("Nilai Diperbarui", `Dosen mengubah nilai NIM ${grades[idx].nim} (${grades[idx].matkul}) menjadi ${h}`);
  showToast(`Nilai untuk NIM <b>${grades[idx].nim}</b> berhasil disimpan!`);
}

// Review Tugas Dosen
function renderReviewTugasView(container) {
  const subs = getStorage("itsm_submissions", DEFAULT_SUBMISSIONS);

  container.innerHTML = `
    <div class="card">
      <div class="card-header">
        <div class="card-title">📂 Review Pengumpulan Tugas Mahasiswa</div>
        <span class="role-pill dosen">Total: ${subs.length} Berkas</span>
      </div>

      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Mahasiswa</th>
              <th>Mata Kuliah</th>
              <th>Judul Tugas</th>
              <th>Nama File</th>
              <th>Waktu</th>
              <th>Nilai</th>
              <th>Aksi Berkas</th>
            </tr>
          </thead>
          <tbody>
            ${subs.map(s => `
              <tr>
                <td><b>${escapeHTML(s.nama)}</b><br><small style="color:var(--text-muted);">NIM: ${s.nim}</small></td>
                <td>${escapeHTML(s.matkul)}</td>
                <td>${escapeHTML(s.judul)}</td>
                <td><code style="color:var(--sky);">${escapeHTML(s.nama_file)}</code></td>
                <td>${s.waktu}</td>
                <td><b>${s.nilai || 'Belum dinilai'}</b></td>
                <td>
                  <button class="btn btn-secondary btn-sm" onclick="previewUploadedFile(${s.id})">👁️ Buka File</button>
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
// FITUR ADMIN: KELOLA AKUN PENGGUNA
// ==========================================
function renderAdminUsersView(container) {
  const users = getStorage("itsm_users", DEFAULT_USERS);

  container.innerHTML = `
    <div class="card">
      <div class="card-header">
        <div class="card-title">👥 Manajemen Akun & Pengguna Portal ITSM</div>
        <button class="btn btn-primary btn-sm" onclick="openCreateUserModal()">+ Tambah Pengguna Baru</button>
      </div>
      <p style="font-size:13px; color:var(--text-muted); margin-bottom:16px;">
        Wewenang Administrator untuk mengelola seluruh akun sintetis civitas akademika kampus.
      </p>

      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Nama Lengkap</th>
              <th>Nomor Induk</th>
              <th>Role</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            ${users.map(u => `
              <tr>
                <td><code>${escapeHTML(u.username)}</code></td>
                <td><b>${escapeHTML(u.nama)}</b><br><small style="color:var(--text-muted);">${escapeHTML(u.email || '-')}</small></td>
                <td>${escapeHTML(u.nomor_induk)}</td>
                <td><span class="role-pill ${u.role}">${u.role}</span></td>
                <td><span style="color:${u.status === 'Aktif' ? 'var(--emerald)' : 'var(--amber)'}; font-weight:600;">${escapeHTML(u.status || 'Aktif')}</span></td>
                <td>
                  <button class="btn btn-secondary btn-sm" onclick="quickLogin('${u.username}')">🔑 Login Sebagai</button>
                  ${u.username !== 'admin_itsm' ? `
                    <button class="btn btn-danger btn-sm" onclick="deleteUser(${u.id})">🗑️ Hapus</button>
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
  if (!confirm("Apakah Anda yakin ingin menghapus akun ini?")) return;
  let users = getStorage("itsm_users", DEFAULT_USERS);
  users = users.filter(u => u.id !== userId);
  setStorage("itsm_users", users);
  showToast("Akun berhasil dihapus.");
  renderAdminUsersView(document.getElementById("tabContent"));
}

function openCreateUserModal() {
  const username = prompt("Masukkan Username:");
  if (!username) return;
  const nama = prompt("Masukkan Nama Lengkap:");
  if (!nama) return;
  const nim = prompt("Masukkan NIM / NIDN:");
  const role = prompt("Pilih Role (mahasiswa / dosen / admin):", "mahasiswa") || "mahasiswa";

  const users = getStorage("itsm_users", DEFAULT_USERS);
  users.push({
    id: Date.now(),
    username: username,
    password: "password123",
    nama: nama,
    nomor_induk: nim || "24781099",
    role: role,
    status: "Aktif",
    email: `${username}@itsm.ac.id`
  });
  setStorage("itsm_users", users);
  showToast(`Pengguna baru <b>${nama}</b> berhasil ditambahkan!`);
  renderAdminUsersView(document.getElementById("tabContent"));
}

// Audit Logs
function renderAuditLogsView(container) {
  const logs = getStorage("itsm_logs", []);
  container.innerHTML = `
    <div class="card">
      <div class="card-header">
        <div class="card-title">🛡️ Log Aktivitas & Jejak Keamanan Sistem</div>
        <button class="btn btn-secondary btn-sm" onclick="clearLogs()">Hapus Log</button>
      </div>

      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Waktu</th>
              <th>Pengguna</th>
              <th>Aktivitas</th>
              <th>Keterangan / Payload</th>
            </tr>
          </thead>
          <tbody>
            ${logs.map(l => `
              <tr>
                <td style="font-family:var(--font-mono); font-size:11px;">${l.time}</td>
                <td><b>${escapeHTML(l.user)}</b></td>
                <td><span style="color:${l.action.includes('⚠️') ? 'var(--rose)' : 'var(--sky)'}; font-weight:700;">${escapeHTML(l.action)}</span></td>
                <td style="font-family:var(--font-mono); font-size:11.5px; color:var(--text-sub);">${escapeHTML(l.details || '-')}</td>
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
  renderAuditLogsView(document.getElementById("tabContent"));
  showToast("Log keamanan dibersihkan.");
}

// ==========================================
// SECURITY LAB DRAWER / MODAL PO C
// ==========================================
function toggleSecurityModal(show) {
  const modal = document.getElementById("securityModalOverlay");
  modal.style.display = show ? "flex" : "none";
}

// Event Listeners
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
