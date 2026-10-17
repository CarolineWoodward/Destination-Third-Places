/* site.css: styles for index.html and map.html */

@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Poppins:wght@400;500&family=Space+Mono:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', sans-serif;
  background-color: #faf6ef;
  background-image: radial-gradient(#dcd5c7 1px, transparent 1px);
  background-size: 22px 22px;
  color: #3a3a3a;
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px 30px 100px;
}

h1 {
  font-family: 'Caveat', cursive;
  font-weight: 700;
  font-size: 3rem;
  color: #2b2b2b;
  margin-bottom: 6px;
}

.subtitle {
  font-size: 0.95rem;
  line-height: 1.6;
  max-width: 640px;
  color: #555;
  margin-bottom: 36px;
}

/* ---------------------------------------------------------------- */
/* Filter bar                                                        */
/* ---------------------------------------------------------------- */

.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 50px;
  align-items: center;
}

.filter-label {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #888;
  margin-right: 4px;
}

.filter-tag {
  cursor: pointer;
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 7px 16px;
  border: none;
  border-radius: 2px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
  opacity: 0.8;
  transition: transform 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease;
}

.filter-tag:hover {
  opacity: 1;
  transform: translateY(-2px);
}

.filter-tag.active {
  opacity: 1;
  outline: 2px solid #2b2b2b;
  outline-offset: 2px;
  transform: translateY(-2px);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

/* ---------------------------------------------------------------- */
/* Entry grid + polaroid cards                                       */
/* ---------------------------------------------------------------- */

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 70px 40px;
}

@media (max-width: 900px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

.entry {
  cursor: pointer;
}

.entry.hidden {
  display: none;
}

/* Accent color cycles every 6 entries */
.entry:nth-child(6n+1) { --accent: #c17b5e; }
.entry:nth-child(6n+2) { --accent: #6b8ca8; }
.entry:nth-child(6n+3) { --accent: #d9a441; }
.entry:nth-child(6n+4) { --accent: #8a9a7e; }
.entry:nth-child(6n+5) { --accent: #c98b7f; }
.entry:nth-child(6n+6) { --accent: #5c8a89; }

/* Alternating tilt */
.entry:nth-child(odd) .polaroid { --rot: -3deg; }
.entry:nth-child(even) .polaroid { --rot: 2.5deg; }

.polaroid {
  position: relative;
  background: #fff;
  padding: 12px 12px 34px;
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.15);
  transform: rotate(var(--rot, -2deg));
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.entry:hover .polaroid {
  transform: rotate(0deg) scale(1.03);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.2);
}

.tape {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%) rotate(-4deg);
  width: 64px;
  height: 22px;
  background: var(--accent);
  opacity: 0.85;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
}

.frame {
  width: 100%;
  background: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  min-height: 160px;
}

.frame img {
  width: 100%;
  display: block;
}

/* Tape tags, bottom-right corner of the photo */
.tag-corner {
  position: absolute;
  bottom: 30px;
  right: -10px;
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-end;
  gap: 6px;
  z-index: 5;
}

.tag-strip {
  padding: 5px 12px;
  font-family: 'Space Mono', monospace;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  white-space: nowrap;
  border-radius: 1px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.35);
}

/* ---------------------------------------------------------------- */
/* Caption text                                                      */
/* ---------------------------------------------------------------- */

.caption {
  margin-top: 16px;
}

.entry-title {
  font-family: 'Caveat', cursive;
  font-weight: 700;
  font-size: 1.6rem;
  color: #2b2b2b;
  margin-bottom: 2px;
}

.entry-location {
  font-family: 'Space Mono', monospace;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 6px;
}

.entry-text {
  font-size: 0.85rem;
  line-height: 1.5;
  color: #555;
}

.entry-hint {
  font-family: 'Space Mono', monospace;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: var(--accent);
  margin-top: 8px;
}

/* Hidden data-source containers: their content is read by JS and
   rendered elsewhere (tag corner, popup gallery, popup quotes), so
   none of these three show up directly on the main grid. */
.tags { display: none; }
.gallery { display: none; }
.quotes { display: none; }

/* ---------------------------------------------------------------- */
/* "Explore the map" link (main page)                                 */
/* ---------------------------------------------------------------- */

.map-link {
  position: relative;
  display: inline-block;
  margin-bottom: 34px;
  padding: 14px 34px 12px;
  font-family: 'Caveat', cursive;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
  text-decoration: none;
  color: #3b2f26;
  background-color: #fffaf0;
  border: 2px dashed rgba(59, 47, 38, 0.4);
  /* ticket-stub notches on the left and right edges */
  -webkit-mask: radial-gradient(circle at 0 50%, transparent 8px, #000 8.5px) left / 51% 100% no-repeat,
                radial-gradient(circle at 100% 50%, transparent 8px, #000 8.5px) right / 51% 100% no-repeat;
  mask: radial-gradient(circle at 0 50%, transparent 8px, #000 8.5px) left / 51% 100% no-repeat,
        radial-gradient(circle at 100% 50%, transparent 8px, #000 8.5px) right / 51% 100% no-repeat;
  filter: drop-shadow(0 3px 4px rgba(0, 0, 0, 0.22));
  transform: rotate(-1.5deg);
  transition: transform 0.15s ease, filter 0.15s ease;
}

/* a little arrow, like "this way" on a luggage tag */
.map-link::after {
  content: '\2192';
  margin-left: 10px;
  color: #c17b5e;
}

.map-link:hover {
  transform: rotate(0deg) translateY(-2px);
  filter: drop-shadow(0 6px 8px rgba(0, 0, 0, 0.25));
}

/* ---------------------------------------------------------------- */
/* Map page                                                           */
/* ---------------------------------------------------------------- */

.back-link {
  display: inline-block;
  margin-bottom: 22px;
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  text-decoration: none;
  color: #555;
}

.back-link:hover {
  color: #2b2b2b;
  text-decoration: underline;
}

.map-polaroid {
  --accent: #6b8ca8;
  position: relative;
  background: #fff;
  padding: 12px;
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.15);
}

#map {
  height: 72vh;
  min-height: 460px;
  width: 100%;
  background: #e8e2d4;
  isolation: isolate; /* keeps Leaflet's internal z-indexes below the popup */
}

.map-status {
  margin-top: 16px;
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: #888;
}

.leaflet-container {
  font-family: 'Poppins', sans-serif;
}

/* Pins */
.map-pin-icon {
  background: none;
  border: none;
}

.map-pin {
  position: relative;
  width: 22px;
  height: 34px;
  cursor: pointer;
  transform-origin: 50% 100%;
  transition: transform 0.15s ease;
}

.map-pin:hover {
  transform: translateY(-3px) scale(1.1);
}

.map-pin-head {
  position: absolute;
  top: 0;
  left: 0;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  box-shadow:
    0 3px 5px rgba(0, 0, 0, 0.45),
    inset -3px -3px 4px rgba(0, 0, 0, 0.3),
    inset 3px 3px 4px rgba(255, 255, 255, 0.5);
}

.map-pin-needle {
  position: absolute;
  top: 20px;
  left: 50%;
  width: 2px;
  height: 14px;
  margin-left: -1px;
  background: linear-gradient(#8a8a8a, #333);
  border-radius: 0 0 1px 1px;
}

.leaflet-tooltip.map-tooltip {
  font-family: 'Caveat', cursive;
  font-weight: 700;
  font-size: 1.15rem;
  color: #2b2b2b;
  background: #fff;
  border: none;
  border-radius: 2px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  padding: 2px 10px;
}

/* Softens OpenStreetMap's colors slightly to suit the cream paper look.
   Only affects the map tiles, not the pins. Delete to see the original. */
.leaflet-tile-pane {
  filter: sepia(0.25) saturate(0.85);
}

@media (max-width: 600px) {
  #map {
    height: 60vh;
    min-height: 340px;
  }
}

/* ---------------------------------------------------------------- */
/* Modal pop-up                                                       */
/* ---------------------------------------------------------------- */

.modal-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background-color: color-mix(in srgb, var(--modal-accent, #d98c3f) 14%, #faf6ef);
  background-image: radial-gradient(color-mix(in srgb, var(--modal-accent, #d98c3f) 45%, #dcd5c7) 1px, transparent 1px);
  background-size: 22px 22px;
  align-items: flex-start;
  justify-content: center;
  z-index: 100;
  padding: 40px 30px;
  overflow-y: auto;
}

.modal-overlay.open {
  display: flex;
}

.modal-box {
  width: auto;
  max-width: 90vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  padding: 20px 20px 26px;
  border-radius: 3px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.45);
  transform: rotate(-1deg);
  position: relative;
}

.modal-tape {
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%) rotate(-3deg);
  width: 80px;
  height: 26px;
  background: var(--modal-accent, #d98c3f);
  opacity: 0.85;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.modal-top-row {
  display: flex;
  flex-direction: row;
  align-items: stretch;
}

.modal-frame {
  background: var(--modal-accent, #d98c3f);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60vh;
  flex: 0 0 auto;
}

.modal-frame img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  display: block;
}

.modal-note {
  flex: 0 0 300px;
  min-height: 0;
  background: #fdf8ee;
  color: #3a3a3a;
  padding: 26px 28px;
  font-size: 1rem;
  line-height: 1.6;
  border-left: 6px solid var(--modal-accent, #d98c3f);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.modal-note .entry-title {
  font-family: 'Caveat', cursive;
  font-weight: 700;
  font-size: 1.4rem;
  color: #2b2b2b;
  margin-bottom: 10px;
}

.modal-note .entry-location {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: var(--modal-accent);
  margin-top: -6px;
  margin-bottom: 10px;
}

.modal-note .entry-text {
  color: #555;
  font-size: 1rem;
}

/* Extra photos and review quotes sit side by side below the main
   photo + note row (they wrap onto separate lines on narrow screens). */
.modal-extras {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 10px 44px;
  max-width: 100%;
}

/* Extra photos, pinned */
.modal-branch {
  display: none;
}

.modal-branch.show {
  display: flex;
  margin-top: 28px;
}

.branch-frames {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  justify-content: center;
}

.branch-frame {
  position: relative;
  display: inline-block;
  cursor: default;
}

.branch-frame img {
  display: block;
  max-width: 340px;
  max-height: 400px;
  width: auto;
  height: auto;
  border-radius: 4px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35);
}

.branch-frame:nth-child(odd) { transform: rotate(-2deg); }
.branch-frame:nth-child(even) { transform: rotate(1.5deg); }

/* Review quotes, pinned and stacked in a column beside the photos */
.modal-quote-branch {
  display: none;
}

.modal-quote-branch.show {
  display: flex;
  margin-top: 28px;
}

.quote-cards {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  max-width: min(300px, 85vw);
}

.quote-card {
  position: relative;
  max-width: 270px;
  padding: 22px 22px 20px;
  border-radius: 2px;
  border: 2px solid;
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.3);
  font-size: 0.95rem;
  line-height: 1.55;
  font-style: italic;
  color: #2b2b2b;
}

.quote-card:nth-child(odd) { transform: rotate(-2.5deg); }
.quote-card:nth-child(even) { transform: rotate(2deg); }

.quote-source {
  display: block;
  margin-top: 9px;
  font-family: 'Space Mono', monospace;
  font-style: normal;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  opacity: 0.7;
}

.pushpin {
  position: absolute;
  top: -9px;
  left: 50%;
  transform: translateX(-50%);
  width: 15px;
  height: 15px;
  border-radius: 50%;
  box-shadow:
    0 3px 5px rgba(0, 0, 0, 0.5),
    inset -2px -2px 3px rgba(0, 0, 0, 0.35),
    inset 2px 2px 3px rgba(255, 255, 255, 0.5);
  z-index: 6;
}

.modal-close {
  position: fixed;
  top: 20px;
  right: 28px;
  background: none;
  border: none;
  color: #2b2b2b;
  font-size: 2.2rem;
  line-height: 1;
  cursor: pointer;
  z-index: 101;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.6);
}
