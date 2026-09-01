// ==========================================
// 1. FUNGSI TAB (SEJARAH & VISI MISI)
// ==========================================
function switchTab(tabId, element) {
  const contents = document.querySelectorAll('.tab-content');
  contents.forEach(content => content.classList.remove('active'));

  const buttons = document.querySelectorAll('.tab-btn');
  buttons.forEach(btn => btn.classList.remove('active'));

  const activeContent = document.getElementById(tabId);
  if (activeContent) activeContent.classList.add('active');
  if (element) element.classList.add('active');
}

// ==========================================
// 2. HERO SLIDER BANNER
// ==========================================
let currentSlide = 0;

function setSlide(index) {
  const slides = document.querySelectorAll('.hero .slide');
  const dots = document.querySelectorAll('.dots-container .dot');

  if (!slides || slides.length === 0) return;

  // Hilangkan status active dari slide sebelumnya
  slides.forEach(s => s.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));

  // Atur urutan index
  currentSlide = index;
  if (currentSlide >= slides.length) currentSlide = 0;
  if (currentSlide < 0) currentSlide = slides.length - 1;

  // Aktifkan slide dan dot baru
  slides[currentSlide].classList.add('active');
  if (dots[currentSlide]) dots[currentSlide].classList.add('active');
}

// Jalankan slider otomatis setiap 5 detik saat DOM siap
document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll('.hero .slide');
  if (slides && slides.length > 0) {
    setInterval(() => {
      let nextSlide = (currentSlide + 1) % slides.length;
      setSlide(nextSlide);
    }, 3000);
  }
});

// ==========================================
// 3. LOGIKA UTAMA DOKUMEN (KARTU, GALERI, PENCARIAN & ANIMASI)
// ==========================================
document.addEventListener("DOMContentLoaded", function () {

  // --- A. GALERI KEGIATAN (EFEK HOVER/KLIK BLUR) ---
  const galleryItems = document.querySelectorAll(".gallery-item");
  if (galleryItems.length > 0) {
    galleryItems.forEach(item => {
      item.addEventListener("click", function (e) {
        e.stopPropagation();
        const isActive = this.classList.contains("active");
        galleryItems.forEach(i => i.classList.remove("active"));
        if (!isActive) this.classList.add("active");
      });
    });

    document.addEventListener("click", function () {
      galleryItems.forEach(i => i.classList.remove("active"));
    });
  }

  // --- B. FITUR PENCARIAN (SEARCH BOX) ---
  const searchInput = document.querySelector(".search-box input");
  const searchBtn = document.querySelector(".search-icon");

  function executeSearch() {
    if (!searchInput) return;

    const keyword = searchInput.value.toLowerCase().trim();
    const allCards = document.querySelectorAll(
      ".news-card-custom, .news-card, .gallery-item, .stat-card, .about-card, .ekstra-card"
    );

    // Jika input kosong, tampilkan kembali semua kartu
    if (keyword === "") {
      allCards.forEach(card => (card.style.display = ""));
      return;
    }

    // 1. Cek Scroll ke Section Utama jika menggunakan kata kunci umum
    if (keyword.includes("tentang") || keyword.includes("kami") || keyword.includes("about")) {
      const aboutSec = document.querySelector(".about-section");
      if (aboutSec) return aboutSec.scrollIntoView({ behavior: "smooth" });
    } else if (keyword.includes("galeri") || keyword.includes("gallery") || keyword.includes("foto")) {
      const galSec = document.querySelector("#galery, .gallery-section");
      if (galSec) return galSec.scrollIntoView({ behavior: "smooth" });
    } else if (keyword.includes("kontak") || keyword.includes("hubungi")) {
      const kontakSec = document.querySelector("#kontak, .footer-section");
      if (kontakSec) return kontakSec.scrollIntoView({ behavior: "smooth" });
    } else if (keyword.includes("berita") || keyword.includes("informasi") || keyword.includes("kegiatan")) {
      const infoSec = document.querySelector(".beranda-info-section, .news-grid-center");
      if (infoSec) return infoSec.scrollIntoView({ behavior: "smooth" });
    }

    // 2. Filter isi kartu berdasarkan kata kunci
    let matchCount = 0;
    allCards.forEach(card => {
      const text = card.textContent.toLowerCase();
      const img = card.querySelector("img");
      const altText = img ? img.getAttribute("alt")?.toLowerCase() || "" : "";

      if (text.includes(keyword) || altText.includes(keyword)) {
        card.style.display = "flex";
        matchCount++;
      } else {
        card.style.display = "none";
      }
    });

    if (matchCount === 0) {
      alert("Tidak ditemukan hasil untuk pencarian: '" + searchInput.value + "'");
    } else {
      const infoSec = document.querySelector(".beranda-info-section, .news-grid-center");
      if (infoSec) infoSec.scrollIntoView({ behavior: "smooth" });
    }
  }

  // Pasang Event Listener untuk Pencarian
  if (searchBtn) {
    searchBtn.addEventListener("click", function (e) {
      e.preventDefault();
      executeSearch();
    });
  }

  if (searchInput) {
    searchInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        executeSearch();
      }
    });

    searchInput.addEventListener("input", function () {
      if (this.value.trim() === "") {
        executeSearch();
      }
    });
  }

  // --- C. EVENT KLIK KARTU INTERAKTIF ---
  const interactiveCards = document.querySelectorAll(
    ".jurusan-card, .ekstra-card, .news-card, .news-card-custom, .stat-card"
  );

  interactiveCards.forEach(card => {
    card.addEventListener("click", function (e) {
      e.stopPropagation();
      const isActive = this.classList.contains("active");
      interactiveCards.forEach(c => c.classList.remove("active"));
      if (!isActive) this.classList.add("active");
    });
  });

  document.addEventListener("click", function () {
    interactiveCards.forEach(c => c.classList.remove("active"));
  });

  // --- D. ANIMASI SCROLL (FADE IN REVEAL) ---
  const animElements = document.querySelectorAll(
    "img:not(.gallery-item img), h1, h2, h3, p, .jurusan-card, .leader-card, .ekstra-card, .news-card, .news-card-custom, .stat-card, .tab-buttons, .gallery-section"
  );

  animElements.forEach(el => el.classList.add("reveal"));

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: "0px 0px -40px 0px",
    threshold: 0.08
  });

  animElements.forEach(el => scrollObserver.observe(el));

});

// EFEK POP UP NAIK KE ATAS SAAT DIKLIK
document.querySelectorAll('.adv-card, .adv-img-top, .adv-img-small').forEach(item => {
    item.addEventListener('click', function() {
        this.classList.toggle('active-pop');
    });
});

//GESER KANAN GALERY//
document.addEventListener("DOMContentLoaded", function () {
    const slider = document.getElementById("gallerySliderBeranda");
    const prevBtn = document.getElementById("prevBtnBeranda");
    const nextBtn = document.getElementById("nextBtnBeranda");
    const cards = document.querySelectorAll(".gallery-card-beranda");

    // 1. EFEK KLIK FOTO UNTUK MUNCULKAN NAMA KEGIATAN
    cards.forEach(card => {
        card.addEventListener("click", function () {
            // Hapus status active dari foto lain
            cards.forEach(c => {
                if (c !== card) c.classList.remove("active");
            });
            // Toggle active pada foto yang diklik
            this.classList.toggle("active");
        });
    });

    // 2. GESER DAN DETEKSI PINDAH HALAMAN
    if (slider && prevBtn && nextBtn) {
        nextBtn.addEventListener("click", function () {
            const cardWidth = slider.querySelector(".gallery-card-beranda").offsetWidth + 20;

            // Cek apakah sudah sampai di foto terakhir (foto ke-6)
            const isAtEnd = slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 30;

            if (isAtEnd) {
                // Pindah ke halaman galery navbar jika sudah mentok
                window.location.href = "galery.html";
            } else {
                // Geser ke kanan
                slider.scrollBy({ left: cardWidth, behavior: "smooth" });
            }
        });

        prevBtn.addEventListener("click", function () {
            const cardWidth = slider.querySelector(".gallery-card-beranda").offsetWidth + 20;
            slider.scrollBy({ left: -cardWidth, behavior: "smooth" });
        });
    }
});