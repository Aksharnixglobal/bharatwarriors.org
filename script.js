/* Bharat Warriors Cricket Club - Main JavaScript */

/* Mobile menu toggle functionality */
function toggleMobileMenu() {
  const menu = document.getElementById('main-menu');
  const toggle = document.querySelector('.mobile-menu-toggle');
  
  menu.classList.toggle('mobile-open');
  toggle.classList.toggle('active');
  
  // Prevent body scroll when menu is open
  if (menu.classList.contains('mobile-open')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
    // Close any open dropdowns when closing mobile menu
    document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('open'));
  }
}

/* Enhanced dropdown functionality */
function toggleDD(id) {
  document.querySelectorAll('.dropdown').forEach(d => {
    if (d.id !== id) d.classList.remove('open');
  });
  const me = document.getElementById(id);
  me.classList.toggle('open');
}

window.addEventListener('click', e => {
  if (!e.target.closest('.dropdown')) {
    document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('open'));
  }
  
  // Close mobile menu when clicking outside
  if (!e.target.closest('.nav') && !e.target.closest('.mobile-menu-toggle')) {
    const menu = document.getElementById('main-menu');
    const toggle = document.querySelector('.mobile-menu-toggle');
    if (menu && menu.classList.contains('mobile-open')) {
      menu.classList.remove('mobile-open');
      toggle.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
});

/* Clock SVG icon for time display */
const clockSvg = `<svg class="i i-clock" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`;

/* Enhanced date/time parsing */
function parseRowDateTime(tr) {
  const dateRaw = tr.dataset.date || '';
  const timeRaw = (tr.dataset.time || '').trim();
  if (!dateRaw) return null;
  
  const [y, m, d] = dateRaw.split('-').map(Number);
  if (!y || !m || !d) return null;
  
  let hours = 12, minutes = 0;
  if (timeRaw) {
    let t = timeRaw.split('–')[0].trim();
    if (!/am|pm/i.test(t) && /am|pm/i.test(timeRaw)) {
      const suff = (timeRaw.match(/(am|pm)/i) || [])[0] || '';
      if (suff) t = t + ' ' + suff;
    }
    
    const m1 = t.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i);
    if (m1) {
      let hh = parseInt(m1[1], 10);
      let mm = m1[2] ? parseInt(m1[2], 10) : 0;
      const ap = (m1[3] || '').toLowerCase();
      if (ap === 'pm' && hh < 12) hh += 12;
      if (ap === 'am' && hh === 12) hh = 0;
      hours = hh;
      minutes = mm;
    }
  }
  
  return new Date(y, m - 1, d, hours, minutes, 0, 0);
}

/* Enhanced upcoming matches display */
function renderNextMatches() {
  const rows = Array.from(document.querySelectorAll('#fxTable tbody tr'))
    .filter(tr => tr.style.display !== 'none');

  // Use current date (September 19, 2025)
  const today = new Date(2025, 8, 19); // Month is 0-indexed, so 8 = September
  today.setHours(0, 0, 0, 0);

  const mapped = rows.map(tr => ({tr, dt: parseRowDateTime(tr)}))
    .filter(o => o.dt !== null)
    .filter(o => {
      const matchDate = new Date(o.dt.getFullYear(), o.dt.getMonth(), o.dt.getDate());
      return matchDate >= today;
    })
    .sort((a, b) => a.dt - b.dt);

  const upcoming = mapped.slice(0, 3).map(o => {
    const tr = o.tr;
    const d = tr.children[0].textContent.trim();
    const opp = tr.children[1].textContent.trim();
    const grd = tr.children[2].textContent.trim();
    const lg = (tr.dataset.league || '').toUpperCase();
    const timestr = tr.dataset.time ? tr.dataset.time : '';
    const timeHtml = timestr ? ` <span class="time">${clockSvg} ${timestr}</span>` : '';
    
    // Calculate days until match
    const matchDate = new Date(o.dt.getFullYear(), o.dt.getMonth(), o.dt.getDate());
    const daysUntil = Math.ceil((matchDate - today) / (1000 * 60 * 60 * 24));
    const daysBadge = daysUntil === 0 ? ' <span style="color:var(--saffron);font-weight:900">TODAY!</span>' :
                     daysUntil === 1 ? ' <span style="color:var(--green);font-weight:900">TOMORROW</span>' :
                     daysUntil <= 7 ? ` <span style="color:var(--blue);font-weight:700">in ${daysUntil} days</span>` : '';
    
    return `<div class="next-item">
      <span class="lg">${lg}</span> ${d}${timeHtml}${daysBadge}
      <br><strong>${opp}</strong>
      <br><small style="color:var(--muted)">${grd}</small>
    </div>`;
  });

  const container = document.getElementById('next-matches');
  if (container) {
    container.innerHTML = (upcoming.length ? 
      upcoming.join('') : 
      '<div class="next-item">No upcoming matches scheduled. Check back soon!</div>'
    );
  }
  
  console.log(`Found ${upcoming.length} upcoming matches from ${mapped.length} total future matches`);
}

/* Enhance time display in table */
function decorateTimes() {
  document.querySelectorAll('#fxTable tbody tr').forEach(tr => {
    const td = tr.children[6];
    if (!td) return;
    const t = td.textContent.trim();
    if (t && t !== '—' && !td.dataset.iconized) {
      td.innerHTML = `<span class="time">${clockSvg} ${t}</span>`;
      td.dataset.iconized = "1";
    }
  });
}

/* Enhanced league filtering with tabs */
function filterLeague(lg) {
  const all = document.querySelectorAll('#fxTable tbody tr');
  all.forEach(tr => {
    if (lg === 'ALL') {
      tr.style.display = '';
    } else {
      tr.style.display = (tr.dataset.league === lg) ? '' : 'none';
    }
  });
  
  // Update active tab
  document.querySelectorAll('.league-tab').forEach(tab => {
    tab.classList.remove('active');
    if (tab.dataset.league === lg) {
      tab.classList.add('active');
    }
  });
  
  renderNextMatches();
  decorateTimes();
  
  // Close dropdown after selection (if any)
  document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('open'));
}

/* Enhanced Zelle copy functionality */
function copyZelle(btn) {
  const email = document.getElementById('zelle-email').textContent.trim();
  navigator.clipboard.writeText(email).then(() => {
    const originalText = btn.textContent;
    btn.textContent = '✅ Copied!';
    btn.style.background = '#18a06a';
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
    }, 2000);
  }).catch(() => {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = email;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    
    const originalText = btn.textContent;
    btn.textContent = '✅ Copied!';
    btn.style.background = '#18a06a';
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
    }, 2000);
  });
}

/* Enhanced gallery carousel functionality */
let currentAlbum = 'awards';
let currentSlide = 0;
let albumSizes = {
  'awards': 7,
  'party': 9,
  'intro': 1
};

function showAlbum(albumName) {
  // Hide all albums
  document.querySelectorAll('.carousel-album').forEach(album => {
    album.classList.remove('active');
  });
  
  // Show selected album
  const targetAlbum = document.getElementById(`album-${albumName}`);
  if (targetAlbum) {
    targetAlbum.classList.add('active');
  }
  
  // Update active button
  document.querySelectorAll('.gallery-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  event.target.classList.add('active');
  
  // Update current album and reset slide
  currentAlbum = albumName;
  currentSlide = 0;
  
  // Update carousel position and dots
  updateCarousel();
  generateDots();
  
  // Re-bind lightbox events
  bindLightboxEvents();
}

function moveCarousel(direction) {
  const maxSlides = albumSizes[currentAlbum] || 1;
  
  if (direction === 'next') {
    currentSlide = (currentSlide + 1) % maxSlides;
  } else {
    currentSlide = currentSlide === 0 ? maxSlides - 1 : currentSlide - 1;
  }
  
  updateCarousel();
}

function goToSlide(slideIndex) {
  currentSlide = slideIndex;
  updateCarousel();
}

function updateCarousel() {
  const track = document.getElementById(`track-${currentAlbum}`);
  if (track) {
    const translateX = -currentSlide * 100;
    track.style.transform = `translateX(${translateX}%)`;
  }
  
  // Update dots
  updateDots();
}

function generateDots() {
  const dotsContainer = document.getElementById('carousel-dots');
  const maxSlides = albumSizes[currentAlbum] || 1;
  
  dotsContainer.innerHTML = '';
  
  for (let i = 0; i < maxSlides; i++) {
    const dot = document.createElement('button');
    dot.className = `carousel-dot ${i === currentSlide ? 'active' : ''}`;
    dot.onclick = () => goToSlide(i);
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dotsContainer.appendChild(dot);
  }
}

function updateDots() {
  document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
}

/* Enhanced lightbox functionality */
function bindLightboxEvents() {
  document.querySelectorAll('.carousel-slide').forEach(slide => {
    slide.onclick = () => {
      const img = slide.dataset.img;
      const cap = slide.dataset.cap;
      
      const lightbox = document.getElementById('lightbox');
      const lbImg = document.getElementById('lbImg');
      const lbCap = document.getElementById('lbCap');
      
      if (lightbox && lbImg && lbCap) {
        lbImg.src = img;
        lbImg.alt = cap;
        lbCap.textContent = cap;
        lightbox.classList.add('open');
        
        // Prevent body scroll when lightbox is open
        document.body.style.overflow = 'hidden';
      }
    };
  });
}

function closeLB() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.classList.remove('open');
    // Restore body scroll
    document.body.style.overflow = '';
  }
}

// Close lightbox on background click
document.getElementById('lightbox')?.addEventListener('click', (e) => {
  if (e.target.id === 'lightbox') {
    closeLB();
  }
});

// Close lightbox on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLB();
  }
});

/* Initialize on DOM load */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize upcoming matches
  renderNextMatches();
  
  // Initialize time icons
  decorateTimes();
  
  // Initialize carousel
  generateDots();
  updateCarousel();
  
  // Initialize lightbox events
  bindLightboxEvents();
  
  // Add keyboard navigation
  setupKeyboardNavigation();
  
  // Add touch/swipe support
  setupTouchNavigation();
  
  console.log('Bharat Warriors website initialized successfully!');
});

/* Keyboard navigation for carousel */
function setupKeyboardNavigation() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      moveCarousel('prev');
    } else if (e.key === 'ArrowRight') {
      moveCarousel('next');
    }
  });
}

/* Touch/Swipe navigation for carousel */
function setupTouchNavigation() {
  const carousel = document.querySelector('.carousel-wrapper');
  if (!carousel) return;
  
  let startX = 0;
  let endX = 0;
  
  carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });
  
  carousel.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  }, { passive: true });
  
  function handleSwipe() {
    const diffX = startX - endX;
    const threshold = 50; // Minimum swipe distance
    
    if (Math.abs(diffX) > threshold) {
      if (diffX > 0) {
        moveCarousel('next'); // Swipe left - go to next
      } else {
        moveCarousel('prev'); // Swipe right - go to previous
      }
    }
  }
}

/* Smooth scrolling for navigation links */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Close any open dropdowns
      document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('open'));
      
      // Close mobile menu on navigation
      const menu = document.getElementById('main-menu');
      const toggle = document.querySelector('.mobile-menu-toggle');
      if (menu && menu.classList.contains('mobile-open')) {
        menu.classList.remove('mobile-open');
        toggle.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });
});

/* Form validation and enhancement */
document.querySelector('form')?.addEventListener('submit', function(e) {
  const name = this.querySelector('input[name="name"]').value.trim();
  const email = this.querySelector('input[name="email"]').value.trim();
  const message = this.querySelector('textarea[name="message"]').value.trim();
  
  if (!name || !email || !message) {
    e.preventDefault();
    alert('Please fill in all required fields.');
    return;
  }
  
  // Show loading state
  const submitBtn = this.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;
  
  // Re-enable button after submission (for cases where form doesn't redirect)
  setTimeout(() => {
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }, 3000);
});

/* Add loading animation class to body when page loads */
document.body.classList.add('loading');