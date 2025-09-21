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

/* Compact Availability Modal Functions */
function openAvailabilityModal() {
  const modal = document.getElementById('availabilityModal');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  
  // Load next match when modal opens
  loadNextMatchForModal();
}

function closeAvailabilityModal() {
  const modal = document.getElementById('availabilityModal');
  modal.classList.remove('open');
  document.body.style.overflow = '';
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
        googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSfCvw6k6U8w8QZOlF6bxFGsHUqfRE4JwfrkeJKP7/formResponse';
        formName = 'DFCL Bharat Warriors';
      } else if (team === 'Bharat Yodhas' && (currentLeague === 'DFCL' || selectedMatch.includes('DFCL'))) {
        googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSfnxd6SdHiKWV7czP6b6476/formResponse';
        formName = 'DFCL Bharat Yodhas';
      } else if (team === 'Bharat Warriors' && (currentLeague === 'LECA' || selectedMatch.includes('LECA'))) {
        googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSfJPlW8YLEJEZqeo-1beQ7__yvL_oUd2rZjUFuB4K7Xy6dNxg/formResponse';
        formName = 'LECA Bharat Warriors';
      } else {
        // Default fallback - you can set a default form or show error
        alert('Please select a valid team and league combination.');
        return;
      }
      
      // Create form data for Google Form with common entry IDs
      const googleFormData = new FormData();
      googleFormData.append('entry.2005620554', name); // Common pattern for name field
      googleFormData.append('entry.1065046570', availability === 'yes' ? 'Yes' : 'No'); // Common pattern for availability
      googleFormData.append('entry.1166974658', selectedMatch); // Common pattern for match details
      
      // Show success immediately with debug info
      const submitBtn = compactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = `🔄 Testing ${formName}...`;
      submitBtn.disabled = true;
      
      console.log('Form URL:', googleFormUrl);
      console.log('Form Data:', {
        name: name,
        availability: availability,
        selectedMatch: selectedMatch
      });
      
      // Submit to appropriate Google Form
      fetch(googleFormUrl, {
        method: 'POST',
        body: googleFormData,
        mode: 'no-cors' // Required for Google Forms
      }).then(() => {
        // Success feedback
        submitBtn.textContent = `✅ Submitted to ${formName}!`;
        submitBtn.style.background = 'var(--green)';
        
        setTimeout(() => {
          compactForm.reset();
          closeAvailabilityModal();
          submitBtn.textContent = originalText;
          submitBtn.style.background = 'var(--chakra)';
          submitBtn.disabled = false;
        }, 2500);
      }).catch((error) => {
        console.error('Form submission error:', error);
        // Error feedback
        submitBtn.textContent = '❌ Error - Check Console';
        submitBtn.style.background = '#dc3545';
        
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.style.background = 'var(--chakra)';
          submitBtn.disabled = false;
        }, 3000);
      });
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