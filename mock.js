/* Quest mock data.
   Field names mirror the DB schema in the spec so the backend maps 1:1 later.
   Money is integer cents. Times are ISO with +04:00 (Asia/Dubai). */

window.QUEST = {
  categories: [
    { slug: 'all',       label: 'All' },
    { slug: 'workshops', label: 'Workshops' },
    { slug: 'art',       label: 'Art & Design' },
    { slug: 'food',      label: 'Food' },
    { slug: 'wellness',  label: 'Wellness' },
    { slug: 'tech',      label: 'Tech' },
    { slug: 'music',     label: 'Music' }
  ],

  brands: [
    { id: 'b1', name: 'Alserkal Avenue',  initials: 'AA', is_verified: true },
    { id: 'b2', name: 'Cinema Akil',      initials: 'CA', is_verified: true },
    { id: 'b3', name: 'Nightjar Coffee',  initials: 'NJ', is_verified: false },
    { id: 'b4', name: 'Studio Quoz',      initials: 'SQ', is_verified: true }
  ],

  events: [
    {
      id: 'e1', brand_id: 'b4', title: 'Sonic Geometry Workshop',
      category: 'workshops', tags: ['Sound', 'Hands-on'],
      start_at: '2026-08-04T18:00:00+04:00', duration_min: 90,
      location_name: 'Dubai Design District', capacity: 24, booked_count: 24,
      price_cents: 15000, currency: 'AED',
      cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=70',
      status: 'live', is_live_now: false
    },
    {
      id: 'e2', brand_id: 'b1', title: 'Vinyasa Flow in Alserkal',
      category: 'wellness', tags: ['Morning'],
      start_at: '2026-08-04T07:00:00+04:00', duration_min: 60,
      location_name: 'Alserkal Avenue', capacity: 30, booked_count: 12,
      price_cents: 0, currency: 'AED',
      cover: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=70',
      status: 'live', is_live_now: false
    },
    {
      id: 'e3', brand_id: 'b3', title: 'Solana Coffee Meetup',
      category: 'tech', tags: ['Community'],
      start_at: '2026-07-31T12:00:00+04:00', duration_min: 120,
      location_name: 'Nightjar, Alquoz', capacity: 60, booked_count: 41,
      price_cents: 0, currency: 'AED',
      cover: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=70',
      status: 'live', is_live_now: true
    },
    {
      id: 'e4', brand_id: 'b2', title: 'Retro-Future Film Lab',
      category: 'art', tags: ['Screening', 'Limited'],
      start_at: '2026-08-05T19:00:00+04:00', duration_min: 150,
      location_name: 'Cinema Akil, Alserkal', capacity: 40, booked_count: 36,
      price_cents: 9000, currency: 'AED',
      cover: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=70',
      status: 'live', is_live_now: false
    },
    {
      id: 'e5', brand_id: 'b1', title: 'Midnight Architecture Tour',
      category: 'art', tags: ['Walk'],
      start_at: '2026-08-05T23:00:00+04:00', duration_min: 100,
      location_name: 'DIFC Main Gate', capacity: 20, booked_count: 8,
      price_cents: 12000, currency: 'AED',
      cover: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=70',
      status: 'live', is_live_now: false
    },
    {
      id: 'e6', brand_id: 'b4', title: 'Wheel-Throwing for Beginners',
      category: 'workshops', tags: ['Ceramics', 'Hands-on'],
      start_at: '2026-08-06T17:30:00+04:00', duration_min: 180,
      location_name: 'Studio Quoz, Al Quoz 1', capacity: 12, booked_count: 5,
      price_cents: 28000, currency: 'AED',
      cover: 'https://images.unsplash.com/photo-1565193298357-c5b46b0d6b1f?w=800&q=70',
      status: 'live', is_live_now: false
    }
  ]
};

/* --- formatting helpers shared by every screen ---------------- */
window.QFmt = {
  money(cents, currency) {
    if (cents === 0) return 'Free';
    return `${currency} ${(cents / 100).toFixed(0)}`;
  },
  time(iso) {
    return new Date(iso).toLocaleTimeString('en-GB', {
      hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Dubai'
    });
  },
  dayParts(iso) {
    const d = new Date(iso);
    const opt = { timeZone: 'Asia/Dubai' };
    return {
      num: d.toLocaleDateString('en-GB', { ...opt, day: 'numeric' }),
      mon: d.toLocaleDateString('en-GB', { ...opt, month: 'short' }),
      day: d.toLocaleDateString('en-GB', { ...opt, weekday: 'short' }),
      key: d.toLocaleDateString('en-CA', opt)
    };
  },
  seatsLeft(e) { return e.capacity - e.booked_count; },
  state(e) {
    if (this.seatsLeft(e) <= 0) return 'soldout';
    if (this.seatsLeft(e) <= 5) return 'limited';
    return 'open';
  }
};

/* --- social layer -------------------------------------------
   booked_count already exists; these are the display bits the
   card needs. Backend maps to a /attendees?limit=3 preview call. */
window.QUEST.social = {
  e1: { faces: ['MK', 'RA', 'JD'], friends: 2 },
  e2: { faces: ['SN', 'TL'],       friends: 0 },
  e3: { faces: ['AB', 'YZ', 'PK'], friends: 4 },
  e4: { faces: ['LM', 'DR', 'HS'], friends: 1 },
  e5: { faces: ['CE'],             friends: 0 },
  e6: { faces: ['NV', 'OI'],       friends: 3 }
};
