/**
 * ====================================================================
 * PREMIUM ANIMATED WEDDING INVITATION WEBSITE — MAIN SCRIPT
 * Vanilla JavaScript (ES6+), Web Audio API, Canvas, IntersectionObserver
 * ====================================================================
 */

(function () {
  'use strict';

  // State
  const state = {
    invitationOpened: false,
    musicPlaying: false,
    activeLightboxIndex: 0,
    galleryItems: [],
    audioContext: null,
    synthInterval: null,
    petalsAnimId: null,
    isTabVisible: true,
  };

  const config = window.WEDDING_CONFIG || {};

  /* ------------------------------------------------------------------
     1. DOM Element References
     ------------------------------------------------------------------ */
  const dom = {
    // Envelope
    envelopeOverlay: document.getElementById('envelope-overlay'),
    waxSealBtn: document.getElementById('wax-seal-btn'),
    btnOpenEnvelope: document.getElementById('btn-open-envelope'),
    envelopeSkip: document.getElementById('envelope-skip'),
    envelopeNames: document.getElementById('envelope-names'),
    envelopeIntroText: document.getElementById('envelope-intro-text'),
    envelopeSubtext: document.getElementById('envelope-subtext'),
    envelopeAuspiciousHeader: document.getElementById('envelope-auspicious-header'),

    // Header & Nav
    siteHeader: document.getElementById('site-header'),
    navMonogram: document.getElementById('nav-monogram'),
    musicToggle: document.getElementById('music-toggle'),
    musicStatusText: document.getElementById('music-status-text'),
    reopenEnvelopeBtn: document.getElementById('reopen-envelope-btn'),
    mobileMenuBtn: document.getElementById('mobile-menu-btn'),
    mobileDrawer: document.getElementById('mobile-drawer'),
    navLinks: document.querySelectorAll('.nav-link, .mobile-nav-link'),

    // Hero
    heroBg: document.getElementById('hero-bg'),
    heroTagline: document.getElementById('hero-tagline'),
    heroAuspiciousHeader: document.getElementById('hero-auspicious-header'),
    heroP1: document.getElementById('hero-p1'),
    heroP2: document.getElementById('hero-p2'),
    heroSubtitle: document.getElementById('hero-subtitle'),
    heroDisplayDate: document.getElementById('hero-display-date'),
    heroLocationCity: document.getElementById('hero-location-city'),
    btnHeroGoogleCal: document.getElementById('btn-hero-google-cal'),
    btnHeroSaveCal: document.getElementById('btn-hero-save-cal'),

    // Countdown
    countdownTitle: document.getElementById('countdown-title'),
    countdownSubtitle: document.getElementById('countdown-subtitle'),
    countdownGrid: document.getElementById('countdown-grid'),
    countdownCelebration: document.getElementById('countdown-celebration'),
    countdownCelebrationText: document.getElementById('countdown-celebration-text'),
    countdownTzLabel: document.getElementById('countdown-tz-label'),
    countDays: document.getElementById('count-days'),
    countHours: document.getElementById('count-hours'),
    countMinutes: document.getElementById('count-minutes'),
    countSeconds: document.getElementById('count-seconds'),

    // Our Story
    storyTitle: document.getElementById('story-title'),
    storySubtitle: document.getElementById('story-subtitle'),
    storyMilestonesContainer: document.getElementById('story-milestones-container'),

    // Events
    eventsTimelineContainer: document.getElementById('events-timeline-container'),

    // Venue
    venueSectionTitle: document.getElementById('venue-section-title'),
    venueSectionSubtitle: document.getElementById('venue-section-subtitle'),
    venueImg: document.getElementById('venue-img'),
    venueName: document.getElementById('venue-name'),
    venueDesc: document.getElementById('venue-desc'),
    venueAddressText: document.getElementById('venue-address-text'),
    venueParkingNote: document.getElementById('venue-parking-note'),
    venueShuttleNote: document.getElementById('venue-shuttle-note'),
    btnVenueDirections: document.getElementById('btn-venue-directions'),
    btnCopyAddress: document.getElementById('btn-copy-address'),

    // Gallery & Lightbox
    galleryTitle: document.getElementById('gallery-title'),
    gallerySubtitle: document.getElementById('gallery-subtitle'),
    galleryGrid: document.getElementById('gallery-grid'),
    lightboxModal: document.getElementById('lightbox-modal'),
    lightboxImg: document.getElementById('lightbox-img'),
    lightboxCaption: document.getElementById('lightbox-caption'),
    lightboxCounter: document.getElementById('lightbox-counter'),
    lightboxClose: document.getElementById('lightbox-close'),
    lightboxPrev: document.getElementById('lightbox-prev'),
    lightboxNext: document.getElementById('lightbox-next'),

    // Details & FAQ
    detailsTitle: document.getElementById('details-title'),
    detailsSubtitle: document.getElementById('details-subtitle'),
    detailsCardsGrid: document.getElementById('details-cards-grid'),
    faqWrapper: document.getElementById('faq-wrapper'),
    faqAccordionList: document.getElementById('faq-accordion-list'),

    // RSVP
    rsvpTitle: document.getElementById('rsvp-title'),
    rsvpSubtitle: document.getElementById('rsvp-subtitle'),
    rsvpForm: document.getElementById('rsvp-form'),
    rsvpToast: document.getElementById('rsvp-toast'),

    // Closing
    closingQuote: document.getElementById('closing-quote'),
    closingAuthor: document.getElementById('closing-author'),
    closingMessage: document.getElementById('closing-message'),
    closingSignature: document.getElementById('closing-signature'),
    btnBackToTop: document.getElementById('btn-back-to-top'),

    // Audio & Notifications
    bgAudio: document.getElementById('bg-audio'),
    petalsCanvas: document.getElementById('petals-canvas'),
    toastNotification: document.getElementById('toast-notification'),
    toastMessage: document.getElementById('toast-message'),
  };

  /* ------------------------------------------------------------------
     2. Initialize Page Content from Config
     ------------------------------------------------------------------ */
  function populateContent() {
    const coupleName = config.coupleTitle || `${config.partner1?.firstName || 'Diksha'} & ${config.partner2?.firstName || 'Khiraj'}`;
    const p1FullName = config.partner1?.fullName || config.partner1?.firstName || 'Diksha';
    const p2FullName = config.partner2?.fullName || config.partner2?.firstName || 'Khiraj';

    document.title = `${coupleName} — The Wedding Celebration`;

    // Envelope
    if (dom.envelopeAuspiciousHeader && (config.invitation?.auspiciousHeader || config.auspiciousHeader)) {
      dom.envelopeAuspiciousHeader.textContent = config.invitation?.auspiciousHeader || config.auspiciousHeader;
    }
    if (dom.envelopeNames) dom.envelopeNames.textContent = coupleName;
    if (dom.envelopeIntroText && config.invitation?.envelopeMessage) {
      dom.envelopeIntroText.textContent = config.invitation.envelopeMessage;
    }
    if (dom.envelopeSubtext && config.invitation?.subMessage) {
      dom.envelopeSubtext.textContent = config.invitation.subMessage;
    }
    if (dom.navMonogram && config.monogram) {
      dom.navMonogram.textContent = config.monogram;
    }

    // Hero
    if (dom.heroAuspiciousHeader && (config.hero?.auspiciousHeader || config.auspiciousHeader)) {
      dom.heroAuspiciousHeader.textContent = config.hero?.auspiciousHeader || config.auspiciousHeader;
    }
    if (dom.heroTagline && config.hero?.tagline) dom.heroTagline.textContent = config.hero.tagline;
    if (dom.heroP1) dom.heroP1.textContent = p1FullName;
    if (dom.heroP2) dom.heroP2.textContent = p2FullName;
    if (dom.heroSubtitle && config.hero?.subtitle) dom.heroSubtitle.textContent = config.hero.subtitle;
    if (dom.heroDisplayDate && config.displayDate) dom.heroDisplayDate.textContent = config.displayDate;
    if (dom.heroLocationCity && config.locationCity) dom.heroLocationCity.textContent = config.locationCity;
    if (dom.heroBg) {
      if (config.hero?.backgroundImage) {
        dom.heroBg.src = config.hero.backgroundImage;
      } else {
        dom.heroBg.remove();
      }
    }

    if (dom.btnHeroGoogleCal) {
      dom.btnHeroGoogleCal.href = getGoogleCalendarUrl({
        name: "The Wedding Ceremony (Lagna Sohala)",
        calendarTitle: `${coupleName}'s Wedding Ceremony (Lagna Sohala)`,
        venue: config.venue?.name || "New Charkha Ghar Hall",
        address: config.venue?.address || "Wardha, Maharashtra",
        date: config.displayDate || "Friday, December 11, 2026",
        time: config.displayTime || "12:30 PM IST",
        description: config.hero?.subtitle || "Together with our families, we invite you to celebrate our sacred Maharashtrian wedding union."
      });
    }

    // Countdown
    if (dom.countdownTitle && config.countdown?.title) dom.countdownTitle.textContent = config.countdown.title;
    if (dom.countdownSubtitle && config.countdown?.subtitle) dom.countdownSubtitle.textContent = config.countdown.subtitle;
    if (dom.countdownCelebrationText && config.countdown?.completedMessage) {
      dom.countdownCelebrationText.textContent = config.countdown.completedMessage;
    }
    if (dom.countdownTzLabel && config.timezone) {
      dom.countdownTzLabel.textContent = `Calculated for ${config.timezone.replace('_', ' ')} (${config.displayTime || ''})`;
    }

    // Our Story
    if (config.story?.enabled && config.story?.milestones?.length) {
      if (dom.storyTitle && config.story.sectionTitle) dom.storyTitle.textContent = config.story.sectionTitle;
      if (dom.storySubtitle && config.story.sectionSubtitle) dom.storySubtitle.textContent = config.story.sectionSubtitle;
      renderStoryMilestones(config.story.milestones);
    } else {
      const storySec = document.getElementById('story');
      if (storySec) storySec.style.display = 'none';
    }

    // Events Schedule
    if (config.events && config.events.length) {
      renderEvents(config.events);
    } else {
      const eventsSec = document.getElementById('events');
      if (eventsSec) eventsSec.style.display = 'none';
    }

    // Venue
    if (config.venue?.enabled) {
      renderVenue(config.venue);
    } else {
      const venueSec = document.getElementById('venue');
      if (venueSec) venueSec.style.display = 'none';
    }

    // Gallery
    if (config.gallery?.enabled && config.gallery?.items?.length) {
      state.galleryItems = config.gallery.items;
      if (dom.galleryTitle && config.gallery.title) dom.galleryTitle.textContent = config.gallery.title;
      if (dom.gallerySubtitle && config.gallery.subtitle) dom.gallerySubtitle.textContent = config.gallery.subtitle;
      renderGallery(state.galleryItems);
    } else {
      const gallerySec = document.getElementById('gallery');
      if (gallerySec) gallerySec.style.display = 'none';
    }

    // Guest Details & FAQ
    if (config.details?.enabled) {
      if (dom.detailsTitle && config.details.title) dom.detailsTitle.textContent = config.details.title;
      if (dom.detailsSubtitle && config.details.subtitle) dom.detailsSubtitle.textContent = config.details.subtitle;
      renderGuestDetails(config.details);
    } else {
      const detailsSec = document.getElementById('details');
      if (detailsSec) detailsSec.style.display = 'none';
    }

    // RSVP
    if (config.rsvp?.enabled) {
      if (dom.rsvpTitle && config.rsvp.title) dom.rsvpTitle.textContent = config.rsvp.title;
      if (dom.rsvpSubtitle && config.rsvp.subtitle) dom.rsvpSubtitle.textContent = config.rsvp.subtitle;
    } else {
      const rsvpSec = document.getElementById('rsvp');
      if (rsvpSec) rsvpSec.style.display = 'none';
    }

    // Closing
    if (config.closing) {
      if (dom.closingQuote && config.closing.quote) dom.closingQuote.textContent = `“${config.closing.quote}”`;
      if (dom.closingAuthor && config.closing.quoteAuthor) dom.closingAuthor.textContent = `— ${config.closing.quoteAuthor}`;
      if (dom.closingMessage && config.closing.message) dom.closingMessage.textContent = config.closing.message;
      if (dom.closingSignature) {
        dom.closingSignature.innerHTML = `${config.closing.signature || 'With all our love,'}<br>${coupleName}`;
      }
    }
  }

  /* ------------------------------------------------------------------
     3. Story Milestones Renderer
     ------------------------------------------------------------------ */
  function renderStoryMilestones(milestones) {
    if (!dom.storyMilestonesContainer) return;
    dom.storyMilestonesContainer.innerHTML = '';

    milestones.forEach((item, index) => {
      const article = document.createElement('article');
      article.className = 'milestone-item reveal-on-scroll';

      article.innerHTML = `
        <div class="milestone-image-wrapper">
          <div class="milestone-photo-frame">
            <img src="${item.image}" alt="${escapeHtml(item.imageAlt || item.title)}" class="milestone-img" loading="lazy">
          </div>
          <div class="milestone-image-backdrop" aria-hidden="true"></div>
        </div>
        <div class="milestone-content">
          ${item.tag ? `<span class="milestone-tag">${escapeHtml(item.tag)}</span>` : ''}
          <h3 class="milestone-title">${escapeHtml(item.title)}</h3>
          ${item.subtitle ? `<p class="milestone-subtitle">${escapeHtml(item.subtitle)}</p>` : ''}
          <p class="milestone-desc">${escapeHtml(item.description)}</p>
        </div>
      `;
      dom.storyMilestonesContainer.appendChild(article);
    });
  }

  /* ------------------------------------------------------------------
     4. Events Schedule Renderer
     ------------------------------------------------------------------ */
  function renderEvents(events) {
    if (!dom.eventsTimelineContainer) return;
    dom.eventsTimelineContainer.innerHTML = '';

    const dayBadges = [
      { marathi: 'दिवस १', english: 'Day 1', pillClass: 'badge-day-1', icon: '🎵' },
      { marathi: 'दिवस २', english: 'Day 2', pillClass: 'badge-day-2', icon: '✨' },
      { marathi: 'मुख्य सोहळा', english: 'Auspicious Day', pillClass: 'badge-day-main', icon: '🪔' },
    ];

    events.forEach((event, index) => {
      const card = document.createElement('div');
      card.className = `timeline-event-card reveal-on-scroll ${index === 2 ? 'timeline-main-event' : ''}`;

      const googleCalUrl = getGoogleCalendarUrl(event);
      const day = dayBadges[index] || { marathi: `सोहळा ${index + 1}`, english: `Day ${index + 1}`, pillClass: 'badge-day-generic', icon: '✦' };

      card.innerHTML = `
        <div class="timeline-node" aria-hidden="true"></div>
        <div class="event-card-inner ${index === 2 ? 'featured-lagna-card shimmer-foil' : ''}">
          <div class="event-header-badge-row">
            <span class="event-day-pill ${day.pillClass}">
              <span class="day-pill-icon" aria-hidden="true">${day.icon}</span>
              <span>${day.marathi} • ${day.english}</span>
            </span>
            ${event.type ? `<span class="event-type-badge">${escapeHtml(event.type)}</span>` : ''}
          </div>
          ${event.image ? `<img src="${event.image}" alt="${escapeHtml(event.name)}" class="event-img-thumbnail" loading="lazy">` : ''}
          <h3 class="event-name">${escapeHtml(event.name)}</h3>

          <div class="event-meta-list">
            <div class="event-meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <span><strong>${escapeHtml(event.date)}</strong></span>
            </div>
            <div class="event-meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              <span>${escapeHtml(event.time)}</span>
            </div>
            <div class="event-meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span>${escapeHtml(event.venue)}</span>
            </div>
          </div>

          ${event.dressCode ? `<div class="event-dress-code">Attire: ${escapeHtml(event.dressCode)}</div>` : ''}
          ${event.description ? `<p class="event-desc">${escapeHtml(event.description)}</p>` : ''}

          <div style="display: flex; flex-wrap: wrap; gap: 0.6rem; align-items: center; margin-top: 1rem;">
            <!-- Google Calendar Button (ideal for mobile phones) -->
            <a class="btn-event-google-cal" href="${googleCalUrl}" target="_blank" rel="noopener noreferrer" title="Add event to Google Calendar on phone or web">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" width="14" height="14">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
              </svg>
              <span>Google Calendar</span>
            </a>

            <!-- Apple / Outlook .ics Calendar -->
            <button class="btn-add-cal" type="button" data-event-id="${escapeHtml(event.id || String(index))}" title="Download Apple / Outlook .ics calendar file">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" width="14" height="14">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              <span>.ics</span>
            </button>
          </div>
        </div>
      `;

      dom.eventsTimelineContainer.appendChild(card);
    });

    // Attach event listeners for calendar download buttons
    dom.eventsTimelineContainer.querySelectorAll('.btn-add-cal').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const eventId = btn.getAttribute('data-event-id');
        const eventObj = events.find((ev, i) => (ev.id || String(i)) === eventId) || events[0];
        downloadEventIcs(eventObj);
      });
    });
  }

  /* ------------------------------------------------------------------
     5. Venue Renderer
     ------------------------------------------------------------------ */
  function renderVenue(venue) {
    if (dom.venueName) dom.venueName.textContent = venue.name || 'The Venue';
    if (dom.venueDesc) dom.venueDesc.textContent = venue.description || '';
    if (dom.venueAddressText) dom.venueAddressText.textContent = venue.address || '';
    if (dom.venueImg && venue.image) dom.venueImg.src = venue.image;

    if (venue.parkingInfo && dom.venueParkingNote) {
      dom.venueParkingNote.innerHTML = `<strong>Valet Parking:</strong> ${escapeHtml(venue.parkingInfo)}`;
    }
    if (venue.shuttleInfo && dom.venueShuttleNote) {
      dom.venueShuttleNote.innerHTML = `<strong>Guest Shuttles:</strong> ${escapeHtml(venue.shuttleInfo)}`;
    }

    if (dom.btnVenueDirections) {
      dom.btnVenueDirections.href = venue.mapUrl || (venue.mapQuery ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(venue.mapQuery)}` : 'https://maps.app.goo.gl/WdgeZRBRgTag9Y8R6');
    }
  }

  /* ------------------------------------------------------------------
     6. Photo Gallery Renderer
     ------------------------------------------------------------------ */
  function renderGallery(items) {
    if (!dom.galleryGrid) return;
    dom.galleryGrid.innerHTML = '';

    items.forEach((item, index) => {
      const div = document.createElement('div');
      div.className = 'gallery-item reveal-on-scroll';
      div.setAttribute('role', 'button');
      div.setAttribute('tabindex', '0');
      div.setAttribute('aria-label', `View photo: ${item.caption || item.alt || 'Wedding gallery photo'}`);

      div.innerHTML = `
        <img src="${item.src}" alt="${escapeHtml(item.alt || item.caption || '')}" loading="lazy">
        <div class="gallery-overlay-badge" aria-hidden="true">
          <p class="gallery-caption">${escapeHtml(item.caption || '')}</p>
        </div>
      `;

      div.addEventListener('click', () => openLightbox(index));
      div.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(index);
        }
      });

      dom.galleryGrid.appendChild(div);
    });
  }

  /* ------------------------------------------------------------------
     7. Guest Details & FAQ Renderer
     ------------------------------------------------------------------ */
  function renderGuestDetails(details) {
    if (!dom.detailsCardsGrid) return;
    dom.detailsCardsGrid.innerHTML = '';

    // Card 1: Attire & Dress Code
    if (details.dressCode?.enabled) {
      const card = document.createElement('div');
      card.className = 'detail-card reveal-on-scroll';

      let swatchesHtml = '';
      if (details.dressCode.paletteColors && details.dressCode.paletteColors.length) {
        swatchesHtml = `
          <div class="palette-swatches">
            ${details.dressCode.paletteColors
              .map(
                (c) => `
              <div class="palette-swatch-item">
                <span class="swatch-circle" style="background-color: ${c.hex};" title="${escapeHtml(c.name)}"></span>
                <span class="swatch-name">${escapeHtml(c.name)}</span>
              </div>
            `
              )
              .join('')}
          </div>
        `;
      }

      card.innerHTML = `
        <h3 class="detail-card-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
            <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>
          </svg>
          <span>${escapeHtml(details.dressCode.title || 'Attire & Dress Code')}</span>
        </h3>
        <p><strong>${escapeHtml(details.dressCode.summary || '')}</strong></p>
        ${swatchesHtml}
        <p style="font-size: 0.95rem; opacity: 0.9;">${escapeHtml(details.dressCode.notes || '')}</p>
      `;
      dom.detailsCardsGrid.appendChild(card);
    }

    // Card 2: Accommodations
    if (details.accommodations?.enabled) {
      const card = document.createElement('div');
      card.className = 'detail-card reveal-on-scroll stagger-1';

      let hotelsHtml = '';
      if (details.accommodations.hotels && details.accommodations.hotels.length) {
        hotelsHtml = `
          <div class="hotel-list">
            ${details.accommodations.hotels
              .map(
                (h) => `
              <div class="hotel-item">
                <div class="hotel-name">${escapeHtml(h.name)}</div>
                <div class="hotel-meta">${escapeHtml(h.distance)}</div>
                ${h.code ? `<div class="hotel-code">Group Code: <strong>${escapeHtml(h.code)}</strong></div>` : ''}
              </div>
            `
              )
              .join('')}
          </div>
        `;
      }

      card.innerHTML = `
        <h3 class="detail-card-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
            <path d="M3 21h18M5 21V7l8-4v18M13 21V3l6 4v14"/>
          </svg>
          <span>${escapeHtml(details.accommodations.title || 'Where to Stay')}</span>
        </h3>
        <p style="font-size: 0.95rem;">${escapeHtml(details.accommodations.notes || '')}</p>
        ${hotelsHtml}
      `;
      dom.detailsCardsGrid.appendChild(card);
    }

    // Card 3: Travel & Transit
    if (details.travel?.enabled) {
      const card = document.createElement('div');
      card.className = 'detail-card reveal-on-scroll stagger-2';

      let airportsHtml = '';
      if (details.travel.airports && details.travel.airports.length) {
        airportsHtml = `
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.6rem; margin-top: 0.75rem;">
            ${details.travel.airports
              .map(
                (a) => `
              <li style="display:flex; justify-content:space-between; font-size:0.9rem; border-bottom:1px dashed rgba(198,165,107,0.3); padding-bottom: 0.35rem;">
                <span><strong>${escapeHtml(a.name)}</strong></span>
                <span style="opacity:0.8;">${escapeHtml(a.distance)}</span>
              </li>
            `
              )
              .join('')}
          </ul>
        `;
      }

      card.innerHTML = `
        <h3 class="detail-card-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
            <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3.5c-.5-.5-2.5 0-4 1.5L13.5 8.5 5.3 6.7c-.5-.1-1 .1-1.3.5l-.7.7 5.5 3.5L5.4 15 3 14l-1 1 3 2 2 3 1-1-1-2.4 3.6-3.4 3.5 5.5.7-.7c.4-.3.6-.8.5-1.3z"/>
          </svg>
          <span>${escapeHtml(details.travel.title || 'Travel & Transit')}</span>
        </h3>
        <p style="font-size: 0.95rem;">Nearest recommended airports for flying in:</p>
        ${airportsHtml}
      `;
      dom.detailsCardsGrid.appendChild(card);
    }

    // Card 4: Registry & Gifts
    if (details.registry?.enabled) {
      const card = document.createElement('div');
      card.className = 'detail-card reveal-on-scroll stagger-3';

      card.innerHTML = `
        <h3 class="detail-card-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
            <polyline points="20 12 20 22 4 22 4 12"/>
            <rect x="2" y="7" width="20" height="5"/>
            <line x1="12" y1="22" x2="12" y2="7"/>
            <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
            <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
          </svg>
          <span>${escapeHtml(details.registry.title || 'Gifts & Registry')}</span>
        </h3>
        <p style="font-size: 0.95rem; line-height: 1.7;">${escapeHtml(details.registry.message || '')}</p>
      `;
      dom.detailsCardsGrid.appendChild(card);
    }

    // FAQ Accordion
    if (details.faq?.enabled && details.faq?.items?.length) {
      renderFaq(details.faq.items);
    } else if (dom.faqWrapper) {
      dom.faqWrapper.style.display = 'none';
    }
  }

  function renderFaq(items) {
    if (!dom.faqAccordionList) return;
    dom.faqAccordionList.innerHTML = '';

    items.forEach((item, index) => {
      const faqItem = document.createElement('div');
      faqItem.className = 'faq-item';

      faqItem.innerHTML = `
        <button class="faq-question-btn" type="button" aria-expanded="false" id="faq-btn-${index}" aria-controls="faq-ans-${index}">
          <span>${escapeHtml(item.q)}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>
        <div class="faq-answer" id="faq-ans-${index}" role="region" aria-labelledby="faq-btn-${index}">
          <p>${escapeHtml(item.a)}</p>
        </div>
      `;

      const btn = faqItem.querySelector('.faq-question-btn');
      btn.addEventListener('click', () => {
        const isActive = faqItem.classList.contains('active');
        // Close others for clean accordion feel
        dom.faqAccordionList.querySelectorAll('.faq-item').forEach((f) => {
          f.classList.remove('active');
          const b = f.querySelector('.faq-question-btn');
          if (b) b.setAttribute('aria-expanded', 'false');
        });

        if (!isActive) {
          faqItem.classList.add('active');
          btn.setAttribute('aria-expanded', 'true');
        }
      });

      dom.faqAccordionList.appendChild(faqItem);
    });
  }

  /* ------------------------------------------------------------------
     8. Animated Invitation Opening (Envelope & Wax Seal)
     ------------------------------------------------------------------ */
  function setupInvitationEnvelope() {
    const isAlreadyOpened = sessionStorage.getItem('wedding_invitation_opened') === 'true';

    if (isAlreadyOpened && dom.envelopeOverlay) {
      dom.envelopeOverlay.classList.add('hidden');
      state.invitationOpened = true;
      document.body.classList.remove('envelope-active');
      document.body.style.overflow = '';
    } else {
      document.body.classList.add('envelope-active');
      document.body.style.overflow = 'hidden';
      const scrollBar = document.getElementById('scroll-progress-bar');
      if (scrollBar) {
        scrollBar.style.opacity = '0';
        scrollBar.style.visibility = 'hidden';
      }
    }

    function triggerWaxSealSparkles() {
      const sealBtn = dom.waxSealBtn || dom.btnOpenEnvelope;
      if (!sealBtn) return;
      const rect = sealBtn.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const burst = document.createElement('div');
      burst.className = 'gold-sparkle-burst';
      document.body.appendChild(burst);

      const sparkleCount = 26;
      for (let i = 0; i < sparkleCount; i++) {
        const spark = document.createElement('span');
        spark.className = 'gold-sparkle';
        const angle = (Math.PI * 2 / sparkleCount) * i + (Math.random() - 0.5) * 0.35;
        const dist = Math.random() * 85 + 45;
        const tx = Math.cos(angle) * dist;
        const ty = Math.sin(angle) * dist;
        spark.style.setProperty('--tx', `${tx}px`);
        spark.style.setProperty('--ty', `${ty}px`);
        spark.style.left = `${centerX}px`;
        spark.style.top = `${centerY}px`;
        spark.style.animationDelay = `${Math.random() * 0.08}s`;
        burst.appendChild(spark);
      }

      setTimeout(() => {
        if (burst.parentNode) burst.remove();
      }, 950);
    }

    function openInvitation() {
      if (state.invitationOpened) return;
      state.invitationOpened = true;
      sessionStorage.setItem('wedding_invitation_opened', 'true');

      document.body.classList.remove('envelope-active');
      document.body.style.overflow = '';
      window.scrollTo({ top: 0, behavior: 'instant' });

      triggerWaxSealSparkles();

      if (dom.envelopeOverlay) {
        dom.envelopeOverlay.classList.add('envelope-opening');
        setTimeout(() => {
          dom.envelopeOverlay.classList.add('hidden');
        }, 800);
      }

      // Start music automatically upon explicit guest invitation open
      if (config.music?.enabled && !state.musicPlaying) {
        playMusic();
      }
    }

    function skipInvitation() {
      state.invitationOpened = true;
      sessionStorage.setItem('wedding_invitation_opened', 'true');
      document.body.classList.remove('envelope-active');
      document.body.style.overflow = '';
      window.scrollTo({ top: 0, behavior: 'instant' });

      if (dom.envelopeOverlay) {
        dom.envelopeOverlay.classList.add('hidden');
      }
    }

    if (dom.waxSealBtn) dom.waxSealBtn.addEventListener('click', openInvitation);
    if (dom.btnOpenEnvelope) dom.btnOpenEnvelope.addEventListener('click', openInvitation);
    if (dom.envelopeSkip) dom.envelopeSkip.addEventListener('click', skipInvitation);

    // Reopen envelope anytime from header
    if (dom.reopenEnvelopeBtn) {
      dom.reopenEnvelopeBtn.addEventListener('click', () => {
        if (dom.envelopeOverlay) {
          dom.envelopeOverlay.classList.remove('envelope-opening', 'hidden');
          state.invitationOpened = false;
          document.body.classList.add('envelope-active');
          document.body.style.overflow = 'hidden';
          const scrollBar = document.getElementById('scroll-progress-bar');
          if (scrollBar) {
            scrollBar.style.opacity = '0';
            scrollBar.style.visibility = 'hidden';
          }
        }
      });
    }
  }

  /* ------------------------------------------------------------------
     9. Timezone-Aware Live Countdown Timer
     ------------------------------------------------------------------ */
  function getTargetUtcTimestamp(dateStr, timeZone) {
    if (!dateStr) return null;
    try {
      const [datePart, timePart = '00:00:00'] = dateStr.split('T');
      const [year, month, day] = datePart.split('-').map(Number);
      const [hour, minute, second] = timePart.split(':').map(Number);

      const utcDate = new Date(Date.UTC(year, month - 1, day, hour, minute, second));
      const invDate = new Date(utcDate.toLocaleString('en-US', { timeZone: 'UTC' }));
      const tzDate = new Date(utcDate.toLocaleString('en-US', { timeZone: timeZone || 'UTC' }));
      const diff = invDate.getTime() - tzDate.getTime();

      return utcDate.getTime() + diff;
    } catch (e) {
      console.warn('Countdown date parse error:', e);
      return null;
    }
  }

  function setupCountdown() {
    if (!config.countdown?.enabled || !config.weddingDate) return;

    const targetTimestamp = getTargetUtcTimestamp(config.weddingDate, config.timezone);
    if (!targetTimestamp) {
      if (dom.countdownGrid) dom.countdownGrid.style.display = 'none';
      if (dom.countdownSubtitle) dom.countdownSubtitle.textContent = 'Date configuration pending.';
      return;
    }

    function updateTimer() {
      const now = Date.now();
      const distance = targetTimestamp - now;

      if (distance <= 0) {
        // Event has arrived or passed!
        if (dom.countdownGrid) dom.countdownGrid.style.display = 'none';
        if (dom.countdownCelebration) dom.countdownCelebration.classList.add('active');
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / (1000 * 60)) % 60);
      const seconds = Math.floor((distance / 1000) % 60);

      if (dom.countDays) dom.countDays.textContent = String(days).padStart(2, '0');
      if (dom.countHours) dom.countHours.textContent = String(hours).padStart(2, '0');
      if (dom.countMinutes) dom.countMinutes.textContent = String(minutes).padStart(2, '0');
      if (dom.countSeconds) dom.countSeconds.textContent = String(seconds).padStart(2, '0');
    }

    updateTimer();
    setInterval(updateTimer, 1000);
  }

  /* ------------------------------------------------------------------
     10. Floating Petals Canvas Animation
     ------------------------------------------------------------------ */
  function setupPetalsCanvas() {
    const canvas = dom.petalsCanvas;
    if (!canvas) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      canvas.style.display = 'none';
      return;
    }

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const petalCount = width < 768 ? 16 : 28;
    const emberCount = width < 768 ? 14 : 24;
    const petals = [];
    const embers = [];

    const colors = [
      'rgba(196, 161, 90, 0.45)', // Antique Gold (#C4A15A)
      'rgba(240, 229, 212, 0.55)', // Soft Champagne (#F0E5D4)
      'rgba(250, 244, 232, 0.65)', // Warm Ivory (#FAF4E8)
      'rgba(121, 46, 56, 0.35)',   // Deep Maroon accent (#792E38)
    ];

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 8 + 6,
        speedY: Math.random() * 0.8 + 0.4,
        speedX: Math.random() * 0.5 - 0.25,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        swing: Math.random() * Math.PI * 2,
        swingSpeed: Math.random() * 0.02 + 0.01,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    for (let j = 0; j < emberCount; j++) {
      embers.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 1.0,
        speedY: -(Math.random() * 0.45 + 0.22), // Softly rising like holy diya embers
        speedX: (Math.random() - 0.5) * 0.35,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.035 + 0.015,
        baseAlpha: Math.random() * 0.45 + 0.35,
      });
    }

    function renderPetals() {
      if (!state.isTabVisible) return;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw golden diya embers (rising warm light particles)
      for (let j = 0; j < embers.length; j++) {
        const e = embers[j];
        e.y += e.speedY;
        e.pulse += e.pulseSpeed;
        e.x += e.speedX + Math.sin(e.pulse) * 0.3;

        if (e.y < -15) {
          e.y = height + 15;
          e.x = Math.random() * width;
        }
        if (e.x > width + 15) e.x = -15;
        if (e.x < -15) e.x = width + 15;

        const alpha = Math.max(0.12, Math.min(0.9, e.baseAlpha + Math.sin(e.pulse) * 0.28));
        ctx.save();
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 244, 214, ${alpha})`;
        ctx.shadowColor = 'rgba(196, 161, 90, 0.85)';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      }

      // 2. Draw descending wedding flower petals
      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.y += p.speedY;
        p.swing += p.swingSpeed;
        p.x += Math.sin(p.swing) * 0.8 + p.speedX;
        p.rotation += p.rotSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        ctx.beginPath();
        ctx.fillStyle = p.color;
        // Organic curved petal shape
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(p.size * 0.6, -p.size * 0.8, p.size * 1.2, p.size * 0.4, 0, p.size);
        ctx.bezierCurveTo(-p.size * 1.2, p.size * 0.4, -p.size * 0.6, -p.size * 0.8, 0, 0);
        ctx.fill();

        ctx.restore();
      }

      state.petalsAnimId = requestAnimationFrame(renderPetals);
    }

    state.petalsAnimId = requestAnimationFrame(renderPetals);

    // Pause on hidden tab to save battery
    document.addEventListener('visibilitychange', () => {
      state.isTabVisible = !document.hidden;
      if (state.isTabVisible) {
        cancelAnimationFrame(state.petalsAnimId);
        state.petalsAnimId = requestAnimationFrame(renderPetals);
      }
    });
  }

  /* ------------------------------------------------------------------
     11. Audio System (Audio element + Web Audio Romantic Synth Fallback)
     ------------------------------------------------------------------ */
  function setupAudio() {
    if (!config.music?.enabled) {
      if (dom.musicToggle) dom.musicToggle.style.display = 'none';
      return;
    }

    const audio = dom.bgAudio;
    let usingWebAudioSynth = false;

    // Set audio sources
    if (audio && config.music.audioSrc) {
      audio.src = config.music.audioSrc;
      audio.loop = true;
    }

    window.playMusic = function () {
      if (!audio) return;
      audio
        .play()
        .then(() => {
          state.musicPlaying = true;
          updateMusicUi(true);
        })
        .catch((err) => {
          console.warn('Audio element play failed, trying fallback source:', err);
          if (config.music.fallbackAudioSrc && audio.src !== config.music.fallbackAudioSrc) {
            audio.src = config.music.fallbackAudioSrc;
            audio
              .play()
              .then(() => {
                state.musicPlaying = true;
                updateMusicUi(true);
              })
              .catch(() => startSynthFallback());
          } else {
            startSynthFallback();
          }
        });
    };

    window.pauseMusic = function () {
      if (audio && !audio.paused) {
        audio.pause();
      }
      stopSynthFallback();
      state.musicPlaying = false;
      updateMusicUi(false);
    };

    function startSynthFallback() {
      if (!config.music.enableWebAudioSynthFallback) return;
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;

        if (!state.audioContext) {
          state.audioContext = new AudioContext();
        }
        if (state.audioContext.state === 'suspended') {
          state.audioContext.resume();
        }

        usingWebAudioSynth = true;
        state.musicPlaying = true;
        updateMusicUi(true);

        // Romantic acoustic harp chords in D major (Dmaj7, Bm9, Gmaj7, A7)
        const progression = [
          [146.83, 293.66, 369.99, 440.0, 554.37], // Dmaj7
          [123.47, 246.94, 293.66, 369.99, 440.0], // Bm7
          [98.0, 196.0, 246.94, 293.66, 369.99], // Gmaj7
          [110.0, 220.0, 277.18, 329.63, 440.0], // A
        ];

        let chordIndex = 0;
        let noteIndex = 0;

        stopSynthFallback();

        state.synthInterval = setInterval(() => {
          if (!state.musicPlaying || !state.isTabVisible) return;
          const chord = progression[chordIndex];
          const freq = chord[noteIndex % chord.length];

          playSynthPluck(freq);

          noteIndex++;
          if (noteIndex >= chord.length * 2) {
            noteIndex = 0;
            chordIndex = (chordIndex + 1) % progression.length;
          }
        }, 380);
      } catch (e) {
        console.warn('Web Audio synth error:', e);
      }
    }

    function playSynthPluck(freq) {
      if (!state.audioContext) return;
      const ctx = state.audioContext;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.09, ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.6);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.8);
    }

    function stopSynthFallback() {
      if (state.synthInterval) {
        clearInterval(state.synthInterval);
        state.synthInterval = null;
      }
    }

    function updateMusicUi(isPlaying) {
      if (!dom.musicToggle) return;
      if (isPlaying) {
        dom.musicToggle.classList.add('playing');
        if (dom.musicStatusText) dom.musicStatusText.textContent = 'Music On';
        dom.musicToggle.setAttribute('aria-label', 'Pause background music');
      } else {
        dom.musicToggle.classList.remove('playing');
        if (dom.musicStatusText) dom.musicStatusText.textContent = 'Music';
        dom.musicToggle.setAttribute('aria-label', 'Play background music');
      }
    }

    if (dom.musicToggle) {
      dom.musicToggle.addEventListener('click', () => {
        if (state.musicPlaying) {
          window.pauseMusic();
        } else {
          window.playMusic();
        }
      });
    }

    // Pause audio when browser tab is inactive to respect user attention
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && state.musicPlaying) {
        if (audio && !audio.paused) audio.pause();
        stopSynthFallback();
      } else if (!document.hidden && state.musicPlaying) {
        if (usingWebAudioSynth) {
          startSynthFallback();
        } else if (audio) {
          audio.play().catch(() => {});
        }
      }
    });
  }

  /* ------------------------------------------------------------------
     12. Lightbox Modal Gallery
     ------------------------------------------------------------------ */
  function setupLightbox() {
    function openLightbox(index) {
      if (!state.galleryItems || !state.galleryItems.length) return;
      state.activeLightboxIndex = (index + state.galleryItems.length) % state.galleryItems.length;
      const item = state.galleryItems[state.activeLightboxIndex];

      if (dom.lightboxImg) {
        dom.lightboxImg.src = item.src;
        dom.lightboxImg.alt = item.alt || item.caption || '';
      }
      if (dom.lightboxCaption) {
        dom.lightboxCaption.textContent = item.caption || '';
      }
      if (dom.lightboxCounter) {
        dom.lightboxCounter.textContent = `${state.activeLightboxIndex + 1} of ${state.galleryItems.length}`;
      }

      if (dom.lightboxModal) {
        dom.lightboxModal.classList.add('active');
        dom.lightboxModal.setAttribute('aria-hidden', 'false');
      }
      document.body.style.overflow = 'hidden';
      if (dom.lightboxClose) dom.lightboxClose.focus();
    }

    function closeLightbox() {
      if (dom.lightboxModal) {
        dom.lightboxModal.classList.remove('active');
        dom.lightboxModal.setAttribute('aria-hidden', 'true');
      }
      document.body.style.overflow = '';
    }

    function prevLightbox() {
      openLightbox(state.activeLightboxIndex - 1);
    }

    function nextLightbox() {
      openLightbox(state.activeLightboxIndex + 1);
    }

    window.openLightbox = openLightbox;

    if (dom.lightboxClose) dom.lightboxClose.addEventListener('click', closeLightbox);
    if (dom.lightboxPrev) dom.lightboxPrev.addEventListener('click', prevLightbox);
    if (dom.lightboxNext) dom.lightboxNext.addEventListener('click', nextLightbox);

    // Close when clicking modal backdrop
    if (dom.lightboxModal) {
      dom.lightboxModal.addEventListener('click', (e) => {
        if (e.target === dom.lightboxModal) closeLightbox();
      });
    }

    // Keyboard navigation (Esc, Left, Right)
    window.addEventListener('keydown', (e) => {
      if (!dom.lightboxModal?.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
      if (e.key === 'ArrowRight') nextLightbox();
    });

    // Touch swipe gesture support for mobile devices
    let touchStartX = 0;
    let touchEndX = 0;

    if (dom.lightboxModal) {
      dom.lightboxModal.addEventListener(
        'touchstart',
        (e) => {
          touchStartX = e.changedTouches[0].screenX;
        },
        { passive: true }
      );

      dom.lightboxModal.addEventListener(
        'touchend',
        (e) => {
          touchEndX = e.changedTouches[0].screenX;
          const diff = touchEndX - touchStartX;
          if (Math.abs(diff) > 45) {
            if (diff > 0) prevLightbox();
            else nextLightbox();
          }
        },
        { passive: true }
      );
    }
  }

  /* ------------------------------------------------------------------
     13. Calendar (.ICS & Google Calendar) Generator
     ------------------------------------------------------------------ */
  function getGoogleCalendarUrl(event) {
    const couple = config.coupleTitle || 'Khiraj & Diksha';
    const title = encodeURIComponent(event.calendarTitle || `${couple} - ${event.name}`);
    const mapLink = event.mapUrl || (event.id === 'lagna-sohala' ? 'https://maps.app.goo.gl/WdgeZRBRgTag9Y8R6' : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.address || '')}`);
    const details = encodeURIComponent(
      `॥ श्री गणेशाय नमः ॥\n\n` +
      `Celebration: ${event.name}\n` +
      `Date & Time: ${event.date || config.displayDate} • ${event.time || config.displayTime}\n` +
      `Venue: ${event.venue || config.venue?.name}\n` +
      `Address: ${event.address || config.venue?.address}\n\n` +
      `Google Maps Navigation: ${mapLink}\n\n` +
      `${event.description || ''}`
    );
    const location = encodeURIComponent(`${event.venue || config.venue?.name}, ${event.address || config.venue?.address}`);

    let dtStart = '20261211T070000Z'; // Dec 11, 2026 12:30 PM IST (UTC 07:00)
    let dtEnd = '20261211T120000Z';   // Dec 11, 2026 5:30 PM IST (UTC 12:00)

    if (event.id === 'sangeet') {
      dtStart = '20261209T130000Z'; // Dec 9, 6:30 PM IST
      dtEnd = '20261209T170000Z';   // Dec 9, 10:30 PM IST
    } else if (event.id === 'haldi') {
      dtStart = '20261210T043000Z'; // Dec 10, 10:00 AM IST
      dtEnd = '20261210T073000Z';   // Dec 10, 1:00 PM IST
    } else if (event.id === 'lagna-sohala') {
      dtStart = '20261211T070000Z'; // Dec 11, 12:30 PM IST
      dtEnd = '20261211T120000Z';   // Dec 11, 5:30 PM IST
    }

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dtStart}/${dtEnd}&details=${details}&location=${location}`;
  }

  function downloadEventIcs(event) {
    const couple = config.coupleTitle || 'Khiraj & Diksha';
    const summary = event.calendarTitle || `${couple} - ${event.name}`;
    const mapLink = event.mapUrl || (event.id === 'lagna-sohala' ? 'https://maps.app.goo.gl/WdgeZRBRgTag9Y8R6' : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.address || '')}`);
    const description = `${event.name}\\nVenue: ${event.venue}\\nAddress: ${event.address}\\nMap: ${mapLink}\\n${event.description || ''}`;
    const location = `${event.venue}, ${event.address}`;

    let dtStart = '20261211T070000Z';
    let dtEnd = '20261211T120000Z';

    if (event.id === 'sangeet') {
      dtStart = '20261209T130000Z';
      dtEnd = '20261209T170000Z';
    } else if (event.id === 'haldi') {
      dtStart = '20261210T043000Z';
      dtEnd = '20261210T073000Z';
    } else if (event.id === 'lagna-sohala') {
      dtStart = '20261211T070000Z';
      dtEnd = '20261211T120000Z';
    }

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Khiraj and Diksha Wedding//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${Date.now()}-${Math.random().toString(36).substr(2, 9)}@wedding.com`,
      `SUMMARY:${summary}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      `DTSTART:${dtStart}`,
      `DTEND:${dtEnd}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `${summary.replace(/[^a-zA-Z0-9]/g, '_')}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Event added to your calendar download!');
  }

  function setupCalendarButtons() {
    if (dom.btnHeroSaveCal) {
      dom.btnHeroSaveCal.addEventListener('click', () => {
        downloadEventIcs({
          name: 'The Lagna Sohala (Wedding Ceremony)',
          calendarTitle: `${config.coupleTitle || 'Khiraj & Diksha'}'s Wedding Ceremony`,
          venue: config.venue?.name || 'New Charkha Ghar Hall / Charkha Gruha',
          address: config.venue?.address || 'Wardha - Sevagram Rd, MLK Colony, Warud, Wardha, Maharashtra 442102',
          description: '॥ श्री गणेशाय नमः ॥ Sacred Maharashtrian wedding ceremony of Khiraj & Diksha. Maps: https://maps.app.goo.gl/WdgeZRBRgTag9Y8R6',
        });
      });
    }

    if (dom.btnHeroGoogleCal) {
      dom.btnHeroGoogleCal.href = getGoogleCalendarUrl({
        name: 'The Lagna Sohala (Wedding Ceremony)',
        calendarTitle: `${config.coupleTitle || 'Khiraj & Diksha'}'s Wedding Ceremony (Lagna Sohala)`,
        venue: config.venue?.name || 'New Charkha Ghar Hall / Charkha Gruha',
        address: config.venue?.address || 'Wardha - Sevagram Rd, MLK Colony, Warud, Wardha, Maharashtra 442102',
        date: config.displayDate || 'Friday, December 11, 2026',
        time: config.displayTime || '12:30 PM IST',
        description: '॥ श्री गणेशाय नमः ॥ Sacred Maharashtrian wedding ceremony of Khiraj & Diksha. Maps: https://maps.app.goo.gl/WdgeZRBRgTag9Y8R6',
      });
    }
  }

  /* ------------------------------------------------------------------
     14. Venue Directions & Copy Address
     ------------------------------------------------------------------ */
  function setupVenueActions() {
    if (dom.btnCopyAddress) {
      dom.btnCopyAddress.addEventListener('click', () => {
        const address = config.venue?.address || (dom.venueAddressText ? dom.venueAddressText.textContent : '');
        if (navigator.clipboard && address) {
          navigator.clipboard
            .writeText(address)
            .then(() => {
              showToast('Venue address copied to clipboard!');
            })
            .catch(() => {
              fallbackCopy(address);
            });
        } else {
          fallbackCopy(address);
        }
      });
    }

    function fallbackCopy(text) {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        showToast('Venue address copied to clipboard!');
      } catch (err) {
        showToast('Address: ' + text);
      }
      document.body.removeChild(ta);
    }
  }

  /* ------------------------------------------------------------------
     15. RSVP Form Handler
     ------------------------------------------------------------------ */
  function setupRsvpForm() {
    if (!dom.rsvpForm) return;

    dom.rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const guestName = document.getElementById('rsvp-guest-name')?.value || 'Guest';
      const attendance = dom.rsvpForm.querySelector('input[name="attendance"]:checked')?.value;

      if (dom.rsvpToast) {
        dom.rsvpToast.classList.add('active');
        dom.rsvpToast.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      showToast(`Thank you, ${guestName}! Your RSVP is saved.`);

      // Optional: Prepare mailto backup link
      const email = config.rsvp?.contactEmail || 'rsvp@wedding.com';
      const subject = encodeURIComponent(`Wedding RSVP: ${guestName} (${attendance})`);
      const body = encodeURIComponent(
        `Guest Name: ${guestName}\nAttendance: ${attendance}\nDietary: ${document.getElementById('rsvp-dietary')?.value || 'None'}\nNotes: ${document.getElementById('rsvp-notes')?.value || 'None'}`
      );

      // Disable inputs to prevent double submit
      dom.rsvpForm.querySelectorAll('input, textarea, button').forEach((el) => {
        if (el.type !== 'submit') el.disabled = true;
      });
    });
  }

  /* ------------------------------------------------------------------
     16. Toast Notification Helper
     ------------------------------------------------------------------ */
  let toastTimeout = null;
  function showToast(message) {
    if (!dom.toastNotification) return;
    if (dom.toastMessage) dom.toastMessage.textContent = message;

    dom.toastNotification.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      dom.toastNotification.classList.remove('show');
    }, 3800);
  }

  /* ------------------------------------------------------------------
     17. Scroll-triggered Reveals & Header Behavior
     ------------------------------------------------------------------ */
  function setupScrollEffects() {
    const scrollBar = document.getElementById('scroll-progress-bar');
    if (scrollBar) {
      scrollBar.style.opacity = '0';
      scrollBar.style.visibility = 'hidden';
      scrollBar.style.width = '0%';
    }

    // Header scrolled state & sacred thread scroll progress
    window.addEventListener(
      'scroll',
      () => {
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (winScroll > 50) {
          dom.siteHeader?.classList.add('scrolled');
        } else {
          dom.siteHeader?.classList.remove('scrolled');
        }

        if (scrollBar) {
          const isEnvelopeActive = !state.invitationOpened || (dom.envelopeOverlay && !dom.envelopeOverlay.classList.contains('hidden'));
          // Only show scroll indicator if envelope is dismissed AND user has scrolled past front hero fold (> 60px)
          if (isEnvelopeActive || winScroll < 60) {
            scrollBar.style.opacity = '0';
            scrollBar.style.visibility = 'hidden';
          } else {
            scrollBar.style.opacity = '1';
            scrollBar.style.visibility = 'visible';
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
            scrollBar.style.width = `${scrolled}%`;
          }
        }
      },
      { passive: true }
    );

    // Back to top button
    if (dom.btnBackToTop) {
      dom.btnBackToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Mobile nav drawer
    if (dom.mobileMenuBtn && dom.mobileDrawer) {
      dom.mobileMenuBtn.addEventListener('click', () => {
        const isOpen = dom.mobileDrawer.classList.contains('open');
        if (isOpen) {
          dom.mobileDrawer.classList.remove('open');
          dom.mobileMenuBtn.setAttribute('aria-expanded', 'false');
        } else {
          dom.mobileDrawer.classList.add('open');
          dom.mobileMenuBtn.setAttribute('aria-expanded', 'true');
        }
      });

      // Close mobile drawer on link click
      dom.mobileDrawer.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          dom.mobileDrawer.classList.remove('open');
          dom.mobileMenuBtn?.setAttribute('aria-expanded', 'false');
        });
      });
    }

    // IntersectionObserver for reveal-on-scroll elements
    if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: '0px 0px -60px 0px', threshold: 0.1 }
      );

      document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
        revealObserver.observe(el);
      });
    } else {
      // Fallback for older browsers
      document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
        el.classList.add('revealed');
      });
    }

    // Active link highlighting on scroll
    const sections = document.querySelectorAll('section[id]');
    if ('IntersectionObserver' in window && sections.length) {
      const navObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = entry.target.getAttribute('id');
              dom.navLinks.forEach((link) => {
                if (link.getAttribute('href') === `#${id}`) {
                  link.classList.add('active');
                } else {
                  link.classList.remove('active');
                }
              });
            }
          });
        },
        { rootMargin: '-20% 0px -70% 0px' }
      );

      sections.forEach((s) => navObserver.observe(s));
    }
  }

  /* ------------------------------------------------------------------
     18. Helper Utilities
     ------------------------------------------------------------------ */
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /* ------------------------------------------------------------------
     19. Main Initialization
     ------------------------------------------------------------------ */
  function init() {
    populateContent();
    setupInvitationEnvelope();
    setupCountdown();
    setupPetalsCanvas();
    setupAudio();
    setupLightbox();
    setupCalendarButtons();
    setupVenueActions();
    setupRsvpForm();
    setupScrollEffects();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
