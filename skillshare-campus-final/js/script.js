/* =====================================================================
   js/script.js  -  SATU-SATUNYA FILE JAVASCRIPT BERSAMA
   Pemilik: Anggota 1 (Ketua).
   Dipakai semua halaman. Isinya:
     1. Data awal (kelas, pendaftaran, akun, penanggung jawab, lokasi)
     2. Fungsi untuk menyimpan dan membaca data (LocalStorage)
     3. Fungsi kecil yang dipakai banyak halaman
   ===================================================================== */


/* ---------- 1. DATA AWAL ----------
   Data ini muncul saat web pertama kali dibuka.
   Kalau kalian mengubah data kelas / pendaftaran / akun di bawah ini, buka Console
   browser (F12), ketik resetData() lalu Enter, kemudian muat ulang halaman. */

const KELAS_AWAL = [
  { id: 1, nama: 'Belajar Gitar 1 Jam',       kategori: 'Musik',      pengajar: 'Muhammad Farhan',  jadwal: 'Sabtu, 14 Nov 2026 - 10.00', lokasi: 'Gedung B', kuota: 10, deskripsi: 'Kenalan dengan gitar akustik: cara memegang, kunci dasar C, G, Am, dan Em, lalu langsung main satu lagu sederhana.' },
  { id: 2, nama: 'HTML dan CSS untuk Pemula', kategori: 'Komputer',   pengajar: 'Muhammad Nabil',   jadwal: 'Jumat, 20 Nov 2026 - 14.00', lokasi: 'Gedung A',     kuota: 18, deskripsi: 'Membuat halaman web pertama: judul, paragraf, gambar, tautan, dan warna.' },
  { id: 3, nama: 'Workshop Public Speaking',  kategori: 'Komunikasi', pengajar: 'Krisna Raga Putra Susandi', jadwal: 'Senin, 16 Nov 2026 - 15.30', lokasi: 'Aula',         kuota: 20, deskripsi: 'Latihan berbicara di depan umum: mengatur napas, intonasi, dan cara mengurangi gugup saat presentasi.' }
];

/* status: 'Menunggu' (belum disetujui) atau 'Diterima' (sudah disetujui penanggung jawab) */
const PENDAFTARAN_AWAL = [
  { id: 1,  idKelas: 1, nama: 'aura',  tanggal: '2 Nov 2026', status: 'Diterima' },
  { id: 2,  idKelas: 1, nama: 'fany', tanggal: '2 Nov 2026', status: 'Diterima' },
  { id: 3,  idKelas: 1, nama: 'dela',  tanggal: '3 Nov 2026', status: 'Menunggu' },
  { id: 4,  idKelas: 2, nama: 'hasbi',  tanggal: '4 Nov 2026', status: 'Diterima' },
  { id: 5,  idKelas: 2, nama: 'lingga', tanggal: '4 Nov 2026', status: 'Diterima' },
  { id: 6,  idKelas: 2, nama: 'farhan',  tanggal: '4 Nov 2026', status: 'Menunggu' },
  { id: 7,  idKelas: 2, nama: 'zulfikar', tanggal: '5 Nov 2026', status: 'Menunggu' },
  { id: 8,  idKelas: 3, nama: 'renaldi',   tanggal: '3 Nov 2026', status: 'Diterima' },
  { id: 9,  idKelas: 3, nama: 'devan',  tanggal: '3 Nov 2026', status: 'Diterima' },
  { id: 10, idKelas: 3, nama: 'rio',  tanggal: '4 Nov 2026', status: 'Menunggu' },
  { id: 11, idKelas: 3, nama: 'yuda',  tanggal: '5 Nov 2026', status: 'Menunggu' }
];

/* Akun contoh supaya bisa langsung login: nama pengguna "mahasiswa", kata sandi "123456" */
const AKUN_AWAL = [
  { nama: 'mahasiswa', email: 'mahasiswa@kampus.ac.id', sandi: '123456' }
];


/* ---------- PENANGGUNG JAWAB TIAP KATEGORI ----------
   Setiap kategori punya satu penanggung jawab (PJ) yang mengurus data pendaftaran.
   GANTI nama dan nomor CP di bawah ini dengan anggota kelompok kalian (nomor di bawah hanya contoh).
   Nama kategori (Musik, Komputer, Komunikasi) jangan diubah. */
const PENANGGUNG_JAWAB = {
  'Musik':      { nama: 'Rina Kusuma',    cp: '081234567890' },
  'Komputer':   { nama: 'Bagas Wijaya',   cp: '081098765432' },
  'Komunikasi': { nama: 'Sinta Maharani', cp: '081222220077' }
};


/* ---------- LOKASI DI KAMPUS (dipakai halaman Peta dan form Tambah Kelas) ----------
   INI SATU-SATUNYA TEMPAT untuk mengubah lokasi. Peta dan pilihan lokasi di form
   mengikuti daftar ini secara otomatis.

   Cara mengisi koordinat:
     Google Maps -> klik kanan di titik gedung -> klik angka koordinat (otomatis tersalin) -> tempel di sini.
   Format:  'Nama Lokasi': [latitude, longitude]   (angka pertama = latitude)
   Contoh:  'Gedung C': [-6.2090, 106.8460],

   Kalau mengganti nama lokasi, ganti juga tulisan  lokasi: '...'  di KELAS_AWAL di atas
   (harus sama persis), lalu ketik resetData() di Console. */
const LOKASI_KAMPUS = {
  'Gedung A': [-6.938032017813555, 107.60721871913198],
  'Gedung B': [-6.938213372244432, 107.60709128564666],
  'Gedung C': [-6.938281660005843, 107.60670221881091],
  'Aula'    : [-6.938450700159552, 107.60692550934273],
};


/* ---------- 2. MENYIMPAN DAN MEMBACA DATA (LocalStorage) ---------- */

/* Nama "laci" di LocalStorage. Angka 3 pada nama ini penanda versi data. */
const KUNCI_KELAS = 'skillshare3_kelas';
const KUNCI_PENDAFTARAN = 'skillshare3_pendaftaran';
const KUNCI_AKUN = 'skillshare3_akun';
const KUNCI_USER = 'skillshare3_user';

/* Baca data dari LocalStorage. Kalau belum ada, pakai data awal dan simpan. */
function ambilData(kunci, dataAwal) {
  const teks = localStorage.getItem(kunci);
  if (teks === null) {
    localStorage.setItem(kunci, JSON.stringify(dataAwal));
    return dataAwal;
  }
  return JSON.parse(teks);
}

function simpanData(kunci, data) {
  localStorage.setItem(kunci, JSON.stringify(data));
}

/* Tiga jenis data kita. Hasilnya berupa daftar (array). */
function ambilKelas()        { return ambilData(KUNCI_KELAS, KELAS_AWAL); }
function simpanKelas(daftar) { simpanData(KUNCI_KELAS, daftar); }

function ambilPendaftaran()        { return ambilData(KUNCI_PENDAFTARAN, PENDAFTARAN_AWAL); }
function simpanPendaftaran(daftar) { simpanData(KUNCI_PENDAFTARAN, daftar); }

function ambilAkun()        { return ambilData(KUNCI_AKUN, AKUN_AWAL); }
function simpanAkun(daftar) { simpanData(KUNCI_AKUN, daftar); }

/* Hapus semua data kita lalu mulai dari data awal (dipakai untuk mengulang demo) */
function resetData() {
  localStorage.removeItem(KUNCI_KELAS);
  localStorage.removeItem(KUNCI_PENDAFTARAN);
  localStorage.removeItem(KUNCI_AKUN);
  localStorage.removeItem(KUNCI_USER);
}


/* ---------- 3. FUNGSI KECIL YANG DIPAKAI BANYAK HALAMAN ---------- */

/* Cari satu kelas berdasarkan id. Hasilnya null kalau tidak ada. */
function cariKelas(id) {
  const semua = ambilKelas();
  for (let i = 0; i < semua.length; i++) {
    if (semua[i].id === id) {
      return semua[i];
    }
  }
  return null;
}

/* Berapa orang yang mendaftar di satu kelas.
   hitungPendaftar(1)             -> semua pendaftar kelas 1
   hitungPendaftar(1, 'Diterima') -> hanya yang statusnya Diterima */
function hitungPendaftar(idKelas, status) {
  const semua = ambilPendaftaran();
  let jumlah = 0;
  for (let i = 0; i < semua.length; i++) {
    const cocokStatus = (status === undefined || semua[i].status === status);
    if (semua[i].idKelas === idKelas && cocokStatus) {
      jumlah++;
    }
  }
  return jumlah;
}

/* Kursi yang masih kosong. Pendaftar yang masih Menunggu sudah dihitung memakai kursi. */
function sisaKuota(kelas) {
  return kelas.kuota - hitungPendaftar(kelas.id);
}

/* Teks penanggung jawab sebuah kategori. Contoh: Rina Kusuma (CP: 081200000001) */
function teksPJ(kategori) {
  const pj = PENANGGUNG_JAWAB[kategori];
  if (pj === undefined) return '-';
  return pj.nama + ' (CP: ' + pj.cp + ')';
}

/* Label kecil berwarna untuk status: hijau = Diterima, kuning = Menunggu */
function badgeStatus(status) {
  if (status === 'Diterima') {
    return '<span class="badge bg-success">Diterima</span>';
  }
  return '<span class="badge bg-warning text-dark">Menunggu</span>';
}

/* Emoji sesuai kategori */
function ikonKategori(kategori) {
  if (kategori === 'Musik') return '🎸';
  if (kategori === 'Komputer') return '💻';
  if (kategori === 'Komunikasi') return '🎤';
  return '📚';
}

/* Tanggal hari ini, contoh: 6 Nov 2026 */
function tanggalHariIni() {
  return new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

/* Mengamankan teks dari pengguna sebelum dimasukkan ke innerHTML
   (supaya tulisan seperti <b> tidak dianggap kode HTML) */
function esc(teks) {
  return String(teks)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}


/* ---------- LOGIN ---------- */

/* Nama pengguna yang sedang login. Hasilnya null kalau belum login. */
function ambilUser() {
  return localStorage.getItem(KUNCI_USER);
}

function simpanUser(nama) {
  localStorage.setItem(KUNCI_USER, nama);
}

/* Dipanggil di bagian <head> halaman yang butuh login.
   Kalau belum login, langsung dikirim ke halaman Login. */
function wajibLogin() {
  if (ambilUser() === null) {
    window.location.href = 'login.html';
  }
}

/* Dipanggil di awal script tiap halaman yang punya navbar:
   menampilkan nama pengguna dan menyalakan tombol Keluar. */
function siapkanNavbar() {
  document.getElementById('nama-user').textContent = ambilUser();
  document.getElementById('tombol-keluar').addEventListener('click', function () {
    localStorage.removeItem(KUNCI_USER);
    window.location.href = 'login.html';
  });
}


/* ---------- PESAN ERROR DI FORM ----------
   Setiap form punya kotak merah: <div id="pesan-error" ...></div> */
function tampilkanError(teks) {
  const kotak = document.getElementById('pesan-error');
  kotak.textContent = teks;
  kotak.style.display = 'block';
}

function sembunyikanError() {
  document.getElementById('pesan-error').style.display = 'none';
}
