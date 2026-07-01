# Prompt: Create SKO Observability Sessions slide

Create a new HTML slide file at `slides/sko-sessions.html` that fits into an existing presentation deck built with the `fuckslides` framework. Match the visual design system of the existing slides precisely.

---

## Design system (replicate exactly)

**Canvas:** `1280px × 720px`, `overflow: hidden`. Always add `<script src="/js/fuckslides.js"></script>` before `</body>`.

**Font:** Inter from Google Fonts — weights 300, 400, 500, 600, 700, 800, 900.
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
```

**Color palette (CSS variables on `:root`):**
```css
--bg:        #0a0a0a;
--blue:      #1D55E0;
--blue-soft: rgba(29, 85, 224, 0.14);
--text:      #FFFFFF;
--muted:     rgba(255,255,255,0.55);
--dim:       rgba(255,255,255,0.38);
--hairline:  rgba(255,255,255,0.08);
```

**Background texture:** subtle dot-grid overlay on dark slides:
```css
body::before {
  content: '';
  position: fixed; inset: 0;
  background-image: radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px);
  background-size: 32px 32px;
  pointer-events: none;
}
```

**Animations:** stagger cards with `fade-up`:
```css
@keyframes fade-up {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: none; }
}
```
Cards animate in with `opacity: 0` initially and use `animation: fade-up 0.55s ease forwards` with staggered delays (e.g. 0.25s, 0.4s, 0.55s, 0.7s, ...).

**Card style** (dark theme):
```css
border-radius: 16px;
border: 1px solid var(--hairline);
border-top: 3px solid var(--blue);   /* or use color coding per tier */
background: rgba(255,255,255,0.02);
padding: 20px 24px;
```

**Eyebrow / section labels:**
```css
font-size: 11px; font-weight: 700; letter-spacing: 0.22em;
text-transform: uppercase; color: var(--blue);
```

**Elastic wordmark SVG** (use in footer, height 26px):
```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 687.5 235.6" style="height:26px;width:auto;display:block">
  <title>elastic</title>
  <path d="M236.6 123.5a46.54 46.54 0 0 0-30.8-43.9A67 67 0 0 0 140.2 0 66.72 66.72 0 0 0 86 27.7a35.5 35.5 0 0 0-57.2 28.1A36.77 36.77 0 0 0 31 68.2a46.75 46.75 0 0 0-.1 88 66.66 66.66 0 0 0 119.6 51.6 35 35 0 0 0 21.7 7.6 35.51 35.51 0 0 0 35.5-35.5 36.77 36.77 0 0 0-2.2-12.4 47.08 47.08 0 0 0 31.1-44" fill="#fff"/>
  <path d="M93 101.5l51.8 23.6L197 79.3a54.71 54.71 0 0 0 1.1-11.5 58.35 58.35 0 0 0-106.5-33l-8.7 45.1L93 101.5z" fill="#fed10a"/>
  <path d="M39.4 156.3a56.62 56.62 0 0 0-1.1 11.7 58.58 58.58 0 0 0 107 32.9l8.6-44.9-11.5-22-52-23.7z" fill="#24bbb1"/>
  <path d="M39.1 66.7l35.5 8.4 7.8-40.3a28 28 0 0 0-43.3 31.9" fill="#ef5098"/>
  <path d="M36 75.2a39.1 39.1 0 0 0-1.7 73.7l49.8-45L75 84.4z" fill="#17a8e0"/>
  <path d="M154.3 200.9a28 28 0 0 0 43.2-31.9l-35.4-8.3z" fill="#93c83e"/>
  <path d="M161.5 151.4l39 9.1a39.1 39.1 0 0 0 1.7-73.7l-51 44.7z" fill="#0779a1"/>
  <path fill="#1a1a1a" d="M330.8 165.5l4.7-.5.3 9.6a240.62 240.62 0 0 1-31.8 2.6q-17.55 0-24.9-10.2c-4.9-6.8-7.3-17.4-7.3-31.7q0-42.9 34.1-42.9c11 0 19.2 3.1 24.6 9.2s8.1 15.8 8.1 28.9l-.7 9.3h-53.8c0 9 1.6 15.7 4.9 20s8.9 6.5 17 6.5a230 230 0 0 0 24.8-.8zm-4.4-35.3c0-10-1.6-17.1-4.8-21.2s-8.4-6.2-15.6-6.2-12.7 2.2-16.3 6.5-5.5 11.3-5.6 20.9h42.3zm29.2 45.5v-117h12.2v117h-12.2zm89.3-56.9v40.1c0 4.1 10.1 4.9 10.1 4.9l-.6 10.8c-8.6 0-15.7.7-20-3.4a71.68 71.68 0 0 1-29.3 6.1c-7.5 0-13.2-2.1-17.1-6.4s-5.9-10.3-5.9-18.3 2-13.8 6-17.5 10.3-6.1 18.9-6.9l25.6-2.4v-7c0-5.5-1.2-9.5-3.6-11.9s-5.7-3.6-9.8-3.6h-32.1V92.5h31.3c9.2 0 15.9 2.1 20.1 6.4s6.4 10.9 6.4 19.9zM394.7 152c0 10 4.1 15 12.4 15a65.27 65.27 0 0 0 21.8-3.7l3.7-1.3v-26.9l-24.1 2.3c-4.9.4-8.4 1.8-10.6 4.2s-3.2 5.9-3.2 10.4zm97.9-48.6c-11.8 0-17.8 4.1-17.8 12.4 0 3.8 1.4 6.5 4.1 8.1s8.9 3.2 18.6 4.9 16.5 4 20.5 7.1 6 8.7 6 17.1-2.7 14.5-8.1 18.4-13.2 5.9-23.6 5.9c-6.7 0-29.2-2.5-29.2-2.5l.7-10.6c12.9 1.2 22.3 2.2 28.6 2.2s11.1-1 14.4-3 5-5.4 5-10.1-1.4-7.9-4.2-9.6-9-3.3-18.6-4.8-16.4-3.7-20.4-6.7-6-8.4-6-16.3 2.8-13.8 8.4-17.6 12.6-5.7 20.9-5.7c6.6 0 29.6 1.7 29.6 1.7V105c-12.1-.7-22-1.6-28.9-1.6zm90.4 1.4h-25.9v39c0 9.3.7 15.5 2 18.4s4.6 4.4 9.7 4.4l14.5-1 .8 10.1a111.1 111.1 0 0 1-16.6 1.8c-8.5 0-14.3-2.1-17.6-6.2s-4.9-12-4.9-23.6v-42.9h-11.6V94.2H545v-25h12.1v24.9H583v10.7zm17-29.1V61.6h12.2v14.2zm0 100V94.2h12.2v81.5H600zm65.2-83.2c3.6 0 9.7.7 18.3 2l3.9.5-.5 9.9a187.31 187.31 0 0 0-19.2-1.5c-9.2 0-15.5 2.2-18.8 6.6s-5 12.6-5 24.5 1.5 20.2 4.6 24.9 9.5 7 19.3 7l19.2-1.5.5 10.1c-10.1 1.5-17.7 2.3-22.7 2.3-12.7 0-21.5-3.3-26.3-9.8s-7.3-17.5-7.3-33 2.6-26.4 7.8-32.6 14-9.4 26.2-9.4z"/>
</svg>
```

---

## Slide content

**Title:** "Your next sessions" (or similar — conveys "here's where to go after this talk")
**Eyebrow:** "SKO · Observability Track"
**Subtitle / framing line:** Something short like: *"Don't leave the building without hitting these."*

**Sessions to display** — group them into three tiers:

### Tier 1 — Must-attend (all sales)
| Session | Day | Time | Room |
|---|---|---|---|
| Agentic Observability: Upsell with metrics | Tuesday | 1:30–2:00 PM | Venetian E (Mainstage) |
| Agentic Observability: Land with logs | Tuesday | 2:45–3:20 PM | Venetian G |

### Tier 2 — Sales electives (high demand — both sold out fast)
| Session | Day | Time | Room |
|---|---|---|---|
| Agentic Observability: Investigation with Logs | Wednesday | 4:30–5:00 PM | Titian 4 |
| Agentic Observability: Investigation with Metrics | Wednesday | 5:00–5:30 PM | Titian 3 |

### Tier 3 — Field Engineering only
| Session | Day | Time | Room |
|---|---|---|---|
| O11Y 301 · Agentic Observability | Wednesday | 3:00–4:00 PM | Veronese Back |
| O11Y 301 · Observability Roadmap & Technical Vision | Wednesday | 4:30–5:30 PM | Veronese Back |

*(There is also an Observability 101 session for new hires Tuesday 4:30–5:45 PM in Titian 1 — you may include this as a small footnote or omit it if space is tight.)*

---

## Layout guidance

Use a **two-column layout**: left column for "Must-attend" (Tier 1) and right for "Electives" (Tier 2), with the Field Engineering sessions shown in a narrower row or banner at the bottom — clearly labelled as FE-only so sales reps don't accidentally show up. Each session row/card should show: session name, day + time, and room. Keep it scannable — this is a reference slide people will photograph.

Use color-coding to distinguish tiers:
- Tier 1 (Must-attend): `--blue` top border
- Tier 2 (Electives): amber/gold (`#F5A623`) top border — to signal "go if you signed up"
- Tier 3 (FE-only): muted / dim treatment so it reads as secondary

The slide uses a **dark background** (`#0a0a0a`) with the dot-grid overlay. Animate cards in with staggered `fade-up` delays. Include the Elastic wordmark in the bottom-right footer.

---

## Output

Write the complete, self-contained HTML to `slides/sko-sessions.html`. No external dependencies beyond Google Fonts and the local `/js/fuckslides.js` script tag.
