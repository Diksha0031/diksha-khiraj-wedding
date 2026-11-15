/**
 * ====================================================================
 * WEDDING INVITATION CONFIGURATION — KHIRAJ & DIKSHA
 * ====================================================================
 * A centralized configuration file for Khiraj & Diksha's Maharashtrian
 * royal wedding celebration in Wardha, Maharashtra.
 */

window.WEDDING_CONFIG = {
  // ------------------------------------------------------------------
  // 1. Couple Details
  // ------------------------------------------------------------------
  partner1: {
    firstName: "Diksha",
    lastName: "",
    fullName: "Diksha",
    role: "Bride (Navari)",
  },
  partner2: {
    firstName: "Khiraj",
    lastName: "",
    fullName: "Khiraj",
    role: "Groom (Navra)",
  },
  coupleTitle: "Diksha & Khiraj",
  monogram: "K & D", // Displayed on the wax seal, crest, and navigation
  auspiciousHeader: "॥ श्री गणेशाय नमः ॥",
  marathiTagline: "दोन मने, दोन जीवांची अतूट गाठ... एक सुंदर प्रवास!",

  // ------------------------------------------------------------------
  // 2. Wedding Date, Time & Timezone
  // ------------------------------------------------------------------
  // Format: "YYYY-MM-DDTHH:MM:SS" (24-hour time)
  weddingDate: "2026-12-11T12:30:00",
  // Standard IANA Timezone for India
  timezone: "Asia/Kolkata",
  displayDate: "Friday, December 11, 2026",
  displayDay: "Friday",
  displayTime: "12:30 PM IST (शुभ मुहूर्त)",
  locationCity: "Wardha, Maharashtra",

  // ------------------------------------------------------------------
  // 3. Invitation Opening & Hero Screen
  // ------------------------------------------------------------------
  invitation: {
    auspiciousHeader: "॥ श्री गणेशाय नमः ॥",
    envelopeMessage: "Together with our families",
    subMessage: "Request the pleasure of your auspicious blessings and presence at our wedding celebration",
    buttonText: "Open Invitation",
    skipText: "Skip to Details",
  },

  hero: {
    auspiciousHeader: "॥ श्री गणेशाय नमः ॥",
    tagline: "शुभविवाह • Sacred Wedding Celebration",
    subtitle: "Together with our families, we invite you to celebrate the sacred Maharashtrian wedding union of Khiraj and Diksha",
    backgroundImage: "", // Removed image: pure royal wedding card aesthetic
    scrollHint: "Scroll to explore our celebrations",
  },

  // ------------------------------------------------------------------
  // 4. Background Music
  // ------------------------------------------------------------------
  music: {
    enabled: true,
    audioSrc: "./assets/audio/romantic-melody.m4a",
    fallbackAudioSrc: "./assets/audio/romantic-melody.wav",
    enableWebAudioSynthFallback: true,
    title: "Auspicious Shehnai & Harp Melody",
  },

  // ------------------------------------------------------------------
  // 5. Our Story Milestones
  // ------------------------------------------------------------------
  story: {
    enabled: false,
    sectionTitle: "Our Journey",
    sectionSubtitle: "",
    milestones: [],
  },

  // ------------------------------------------------------------------
  // 6. Live Countdown
  // ------------------------------------------------------------------
  countdown: {
    enabled: true,
    title: "Countdown to शुभ मुहूर्त",
    subtitle: "Counting down every second until the sacred Antarpat drops and the Mangalashtaka begins",
    completedMessage: "✨ शुभविवाह! Today is Our Forever! ✨",
  },

  // ------------------------------------------------------------------
  // 7. Wedding Events Schedule (Sangeet 9 Dec • Haldi 10 Dec • Wedding 11 Dec)
  // ------------------------------------------------------------------
  events: [
    {
      id: "sangeet",
      name: "Sangeet Sandhya (संगीत संध्या)",
      type: "Music, Dance & Celebration",
      date: "Wednesday, December 9, 2026",
      time: "6:30 PM – 10:30 PM IST",
      venue: "Havre Layout",
      address: "Havre layout sevagram Wardha",
      dressCode: "Festive Glamour / Traditional Elegance",
      description: "An evening of joyful music, dance performances, celebratory beats, and cherished pre-wedding memories with family and friends.",
      image: "./assets/images/event-sangeet.jpg",
      calendarTitle: "Khiraj & Diksha's Sangeet Sandhya",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Havre+layout+sevagram+Wardha",
    },
    {
      id: "haldi",
      name: "Halad Sohala (हळद सोहळा)",
      type: "Auspicious Turmeric Ceremony",
      date: "Thursday, December 10, 2026",
      time: "10:00 AM – 1:00 PM IST",
      venue: "Havre Layout",
      address: "Havre layout sevagram Wardha",
      dressCode: "Auspicious Haldi Yellows & Festive Traditional",
      description: "A joyful Maharashtrian tradition of applying sacred halad, surrounded by family blessings, vibrant marigolds, traditional Marathi folk songs, and laughter — celebrating love and new beginnings.",
      image: "./assets/images/event-haldi.jpg",
      calendarTitle: "Khiraj & Diksha's Halad Ceremony",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Havre+layout+sevagram+Wardha",
    },
    {
      id: "lagna-sohala",
      name: "The Lagna Sohala (शुभविवाह)",
      type: "Main Wedding Ceremony (शुभ मुहूर्त)",
      date: "Friday, December 11, 2026",
      time: "12:30 PM IST (शुभ मुहूर्त)",
      venue: "New Charkha Ghar Hall / Charkha Gruha",
      address: "Wardha - Sevagram Rd, MLK Colony, Warud, Wardha, Maharashtra 442102",
      dressCode: "Traditional Nauvari Paithani / Kurta Dhoti & Puneri Pheta",
      description: "The sacred wedding rituals — Antarpat, Mangalashtaka, Kanyadaan, and Saptapadi, as two souls come together in a beautiful bond of love and togetherness.",
      image: "./assets/images/event-ceremony.jpg",
      calendarTitle: "Khiraj & Diksha's Wedding Ceremony (Lagna Sohala)",
      mapUrl: "https://maps.app.goo.gl/WdgeZRBRgTag9Y8R6",
    },
  ],

  // ------------------------------------------------------------------
  // 8. Venue & Google Maps Navigation
  // ------------------------------------------------------------------
  venue: {
    enabled: true,
    title: "The Venue & Location",
    name: "New Charkha Ghar Hall / Charkha Gruha",
    subtitle: "A welcoming venue of celebration on Wardha - Sevagram Road",
    address: "Wardha - Sevagram Rd, MLK Colony, Warud, Wardha, Maharashtra 442102",
    image: "./assets/images/venue-charkha-ghar.jpg",
    description: "Centrally located in Wardha on the Sevagram Road, New Charkha Ghar Hall offers beautiful indoor banquet halls, dining arrangements, and ample parking for all our guests.",
    mapUrl: "https://maps.app.goo.gl/WdgeZRBRgTag9Y8R6",
    mapQuery: "New Charkha Ghar Hall, Wardha - Sevagram Rd, MLK Colony, Warud, Wardha, Maharashtra 442102",
    parkingInfo: "Ample guest parking is available within the hall premises.",
    shuttleInfo: "Auto-rickshaws and cabs are readily available from Wardha Railway Station (approx. 10 minutes drive).",
  },

  // ------------------------------------------------------------------
  // 9. Photo Gallery
  // ------------------------------------------------------------------
  gallery: {
    enabled: true,
    title: "Captured Moments",
    subtitle: "A glimpse into our cherished pre-wedding memories and journey of love",
    items: [
      {
        src: "./assets/images/gallery-1.jpg",
        alt: "Khiraj and Diksha in royal traditional attire under ancient stone chhatri",
        caption: "वारसा आणि प्रेम • Heritage, grace, and timeless love",
        category: "Portraits",
      },
      {
        src: "./assets/images/gallery-2.jpg",
        alt: "Khiraj looking adoringly at Diksha on temple steps",
        caption: "तुझ्या डोळ्यांतील हास्य • Adoring smiles by ancient shrines",
        category: "Moments",
      },
      {
        src: "./assets/images/gallery-3.jpg",
        alt: "Boat ride across the lake with forehead kiss",
        caption: "शांत पाण्यात प्रेमाचा प्रवास • A gentle journey towards forever",
        category: "Romance",
      },
      {
        src: "./assets/images/gallery-4.jpg",
        alt: "Warm embrace on the stone ghats overlooking the lake",
        caption: "घाटावरील सुखद क्षण • Golden memories along the water",
        category: "Romance",
      },
      {
        src: "./assets/images/gallery-5.jpg",
        alt: "Khiraj and Diksha sharing pure laughter in nature",
        caption: "आनंदाचे क्षण • Pure joy, laughter, and togetherness",
        category: "Celebration",
      },
    ],
  },

  // ------------------------------------------------------------------
  // 10. Additional Guest Details (Maharashtrian Attire & Palette)
  // ------------------------------------------------------------------
  details: {
    enabled: false,
    title: "Guest Information",
    subtitle: "Everything you need to know to celebrate seamlessly with us",

    dressCode: {
      enabled: true,
      title: "Attire & Dress Code",
      summary: "Traditional Indian & Maharashtrian Festive Wear is warmly encouraged.",
      notes: "Ladies are warmly welcomed to wear traditional Paithani or silk sarees, Nauvari, or elegant festive lehengas. Gentlemen are encouraged to wear Kurta-Pajama with Nehru jacket, Bandhgala, or Kurta-Dhoti.",
      paletteColors: [
        { name: "Deep Maroon", hex: "#792E38" },
        { name: "Antique Gold", hex: "#C4A15A" },
        { name: "Soft Champagne", hex: "#F0E5D4" },
        { name: "Warm Ivory", hex: "#FAF4E8" },
        { name: "Muted Gold", hex: "#D8C49A" },
      ],
    },

    accommodations: {
      enabled: true,
      title: "Where to Stay",
      notes: "For out-of-town guests arriving in Wardha, comfortable accommodations and guest assistance are arranged nearby:",
      hotels: [
        {
          name: "Hotel Centre Point / Nearby Accommodations",
          distance: "Approx. 2.5 km from New Charkha Ghar Hall",
          code: "KHIRAJDIKSHA",
          link: "https://maps.app.goo.gl/WdgeZRBRgTag9Y8R6",
        },
        {
          name: "Sevagram Tourist & Guest Lodging",
          distance: "Approx. 4 km from venue",
          code: "KHIRAJDIKSHA",
          link: "https://maps.app.goo.gl/WdgeZRBRgTag9Y8R6",
        },
      ],
    },

    travel: {
      enabled: true,
      title: "Travel & Transit to Wardha",
      airports: [
        {
          name: "Dr. Babasaheb Ambedkar International Airport (Nagpur - NAG)",
          distance: "Approx. 75 km (1 hr 20 min via Nagpur-Wardha Highway)",
        },
        {
          name: "Wardha Junction Railway Station (WR)",
          distance: "Approx. 3.5 km (10-12 min drive)",
        },
        {
          name: "Sewagram Railway Station (SEGM)",
          distance: "Approx. 4.8 km (12-15 min drive)",
        },
      ],
    },

    registry: {
      enabled: true,
      title: "Blessings & Wishes",
      message: "Your heartfelt presence, love, and sacred blessings (*आशीर्वाद*) are the greatest gifts we could ever receive as we begin our new life together.",
      linkText: "Send Your Blessings",
      url: "#rsvp",
    },

    faq: {
      enabled: true,
      title: "Frequently Asked Questions",
      items: [
        {
          q: "What is the exact Subha Muhurat for the Lagna Sohala?",
          a: "The sacred Muhurat is on Friday, December 11, 2026, at 12:30 PM IST. We request our guests to arrive by 12:00 PM so they can participate in the Seeman Pooja and Antarpat ceremony.",
        },
        {
          q: "How do I reach New Charkha Ghar Hall?",
          a: "The venue is conveniently located on Wardha - Sevagram Road in MLK Colony, Warud, Wardha. You can click the 'Get Directions in Google Maps' button on this page for live GPS turn-by-turn navigation.",
        },
        {
          q: "Is parking available at the venue?",
          a: "Yes, dedicated parking is available for both two-wheelers and four-wheelers within the hall grounds.",
        },
        {
          q: "What will the weather in Wardha be like in December?",
          a: "December in Wardha is delightfully pleasant with warm sunny afternoons (around 26°C / 78°F) and cool crisp evenings (around 14°C / 57°F). A light shawl or jacket is recommended for the evening reception.",
        },
      ],
    },
  },

  // ------------------------------------------------------------------
  // 11. RSVP & Contact Section
  // ------------------------------------------------------------------
  rsvp: {
    enabled: false,
    title: "RSVP & Blessings",
    subtitle: "Kindly grace our celebration with your presence and blessings",
    deadline: "November 25, 2026",
    contactEmail: "khiraj.diksha.wedding@gmail.com",
    contactPhone: "+91 98765 43210",
  },

  // ------------------------------------------------------------------
  // 12. Closing Section
  // ------------------------------------------------------------------
  closing: {
    quote: "दोन मने, दोन जीवांची अतूट गाठ... एक सुंदर प्रवास!",
    quoteAuthor: "॥ शुभविवाह ॥",
    message: "We warmly invite you and your family to join us, bless our union, and be an indispensable part of our happiest memories.",
    signature: "With deep love, gratitude & respect,",
    couple: "Khiraj & Diksha",
  },
};
