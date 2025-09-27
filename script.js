/* Bharat Warriors Cricket Club - Main JavaScript */

/* Modern enhancements and scroll progress */
document.addEventListener('DOMContentLoaded', function() {
  // Ensure scrolling is enabled on page load - force override any CSS
  document.body.style.removeProperty('overflow');
  document.body.style.removeProperty('overflow-x');
  document.body.style.removeProperty('overflow-y');
  document.body.style.setProperty('overflow-y', 'auto', 'important');
  document.body.style.setProperty('overflow-x', 'hidden', 'important');
  // Fix body height constraint that's preventing scrolling
  document.body.style.removeProperty('height');
  document.body.style.setProperty('height', 'auto', 'important');
  document.body.style.setProperty('min-height', '100vh', 'important');
  
  // Create scroll progress indicator
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #ff7a1a, #2c5aa0, #2e7d32);
    z-index: 9999;
    transition: width 0.1s ease-out;
  `;
  document.body.appendChild(progressBar);
  
  // Update progress on scroll
  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  });

  // Enhanced performance for animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
      }
    });
  }, { threshold: 0.1 });

  // Observe section headings for animation
  document.querySelectorAll('.section h2').forEach(h2 => {
    h2.style.opacity = '0';
    h2.style.transform = 'translateY(30px)';
    observer.observe(h2);
  });
});

/* Mobile menu toggle functionality */
function toggleMobileMenu() {
  const menu = document.getElementById('main-menu');
  const toggle = document.querySelector('.mobile-menu-toggle');
  
  menu.classList.toggle('mobile-open');
  toggle.classList.toggle('active');
  
  // Prevent body scroll when menu is open but keep vertical scrolling
  if (menu.classList.contains('mobile-open')) {
    document.body.style.setProperty('overflow-x', 'hidden', 'important');
    document.body.style.setProperty('overflow-y', 'auto', 'important');
  } else {
    document.body.style.setProperty('overflow-y', 'auto', 'important'); document.body.style.setProperty('overflow-x', 'hidden', 'important');
    document.body.style.setProperty('overflow-x', 'hidden', 'important');
    document.body.style.setProperty('overflow-y', 'auto', 'important');
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
      document.body.style.setProperty('overflow-y', 'auto', 'important'); document.body.style.setProperty('overflow-x', 'hidden', 'important');
      document.body.style.setProperty('overflow-x', 'hidden', 'important');
      document.body.style.setProperty('overflow-y', 'auto', 'important');
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

/* Enhanced upcoming matches display - Show only next match */
function renderNextMatches() {
  const rows = Array.from(document.querySelectorAll('#fxTable tbody tr'))
    .filter(tr => tr.style.display !== 'none');

  // Use current date (September 20, 2025)
  const today = new Date(2025, 8, 20); // Month is 0-indexed, so 8 = September
  today.setHours(0, 0, 0, 0);

  const mapped = rows.map(tr => ({tr, dt: parseRowDateTime(tr)}))
    .filter(o => o.dt !== null)
    .filter(o => {
      const matchDate = new Date(o.dt.getFullYear(), o.dt.getMonth(), o.dt.getDate());
      return matchDate >= today;
    })
    .sort((a, b) => a.dt - b.dt);

  // Show only the very next upcoming match (limit to 1)
  const nextMatch = mapped.slice(0, 1).map(o => {
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
                     daysUntil <= 7 ? ` <span style="color:var(--blue);font-weight:700">in ${daysUntil} days</span>` : 
                     ` <span style="color:var(--muted);font-weight:600">in ${daysUntil} days</span>`;
    
    return `<div class="next-item">
      <span class="lg">${lg}</span> ${d}${timeHtml}${daysBadge}
      <br><strong>${opp}</strong>
      <br><small style="color:var(--muted)">${grd}</small>
    </div>`;
  });

  const container = document.getElementById('next-matches');
  if (container) {
    container.innerHTML = (nextMatch.length ? 
      nextMatch.join('') : 
      '<div class="next-item">No upcoming matches scheduled. Check back soon!</div>'
    );
  }
  
  console.log(`Showing next upcoming match from ${mapped.length} total future matches`);
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

/* Enhanced gallery album switching */
function showAlbum(albumName) {
  // Hide all albums
  document.querySelectorAll('.gallery-grid').forEach(grid => {
    grid.style.display = 'none';
  });
  
  // Show selected album
  const targetAlbum = document.getElementById(`album-${albumName}`);
  if (targetAlbum) {
    targetAlbum.style.display = 'grid';
  }
  
  // Update active button
  document.querySelectorAll('.gallery-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  event.target.classList.add('active');
  
  // Re-bind lightbox events
  bindLightboxEvents();
}

/* Enhanced lightbox functionality */
function bindLightboxEvents() {
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.onclick = () => {
      const img = item.dataset.img;
      const cap = item.dataset.cap;
      
      const lightbox = document.getElementById('lightbox');
      const lbImg = document.getElementById('lbImg');
      const lbCap = document.getElementById('lbCap');
      
      if (lightbox && lbImg && lbCap) {
        lbImg.src = img;
        lbImg.alt = cap;
        lbCap.textContent = cap;
        lightbox.classList.add('open');
        
        // Prevent body scroll when lightbox is open but allow vertical scrolling
        document.body.style.setProperty('overflow-x', 'hidden', 'important');
        document.body.style.setProperty('overflow-y', 'auto', 'important');
      }
    };
  });
}

function closeLB() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.classList.remove('open');
    // Restore body scroll
    document.body.style.setProperty('overflow-y', 'auto', 'important'); document.body.style.setProperty('overflow-x', 'hidden', 'important');
    document.body.style.setProperty('overflow-x', 'hidden', 'important');
    document.body.style.setProperty('overflow-y', 'auto', 'important');
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
  
  // Initialize lightbox events
  bindLightboxEvents();
  
  console.log('Bharat Warriors website initialized successfully!');
});

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
        document.body.style.setProperty('overflow-y', 'auto', 'important'); document.body.style.setProperty('overflow-x', 'hidden', 'important');
        document.body.style.setProperty('overflow-x', 'hidden', 'important');
        document.body.style.setProperty('overflow-y', 'auto', 'important');
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

/* Compact Availability Modal Functions */
function openAvailabilityModal() {
  const modal = document.getElementById('availabilityModal');
  modal.classList.add('open');
  // Keep scrolling enabled even when modal is open
  document.body.style.setProperty('overflow-x', 'hidden', 'important');
  document.body.style.setProperty('overflow-y', 'auto', 'important');
  
  // Load next match when modal opens
  loadNextMatchForModal();
}

function closeAvailabilityModal() {
  const modal = document.getElementById('availabilityModal');
  modal.classList.remove('open');
  document.body.style.setProperty('overflow-y', 'auto', 'important'); document.body.style.setProperty('overflow-x', 'hidden', 'important');
  document.body.style.setProperty('overflow-x', 'hidden', 'important');
  document.body.style.setProperty('overflow-y', 'auto', 'important');
}

/* League Switching in Modal */
function switchLeague(league) {
  // Update active tab
  document.querySelectorAll('.league-tab-modal').forEach(tab => {
    tab.classList.remove('active');
    if (tab.dataset.league === league) {
      tab.classList.add('active');
    }
  });
  
  // Load matches for selected league
  loadNextMatchForModal(league);
}

/* Load Next Match for Modal */
function loadNextMatchForModal(league = 'ALL') {
  const modalNextMatch = document.getElementById('modalNextMatch');
  const matchInfo = document.getElementById('selectedMatchInfo');
  
  // Get upcoming matches from the fixtures table
  const upcomingMatches = [];
  const currentDate = new Date();
  
  // Parse matches from the fixtures table
  const fixtureRows = document.querySelectorAll('#fxTable tbody tr');
  fixtureRows.forEach(row => {
    const dateCell = row.cells[0];
    const opponentCell = row.cells[1];
    const groundCell = row.cells[2];
    const dfclCell = row.cells[3];
    const lecaCell = row.cells[4];
    const timeCell = row.cells[6];
    
    if (dateCell && opponentCell) {
      const matchDate = new Date(row.dataset.date || dateCell.textContent);
      
      // Only include future matches
      if (matchDate >= currentDate) {
        const matchLeague = dfclCell.textContent.includes('DFCL') ? 'DFCL' : 
                          lecaCell.textContent.includes('LECA') ? 'LECA' : 'OTHER';
        
        if (league === 'ALL' || league === matchLeague) {
          upcomingMatches.push({
            date: matchDate,
            opponent: opponentCell.textContent.trim(),
            ground: groundCell.textContent.trim(),
            league: matchLeague,
            time: timeCell.textContent.trim(),
            dateText: dateCell.textContent.trim()
          });
        }
      }
    }
  });
  
  // Sort by date and get the next match
  upcomingMatches.sort((a, b) => a.date - b.date);
  
  if (upcomingMatches.length > 0) {
    const nextMatch = upcomingMatches[0];
    const leagueEmoji = nextMatch.league === 'DFCL' ? '🏆' : nextMatch.league === 'LECA' ? '⚡' : '🏏';
    modalNextMatch.innerHTML = `${leagueEmoji} ${nextMatch.dateText} - ${nextMatch.opponent}<br>
                               <small style="color:var(--muted)">${nextMatch.ground} • ${nextMatch.time}</small>`;
    matchInfo.value = `${nextMatch.dateText} - ${nextMatch.opponent} (${nextMatch.league})`;
  } else {
    const leagueText = league === 'DFCL' ? 'DFCL' : league === 'LECA' ? 'LECA' : '';
    modalNextMatch.innerHTML = `No upcoming ${leagueText} matches found`;
    matchInfo.value = `No upcoming ${leagueText} matches`;
  }
}

/* Compact Availability Form Handling */
document.addEventListener('DOMContentLoaded', function() {
  const compactForm = document.getElementById('compactAvailabilityForm');
  if (compactForm) {
    compactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(compactForm);
      const name = formData.get('name');
      const availability = formData.get('availability');
      const team = formData.get('team');
      const selectedMatch = formData.get('selectedMatch');
      
      // Get current league from active tab
      const activeLeagueTab = document.querySelector('.league-tab-modal.active');
      const currentLeague = activeLeagueTab ? activeLeagueTab.dataset.league : 'ALL';
      
      // Determine which Google Form to use based on team and league
      let googleFormUrl = '';
      let formName = '';
      
      if (team === 'Bharat Warriors' && (currentLeague === 'DFCL' || selectedMatch.includes('DFCL'))) {
        // DFCL Bharat Warriors: https://forms.gle/HUqfRE4JwfrkeJKP7
        googleFormUrl = 'https://forms.gle/HUqfRE4JwfrkeJKP7';
        formName = 'DFCL Bharat Warriors';
      } else if (team === 'Bharat Yodhas' && (currentLeague === 'DFCL' || selectedMatch.includes('DFCL'))) {
        // DFCL Bharat Yodhas: https://forms.gle/SdHiKWV7czP6b6476
        googleFormUrl = 'https://forms.gle/SdHiKWV7czP6b6476';
        formName = 'DFCL Bharat Yodhas';
      } else if (team === 'Bharat Warriors' && (currentLeague === 'LECA' || selectedMatch.includes('LECA'))) {
        // LECA Bharat Warriors: https://forms.gle/ujda4fdHVnba2JZj6
        googleFormUrl = 'https://forms.gle/ujda4fdHVnba2JZj6';
        formName = 'LECA Bharat Warriors';
      } else {
        // Default fallback - you can set a default form or show error
        alert('Please select a valid team and league combination.');
        return;
      }
      
      // Show feedback and open Google Form
      const submitBtn = compactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = `📝 Opening ${formName}...`;
      submitBtn.disabled = true;
      
      // Create a message to copy to clipboard or display
      const message = `Player: ${name}\nTeam: ${team}\nAvailability: ${availability === 'yes' ? 'Available' : 'Not Available'}\nMatch: ${selectedMatch}`;
      
      console.log('Form Details:', message);
      
      // Open the Google Form
      setTimeout(() => {
        window.open(googleFormUrl, '_blank');
        
        submitBtn.textContent = `✅ Opened ${formName}`;
        submitBtn.style.background = 'var(--green)';
        
        // Show instructions to user
        alert(`Google Form opened! Please fill in:\n\nName: ${name}\nAvailability: ${availability === 'yes' ? 'Available' : 'Not Available'}\n\nThen click Submit in the form.`);
        
        setTimeout(() => {
          compactForm.reset();
          closeAvailabilityModal();
          submitBtn.textContent = originalText;
          submitBtn.style.background = 'var(--chakra)';
          submitBtn.disabled = false;
        }, 2000);
      }, 500);
    });
  }
  
  // Close modal on backdrop click
  document.getElementById('availabilityModal')?.addEventListener('click', function(e) {
    if (e.target === this) {
      closeAvailabilityModal();
    }
  });
});

/* Add loading animation class to body when page loads */
document.body.classList.add('loading');

/* Hero Carousel Functionality */
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');

function showSlide(index) {
  // Hide all slides
  slides.forEach(slide => slide.classList.remove('active'));
  indicators.forEach(indicator => indicator.classList.remove('active'));
  
  // Show current slide
  slides[index].classList.add('active');
  indicators[index].classList.add('active');
}

function changeSlide(direction) {
  currentSlide += direction;
  
  if (currentSlide >= slides.length) {
    currentSlide = 0;
  } else if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  }
  
  showSlide(currentSlide);
}

function goToSlide(index) {
  currentSlide = index;
  showSlide(currentSlide);
}

// Auto-advance carousel every 6 seconds
function startCarousel() {
  setInterval(() => {
    changeSlide(1);
  }, 6000);
}

/* Animated Counter System */
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  const card = element.closest('.stat-card');
  
  // Add counting class for visual feedback
  card.classList.add('counting');
  
  const timer = setInterval(() => {
    current += increment;
    
    if (current >= target) {
      element.textContent = Math.floor(target);
      clearInterval(timer);
      
      // Remove counting class and add completion effects
      card.classList.remove('counting');
      card.classList.add('completed');
      
      // Add completion animation
      element.style.transform = 'scale(1.15)';
      setTimeout(() => {
        element.style.transform = 'scale(1)';
        card.classList.remove('completed');
      }, 600);
      
      // Show the + symbol for relevant stats
      const plusElement = element.parentElement.querySelector('.stat-plus');
      if (plusElement) {
        plusElement.style.opacity = '1';
        plusElement.style.animation = 'pulse 2s ease-in-out infinite';
      }
      
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

function startCounterAnimations() {
  const counters = document.querySelectorAll('[data-count]');
  
  counters.forEach((counter, index) => {
    const target = parseInt(counter.getAttribute('data-count'));
    const delay = index * 200; // Stagger the animations
    
    setTimeout(() => {
      animateCounter(counter, target, 1500);
    }, delay);
  });
}

// Intersection Observer for triggering counters when visible
function setupCounterObserver() {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        entry.target.classList.add('counted');
        const counters = entry.target.querySelectorAll('[data-count]');
        
        // Add sparkle effect to the stats grid
        entry.target.style.position = 'relative';
        
        counters.forEach((counter, index) => {
          const target = parseInt(counter.getAttribute('data-count'));
          const delay = index * 300;
          
          setTimeout(() => {
            animateCounter(counter, target, 2000);
          }, delay);
        });
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
  });
  
  // Observe all stats grids
  document.querySelectorAll('.stats-grid').forEach(grid => {
    counterObserver.observe(grid);
  });
}

// Initialize carousel when DOM loads
document.addEventListener('DOMContentLoaded', function() {
  if (slides.length > 0) {
    showSlide(0);
    startCarousel();
  }
  
  // Initialize counter animations
  setupCounterObserver();
  
  // Add icon animation delays
  document.querySelectorAll('[data-animate] .stat-icon').forEach((icon, index) => {
    icon.style.animationDelay = `${0.8 + (index * 0.2)}s`;
  });

  // Initialize enhanced navigation
  setupEnhancedNavigation();
});

/* Enhanced Navigation System */
function setupEnhancedNavigation() {
  const nav = document.querySelector('.nav');
  const menuLinks = document.querySelectorAll('.menu a[href^="#"]');
  const sections = document.querySelectorAll('.section[id]');
  
  // Enhanced scroll detection with throttling
  let scrollTimeout;
  function handleScroll() {
    if (scrollTimeout) return;
    
    scrollTimeout = setTimeout(() => {
      const scrollY = window.scrollY;
      
      // Add scrolled class for enhanced navbar styling
      if (scrollY > 100) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
      
      // Update active navigation links based on scroll position
      updateActiveNavLink();
      
      scrollTimeout = null;
    }, 16); // ~60fps throttling
  }
  
  // Update active navigation link based on current section
  function updateActiveNavLink() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // If near bottom of page, highlight last section
    if (scrollY + windowHeight >= documentHeight - 50) {
      const lastSection = sections[sections.length - 1];
      if (lastSection) {
        setActiveLink(`#${lastSection.id}`);
        return;
      }
    }
    
    // Find current section based on scroll position
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150; // Account for sticky nav
      const sectionHeight = section.offsetHeight;
      
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSection = `#${section.id}`;
      }
    });
    
    // If we're at the top, highlight the first relevant section
    if (scrollY < 200) {
      currentSection = '#about'; // Default to about section
    }
    
    setActiveLink(currentSection);
  }
  
  // Set active navigation link
  function setActiveLink(href) {
    menuLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === href) {
        link.classList.add('active');
      }
    });
  }
  
  // Enhanced smooth scroll with easing
  function smoothScrollTo(targetId) {
    const target = document.querySelector(targetId);
    if (!target) return;
    
    const navHeight = nav.offsetHeight;
    const targetPosition = target.offsetTop - navHeight - 20;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = Math.min(Math.abs(distance) * 0.8, 1200); // Max 1.2s
    
    let start = null;
    
    function animation(currentTime) {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);
      
      // Easing function (easeInOutCubic)
      const ease = progress < 0.5 
        ? 4 * progress * progress * progress
        : (progress - 1) * (2 * progress - 2) * (2 * progress - 2) + 1;
      
      window.scrollTo(0, startPosition + distance * ease);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    }
    
    requestAnimationFrame(animation);
  }
  
  // Add click handlers for smooth scroll navigation
  menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      
      if (targetId.startsWith('#')) {
        smoothScrollTo(targetId);
        
        // Close mobile menu if open
        const mobileMenu = document.getElementById('main-menu');
        const toggle = document.querySelector('.mobile-menu-toggle');
        if (mobileMenu && mobileMenu.classList.contains('mobile-open')) {
          mobileMenu.classList.remove('mobile-open');
          toggle.classList.remove('active');
          document.body.style.setProperty('overflow-y', 'auto', 'important'); document.body.style.setProperty('overflow-x', 'hidden', 'important');
          document.body.style.setProperty('overflow-x', 'hidden', 'important');
          document.body.style.setProperty('overflow-y', 'auto', 'important');
        }
      }
    });
  });
  
  // Add scroll event listener with passive for better performance
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Initialize active link on page load
  setTimeout(updateActiveNavLink, 100);
}

/* Team Roster Tab Functionality */
document.addEventListener('DOMContentLoaded', function() {
  const teamTabs = document.querySelectorAll('.team-tab');
  const teamContents = document.querySelectorAll('.team-content');
  
  teamTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTeam = tab.dataset.team;
      
      // Remove active classes
      teamTabs.forEach(t => t.classList.remove('active'));
      teamContents.forEach(c => c.classList.remove('active'));
      
      // Add active classes
      tab.classList.add('active');
      const targetContent = document.getElementById(targetTeam);
      if (targetContent) {
        targetContent.classList.add('active');
      }
      
      // Add smooth transition effect
      setTimeout(() => {
        targetContent.style.opacity = '1';
        targetContent.style.transform = 'translateY(0)';
      }, 10);
    });
  });
  
  // Initialize first tab as active
  const firstTab = teamTabs[0];
  const firstContent = teamContents[0];
  if (firstTab && firstContent) {
    firstTab.classList.add('active');
    firstContent.classList.add('active');
  }
});