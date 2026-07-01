# SKO FY27 — Main Stage Presentation

Elastic Observability SKO FY27 main stage deck — built with [fuckSlides](https://github.com/bahaaldine/fuckslides).

34 slides covering the observability market, Elastic's differentiation, migration story, AI-driven observability, and the Nightshift reveal.

---

## Requirements

- [Node.js](https://nodejs.org) 18+
- [fuckSlides](https://github.com/bahaaldine/fuckslides): `npm install -g fuck-slides`

## Start

```bash
cd 2026-05-19-sko-main-stage
fuckslides serve
```

Opens at **http://localhost:3000**

## Navigate

| Key | Action |
|-----|--------|
| `→` / `Space` | Next slide |
| `←` | Previous slide |
| `G` | Slide overview — drag to reorder, `↑↓←→` navigate, `Enter` to jump |
| `T` | Filmstrip |
| `P` | Presenter view (current + next slide, notes, timer) |
| `F` | Fullscreen |
| `C` | Start / pause timer |
| `R` | Reset timer |
| `L` | Laser pointer |
| `D` | Draw mode |
| `Z` | Toggle slide transitions |
| `Esc` | Close overlay |

## Export

```bash
# Self-contained single HTML file (no server needed)
fuckslides export

# PowerPoint
fuckslides pptx

# PDF
fuckslides pdf
```

## Slide order

Slide order is saved in `fuckslides.config.js`. Reordering in the overview grid (`G`) auto-saves back to the config.
