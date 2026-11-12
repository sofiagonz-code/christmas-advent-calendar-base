# 🎄 Hand-Drawn Interactive Christmas Advent Calendar

A cozy, hand-illustrated digital Christmas Advent Calendar web application built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

Designed to feel like an interactive colored-pencil and crayon storybook on textured cream paper (`#F9F7F2`) with warm terracotta outlines (`#C85A48`), this template lets you gift 25 days of personalized memories, date vouchers, music, and surprises.

NOTE: Works on both mobile and laptop. You can open the base clicking here: https://advent-calendar-chi-rouge.vercel.ap

---

## ✨ What Was Built & Key Features

* **Hand-Drawn Illustration Aesthetic:** Crafted with custom SVG illustrations, sketchy borders, hanging string lights, falling snow particles, and festive Google Fonts (*Ribeye*, *Ribeye Marrow*, and *Fredoka*).
* **Screen 1 — The Wrapped Gift House (Cover View):** Features a whimsical house tied at the roof peak with a red bow, a swinging gift tag, customizable recipient lettering across the roof gable, and interactive 3D-hinged double front doors that swing open on click.
* **Screen 2 — 25 Illustrated Windows (Interior Grid):** A multi-story house layout with 25 uniquely styled windows (arched, scalloped curtains, flower boxes, and ribbons).
* **Date-Locking & Preview Logic:** Automatically unlocks one window per day from December 1st to December 25th (locked windows gently shake with a *"Patience! Unlocks Dec X"* tooltip), plus a configurable `previewAllUnlocked` state for testing.
* **Screen 3 — 3D Shutter Surprise Modal:** Clicking an unlocked window zooms in and swings open double 3D shutters—revealing handwritten messages printed on the *inside* of the left and right shutters alongside three surprise formats:
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
   git clone https://github.com/YOUR_USERNAME/christmas-advent-calendar-base.git
   cd christmas-advent-calendar-base/charlie-advent-calendar
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. Open **`http://localhost:3000`** in your browser to view the Advent Calendar.

---

## 🎨 How to Customize Your Own Calendar

All content is centralized in **`app/page.tsx`** so you can personalize every detail in minutes:

### 1. Change the Recipient Name & Gift Tag
Inside `export default function App()` in `app/page.tsx`, update:
```tsx
const [recipientName, setRecipientName] = useState<string>('Charlie');
const [giftTagText, setGiftTagText] = useState<string>('To: Charlie ♥');
```

### 2. Add Your Own Photos, Messages & Vouchers
1. Drop your personal photos into `public/images/` (e.g., `public/images/day1.jpg`).
2. Edit the `INITIAL_ADVENT_DATA` array at the top of `app/page.tsx` to swap `imageUrl` paths (e.g., `'/images/day1.jpg'`), customize `leftShutterText` and `rightShutterText`, or update voucher links and notes.

### 3. Toggle Preview Mode vs. Strict December Unlock
In `app/page.tsx`, set `previewAllUnlocked`:
* `true` — Unlocks all 25 windows immediately (useful while building and testing).
* `false` — Enforces strict daily unlocking from **December 1 to December 25**.

---

## 🌐 Deploying to Vercel

1. Push your customized repository to GitHub.
2. Import the repository into [Vercel](https://vercel.com/) (or run `npx vercel --prod` from the `charlie-advent-calendar` directory).
3. Share the generated live URL so the recipient can open a new window from their phone every morning in December!
