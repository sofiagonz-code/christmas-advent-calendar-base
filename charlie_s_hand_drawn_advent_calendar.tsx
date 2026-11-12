import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Volume2, VolumeX, Snowflake, Unlock, Lock, 
  Edit3, Check, ExternalLink, Play, Pause, Gift, Heart, 
  MapPin, Music, Camera, Ticket, X, Copy, RotateCcw, ChevronLeft
} from 'lucide-react';

// ============================================================================
// 🎄 EASY CUSTOMIZATION: 25 DAYS OF SURPRISES (ADVENT_DATA)
// ============================================================================
// Swap out photo URLs, change the text written on the inside of the left & right
// shutters, or paste links to his T-shirt store and Spotify songs right here!
// Window styles: 'arched' | 'flowerbox' | 'curtains' | 'ribbon'
// Content types: 'photo' | 'voucher' | 'note'

const INITIAL_ADVENT_DATA = [
  {
    day: 1,
    windowStyle: 'ribbon',
    type: 'photo',
    title: 'Welcome to December, Pablo! ♥',
    leftShutterText: 'Day 1 of 25! Happy December my love...',
    rightShutterText: 'I made this little house just for you ✨',
    imageUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80',
    caption: 'Us being our happiest selves ♥',
    note: 'Every morning until Christmas, you get to open one window in our little house. Some have favorite memories, some have Valencia dates, and some have real presents! Love you endlessly.'
  },
  {
    day: 2,
    windowStyle: 'arched',
    type: 'voucher',
    title: 'Cozy Merienda in Valencia ☕🍰',
    leftShutterText: 'Craving something sweet with you...',
    rightShutterText: 'Giant cakes + specialty coffee date!',
    voucherCode: 'VALENCIA-MERIENDA-02',
    location: 'Dulce de Leche Boutique (Ruzafa) or La Más Bonita',
    note: 'Good for 1 afternoon merienda date! You pick the cake & coffee spot in Valencia and it is 100% on me.',
    buttonText: 'See the Menu & Pick a Spot',
    linkUrl: 'https://www.instagram.com/dulcedelecheboutique/'
  },
  {
    day: 3,
    windowStyle: 'flowerbox',
    type: 'note',
    subType: 'song',
    title: 'A Song That Reminds Me of You 💿',
    leftShutterText: 'Put your headphones on for a sec...',
    rightShutterText: 'This always makes me think of us 🎶',
    songTitle: 'Our Little Roadtrip Anthem',
    artist: 'Pinned to our favorite memory',
    audioDuration: '0:28 Voice Note & Song',
    note: 'Every single time this melody starts playing, I immediately teleport back to us laughing in the car. Press play for a cozy holiday synth tune, or open our playlist below!',
    buttonText: 'Listen on Spotify',
    linkUrl: 'https://open.spotify.com'
  },
  {
    day: 4,
    windowStyle: 'curtains',
    type: 'photo',
    title: 'One of My Favorite Smiles 📸',
    leftShutterText: 'Remember this exact afternoon?',
    rightShutterText: 'Can we repeat this trip soon pls?',
    imageUrl: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80',
    caption: 'Golden hour magic with my favorite person',
    note: 'I still look at this photo whenever I miss you during the week. Thank you for always making the simplest days feel like an adventure.'
  },
  {
    day: 5,
    windowStyle: 'arched',
    type: 'voucher',
    title: 'Afternoon of Baking Cookies Together 🍪',
    leftShutterText: 'Aprons on, Christmas playlist loud!',
    rightShutterText: 'Warning: I will eat half the cookie dough',
    voucherCode: 'COOKIE-CHEF-2026',
    location: 'Our Kitchen (Warm Oven & Melted Chocolate)',
    note: 'Redeemable for one cozy winter afternoon baking warm chocolate chip & cinnamon cookies together, followed by hot cocoa on the couch.',
    buttonText: 'Claim Baking Date',
    linkUrl: '#claim'
  },
  {
    day: 6,
    windowStyle: 'ribbon',
    type: 'note',
    subType: 'voice',
    title: 'Little Morning Love Note 💌',
    leftShutterText: 'Happy Día de la Constitución!',
    rightShutterText: 'Read this with your morning coffee ☕',
    songTitle: 'Voice Memo #1: Why I adore you',
    artist: 'Recorded by Sofi ♥',
    audioDuration: '0:22 Audio Note',
    note: '"Good morning handsome! Just wanted to remind you how proud I am of the person you are and how lucky I feel to wake up knowing you are mine."',
    buttonText: 'Send Me a Kiss on WhatsApp',
    linkUrl: 'https://wa.me/'
  },
  {
    day: 7,
    windowStyle: 'flowerbox',
    type: 'photo',
    title: 'When We Couldn’t Stop Laughing 😂',
    leftShutterText: 'Still laughing about this moment...',
    rightShutterText: 'Nobody gets my humor like you do!',
    imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
    caption: 'Pure chaos & the best memories',
    note: 'Honestly, my stomach hurt from laughing so hard this day. Life is 1000x funnier with you by my side.'
  },
  {
    day: 8,
    windowStyle: 'curtains',
    type: 'voucher',
    title: 'PRESENT #1: 1 T-Shirt of Your Choice! 👕✨',
    leftShutterText: 'SURPRISE PRESENT TIME!! 🎁',
    rightShutterText: 'Pick your favorite & I am ordering it!',
    voucherCode: 'NEW-TEE-FOR-Pablo',
    location: 'Your Favorite Streetwear / Clothing Brand',
    note: 'I know you have been eyeing a new shirt lately! Click below to browse the store, pick the exact one & size you want, and your personal Santa will order it right now.',
    buttonText: 'Go Pick Your T-Shirt 🛍️',
    linkUrl: 'https://www.zara.com/es/'
  },
  {
    day: 9,
    windowStyle: 'arched',
    type: 'photo',
    title: 'Sunset Walks With You 🌅',
    leftShutterText: 'My favorite hand to hold...',
    rightShutterText: 'Everywhere feels like home with you.',
    imageUrl: 'https://images.unsplash.com/photo-1494774157365-9e04c6720e47?auto=format&fit=crop&w=800&q=80',
    caption: 'Chasing sunsets together',
    note: 'Whether we are walking around Valencia or traveling somewhere new, holding your hand is my favorite place to be.'
  },
  {
    day: 10,
    windowStyle: 'flowerbox',
    type: 'voucher',
    title: 'Movie Marathon Night (Zero Vetoes!) 🍿🎬',
    leftShutterText: 'Yes, you get 100% control of the TV...',
    rightShutterText: 'I promise not to fall asleep in 15 mins!',
    voucherCode: 'CINEMA-BOSS-10',
    location: 'Cozy Sofa + Blankets + Popcorn',
    note: 'Good for one full movie marathon night where YOU pick the movies (zero vetoes allowed!) and I bring all your favorite snacks.',
    buttonText: 'Redeem Movie Night',
    linkUrl: '#claim'
  },
  {
    day: 11,
    windowStyle: 'ribbon',
    type: 'note',
    subType: 'song',
    title: 'Cozy Winter Evening Track ❄️🎹',
    leftShutterText: 'Halfway to Christmas Eve!',
    rightShutterText: 'Slow dance in the living room?',
    songTitle: 'Winter Lights & Warm Hugs',
    artist: 'Pablo & Sofi Mixtape',
    audioDuration: '3:14 Track',
    note: 'Put this on tonight when you get home and let’s have a quiet, cozy evening together.',
    buttonText: 'Open Track on Spotify',
    linkUrl: 'https://open.spotify.com'
  },
  {
    day: 12,
    windowStyle: 'curtains',
    type: 'photo',
    title: 'Foodie Partners in Crime 🍝🍷',
    leftShutterText: 'We never say no to good food...',
    rightShutterText: 'Wait until you see Day 14’s window 👀',
    imageUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80',
    caption: 'Always rating every dish 10/10 together',
    note: 'One of my favorite things about us is how excited we get about trying new restaurants together.'
  },
  {
    day: 13,
    windowStyle: 'arched',
    type: 'voucher',
    title: 'Churros con Chocolate in Valencia ☕🍫',
    leftShutterText: 'Cold December afternoon cure...',
    rightShutterText: 'Thick hot chocolate + fresh churros!',
    voucherCode: 'SANTA-CATALINA-13',
    location: 'Horchatería Santa Catalina or Daniel (Valencia)',
    note: 'Valid for a classic winter merienda in the center of Valencia after walking under the Christmas lights!',
    buttonText: 'View Location on Maps',
    linkUrl: 'https://maps.google.com/?q=Horchateria+Santa+Catalina+Valencia'
  },
  {
    day: 14,
    windowStyle: 'ribbon',
    type: 'voucher',
    title: 'Extravagant Dinner Date in Valencia ✨🍷',
    leftShutterText: 'Put on your favorite outfit...',
    rightShutterText: 'We are going somewhere unforgettable!',
    voucherCode: 'VIP-DINNER-VLC',
    location: 'Voltereta / Karak / Lienzo (Valencia)',
    note: 'Good for 1 extravagant, super special dinner out in Valencia! Pick which vibe you want—dramatic gastronomy at Karak or traveling to another world at Voltereta—my treat!',
    buttonText: 'Explore Restaurant & Book',
    linkUrl: 'https://www.volteretarestaurante.com/'
  },
  {
    day: 15,
    windowStyle: 'flowerbox',
    type: 'photo',
    title: '10 Days Until Christmas! 🎄',
    leftShutterText: 'Look how cute we are here...',
    rightShutterText: 'My favorite person in every season ♥',
    imageUrl: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80',
    caption: 'Warm hugs on chilly days',
    note: 'Ten days left until Christmas! Thank you for being my calm, my best friend, and my biggest supporter.'
  },
  {
    day: 16,
    windowStyle: 'curtains',
    type: 'note',
    subType: 'voice',
    title: '3 Things I Adore About You ✨',
    leftShutterText: 'A little mid-week boost for you...',
    rightShutterText: 'Never forget how special you are!',
    songTitle: 'Voice Note #2: My favorite things',
    artist: 'Recorded with love',
    audioDuration: '0:35 Voice Memo',
    note: '1. How hard you work for the things you care about.\n2. The way your eyes crinkle when you genuinely laugh.\n3. How safe and loved I feel every time you hug me.',
    buttonText: 'Tap to Claim a Hug Today',
    linkUrl: '#claim'
  },
  {
    day: 17,
    windowStyle: 'arched',
    type: 'photo',
    title: 'Summer Throwback in December ☀️🌊',
    leftShutterText: 'Missing warm beach days with you...',
    rightShutterText: 'Next summer is going to be even better!',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    caption: 'Salty hair, sun & you',
    note: 'A little vitamin sea in the middle of December to remind you of all the summer adventures waiting for us next year.'
  },
  {
    day: 18,
    windowStyle: 'flowerbox',
    type: 'voucher',
    title: 'Homemade Breakfast in Bed 🥞🍓',
    leftShutterText: 'Stay under the warm covers...',
    rightShutterText: 'Room service by chef Sofi!',
    voucherCode: 'PANCAKE-MORNING-18',
    location: 'Served Fresh in Bed',
    note: 'Redeemable any weekend morning! Fresh coffee, pancakes or toast just the way you like it, delivered straight to bed.',
    buttonText: 'Schedule Breakfast Service',
    linkUrl: '#claim'
  },
  {
    day: 19,
    windowStyle: 'ribbon',
    type: 'photo',
    title: 'Late Night Adventures 🌙✨',
    leftShutterText: 'Time always flies when I am with you...',
    rightShutterText: 'Here is to a million more nights like this.',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    caption: 'City lights & late night talks',
    note: 'I love how we can talk for four hours straight and it still feels like five minutes.'
  },
  {
    day: 20,
    windowStyle: 'curtains',
    type: 'voucher',
    title: '30-Minute Back & Shoulder Massage 💆‍♂️🕯️',
    leftShutterText: 'Time to unwind and relax...',
    rightShutterText: 'Zero stress allowed tonight!',
    voucherCode: 'RELAX-SPA-20',
    location: 'Cozy Home Spa Session',
    note: 'Good for one uninterrupted 30-minute back and shoulder massage after a long day. Candles & relaxing music included!',
    buttonText: 'Redeem Tonight',
    linkUrl: '#claim'
  },
  {
    day: 21,
    windowStyle: 'arched',
    type: 'note',
    subType: 'song',
    title: 'First Day of Winter Playlist ❄️🎶',
    leftShutterText: 'Officially winter solstice today!',
    rightShutterText: '4 days left until Christmas!!',
    songTitle: 'December Nights With Pablo',
    artist: 'Curated for you',
    audioDuration: 'Playlist • 18 Songs',
    note: 'Made a collection of songs that feel like warm sweaters, fairy lights, and driving home for Christmas together.',
    buttonText: 'Open Winter Playlist',
    linkUrl: 'https://open.spotify.com'
  },
  {
    day: 22,
    windowStyle: 'flowerbox',
    type: 'photo',
    title: 'Silly Faces & Inside Jokes 🤪♥',
    leftShutterText: 'The photo that never makes Instagram...',
    rightShutterText: 'But is secretly my favorite one!',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    caption: 'Never a dull moment with you',
    note: 'Thank you for letting me be 100% my weird, unfiltered self around you every single day.'
  },
  {
    day: 23,
    windowStyle: 'curtains',
    type: 'voucher',
    title: 'Sunset Drinks & Tapas in El Carmen 🥂✨',
    leftShutterText: 'Christmas Eve-Eve celebration!',
    rightShutterText: 'Cheers to our best year yet 🥂',
    voucherCode: 'BRINDIS-VLC-23',
    location: 'El Carmen / Ruzafa, Valencia',
    note: 'Let’s go out for festive drinks and tapas tonight to toast to an amazing year together before the Christmas madness begins!',
    buttonText: 'Claim Our Holiday Toast',
    linkUrl: '#claim'
  },
  {
    day: 24,
    windowStyle: 'arched',
    type: 'photo',
    title: 'Nochebuena / Christmas Eve Magic 🌟🎄',
    leftShutterText: 'Tomorrow is the big day...',
    rightShutterText: 'Check back tomorrow morning for a real gift!',
    imageUrl: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=800&q=80',
    caption: 'Merry Christmas Eve, my love ♥',
    note: 'Having you in my life is already the best gift I could ever ask for. Have the coziest Nochebuena tonight, and get ready to open Window #25 tomorrow!'
  },
  {
    day: 25,
    windowStyle: 'ribbon',
    type: 'note',
    subType: 'secret',
    title: '🎄 MERRY CHRISTMAS! Top Secret In-Person Gift 🎁',
    leftShutterText: 'MERRY CHRISTMAS Pablo!! ♥♥♥',
    rightShutterText: 'Your real-life present is waiting...',
    songTitle: 'TOP SECRET CLUE ENVELOPE',
    artist: 'For Pablo’s Eyes Only',
    audioDuration: 'Real-Life Surprise',
    note: 'SURPRISE!! Besides everything in this calendar, I have a real physical present waiting for you in person! Clue: Give me a kiss right now, say the secret password "ROOFTOP BOW", and look inside my bag / under the tree! 🎁❤️',
    buttonText: 'Unlock Secret Confetti Celebration 🎉',
    linkUrl: '#confetti'
  }
];

// ============================================================================
// 🎵 WEB AUDIO SYNTHESIZER (Zero External Audio Dependencies)
// ============================================================================
class CozyAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlayingMusic = false;
    this.musicInterval = null;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Gentle wooden shutter creak / paper pop when opening doors or windows
  playShutterOpen(enabled = true) {
    if (!enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Soft warm chime + wood thud
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(392, now + 0.18);
      osc.frequency.exponentialRampToValueAtTime(523.25, now + 0.35);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.45);
    } catch (e) {
      // Ignore audio errors if blocked by browser autoplay policy
    }
  }

  // Cute locked shake sound
  playLocked(enabled = true) {
    if (!enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.setValueAtTime(185, now + 0.08);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    } catch (e) {}
  }

  // Music box melody loop
  toggleMusicBox(forceState) {
    this.init();
    if (!this.ctx) return false;

    const nextState = forceState !== undefined ? forceState : !this.isPlayingMusic;
    this.isPlayingMusic = nextState;

    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }

    if (this.isPlayingMusic) {
      // Cozy celesta / music-box notes (Pentatonic holiday lullaby)
      const melody = [
        659.25, 587.33, 523.25, 587.33, 659.25, 783.99, 659.25, 523.25,
        587.33, 659.25, 783.99, 880.00, 783.99, 659.25, 587.33, 523.25
      ];
      let step = 0;

      const playNote = () => {
        if (!this.isPlayingMusic || !this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        const freq = melody[step % melody.length];
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.05, now + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0008, now + 1.1);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 1.15);
        step++;
      };

      playNote();
      this.musicInterval = setInterval(playNote, 650);
    }
    return this.isPlayingMusic;
  }
}

const audioEngine = new CozyAudioEngine();

// ============================================================================
// 🎨 MAIN APPLICATION COMPONENT
// ============================================================================
export default function App() {
  // Recipient Name (Editable)
  const [recipientName, setRecipientName] = useState('Pablo');
  const [giftTagText, setGiftTagText] = useState('To: My Favorite Person ♥');

  // Navigation State: 'cover' (Wrapped Gift House) | 'interior' (25 Windows)
  const [screen, setScreen] = useState('cover');
  const [doorsOpening, setDoorsOpening] = useState(false);

  // Advent Data State (persisted in localStorage so edits stay saved)
  const [adventData, setAdventData] = useState(() => {
    try {
      const saved = localStorage.getItem('Pablo_advent_data_v1');
      return saved ? JSON.parse(saved) : INITIAL_ADVENT_DATA;
    } catch {
      return INITIAL_ADVENT_DATA;
    }
  });

  // Track which windows have been opened & which vouchers have been redeemed
  const [openedDays, setOpenedDays] = useState(() => {
    try {
      const saved = localStorage.getItem('Pablo_opened_days_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [redeemedVouchers, setRedeemedVouchers] = useState(() => {
    try {
      const saved = localStorage.getItem('Pablo_redeemed_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Controls & Toggles
  // Default Preview Mode ON so the creator can immediately test all 25 windows!
  const [previewAllUnlocked, setPreviewAllUnlocked] = useState(true);
  const [snowEnabled, setSnowEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [musicPlaying, setMusicPlaying] = useState(false);

  // Active Window Modal State
  const [selectedDayObj, setSelectedDayObj] = useState(null);
  const [shuttersOpen, setShuttersOpen] = useState(false);
  const [lockedTooltipDay, setLockedTooltipDay] = useState(null);
  const [shakingDay, setShakingDay] = useState(null);

  // Customize / Edit Drawer State
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [editingDayNum, setEditingDayNum] = useState(1);
  const [copiedJsonSuccess, setCopiedJsonSuccess] = useState(false);

  // Confetti burst state for special moments
  const [showConfetti, setShowConfetti] = useState(false);

  // Save state changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('Pablo_advent_data_v1', JSON.stringify(adventData));
    } catch {}
  }, [adventData]);

  useEffect(() => {
    try {
      localStorage.setItem('Pablo_opened_days_v1', JSON.stringify(openedDays));
    } catch {}
  }, [openedDays]);

  useEffect(() => {
    try {
      localStorage.setItem('Pablo_redeemed_v1', JSON.stringify(redeemedVouchers));
    } catch {}
  }, [redeemedVouchers]);

  // Check if a specific day (1..25) is unlocked based on real calendar date or Preview Mode
  const isDayUnlocked = (dayNumber) => {
    if (previewAllUnlocked) return true;
    const now = new Date();
    const month = now.getMonth(); // 11 = December
    const date = now.getDate();
    // Unlock if we are in December and date >= dayNumber (or after December)
    if (month === 11 && date >= dayNumber) return true;
    return false;
  };

  // Handle opening the front double doors of the cover house
  const handleOpenFrontDoors = () => {
    if (doorsOpening) return;
    audioEngine.playShutterOpen(soundEnabled);
    setDoorsOpening(true);
    setTimeout(() => {
      setScreen('interior');
      setDoorsOpening(false);
    }, 1050);
  };

  // Handle clicking one of the 25 windows
  const handleWindowClick = (dayItem) => {
    if (isDayUnlocked(dayItem.day)) {
      audioEngine.playShutterOpen(soundEnabled);
      setSelectedDayObj(dayItem);
      setShuttersOpen(false);
      // Automatically swing shutters open after a brief zoom-in pause, or let user click
      setTimeout(() => {
        setShuttersOpen(true);
        audioEngine.playShutterOpen(soundEnabled);
      }, 450);

      if (!openedDays.includes(dayItem.day)) {
        setOpenedDays((prev) => [...prev, dayItem.day]);
      }
    } else {
      // Locked window: shake & show cute tooltip
      audioEngine.playLocked(soundEnabled);
      setShakingDay(dayItem.day);
      setLockedTooltipDay(dayItem.day);
      setTimeout(() => setShakingDay(null), 600);
      setTimeout(() => {
        setLockedTooltipDay((prev) => (prev === dayItem.day ? null : prev));
      }, 2400);
    }
  };

  // Toggle background music box
  const handleToggleMusic = () => {
    const playing = audioEngine.toggleMusicBox();
    setMusicPlaying(playing);
  };

  // Toggle voucher redemption stamp
  const handleRedeemVoucher = (dayNum, linkUrl) => {
    audioEngine.playShutterOpen(soundEnabled);
    if (!redeemedVouchers.includes(dayNum)) {
      setRedeemedVouchers((prev) => [...prev, dayNum]);
    }
    if (linkUrl === '#confetti') {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    } else if (linkUrl && linkUrl !== '#claim') {
      window.open(linkUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // Update a day's fields from the Customize Drawer
  const handleUpdateDayField = (dayNum, field, value) => {
    setAdventData((prev) =>
      prev.map((item) => (item.day === dayNum ? { ...item, [field]: value } : item))
    );
    if (selectedDayObj && selectedDayObj.day === dayNum) {
      setSelectedDayObj((prev) => ({ ...prev, [field]: value }));
    }
  };

  // Reset customizations back to default
  const handleResetToDefaults = () => {
    setAdventData(INITIAL_ADVENT_DATA);
    setOpenedDays([]);
    setRedeemedVouchers([]);
    localStorage.removeItem('Pablo_advent_data_v1');
    localStorage.removeItem('Pablo_opened_days_v1');
    localStorage.removeItem('Pablo_redeemed_v1');
  };

  // Copy updated JSON config to clipboard
  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(adventData, null, 2));
    setCopiedJsonSuccess(true);
    setTimeout(() => setCopiedJsonSuccess(false), 2500);
  };

  // Generate snowflakes once
  const snowflakes = useMemo(() => {
    return Array.from({ length: 32 }).map((_, i) => ({
      id: i,
      left: `${(i * 3.1 + (i % 7) * 2) % 100}%`,
      size: 6 + (i % 5) * 3,
      duration: 9 + (i % 7) * 2,
      delay: (i % 6) * 1.3
    }));
  }, []);

  return (
    <div
      className="min-h-screen w-full relative overflow-x-hidden select-none pb-20"
      style={{
        backgroundColor: '#F9F7F2',
        color: '#C85A48',
        fontFamily: "'Patrick Hand', cursive"
      }}
    >
      {/* Load Hand-Drawn Google Fonts & Custom Crayon Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&family=Patrick+Hand&display=swap');

        .font-caveat {
          font-family: 'Caveat', cursive;
        }
        .font-patrick {
          font-family: 'Patrick Hand', cursive;
        }

        /* Subtle warm paper grain texture */
        .paper-texture {
          background-color: #F9F7F2;
          background-image: 
            radial-gradient(#C85A48 0.45px, transparent 0.45px), 
            radial-gradient(#D98A7C 0.45px, #F9F7F2 0.45px);
          background-size: 28px 28px;
          background-position: 0 0, 14px 14px;
        }

        /* Sketchy hand-drawn border utility */
        .crayon-border {
          border: 2.5px solid #C85A48;
          border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
          box-shadow: 2px 3px 0px rgba(200, 90, 72, 0.18);
        }

        .crayon-border-dashed {
          border: 2.5px dashed #C85A48;
          border-radius: 14px 220px 14px 220px/220px 14px 220px 14px;
        }

        .crayon-filter {
          filter: url(#crayon-stroke);
        }

        /* 3D Door & Shutter Perspective Utilities */
        .perspective-container {
          perspective: 1400px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }

        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) rotate(-1deg); }
          50% { transform: translateY(-5px) rotate(1.5deg); }
        }
        .animate-float-slow {
          animation: floatSlow 4s ease-in-out infinite;
        }

        @keyframes bulbGlow {
          0%, 100% { opacity: 0.55; transform: scale(0.96); }
          50% { opacity: 1; transform: scale(1.08); }
        }
        .bulb-glow {
          animation: bulbGlow 2.4s ease-in-out infinite;
        }

        @keyframes snowfall {
          0% { transform: translateY(-20px) translateX(0px) rotate(0deg); opacity: 0; }
          15% { opacity: 0.75; }
          85% { opacity: 0.75; }
          100% { transform: translateY(100vh) translateX(25px) rotate(360deg); opacity: 0; }
        }
        .snowflake-item {
          position: fixed;
          top: -20px;
          pointer-events: none;
          z-index: 25;
          animation: snowfall linear infinite;
        }
      `}</style>

      {/* SVG Filters for Authentic Hand-Drawn Crayon / Pencil Wobble */}
      <svg className="hidden" aria-hidden="true">
        <defs>
          <filter id="crayon-stroke" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.2" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          {/* Subtle Diagonal Hatch Pattern for Crayon Shading */}
          <pattern id="crayon-hatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="8" stroke="#C85A48" strokeWidth="1.2" strokeOpacity="0.22" />
          </pattern>
          <pattern id="crayon-dots" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="1.2" fill="#C85A48" fillOpacity="0.22" />
          </pattern>
        </defs>
      </svg>

      {/* Subtle Paper Grain Overlay */}
      <div className="fixed inset-0 paper-texture opacity-35 pointer-events-none z-0" />

      {/* Falling Snow Particles (Toggleable) */}
      {snowEnabled && (
        <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
          {snowflakes.map((flake) => (
            <div
              key={flake.id}
              className="snowflake-item text-[#C85A48]"
              style={{
                left: flake.left,
                animationDuration: `${flake.duration}s`,
                animationDelay: `${flake.delay}s`
              }}
            >
              <svg width={flake.size * 2} height={flake.size * 2} viewBox="0 0 24 24" fill="none" stroke="#C85A48" strokeWidth="2" strokeLinecap="round">
                <line x1="12" y1="2" x2="12" y2="22" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </svg>
            </div>
          ))}
        </div>
      )}

      {/* Confetti Celebration Overlay */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
          >
            {Array.from({ length: 28 }).map((_, idx) => (
              <motion.div
                key={idx}
                initial={{ x: 0, y: 0, scale: 0 }}
                animate={{
                  x: (Math.random() - 0.5) * 550,
                  y: (Math.random() - 0.5) * 550,
                  scale: [0, 1.3, 1],
                  rotate: Math.random() * 360
                }}
                transition={{ duration: 1.8, ease: 'easeOut' }}
                className="absolute text-3xl"
              >
                {idx % 3 === 0 ? '❤️' : idx % 3 === 1 ? '🎄' : '✨'}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hand-Drawn String Lights Hanging from Top Corners */}
      <StringLightsHeader />

      {/* ==================================================================== */}
      {/* TOP FLOATING CONTROLS BAR */}
      {/* ==================================================================== */}
      <header className="relative z-30 max-w-4xl mx-auto pt-4 px-3 sm:px-6 flex flex-wrap items-center justify-between gap-2">
        {/* Left: Back to Cover / Progress Badge */}
        <div className="flex items-center gap-2">
          {screen === 'interior' && (
            <button
              onClick={() => {
                audioEngine.playShutterOpen(soundEnabled);
                setScreen('cover');
              }}
              className="crayon-border bg-[#F9F7F2] hover:bg-[#C85A48] hover:text-[#F9F7F2] px-3 py-1.5 text-sm sm:text-base flex items-center gap-1 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Wrap House</span>
            </button>
          )}
          <div className="crayon-border bg-[#F9F7F2]/90 px-3 py-1 text-sm sm:text-base flex items-center gap-1.5">
            <Heart className="w-4 h-4 fill-[#C85A48] text-[#C85A48]" />
            <span>
              {openedDays.length}/25 Opened
            </span>
          </div>
        </div>

        {/* Right: Preview Mode Toggle, Customize Drawer, Music & Snow */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Preview / Unlock All Toggle */}
          <button
            onClick={() => {
              audioEngine.playShutterOpen(soundEnabled);
              setPreviewAllUnlocked((prev) => !prev);
            }}
            title="Toggle between testing all 25 windows now vs strict Dec 1–25 daily unlock"
            className={`crayon-border px-3 py-1.5 text-sm sm:text-base flex items-center gap-1.5 transition-all cursor-pointer ${
              previewAllUnlocked
                ? 'bg-[#C85A48] text-[#F9F7F2]'
                : 'bg-[#F9F7F2] text-[#C85A48]'
            }`}
          >
            {previewAllUnlocked ? (
              <>
                <Unlock className="w-4 h-4" />
                <span>Preview Mode: All Open</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>Strict Dec 1–25 Lock</span>
              </>
            )}
          </button>

          {/* Customize Surprises Button */}
          <button
            onClick={() => setIsCustomizeOpen(true)}
            className="crayon-border bg-[#F9F7F2] hover:bg-[#C85A48]/10 px-3 py-1.5 text-sm sm:text-base flex items-center gap-1.5 cursor-pointer"
          >
            <Edit3 className="w-4 h-4" />
            <span className="hidden sm:inline">Customize 25 Days</span>
            <span className="sm:hidden">Edit</span>
          </button>

          {/* Music Box Toggle */}
          <button
            onClick={handleToggleMusic}
            title="Toggle Cozy Music Box Melody"
            className={`crayon-border p-2 transition-colors cursor-pointer ${
              musicPlaying ? 'bg-[#C85A48] text-[#F9F7F2]' : 'bg-[#F9F7F2] text-[#C85A48]'
            }`}
          >
            <Music className="w-4 h-4" />
          </button>

          {/* Sound Effects Toggle */}
          <button
            onClick={() => setSoundEnabled((prev) => !prev)}
            title="Toggle Shutter Sound Effects"
            className={`crayon-border p-2 transition-colors cursor-pointer ${
              soundEnabled ? 'bg-[#F9F7F2] text-[#C85A48]' : 'bg-[#F9F7F2]/50 text-[#C85A48]/50'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Snow Toggle */}
          <button
            onClick={() => setSnowEnabled((prev) => !prev)}
            title="Toggle Falling Snow"
            className={`crayon-border p-2 transition-colors cursor-pointer ${
              snowEnabled ? 'bg-[#C85A48] text-[#F9F7F2]' : 'bg-[#F9F7F2] text-[#C85A48]'
            }`}
          >
            <Snowflake className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT AREA: SCREEN 1 (COVER) OR SCREEN 2 (25 WINDOWS) */}
      {/* ==================================================================== */}
      <main className="relative z-10 max-w-3xl mx-auto px-3 sm:px-6 pt-4 sm:pt-6">
        <AnimatePresence mode="wait">
          {screen === 'cover' ? (
            <motion.div
              key="cover-screen"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.5 }}
            >
              <CoverHouseView
                recipientName={recipientName}
                giftTagText={giftTagText}
                doorsOpening={doorsOpening}
                onOpenDoors={handleOpenFrontDoors}
              />
            </motion.div>
          ) : (
            <motion.div
              key="interior-screen"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.55 }}
            >
              <InteriorWindowsGrid
                recipientName={recipientName}
                adventData={adventData}
                openedDays={openedDays}
                redeemedVouchers={redeemedVouchers}
                isDayUnlocked={isDayUnlocked}
                shakingDay={shakingDay}
                lockedTooltipDay={lockedTooltipDay}
                onWindowClick={handleWindowClick}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ==================================================================== */}
      {/* SCREEN 3: THE SURPRISE MODAL (3D DOUBLE SHUTTERS + CONTENT) */}
      {/* ==================================================================== */}
      <AnimatePresence>
        {selectedDayObj && (
          <WindowSurpriseModal
            dayObj={selectedDayObj}
            shuttersOpen={shuttersOpen}
            setShuttersOpen={(val) => {
              audioEngine.playShutterOpen(soundEnabled);
              setShuttersOpen(val);
            }}
            isRedeemed={redeemedVouchers.includes(selectedDayObj.day)}
            onRedeem={handleRedeemVoucher}
            onClose={() => setSelectedDayObj(null)}
            soundEnabled={soundEnabled}
          />
        )}
      </AnimatePresence>

      {/* ==================================================================== */}
      {/* CUSTOMIZE / EDIT SURPRISES DRAWER */}
      {/* ==================================================================== */}
      <AnimatePresence>
        {isCustomizeOpen && (
          <CustomizeDrawer
            recipientName={recipientName}
            setRecipientName={setRecipientName}
            giftTagText={giftTagText}
            setGiftTagText={setGiftTagText}
            adventData={adventData}
            editingDayNum={editingDayNum}
            setEditingDayNum={setEditingDayNum}
            onUpdateField={handleUpdateDayField}
            onReset={handleResetToDefaults}
            onCopyJson={handleCopyJson}
            copiedJsonSuccess={copiedJsonSuccess}
            onClose={() => setIsCustomizeOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================================
// ✨ ATMOSPHERIC COMPONENT: HAND-DRAWN FAIRY STRING LIGHTS & STARS
// ============================================================================
function StringLightsHeader() {
  return (
    <div className="w-full pointer-events-none overflow-hidden relative z-10">
      <svg
        viewBox="0 0 1200 135"
        className="w-full h-20 sm:h-28 crayon-filter"
        fill="none"
        preserveAspectRatio="none"
      >
        {/* Left & Right draped wires */}
        <path
          d="M-20,10 Q180,115 390,25 Q600,95 810,25 Q1020,115 1220,10"
          stroke="#C85A48"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Hanging glowing bulbs */}
        {[90, 210, 320, 460, 600, 740, 880, 990, 1110].map((xPos, idx) => {
          const yValues = [52, 68, 46, 56, 65, 56, 46, 68, 52];
          const yPos = yValues[idx];
          return (
            <g key={idx} transform={`translate(${xPos}, ${yPos})`}>
              <line x1="0" y1="-8" x2="0" y2="2" stroke="#C85A48" strokeWidth="2.5" />
              {/* Warm outer aura */}
              <circle
                cx="0"
                cy="12"
                r="14"
                fill="#F5B041"
                fillOpacity="0.22"
                className="bulb-glow"
                style={{ animationDelay: `${idx * 0.3}s` }}
              />
              {/* Hand-drawn bulb */}
              <path
                d="M-6,4 C-9,11 -5,20 0,20 C5,20 9,11 6,4 Z"
                fill="#FFF8E7"
                stroke="#C85A48"
                strokeWidth="2.2"
              />
              {/* Little sparkle rays */}
              <line x1="-11" y1="12" x2="-15" y2="12" stroke="#C85A48" strokeWidth="1.5" />
              <line x1="11" y1="12" x2="15" y2="12" stroke="#C85A48" strokeWidth="1.5" />
              <line x1="0" y1="24" x2="0" y2="28" stroke="#C85A48" strokeWidth="1.5" />
            </g>
          );
        })}

        {/* Faint sketchy background stars */}
        {[
          { x: 140, y: 105 },
          { x: 520, y: 22 },
          { x: 680, y: 25 },
          { x: 1050, y: 105 }
        ].map((st, i) => (
          <path
            key={i}
            d={`M${st.x},${st.y - 7} L${st.x + 2},${st.y - 2} L${st.x + 7},${st.y} L${st.x + 2},${st.y + 2} L${st.x},${st.y + 7} L${st.x - 2},${st.y + 2} L${st.x - 7},${st.y} L${st.x - 2},${st.y - 2} Z`}
            stroke="#C85A48"
            strokeWidth="1.4"
            fill="none"
            opacity="0.45"
          />
        ))}
      </svg>
    </div>
  );
}

// ============================================================================
// 🏠 SCREEN 1: THE WRAPPED GIFT HOUSE (COVER VIEW)
// ============================================================================
function CoverHouseView({ recipientName, giftTagText, doorsOpening, onOpenDoors }) {
  return (
    <div className="flex flex-col items-center justify-center py-2">
      {/* Top Instruction Prompt */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-3 text-center"
      >
        <span className="inline-block crayon-border bg-[#F9F7F2] px-4 py-1 text-lg sm:text-xl tracking-wide">
          ✨ Tap the front doors to unwrap your Advent Calendar ✨
        </span>
      </motion.div>

      {/* The Tall Whimsical Gift House Container */}
      <div className="relative w-full max-w-[460px] mx-auto pt-14 sm:pt-16 px-4">
        
        {/* 🎀 GIANT RED CRAYON RIBBOW BOW TIED AT THE ROOF PEAK */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-30 w-64 sm:w-72 pointer-events-none">
          <svg viewBox="0 0 300 130" className="w-full h-auto crayon-filter overflow-visible">
            {/* Left Ribbon Loop */}
            <path
              d="M150,65 C105,10 25,20 35,68 C45,105 115,85 150,65 Z"
              fill="#C85A48"
              fillOpacity="0.88"
              stroke="#A33B2B"
              strokeWidth="3"
            />
            <path
              d="M140,62 C105,28 55,35 58,65"
              stroke="#F9F7F2"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            {/* Right Ribbon Loop */}
            <path
              d="M150,65 C195,10 275,20 265,68 C255,105 185,85 150,65 Z"
              fill="#C85A48"
              fillOpacity="0.88"
              stroke="#A33B2B"
              strokeWidth="3"
            />
            <path
              d="M160,62 C195,28 245,35 242,65"
              stroke="#F9F7F2"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            {/* Ribbon Tails Cascading Down Roof */}
            <path
              d="M142,72 C115,105 85,125 60,138 L85,142 C110,122 132,100 148,75 Z"
              fill="#C85A48"
              stroke="#A33B2B"
              strokeWidth="2.5"
            />
            <path
              d="M158,72 C185,105 215,125 240,138 L215,142 C190,122 168,100 152,75 Z"
              fill="#C85A48"
              stroke="#A33B2B"
              strokeWidth="2.5"
            />
            {/* Center Ribbon Knot */}
            <ellipse
              cx="150"
              cy="66"
              rx="18"
              ry="15"
              fill="#B54434"
              stroke="#8E2F21"
              strokeWidth="3"
            />
            <path d="M143,58 Q150,66 145,74" stroke="#F9F7F2" strokeWidth="1.8" fill="none" />
          </svg>
        </div>

        {/* 🏷️ SWINGING HANGING GIFT TAG ON THE RIGHT ROOF EAVE */}
        <motion.div
          animate={{ rotate: [-4, 4, -4] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: 'top center' }}
          className="absolute top-28 -right-1 sm:-right-6 z-30"
        >
          {/* String */}
          <div className="w-0.5 h-8 bg-[#C85A48] mx-auto" />
          {/* Tag Body */}
          <div className="crayon-border bg-[#F9F7F2] px-3 py-2 shadow-md max-w-[135px] text-center -rotate-6">
            <div className="w-2.5 h-2.5 rounded-full border-2 border-[#C85A48] mx-auto mb-1 bg-[#F9F7F2]" />
            <p className="font-caveat text-lg leading-tight font-bold text-[#C85A48]">
              {giftTagText}
            </p>
            <p className="text-xs opacity-75 mt-0.5">25 Days of Love</p>
          </div>
        </motion.div>

        {/* 🔺 THE STEEP HAND-DRAWN TRIANGULAR ROOF GABLE WITH HIS NAME */}
        <div className="relative z-20 w-full">
          <svg viewBox="0 0 400 220" className="w-full h-auto block crayon-filter">
            {/* Roof Gable Triangle */}
            <polygon
              points="200,12 14,215 386,215"
              fill="#F9F7F2"
              stroke="#C85A48"
              strokeWidth="4.5"
              strokeLinejoin="round"
            />
            {/* Inner Scalloped / Sketchy Roof Trim */}
            <polygon
              points="200,26 30,206 370,206"
              fill="url(#crayon-hatch)"
              stroke="#C85A48"
              strokeWidth="2"
              strokeDasharray="6 4"
            />
            {/* Decorative Attic Wreath & Star */}
            <circle cx="200" cy="82" r="22" fill="#F9F7F2" stroke="#C85A48" strokeWidth="3" />
            <circle
              cx="200"
              cy="82"
              r="16"
              fill="none"
              stroke="#C85A48"
              strokeWidth="2.5"
              strokeDasharray="4 3"
            />
            <path d="M193,60 Q200,68 207,60" stroke="#C85A48" strokeWidth="3" fill="none" />
            {/* Horizontal Decorative Gable Banner for Name */}
            <rect
              x="68"
              y="128"
              width="264"
              height="62"
              rx="8"
              fill="#F9F7F2"
              stroke="#C85A48"
              strokeWidth="3.2"
            />
            {/* Corner holly berries on banner */}
            <circle cx="82" cy="140" r="3.5" fill="#C85A48" />
            <circle cx="318" cy="140" r="3.5" fill="#C85A48" />
            <circle cx="82" cy="178" r="3.5" fill="#C85A48" />
            <circle cx="318" cy="178" r="3.5" fill="#C85A48" />
          </svg>

          {/* His Name Hand-Lettered Across the Roof Gable */}
          <div className="absolute inset-x-0 bottom-5 sm:bottom-6 flex flex-col items-center justify-center pointer-events-none">
            <span className="font-caveat text-4xl sm:text-5xl font-bold tracking-wide text-[#C85A48] drop-shadow-xs">
              {recipientName}
            </span>
          </div>
        </div>

        {/* 🚪 THE GRAND DOUBLE DOORS OF THE HOUSE (3D Hinge Swing) */}
        <div
          onClick={onOpenDoors}
          className="relative z-20 mx-auto w-[92%] bg-[#F9F7F2] border-x-4 border-b-4 border-[#C85A48] shadow-xl cursor-pointer perspective-container overflow-visible"
          style={{
            height: '410px',
            borderRadius: '0 0 12px 12px'
          }}
        >
          {/* Warm glowing interior preview revealed behind the swinging doors */}
          <div className="absolute inset-0 bg-[#FFF5E4] flex flex-col items-center justify-center p-6 text-center">
            <Sparkles className="w-12 h-12 text-[#C85A48] animate-spin mb-3" />
            <p className="font-caveat text-3xl font-bold text-[#C85A48]">
              Welcome Home, {recipientName}!
            </p>
            <p className="text-base opacity-80 mt-1">
              25 cozy surprises waiting inside...
            </p>
          </div>

          {/* Left & Right Double Front Doors */}
          <div className="relative w-full h-full flex preserve-3d">
            {/* LEFT FRONT DOOR */}
            <motion.div
              animate={{ rotateY: doorsOpening ? -130 : 0 }}
              whileHover={!doorsOpening ? { rotateY: -12 } : {}}
              transition={{ type: 'spring', stiffness: 55, damping: 14 }}
              style={{ transformOrigin: 'left center' }}
              className="w-1/2 h-full bg-[#F9F7F2] border-r-2 border-[#C85A48] p-3 sm:p-4 flex flex-col justify-between relative shadow-md"
            >
              {/* Vertical Ribbon Strip Wrapping the Door */}
              <div
                className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-5 border-x-2 border-[#C85A48] pointer-events-none"
                style={{ backgroundImage: 'url(#crayon-hatch)' }}
              />

              {/* Upper Door Panel with Wreath Sketch */}
              <div className="crayon-border w-full h-[44%] bg-[#F9F7F2] flex flex-col items-center justify-center p-2 relative z-10">
                <svg viewBox="0 0 80 80" className="w-14 h-14">
                  <circle
                    cx="40"
                    cy="40"
                    r="24"
                    fill="none"
                    stroke="#C85A48"
                    strokeWidth="3.5"
                    strokeDasharray="6 4"
                  />
                  <path d="M32,16 L40,26 L48,16" stroke="#C85A48" strokeWidth="2.5" fill="none" />
                  <circle cx="40" cy="18" r="3.5" fill="#C85A48" />
                </svg>
                <span className="font-caveat text-base opacity-85">Dec 1</span>
              </div>

              {/* Lower Door Molding Panel */}
              <div className="crayon-border w-full h-[42%] bg-[#F9F7F2] flex items-center justify-center relative z-10">
                <div className="w-4/5 h-4/5 border border-dashed border-[#C85A48] flex items-center justify-center">
                  <Heart className="w-5 h-5 text-[#C85A48] opacity-60" />
                </div>
              </div>

              {/* Tiny Left Brass/Terracotta Doorknob & Keyhole */}
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-1">
                <div className="w-4 h-4 rounded-full bg-[#C85A48] border-2 border-[#8E2F21] shadow-xs" />
                <div className="w-1.5 h-3 rounded-full bg-[#C85A48]/70" />
              </div>
            </motion.div>

            {/* RIGHT FRONT DOOR */}
            <motion.div
              animate={{ rotateY: doorsOpening ? 130 : 0 }}
              whileHover={!doorsOpening ? { rotateY: 12 } : {}}
              transition={{ type: 'spring', stiffness: 55, damping: 14 }}
              style={{ transformOrigin: 'right center' }}
              className="w-1/2 h-full bg-[#F9F7F2] border-l-2 border-[#C85A48] p-3 sm:p-4 flex flex-col justify-between relative shadow-md"
            >
              {/* Vertical Ribbon Strip */}
              <div
                className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-5 border-x-2 border-[#C85A48] pointer-events-none"
                style={{ backgroundImage: 'url(#crayon-hatch)' }}
              />

              {/* Upper Door Panel with Wreath Sketch */}
              <div className="crayon-border w-full h-[44%] bg-[#F9F7F2] flex flex-col items-center justify-center p-2 relative z-10">
                <svg viewBox="0 0 80 80" className="w-14 h-14">
                  <circle
                    cx="40"
                    cy="40"
                    r="24"
                    fill="none"
                    stroke="#C85A48"
                    strokeWidth="3.5"
                    strokeDasharray="6 4"
                  />
                  <path d="M32,16 L40,26 L48,16" stroke="#C85A48" strokeWidth="2.5" fill="none" />
                  <circle cx="40" cy="18" r="3.5" fill="#C85A48" />
                </svg>
                <span className="font-caveat text-base opacity-85">Dec 25</span>
              </div>

              {/* Lower Door Molding Panel */}
              <div className="crayon-border w-full h-[42%] bg-[#F9F7F2] flex items-center justify-center relative z-10">
                <div className="w-4/5 h-4/5 border border-dashed border-[#C85A48] flex items-center justify-center">
                  <Heart className="w-5 h-5 text-[#C85A48] opacity-60" />
                </div>
              </div>

              {/* Tiny Right Brass/Terracotta Doorknob & Keyhole */}
              <div className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-1">
                <div className="w-4 h-4 rounded-full bg-[#C85A48] border-2 border-[#8E2F21] shadow-xs" />
                <div className="w-1.5 h-3 rounded-full bg-[#C85A48]/70" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* House Front Steps & Potted Pine Trees */}
        <div className="w-[98%] mx-auto h-4 bg-[#F9F7F2] border-2 border-[#C85A48] rounded-sm" />
        <div className="w-full mx-auto h-4 bg-[#C85A48]/20 border-2 border-[#C85A48] rounded-sm" />
      </div>

      {/* Explicit CTA Button Below House for Accessibility */}
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={onOpenDoors}
        className="mt-6 crayon-border bg-[#C85A48] text-[#F9F7F2] px-8 py-3 font-caveat text-2xl sm:text-3xl font-bold shadow-md cursor-pointer flex items-center gap-2"
      >
        <span>Open {recipientName}&apos;s Advent House</span>
        <span>🚪✨</span>
      </motion.button>
    </div>
  );
}

// ============================================================================
// 🪟 SCREEN 2: THE 25 WINDOWS (INTERIOR HOUSE GRID VIEW)
// ============================================================================
function InteriorWindowsGrid({
  recipientName,
  adventData,
  openedDays,
  redeemedVouchers,
  isDayUnlocked,
  shakingDay,
  lockedTooltipDay,
  onWindowClick
}) {
  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Interior Roof Gable Header */}
      <div className="relative w-full pt-8">
        {/* Small Decorative Roof Bow at the Peak */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 w-36 pointer-events-none">
          <svg viewBox="0 0 200 85" className="w-full h-auto crayon-filter">
            <path
              d="M100,45 C65,5 15,15 25,50 C35,75 80,60 100,45 Z"
              fill="#C85A48"
              stroke="#9E3A2B"
              strokeWidth="2.5"
            />
            <path
              d="M100,45 C135,5 185,15 175,50 C165,75 120,60 100,45 Z"
              fill="#C85A48"
              stroke="#9E3A2B"
              strokeWidth="2.5"
            />
            <circle cx="100" cy="45" r="10" fill="#9E3A2B" />
          </svg>
        </div>

        {/* Roof Triangle Header */}
        <svg viewBox="0 0 700 130" className="w-full h-auto block crayon-filter">
          <polygon
            points="350,10 10,126 690,126"
            fill="#F9F7F2"
            stroke="#C85A48"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <line
            x1="45"
            y1="118"
            x2="655"
            y2="118"
            stroke="#C85A48"
            strokeWidth="2"
            strokeDasharray="8 6"
          />
        </svg>

        <div className="absolute inset-x-0 bottom-2 sm:bottom-4 text-center pointer-events-none">
          <h1 className="font-caveat text-3xl sm:text-5xl font-bold text-[#C85A48]">
            {recipientName}&apos;s 25 Days of Christmas
          </h1>
        </div>
      </div>

      {/* House Walls Container Holding the 25 Hand-Drawn Windows */}
      <div className="bg-[#F9F7F2] border-x-4 border-b-4 border-[#C85A48] p-3 sm:p-6 shadow-xl relative">
        <p className="text-center text-sm sm:text-base mb-4 opacity-85">
          Click any unlocked window to swing open its shutters &amp; see today&apos;s memory, Valencia date, or gift!
        </p>

        {/* Responsive Grid of 25 Uniquely Illustrated Windows */}
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-4">
          {adventData.map((item) => {
            const unlocked = isDayUnlocked(item.day);
            const isOpened = openedDays.includes(item.day);
            const isRedeemed = redeemedVouchers.includes(item.day);
            const isShaking = shakingDay === item.day;
            const showTooltip = lockedTooltipDay === item.day;

            return (
              <motion.div
                key={item.day}
                animate={
                  isShaking
                    ? { x: [-7, 7, -6, 6, -3, 3, 0], rotate: [-2, 2, -2, 2, 0] }
                    : { x: 0, rotate: 0 }
                }
                transition={{ duration: 0.45 }}
                className="relative flex flex-col items-center"
              >
                {/* Cute Tooltip if Locked */}
                <AnimatePresence>
                  {showTooltip && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.9 }}
                      animate={{ opacity: 1, y: -6, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="absolute -top-11 z-40 bg-[#C85A48] text-[#F9F7F2] px-2.5 py-1 rounded-lg text-xs sm:text-sm whitespace-nowrap shadow-md font-patrick pointer-events-none"
                    >
                      Patience! Unlocks Dec {item.day} 🎄
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Individual Illustrated Window Button */}
                <IllustratedWindowCard
                  item={item}
                  unlocked={unlocked}
                  isOpened={isOpened}
                  isRedeemed={isRedeemed}
                  onClick={() => onWindowClick(item)}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Cozy House Baseboard Trim */}
        <div className="mt-6 pt-3 border-t-2 border-dashed border-[#C85A48]/50 flex flex-wrap items-center justify-between text-xs sm:text-sm opacity-80 gap-2">
          <span>🏠 Hand-drawn with love for {recipientName}</span>
          <span>✨ 1 window every morning in December</span>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 🖼️ 4 DISTINCT HAND-DRAWN WINDOW ILLUSTRATIONS (Numbers 1 - 25)
// ============================================================================
function IllustratedWindowCard({ item, unlocked, isOpened, isRedeemed, onClick }) {
  const { day, windowStyle, type } = item;

  // Little icon badge in the corner once opened
  const TypeBadgeIcon =
    type === 'photo' ? Camera : type === 'voucher' ? Ticket : Music;

  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={`w-full aspect-[4/5] relative p-1.5 flex flex-col items-center justify-between cursor-pointer transition-colors group ${
        isOpened ? 'bg-[#FFF5E6]' : 'bg-[#F9F7F2]'
      }`}
      style={{
        border: '2.5px solid #C85A48',
        borderRadius:
          windowStyle === 'arched'
            ? '999px 999px 10px 10px'
            : '10px 16px 10px 14px',
        boxShadow: isOpened
          ? 'inset 0 0 0 2px rgba(200,90,72,0.2), 2px 3px 0px rgba(200,90,72,0.18)'
          : '3px 4px 0px rgba(200,90,72,0.22)'
      }}
    >
      {/* STYLE 1: RIBBON BOW ON TOP OF WINDOW */}
      {windowStyle === 'ribbon' && (
        <div className="
          absolute -top-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none
        ">
          <svg width="46" height="24" viewBox="0 0 46 24">
            <path
              d="M23,12 C14,2 3,5 6,14 C9,20 18,16 23,12 Z"
              fill="#C85A48"
              stroke="#8E2F21"
              strokeWidth="1.5"
            />
            <path
              d="M23,12 C32,2 43,5 40,14 C37,20 28,16 23,12 Z"
              fill="#C85A48"
              stroke="#8E2F21"
              strokeWidth="1.5"
            />
            <circle cx="23" cy="12" r="3.5" fill="#8E2F21" />
          </svg>
        </div>
      )}

      {/* STYLE 3: SCALLOPED CURTAINS DRAPED AT THE TOP */}
      {windowStyle === 'curtains' && (
        <div className="absolute top-0 inset-x-0 h-6 pointer-events-none overflow-hidden rounded-t-md">
          <svg viewBox="0 0 100 26" className="w-full h-full" preserveAspectRatio="none">
            <path
              d="M0,0 L100,0 L100,14 Q87,26 75,14 Q62,26 50,14 Q37,26 25,14 Q12,26 0,14 Z"
              fill="#C85A48"
              fillOpacity="0.2"
              stroke="#C85A48"
              strokeWidth="2"
            />
          </svg>
        </div>
      )}

      {/* Window Inner Pane Lines (Left & Right Shutters closed look) */}
      <div
        className={`w-full h-full border border-[#C85A48]/75 relative flex flex-col items-center justify-center overflow-hidden ${
          windowStyle === 'arched' ? 'rounded-t-full' : 'rounded-xs'
        }`}
      >
        {/* Center vertical shutter split line */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1.8px] bg-[#C85A48]/65" />
        {/* Horizontal muntin bar */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1.5px] bg-[#C85A48]/45" />

        {/* Tiny shutter handles */}
        <div className="absolute left-[42%] top-[54%] w-1.5 h-1.5 rounded-full bg-[#C85A48]" />
        <div className="absolute right-[42%] top-[54%] w-1.5 h-1.5 rounded-full bg-[#C85A48]" />

        {/* Day Number Plaque */}
        <div
          className={`relative z-10 px-2.5 py-0.5 rounded-full border-2 border-[#C85A48] transition-colors ${
            day === 25
              ? 'bg-[#C85A48] text-[#F9F7F2]'
              : isOpened
              ? 'bg-[#FFF5E6] text-[#C85A48]'
              : 'bg-[#F9F7F2] text-[#C85A48] group-hover:bg-[#C85A48] group-hover:text-[#F9F7F2]'
          }`}
        >
          <span className="font-caveat text-2xl sm:text-3xl font-bold leading-none">
            {day}
          </span>
        </div>

        {/* Status Icon in Corner (Opened Checkmark / Lock) */}
        <div className="absolute bottom-1 right-1 z-10">
          {!unlocked ? (
            <Lock className="w-3.5 h-3.5 text-[#C85A48]/60" />
          ) : isOpened ? (
            <div className="flex items-center gap-0.5 bg-[#C85A48] text-[#F9F7F2] px-1 py-0.5 rounded-xs text-[10px]">
              <TypeBadgeIcon className="w-2.5 h-2.5" />
              {isRedeemed && <span>✓</span>}
            </div>
          ) : null}
        </div>
      </div>

      {/* STYLE 2: FLOWER / HOLLY BOX UNDERNEATH WINDOW */}
      {windowStyle === 'flowerbox' && (
        <div className="w-[106%] -mb-2.5 z-20 bg-[#F9F7F2] border-2 border-[#C85A48] h-4 rounded-xs flex items-center justify-around px-1">
          <span className="w-2 h-2 rounded-full bg-[#C85A48]" />
          <span className="w-2 h-2 rounded-full bg-[#C85A48]" />
          <span className="w-2 h-2 rounded-full bg-[#C85A48]" />
        </div>
      )}
    </motion.button>
  );
}

// ============================================================================
// 🎁 SCREEN 3: OPENING A WINDOW MODAL (3D DOUBLE SHUTTERS + SURPRISES)
// ============================================================================
function WindowSurpriseModal({
  dayObj,
  shuttersOpen,
  setShuttersOpen,
  isRedeemed,
  onRedeem,
  onClose,
  soundEnabled
}) {
  const [synthPlaying, setSynthPlaying] = useState(false);

  // Stop any playing voice/song preview when modal closes
  useEffect(() => {
    return () => {
      if (synthPlaying) {
        audioEngine.toggleMusicBox(false);
      }
    };
  }, [synthPlaying]);

  const handleToggleSongPreview = () => {
    const next = !synthPlaying;
    setSynthPlaying(next);
    audioEngine.toggleMusicBox(next);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-center justify-center p-2 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.85, y: 25 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.85, y: 25 }}
        transition={{ type: 'spring', stiffness: 220, damping: 22 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl my-auto flex flex-col items-center"
      >
        {/* Top Modal Controls */}
        <div className="w-full flex items-center justify-between mb-3 px-2">
          <button
            onClick={() => setShuttersOpen(!shuttersOpen)}
            className="crayon-border bg-[#F9F7F2] text-[#C85A48] px-4 py-1.5 text-base sm:text-lg flex items-center gap-2 shadow-md cursor-pointer hover:bg-[#C85A48] hover:text-[#F9F7F2] transition-colors"
          >
            <span>{shuttersOpen ? 'Close Window Shutters' : 'Swing Shutters Open'}</span>
            <span>🪟</span>
          </button>

          <button
            onClick={onClose}
            className="crayon-border bg-[#F9F7F2] text-[#C85A48] p-2 shadow-md cursor-pointer hover:bg-[#C85A48] hover:text-[#F9F7F2] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* ================================================================ */}
        {/* THE ZOOMED-IN WINDOW WITH 3D HINGED LEFT & RIGHT SHUTTERS */}
        {/* ================================================================ */}
        <div className="relative w-full max-w-[440px] sm:max-w-[480px] mx-auto perspective-container">
          
          {/* Top Decorative Window Arch / Crown */}
          <div className="w-full bg-[#F9F7F2] border-t-4 border-x-4 border-[#C85A48] rounded-t-3xl py-2.5 px-4 flex items-center justify-between shadow-md">
            <span className="font-caveat text-2xl sm:text-3xl font-bold text-[#C85A48]">
              December {dayObj.day}
            </span>
            <span className="text-xs sm:text-sm uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-[#C85A48]">
              {dayObj.type === 'photo'
                ? '📸 Memory Photo'
                : dayObj.type === 'voucher'
                ? '🎟️ Date / Gift Voucher'
                : '💌 Love Note & Audio'}
            </span>
          </div>

          {/* Main Window Frame Box */}
          <div className="relative w-full min-h-[430px] sm:min-h-[460px] bg-[#FFFDF9] border-4 border-[#C85A48] shadow-2xl flex flex-col justify-between p-4 sm:p-6 preserve-3d">
            
            {/* ============================================================ */}
            {/* SURPRISE CONTENT INSIDE THE WINDOW FRAME */}
            {/* ============================================================ */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center my-auto">
              <h2 className="font-caveat text-2xl sm:text-3xl font-bold text-center text-[#C85A48] mb-3 leading-tight">
                {dayObj.title}
              </h2>

              {/* CONTENT TYPE 1: POLAROID PHOTO + MEMORY NOTE */}
              {dayObj.type === 'photo' && (
                <div className="w-full flex flex-col items-center">
                  {/* Polaroid Frame with Masking Tape */}
                  <div className="relative bg-white p-3 pb-8 border-2 border-[#C85A48] shadow-md rotate-[-1deg] max-w-[290px] w-full">
                    {/* Washi Tape at top */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#C85A48]/25 border border-[#C85A48]/50 rotate-2" />
                    <div className="w-full h-48 sm:h-52 overflow-hidden border border-[#C85A48]/40 bg-[#F9F7F2]">
                      <img
                        src={dayObj.imageUrl}
                        alt={dayObj.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="font-caveat text-xl text-center text-[#C85A48] mt-2 font-bold">
                      {dayObj.caption}
                    </p>
                  </div>

                  {/* Handwritten Memory Paragraph */}
                  <p className="mt-4 text-center text-base sm:text-lg leading-snug text-[#9E3A2B] bg-[#F9F7F2] p-3 crayon-border">
                    {dayObj.note}
                  </p>
                </div>
              )}

              {/* CONTENT TYPE 2: PERFORATED GIFT VOUCHER / VALENCIA DATE TICKET */}
              {dayObj.type === 'voucher' && (
                <div className="w-full flex flex-col items-center">
                  <div className="relative w-full bg-[#F9F7F2] border-2 border-[#C85A48] p-4 shadow-md overflow-hidden">
                    {/* Ticket Notch Cutouts on Left & Right */}
                    <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#FFFDF9] border-2 border-[#C85A48]" />
                    <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#FFFDF9] border-2 border-[#C85A48]" />

                    <div className="border-2 border-dashed border-[#C85A48] p-3 sm:p-4 text-center relative">
                      <div className="flex items-center justify-center gap-1.5 text-xs uppercase tracking-widest opacity-75 mb-1">
                        <Ticket className="w-4 h-4" />
                        <span>Official Love Coupon • #{dayObj.voucherCode}</span>
                      </div>

                      {dayObj.location && (
                        <div className="inline-flex items-center gap-1 text-xs sm:text-sm bg-[#C85A48]/10 px-2.5 py-0.5 rounded-full mb-2">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{dayObj.location}</span>
                        </div>
                      )}

                      <p className="text-base sm:text-lg text-[#9E3A2B] my-2 leading-snug">
                        {dayObj.note}
                      </p>

                      {/* REDEEMED STAMP OVERLAY */}
                      <AnimatePresence>
                        {isRedeemed && (
                          <motion.div
                            initial={{ scale: 2, opacity: 0, rotate: -20 }}
                            animate={{ scale: 1, opacity: 1, rotate: -12 }}
                            className="my-2 inline-block border-4 border-[#C85A48] text-[#C85A48] px-4 py-1 font-caveat text-2xl font-bold uppercase tracking-widest bg-[#F9F7F2]/95 shadow-sm"
                          >
                            ✓ CLAIMED BY Pablo ♥
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="mt-3">
                        <button
                          onClick={() => onRedeem(dayObj.day, dayObj.linkUrl)}
                          className="crayon-border bg-[#C85A48] text-[#F9F7F2] px-5 py-2 font-caveat text-xl sm:text-2xl font-bold inline-flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer"
                        >
                          <span>{dayObj.buttonText || 'Redeem Voucher'}</span>
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* CONTENT TYPE 3: LOVE NOTE / SPOTIFY CASSETTE / SECRET PRESENT */}
              {dayObj.type === 'note' && (
                <div className="w-full flex flex-col items-center">
                  {/* Hand-Drawn Cassette / Vinyl Player Card */}
                  <div className="w-full crayon-border bg-[#F9F7F2] p-4 shadow-md flex flex-col items-center">
                    <div className="w-full flex items-center gap-3 pb-3 border-b border-dashed border-[#C85A48]">
                      <motion.button
                        whileTap={{ scale: 0.92 }}
                        onClick={handleToggleSongPreview}
                        className="w-12 h-12 rounded-full bg-[#C85A48] text-[#F9F7F2] flex items-center justify-center shrink-0 cursor-pointer shadow-sm"
                      >
                        {synthPlaying ? (
                          <Pause className="w-5 h-5" />
                        ) : (
                          <Play className="w-5 h-5 ml-0.5" />
                        )}
                      </motion.button>
                      <div className="flex-1 text-left">
                        <p className="font-caveat text-xl font-bold leading-none">
                          {dayObj.songTitle || 'Special Holiday Note'}
                        </p>
                        <p className="text-xs opacity-75 mt-0.5">
                          {dayObj.artist} • {dayObj.audioDuration}
                        </p>
                      </div>
                      {/* Spinning Vinyl Icon */}
                      <motion.div
                        animate={synthPlaying ? { rotate: 360 } : { rotate: 0 }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                        className="w-9 h-9 rounded-full border-2 border-[#C85A48] flex items-center justify-center"
                      >
                        <div className="w-2.5 h-2.5 rounded-full bg-[#C85A48]" />
                      </motion.div>
                    </div>

                    <p className="mt-3 text-base sm:text-lg text-[#9E3A2B] whitespace-pre-line text-center leading-snug">
                      {dayObj.note}
                    </p>

                    {dayObj.buttonText && (
                      <button
                        onClick={() => onRedeem(dayObj.day, dayObj.linkUrl)}
                        className="mt-4 crayon-border bg-[#C85A48] text-[#F9F7F2] px-5 py-2 font-caveat text-xl font-bold inline-flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer"
                      >
                        <Gift className="w-4 h-4" />
                        <span>{dayObj.buttonText}</span>
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Mobile Shutter Notes (Visible below content on small phone screens so nothing gets cut off) */}
              <div className="grid grid-cols-2 gap-2 w-full mt-4 md:hidden">
                <div className="crayon-border-dashed bg-[#F9F7F2] p-2.5 text-center">
                  <span className="block text-[10px] uppercase opacity-60">Left Shutter Note</span>
                  <p className="font-caveat text-lg font-bold leading-tight">
                    &ldquo;{dayObj.leftShutterText}&rdquo;
                  </p>
                </div>
                <div className="crayon-border-dashed bg-[#F9F7F2] p-2.5 text-center">
                  <span className="block text-[10px] uppercase opacity-60">Right Shutter Note</span>
                  <p className="font-caveat text-lg font-bold leading-tight">
                    &ldquo;{dayObj.rightShutterText}&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* ============================================================ */}
            {/* 3D INTERACTIVE LEFT SHUTTER (Swings Open to -138deg) */}
            {/* ============================================================ */}
            <motion.div
              initial={false}
              animate={{ rotateY: shuttersOpen ? -138 : 0 }}
              transition={{ type: 'spring', stiffness: 60, damping: 14 }}
              style={{ transformOrigin: 'left center', transformStyle: 'preserve-3d' }}
              onClick={() => setShuttersOpen(!shuttersOpen)}
              className="absolute inset-y-0 left-0 w-1/2 z-30 cursor-pointer preserve-3d"
            >
              {/* Front Face of Left Shutter (Visible when closed) */}
              <div
                className="
                  absolute inset-0 bg-[#F9F7F2] border-r-2 border-[#C85A48] p-4
                  flex flex-col items-center justify-center backface-hidden shadow-md
                "
              >
                <div className="w-full h-full border-2 border-dashed border-[#C85A48] flex flex-col items-center justify-center p-2">
                  <span className="font-caveat text-4xl font-bold">Dec</span>
                  <span className="text-xs opacity-70 mt-2">Tap to swing open</span>
                </div>
              </div>

              {/* Inside Face of Left Shutter (Reveals Handwritten Note when swung open!) */}
              <div
                style={{ transform: 'rotateY(180deg)' }}
                className="
                  absolute inset-0 bg-[#F9F7F2] border-2 border-[#C85A48] p-4
                  flex flex-col items-center justify-center text-center backface-hidden shadow-xl
                "
              >
                <div className="w-full h-full border-2 border-dashed border-[#C85A48]/60 p-3 flex flex-col items-center justify-center">
                  <Heart className="w-5 h-5 text-[#C85A48] mb-2 fill-[#C85A48]/20" />
                  <p className="font-caveat text-2xl sm:text-3xl font-bold text-[#C85A48] leading-snug">
                    {dayObj.leftShutterText}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* ============================================================ */}
            {/* 3D INTERACTIVE RIGHT SHUTTER (Swings Open to +138deg) */}
            {/* ============================================================ */}
            <motion.div
              initial={false}
              animate={{ rotateY: shuttersOpen ? 138 : 0 }}
              transition={{ type: 'spring', stiffness: 60, damping: 14 }}
              style={{ transformOrigin: 'right center', transformStyle: 'preserve-3d' }}
              onClick={() => setShuttersOpen(!shuttersOpen)}
              className="absolute inset-y-0 right-0 w-1/2 z-30 cursor-pointer preserve-3d"
            >
              {/* Front Face of Right Shutter (Visible when closed) */}
              <div
                className="
                  absolute inset-0 bg-[#F9F7F2] border-l-2 border-[#C85A48] p-4
                  flex flex-col items-center justify-center backface-hidden shadow-md
                "
              >
                <div className="w-full h-full border-2 border-dashed border-[#C85A48] flex flex-col items-center justify-center p-2">
                  <span className="font-caveat text-4xl font-bold">{dayObj.day}</span>
                  <span className="text-xs opacity-70 mt-2">Tap to swing open</span>
                </div>
              </div>

              {/* Inside Face of Right Shutter (Reveals Handwritten Note when swung open!) */}
              <div
                style={{ transform: 'rotateY(180deg)' }}
                className="
                  absolute inset-0 bg-[#F9F7F2] border-2 border-[#C85A48] p-4
                  flex flex-col items-center justify-center text-center backface-hidden shadow-xl
                "
              >
                <div className="w-full h-full border-2 border-dashed border-[#C85A48]/60 p-3 flex flex-col items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[#C85A48] mb-2" />
                  <p className="font-caveat text-2xl sm:text-3xl font-bold text-[#C85A48] leading-snug">
                    {dayObj.rightShutterText}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Window Sill & Holly Box Base */}
          <div className="w-[106%] -ml-[3%] h-5 bg-[#F9F7F2] border-4 border-[#C85A48] rounded-b-lg shadow-md" />
        </div>
      </motion.div>
    </motion.div>
  );
}

// ============================================================================
// 🛠️ CUSTOMIZE / EDIT SURPRISES DRAWER (Edit Any Day Live in Browser)
// ============================================================================
function CustomizeDrawer({
  recipientName,
  setRecipientName,
  giftTagText,
  setGiftTagText,
  adventData,
  editingDayNum,
  setEditingDayNum,
  onUpdateField,
  onReset,
  onCopyJson,
  copiedJsonSuccess,
  onClose
}) {
  const currentDay = adventData.find((d) => d.day === editingDayNum) || adventData[0];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 260, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-[#F9F7F2] border-l-4 border-[#C85A48] h-full overflow-y-auto p-5 sm:p-6 shadow-2xl text-[#C85A48]"
      >
        <div className="flex items-center justify-between pb-3 border-b-2 border-dashed border-[#C85A48]">
          <div>
            <h2 className="font-caveat text-3xl font-bold">Customize Advent Calendar</h2>
            <p className="text-xs opacity-80">
              Changes save automatically in your browser or export JSON for your code!
            </p>
          </div>
          <button
            onClick={onClose}
            className="crayon-border p-1.5 hover:bg-[#C85A48] hover:text-[#F9F7F2] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cover House Personalization */}
        <div className="mt-4 p-3 crayon-border-dashed bg-[#FFFDF9] space-y-3">
          <h3 className="font-caveat text-2xl font-bold">1. Roof Gable &amp; Gift Tag</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label className="block text-xs uppercase opacity-75">Boyfriend&apos;s Name on Roof</label>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="w-full mt-1 px-3 py-1.5 bg-[#F9F7F2] border-2 border-[#C85A48] rounded-md text-base"
              />
            </div>
            <div>
              <label className="block text-xs uppercase opacity-75">Hanging Gift Tag</label>
              <input
                type="text"
                value={giftTagText}
                onChange={(e) => setGiftTagText(e.target.value)}
                className="w-full mt-1 px-3 py-1.5 bg-[#F9F7F2] border-2 border-[#C85A48] rounded-md text-base"
              />
            </div>
          </div>
        </div>

        {/* Day Selector (1 to 25) */}
        <div className="mt-5">
          <h3 className="font-caveat text-2xl font-bold mb-2">
            2. Pick a Window to Edit (Day {editingDayNum})
          </h3>
          <div className="grid grid-cols-5 sm:grid-cols-9 gap-1.5">
            {adventData.map((d) => (
              <button
                key={d.day}
                onClick={() => setEditingDayNum(d.day)}
                className={`py-1 rounded-md border-2 border-[#C85A48] font-caveat text-lg font-bold cursor-pointer ${
                  editingDayNum === d.day
                    ? 'bg-[#C85A48] text-[#F9F7F2]'
                    : 'bg-[#F9F7F2] text-[#C85A48]'
                }`}
              >
                {d.day}
              </button>
            ))}
          </div>
        </div>

        {/* Form Fields for Selected Day */}
        <div className="mt-4 p-4 crayon-border bg-[#FFFDF9] space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-caveat text-2xl font-bold">Editing Window #{currentDay.day}</span>
            <select
              value={currentDay.type}
              onChange={(e) => onUpdateField(currentDay.day, 'type', e.target.value)}
              className="px-2.5 py-1 bg-[#F9F7F2] border-2 border-[#C85A48] rounded-md text-sm"
            >
              <option value="photo">📸 Memory Photo</option>
              <option value="voucher">🎟️ Gift / Date Voucher</option>
              <option value="note">💌 Love Note / Song</option>
            </select>
          </div>

          <div>
            <label className="block text-xs uppercase opacity-75">Surprise Title</label>
            <input
              type="text"
              value={currentDay.title || ''}
              onChange={(e) => onUpdateField(currentDay.day, 'title', e.target.value)}
              className="w-full mt-1 px-3 py-1.5 bg-[#F9F7F2] border-2 border-[#C85A48] rounded-md"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label className="block text-xs uppercase opacity-75">Left Inside Shutter Text</label>
              <input
                type="text"
                value={currentDay.leftShutterText || ''}
                onChange={(e) => onUpdateField(currentDay.day, 'leftShutterText', e.target.value)}
                className="w-full mt-1 px-3 py-1.5 bg-[#F9F7F2] border-2 border-[#C85A48] rounded-md"
              />
            </div>
            <div>
              <label className="block text-xs uppercase opacity-75">Right Inside Shutter Text</label>
              <input
                type="text"
                value={currentDay.rightShutterText || ''}
                onChange={(e) => onUpdateField(currentDay.day, 'rightShutterText', e.target.value)}
                className="w-full mt-1 px-3 py-1.5 bg-[#F9F7F2] border-2 border-[#C85A48] rounded-md"
              />
            </div>
          </div>

          {currentDay.type === 'photo' && (
            <>
              <div>
                <label className="block text-xs uppercase opacity-75">Photo Image URL</label>
                <input
                  type="text"
                  value={currentDay.imageUrl || ''}
                  onChange={(e) => onUpdateField(currentDay.day, 'imageUrl', e.target.value)}
                  placeholder="https://... or /advent/our-photo.jpg"
                  className="w-full mt-1 px-3 py-1.5 bg-[#F9F7F2] border-2 border-[#C85A48] rounded-md"
                />
              </div>
              <div>
                <label className="block text-xs uppercase opacity-75">Polaroid Caption</label>
                <input
                  type="text"
                  value={currentDay.caption || ''}
                  onChange={(e) => onUpdateField(currentDay.day, 'caption', e.target.value)}
                  className="w-full mt-1 px-3 py-1.5 bg-[#F9F7F2] border-2 border-[#C85A48] rounded-md"
                />
              </div>
            </>
          )}

          {currentDay.type === 'voucher' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs uppercase opacity-75">Location / Store</label>
                  <input
                    type="text"
                    value={currentDay.location || ''}
                    onChange={(e) => onUpdateField(currentDay.day, 'location', e.target.value)}
                    className="w-full mt-1 px-3 py-1.5 bg-[#F9F7F2] border-2 border-[#C85A48] rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase opacity-75">Button Text</label>
                  <input
                    type="text"
                    value={currentDay.buttonText || ''}
                    onChange={(e) => onUpdateField(currentDay.day, 'buttonText', e.target.value)}
                    className="w-full mt-1 px-3 py-1.5 bg-[#F9F7F2] border-2 border-[#C85A48] rounded-md"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase opacity-75">Store / Restaurant Link URL</label>
                <input
                  type="text"
                  value={currentDay.linkUrl || ''}
                  onChange={(e) => onUpdateField(currentDay.day, 'linkUrl', e.target.value)}
                  className="w-full mt-1 px-3 py-1.5 bg-[#F9F7F2] border-2 border-[#C85A48] rounded-md"
                />
              </div>
            </>
          )}

          {currentDay.type === 'note' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="block text-xs uppercase opacity-75">Song / Voice Memo Title</label>
                <input
                  type="text"
                  value={currentDay.songTitle || ''}
                  onChange={(e) => onUpdateField(currentDay.day, 'songTitle', e.target.value)}
                  className="w-full mt-1 px-3 py-1.5 bg-[#F9F7F2] border-2 border-[#C85A48] rounded-md"
                />
              </div>
              <div>
                <label className="block text-xs uppercase opacity-75">Spotify / Action Link</label>
                <input
                  type="text"
                  value={currentDay.linkUrl || ''}
                  onChange={(e) => onUpdateField(currentDay.day, 'linkUrl', e.target.value)}
                  className="w-full mt-1 px-3 py-1.5 bg-[#F9F7F2] border-2 border-[#C85A48] rounded-md"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs uppercase opacity-75">Personal Message / Note</label>
            <textarea
              rows={3}
              value={currentDay.note || ''}
              onChange={(e) => onUpdateField(currentDay.day, 'note', e.target.value)}
              className="w-full mt-1 px-3 py-1.5 bg-[#F9F7F2] border-2 border-[#C85A48] rounded-md"
            />
          </div>
        </div>

        {/* Export JSON or Reset Buttons */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
          <button
            onClick={onCopyJson}
            className="crayon-border bg-[#C85A48] text-[#F9F7F2] px-4 py-2 flex items-center gap-2 cursor-pointer"
          >
            {copiedJsonSuccess ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copiedJsonSuccess ? 'Copied ADVENT_DATA JSON!' : 'Copy Updated JSON'}</span>
          </button>

          <button
            onClick={onReset}
            className="crayon-border bg-[#F9F7F2] text-[#C85A48] px-3 py-2 flex items-center gap-1.5 text-sm cursor-pointer hover:bg-[#C85A48]/10"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset to Default</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}