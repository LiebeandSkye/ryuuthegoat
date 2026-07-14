# Build Prompt: "黒川あかね" Liquid Glass Desktop Landing Page

Paste this whole document into Cursor (or any AI coding assistant) as your instruction. It's written so the assistant has zero ambiguity about setup, assets, layout, and behavior.

---

## 0. Project setup (React + Vite + Tailwind, from scratch)

```bash
npm create vite@latest ryo-desktop -- --template react
cd ryo-desktop
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Replace `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        glass: {
          light: "rgba(255,255,255,var(--glass-opacity,0.18))",
          dark: "rgba(20,20,25,var(--glass-opacity-dark,0.55))",
          border: "rgba(255,255,255,0.35)",
        },
      },
      backdropBlur: {
        xs: "2px",
        glass: "20px",
      },
      borderRadius: {
        glass: "28px",
        pill: "999px",
      },
      fontFamily: {
        mono: ["'JetBrains Mono'", "'DSEG7-Classic'", "monospace"],
        jp: ["'Noto Sans JP'", "sans-serif"],
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0,0,0,0.25), inset 0 1px 1px rgba(255,255,255,0.4)",
      },
    },
  },
  plugins: [],
};
```

`src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --glass-opacity: 0.18;
  --glass-opacity-dark: 0.55;
  --glass-blur: 20px;
}

.glass-panel {
  background: var(--glass-light, rgba(255, 255, 255, 0.16));
  backdrop-filter: blur(var(--glass-blur)) saturate(160%);
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(160%);
  border: 1px solid rgba(255, 255, 255, 0.35);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.4);
}

.glass-panel-dark {
  background: rgba(15, 15, 20, 0.55);
  backdrop-filter: blur(var(--glass-blur)) saturate(140%);
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(140%);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin-slow {
  animation: spin-slow 8s linear infinite;
}
.animate-spin-slow.paused {
  animation-play-state: paused;
}
```

Load fonts (add to `index.html` `<head>`):

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;700&family=Noto+Sans+JP:wght@400;600;700&display=swap" rel="stylesheet">
```

---

## 1. Asset reorganization

All assets currently sit inside `project footer/`. Move everything into a new `src/assets/ryo/` folder and rename to the fixed names the components expect:

```bash
mkdir -p src/assets/ryo
mv "project footer/main.jpg"          src/assets/ryo/main.jpg
mv "project footer/image1.jpg"        src/assets/ryo/image1.jpg
mv "project footer/image2.jpg"        src/assets/ryo/image2.jpg
mv "project footer/image3.jpg"        src/assets/ryo/image3.jpg
mv "project footer/song-cover.jpg"    src/assets/ryo/song-cover.jpg
mv "project footer/profile.webp"      src/assets/ryo/profile.webp
mv "project footer/background.jpg"    src/assets/ryo/background.jpg
mv "project footer/"*.mp3             src/assets/ryo/song.mp3   # rename your song file to song.mp3
```

Final structure:

```
src/
  assets/
    ryo/
      main.jpg          -> center 3D character cutout
      image1.jpg         -> tall photo (top-left of the photo grid)
      image2.jpg         -> square photo (top-right of the photo grid)
      image3.jpg          -> pink square photo (bottom of the photo grid)
      song-cover.jpg      -> spinning album art
      profile.webp        -> profile pill avatar
      background.jpg      -> full-bleed city background
      song.mp3            -> audio track
  components/
    Background.jsx
    Dock.jsx              (left vertical icon rail)
    ClockCalendar.jsx     (time + calendar glass card)
    ProfileBar.jsx        (top-right profile pill + logo)
    CharacterArt.jsx      (center main.jpg + name label)
    ChatCard.jsx          ("Hi ...!!" card + 3-photo grid)
    MediaPlayer.jsx       (spinning cover + controls)
    BottomDock.jsx        (app icon dock)
  App.jsx
  main.jsx
  index.css
```

---

## 2. Global layout (`App.jsx`)

Full-viewport, background image fills screen, everything else is absolutely/flex positioned on top, matching a desktop-widget aesthetic:

```
<div className="relative w-screen h-screen overflow-hidden">
  <Background />
  <Dock />                 // fixed left, vertically centered
  <ClockCalendar />        // fixed top-left area, below the dock
  <ProfileBar />           // fixed top-right
  <ChatCard />             // fixed right side, below ProfileBar
  <MediaPlayer />          // fixed right side, below ChatCard
  <CharacterArt />         // centered, largest z-index below the side panels
  <BottomDock />           // fixed bottom-center
</div>
```

Everything uses `.glass-panel` (light frosted) except the left dock and calendar body, which use a darker frosted variant (`.glass-panel-dark`) to match the image's near-black tinted glass.

---

## 3. Component specs

### 3.1 Background.jsx
- `background.jpg` as `<img>` or CSS `background-image`, `object-cover`, `absolute inset-0 -z-10`.
- Optional very subtle `brightness-95` so foreground glass pops.

### 3.2 Dock.jsx — left vertical icon rail
- Tall pill: `w-16 rounded-pill glass-panel-dark flex flex-col items-center gap-6 py-6`, positioned `fixed left-6 top-1/2 -translate-y-1/2`.
- Icons top-to-bottom: search (magnifier), TikTok, YouTube, Facebook, Instagram, X — each a circular dark button (`bg-black/70 rounded-full p-3`) with a white icon. Use `lucide-react` for search icon and simple SVG brand marks (or `react-icons/fa` / `react-icons/si` for TikTok, YouTube, Facebook, Instagram, X) since these are static brand glyphs, not text.
- Hover: `scale-105 transition-transform`.

### 3.3 ClockCalendar.jsx — live time + calendar
- Positioned `fixed top-10 left-32` (to the right of the dock), stacked vertically: digital clock on top, calendar card below.
- **Digital clock**: big `font-mono font-bold text-5xl tracking-wider` showing `HH:MM` in **24-hour format**, plus a smaller line underneath showing `Weekday DD/MM` (e.g. `Monday 05/27`).
- **Timezone: Australia** — use `Intl.DateTimeFormat` with `timeZone: "Australia/Sydney"` (swap to `Australia/Perth`/`Australia/Brisbane` if you're not on the east coast) so the clock always reflects current Australian time regardless of the visitor's own timezone. Update every second via `setInterval` in a `useEffect`.
- **Calendar card**: `glass-panel-dark rounded-2xl p-4 w-52`, month name + underline header, weekday row `S M T W T F S` in a muted accent color, then a 7-column number grid for the current month (built from real `Date` data, not hardcoded), with **today's date circled/underlined and bold** to match the `27` styling in the reference. A thin horizontal "progress" bar under the grid (purely decorative, matches reference) can just be a static rounded div at low opacity.
- Recompute the month grid from the real current date — don't hardcode May.

### 3.4 ProfileBar.jsx — top-right identity pill
- `fixed top-8 right-8 flex items-center gap-3`.
- Small circular dark logo badge on the left (placeholder brand mark, e.g. a simple monogram or the Figma-style icon in the reference — you can substitute any circular logo asset you have, or omit it).
- Pill next to it: `glass-panel rounded-pill pl-5 pr-2 py-2 flex items-center gap-3`, containing:
  - Text label **"Ryō リョウ"** (`font-jp font-semibold`), replacing the original "Expyy".
  - Circular avatar image using `profile.webp` (`w-9 h-9 rounded-full object-cover`) with a soft purple glow ring (`ring-2 ring-purple-300/60`).

### 3.5 CharacterArt.jsx — center focal image
- `main.jpg` rendered large and centered, `absolute bottom-0 left-1/2 -translate-x-1/2 h-[95vh] object-contain drop-shadow-2xl`, so it reads as "popping out" of the glass layer in front of the background — no card/border around it, just the character cutout.
- To the left of the character's face, vertical Japanese label stacked top-to-bottom (`writing-mode: vertical-rl` or individual stacked `<span>` characters), replacing the original "山田リョウ" with **"黒川あかね"**, styled `font-jp text-white/90 text-xl tracking-widest drop-shadow`.

### 3.6 ChatCard.jsx — greeting + photo grid
- `fixed top-28 right-8 w-64 flex flex-col gap-3`.
- Heading pill/text: **"Hi Ryō!!"** (swap in whatever short greeting you want built from the new name), bold white text with soft shadow, no strict card background needed (matches reference's plain text over blur).
- Below it, a 2-column photo grid, `grid grid-cols-2 gap-2`:
  - Left column: one tall image spanning both rows → `image1.jpg`, `rounded-3xl object-cover h-full`.
  - Right column, top: `image2.jpg`, `rounded-3xl object-cover`.
  - Right column, bottom: `image3.jpg` on a soft pink rounded card (`bg-pink-100 rounded-3xl p-2`), `object-cover`.
  - All images/cards get `glass-panel` treatment (thin white border, subtle shadow) like framed photos.

### 3.7 MediaPlayer.jsx — spinning album art + controls
- `fixed bottom-28 right-8 w-64 glass-panel-dark rounded-pill flex items-center gap-3 px-3 py-2`.
- **Spinning cover**: circular `song-cover.jpg`, `w-12 h-12 rounded-full object-cover animate-spin-slow`. Add/remove the `paused` class based on play state so it **spins continuously while playing and freezes in place when paused** (don't reset rotation — just toggle `animation-play-state`).
- Track title text ("Untitled" or your real title) `text-white text-sm font-medium`.
- Playback control row beneath the title: shuffle icon, previous icon, play/pause icon (toggles), next icon, heart/like icon — all small white/70 icons from `lucide-react` (`Shuffle`, `SkipBack`, `Play`/`Pause`, `SkipForward`, `Heart`), each a plain icon button with `hover:text-white transition`.
- **Autoplay on load**: use an `<audio ref={audioRef} src={songSrc} loop />`. In a `useEffect` on mount, call `audioRef.current.play()`. Since browsers block unmuted autoplay without user interaction, handle it defensively:
  ```jsx
  useEffect(() => {
    const audio = audioRef.current;
    const tryPlay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        // Autoplay blocked — fall back to starting on first user interaction
        const resume = () => {
          audio.play();
          setIsPlaying(true);
          window.removeEventListener("click", resume);
        };
        window.addEventListener("click", resume, { once: true });
      }
    };
    tryPlay();
  }, []);
  ```
- Play/pause button toggles `audio.play()` / `audio.pause()` and flips `isPlaying`, which also toggles the spin animation's paused state.
- Like (heart) button just toggles a filled/outline state locally (no backend needed).

### 3.8 BottomDock.jsx — bottom app dock
- `fixed bottom-6 left-1/2 -translate-x-1/2 glass-panel rounded-pill flex items-center gap-4 px-6 py-3`.
- Icons in order: Windows/start-style grid icon, Spotify (green circle), Photoshop ("Ps" badge), Chrome, After Effects ("Ae" badge), Discord — each `w-11 h-11 rounded-2xl` app-icon-styled buttons (use `react-icons/si` for `SiSpotify`, `SiAdobephotoshop`, `SiGooglechrome`, `SiAdobeaftereffects`, `SiDiscord`, plus `LayoutGrid` from `lucide-react` for the start icon), with each icon's real brand color as its background tile.
- Subtle hover lift: `hover:-translate-y-1 transition-transform`.

---

## 4. Text replacement summary (exact strings to change)

| Original (reference image) | New value to use |
|---|---|
| `Expyy` (top-right pill name) | `Ryō リョウ` |
| `Hi Expyy!!` (greeting) | `Hi Ryō!!` |
| `山田リョウ` (vertical label next to face) | `黒川あかね` |

---

## 5. Behavior checklist

- [ ] Clock shows **live, real, current time** in **Australian time zone**, updating every second.
- [ ] Calendar grid is generated from the **real current month/date**, with today auto-highlighted — not hardcoded to May.
- [ ] Song **autoplays on page load** (with the browser-autoplay-restriction fallback above), and **loops**.
- [ ] Album cover **spins continuously while playing**, and **stops spinning (freezes, doesn't reset) when paused**.
- [ ] All panels use the frosted-glass look: translucent background + backdrop blur + thin light border + soft shadow, matching the reference exactly (dark-frosted for the dock/calendar/player, light-frosted for the profile pill/photo frames/bottom dock).
- [ ] Layout is responsive-safe for a standard 16:9 desktop viewport at minimum (this is a desktop-widget-style design, not required to be mobile-first).

---

## 6. Package installs needed for icons

```bash
npm install lucide-react react-icons
```

---

Hand this whole file to your coding assistant (Cursor) one section at a time if you want incremental review, or all at once for a full first-pass build.
