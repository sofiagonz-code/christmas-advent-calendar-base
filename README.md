# 🎄 Hand-Drawn Interactive Christmas Advent Calendar

A cozy, hand-illustrated digital Christmas Advent Calendar web application built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. 

Designed to feel like an interactive colored-pencil and crayon storybook on textured cream paper (`#F9F7F2`) with warm terracotta outlines (`#C85A48`), this template lets you gift 25 days of personalized memories, date vouchers, music, and surprises.

---

## ✨ What Was Built & Key Features

* **Hand-Drawn Illustration Aesthetic:** Crafted with custom SVG illustrations, sketchy borders, hanging string lights, falling snow particles, and festive Google Fonts (*Ribeye*, *Ribeye Marrow*, and *Fredoka*).
* **Screen 1 — The Wrapped Gift House (Cover View):** Features a whimsical house tied at the roof peak with a red bow, a swinging gift tag, customizable recipient lettering across the roof gable, and interactive 3D-hinged double front doors that swing open on click.
* **Screen 2 — 25 Illustrated Windows (Interior Grid):** A multi-story house layout with 25 uniquely styled windows (arched, scalloped curtains, flower boxes, and ribbons).
* **Date-Locking & Preview Logic:** Automatically unlocks one window per day from December 1st to December 25th (locked windows gently shake with a *"Patience! Unlocks Dec X"* tooltip)[cite: 8], plus a configurable `previewAllUnlocked` state for testing.
* **Screen 3 — 3D Shutter Surprise Modal:** Clicking an unlocked window zooms in and swings open double 3D shutters—revealing handwritten messages printed on the *inside* of the left and right shutters alongside three surprise formats[cite: 8]:
  1. **Memory Photos:** Polaroid-style framed photos with washi tape and personal notes.
  2. **Gift & Date Vouchers:** Perforated digital coupons with location tags, external store/restaurant links, and a clickable *"Claimed"* stamp overlay.
  3. **Love Notes, Songs & Secret Clues:** Interactive vinyl/cassette card with built-in audio preview, Spotify links, and a confetti celebration trigger.
* **Built-In Web Audio Synthesizer:** Generates cozy music-box holiday melodies, shutter-opening chimes, and locked-window sound effects natively via the Web Audio API—with zero external audio files required.
* **Browser Persistence:** Saves opened windows and redeemed vouchers automatically in `localStorage`.

---

## 🛠️ Tech Stack

* **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
* **Language:** TypeScript
* **Styling:** Tailwind CSS v4 + Custom SVG Filters
* **Animations:** [Framer Motion](https://www.framer.com/motion/) (3D perspective door/shutter hinges, spring physics, confetti)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Audio:** Native Web Audio API

---

## 📋 Prerequisites (What You Need to Use It)

Before running or customizing this project, make sure you have:

1. **Node.js** (version `18.18` or `20+` recommended) installed on your computer.
2. **npm** (comes bundled with Node.js).
3. A code editor like **VS Code**.
4. *(Optional)* A free **GitHub** and **Vercel** account if you want to publish your customized calendar online and share a mobile-friendly link.

---

## 🚀 Getting Started (Local Setup)

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/YOUR_USERNAME/christmas-advent-calendar-base.git](https://github.com/YOUR_USERNAME/christmas-advent-calendar-base.git)
   cd christmas-advent-calendar-base/charlie-advent-calendar