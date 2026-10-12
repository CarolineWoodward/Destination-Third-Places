// =====================================================================
// site.js: shared by index.html and map.html
//   1. color helpers and the washi-tape tag styles
//   2. tag corners (main page) and the tag filter bar (both pages)
//   3. the click-to-open popup
// =====================================================================

const MODAL_NOTE_WIDTH = 300;
const MODAL_MIN_HEIGHT = 340;

// Accent colors, in the same order as the :nth-child rules in site.css.
// map.html reads entries from index.html as plain data, so it needs
// its own copy of this list.
const ACCENT_COLORS = ['#c17b5e', '#6b8ca8', '#d9a441', '#8a9a7e', '#c98b7f', '#5c8a89'];

// ------------------------------------------------------------------
// 1. Tag style system
// ------------------------------------------------------------------
// Same tag text always produces the same color + pattern + tilt, but
// the combination of pattern and color gives far more visual variety
// than a single repeating-stripe look.

const TAG_COLORS = [
  '#c17b5e', '#6b8ca8', '#d9a441', '#8a9a7e', '#c98b7f',
  '#5c8a89', '#a3684f', '#7d6b9e', '#b5566b', '#4f6d5c'
];
const TAG_ROTATIONS = [-7, -5, -3, 3, 5, 7];

// Six distinct washi-tape patterns; each takes a base color and a
// lighter accent derived from it.
const TAG_PATTERNS = [
  (c, light) => `background-color:${c};`,
  (c, light) => `background-color:${c}; background-image: repeating-linear-gradient(45deg, transparent, transparent 5px, ${light} 5px, ${light} 10px);`,
  (c, light) => `background-color:${c}; background-image: radial-gradient(${light} 1.8px, transparent 1.8px); background-size:9px 9px;`,
  (c, light) => `background-color:${c}; background-image: repeating-linear-gradient(-45deg, transparent, transparent 4px, ${light} 4px, ${light} 8px);`,
  (c, light) => `background-color:${c}; background-image: linear-gradient(90deg, ${light} 1px, transparent 1px), linear-gradient(0deg, ${light} 1px, transparent 1px); background-size:8px 8px;`,
  (c, light) => `background-color:${c}; background-image: repeating-linear-gradient(0deg, transparent, transparent 5px, ${light} 5px, ${light} 10px);`
];

function hashText(text, salt) {
  let hash = 0;
  const s = salt + text;
  for (let i = 0; i < s.length; i++) {
    hash = (hash * 31 + s.charCodeAt(i)) % 100000;
  }
  return Math.abs(hash);
}

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.substring(0, 2), 16),
    g: parseInt(h.substring(2, 4), 16),
    b: parseInt(h.substring(4, 6), 16)
  };
}

function lighten(hex, amount) {
  const { r, g, b } = hexToRgb(hex);
  const mix = (channel) => Math.round(channel + (255 - channel) * amount);
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`;
}

function darken(hex, amount) {
  const { r, g, b } = hexToRgb(hex);
  const mix = (channel) => Math.round(channel * (1 - amount));
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`;
}

// The glossy pushpin look, used on popup photos/quotes and map pins.
function pushpinGradient(accentColor) {
  return `radial-gradient(circle at 35% 35%, ${lighten(accentColor, 0.55)}, ${accentColor} 55%, ${darken(accentColor, 0.3)} 100%)`;
}

function makePushpin(accentColor) {
  const pin = document.createElement('div');
  pin.className = 'pushpin';
  pin.style.backgroundImage = pushpinGradient(accentColor);
  return pin;
}

// Picks readable text color + a matching shadow so the label stays
// legible regardless of how busy or dark the tape pattern underneath is.
function getTextStyle(hex) {
  const { r, g, b } = hexToRgb(hex);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  if (luminance > 0.58) {
    return {
      color: '#2b2116',
      shadow: '0 1px 0 rgba(255,255,255,0.75), 0 -1px 0 rgba(255,255,255,0.5), 1px 0 0 rgba(255,255,255,0.5), -1px 0 0 rgba(255,255,255,0.5)'
    };
  }
  return {
    color: '#fdf6e3',
    shadow: '0 2px 3px rgba(0,0,0,0.75), 0 0 4px rgba(0,0,0,0.5)'
  };
}

function applyTagStyle(el, tagText, includeRotation) {
  const key = tagText.trim().toLowerCase();
  const colorIndex = hashText(key, 'color') % TAG_COLORS.length;
  const patternIndex = hashText(key, 'pattern') % TAG_PATTERNS.length;
  const rotIndex = hashText(key, 'rotation') % TAG_ROTATIONS.length;

  const color = TAG_COLORS[colorIndex];
  const light = lighten(color, 0.4);
  const textStyle = getTextStyle(color);

  el.style.cssText += TAG_PATTERNS[patternIndex](color, light);
  el.style.color = textStyle.color;
  el.style.textShadow = textStyle.shadow;
  if (includeRotation) {
    el.style.transform = `rotate(${TAG_ROTATIONS[rotIndex]}deg)`;
  }
}

// ------------------------------------------------------------------
// 2. Tag corners + filter bar
// ------------------------------------------------------------------

// Main page only: builds the corner tape tags on each photo, reading
// from the hidden .tag-chip data inside each entry's caption.
function addTagCorners(entries) {
  entries.forEach(function (entry) {
    const polaroid = entry.querySelector('.polaroid');
    const chips = Array.from(entry.querySelectorAll('.tag-chip'));
    if (!polaroid || chips.length === 0) return;

    const tagCorner = document.createElement('div');
    tagCorner.className = 'tag-corner';
    chips.forEach(function (chip) {
      const strip = document.createElement('div');
      strip.className = 'tag-strip';
      strip.textContent = chip.textContent.trim();
      applyTagStyle(strip, chip.textContent, true);
      tagCorner.appendChild(strip);
    });
    polaroid.appendChild(tagCorner);
  });
}

// Both pages: builds one filter button per unique tag. Clicking buttons
// hides/shows entries (adds/removes the "hidden" class), then calls
// onChange() so a page can react (the map page updates its pins).
function setupFilterBar(entries, onChange) {
  const filterBar = document.getElementById('filterBar');
  if (!filterBar) return;

  const allTags = new Set();
  entries.forEach(function (entry) {
    entry.querySelectorAll('.tag-chip').forEach(function (chip) {
      allTags.add(chip.textContent.trim());
    });
  });

  const activeTags = new Set();

  allTags.forEach(function (tagText) {
    const btn = document.createElement('button');
    btn.className = 'filter-tag';
    btn.textContent = tagText;
    applyTagStyle(btn, tagText, false);
    btn.onclick = function () {
      if (activeTags.has(tagText)) {
        activeTags.delete(tagText);
        btn.classList.remove('active');
      } else {
        activeTags.add(tagText);
        btn.classList.add('active');
      }
      applyFilter(entries, activeTags);
      if (onChange) onChange();
    };
    filterBar.appendChild(btn);
  });
}

function applyFilter(entries, activeTags) {
  entries.forEach(function (entry) {
    const entryTags = Array.from(entry.querySelectorAll('.tag-chip')).map(function (c) {
      return c.textContent.trim();
    });
    const shouldShow = activeTags.size === 0 || entryTags.some(function (t) {
      return activeTags.has(t);
    });
    entry.classList.toggle('hidden', !shouldShow);
  });
}

// ------------------------------------------------------------------
// 3. Popup
// ------------------------------------------------------------------

function sizeMainFrame(imgEl) {
  const modalFrame = document.getElementById('modalFrame');
  const maxFrameHeight = window.innerHeight * 0.6;
  const maxAllowedWidth = (window.innerWidth * 0.9) - MODAL_NOTE_WIDTH;

  let renderedHeight = Math.min(maxFrameHeight, imgEl.naturalHeight);
  let renderedWidth = (imgEl.naturalWidth / imgEl.naturalHeight) * renderedHeight;
  if (renderedWidth > maxAllowedWidth) {
    renderedWidth = maxAllowedWidth;
    renderedHeight = (imgEl.naturalHeight / imgEl.naturalWidth) * renderedWidth;
  }
  if (renderedHeight < MODAL_MIN_HEIGHT) {
    renderedHeight = MODAL_MIN_HEIGHT;
    renderedWidth = (imgEl.naturalWidth / imgEl.naturalHeight) * renderedHeight;
    if (renderedWidth > maxAllowedWidth) renderedWidth = maxAllowedWidth;
  }
  modalFrame.style.width = renderedWidth + 'px';
  modalFrame.style.height = renderedHeight + 'px';
  return { width: renderedWidth, height: renderedHeight };
}

// entryEl is an .entry element. On the main page it's a live element;
// on the map page it comes from index.html parsed as data, in which
// case entryEl.dataset.accent holds its accent color.
function openModal(entryEl) {
  const mainImg = entryEl.querySelector('.frame img');
  const titleHTML = entryEl.querySelector('.entry-title').outerHTML;
  const locationEl = entryEl.querySelector('.entry-location');
  const locationHTML = locationEl ? locationEl.outerHTML : '';
  const textHTML = entryEl.querySelector('.entry-text').outerHTML;
  const extraImgs = Array.from(entryEl.querySelectorAll('.gallery img'));
  const quoteSources = Array.from(entryEl.querySelectorAll('.quotes .quote'));

  const modalImg = document.getElementById('modalImg');
  const modalBranch = document.getElementById('modalBranch');
  const branchFrames = document.getElementById('branchFrames');
  const modalQuoteBranch = document.getElementById('modalQuoteBranch');
  const quoteCards = document.getElementById('quoteCards');
  const modalBox = document.getElementById('modalBox');
  const modalOverlay = document.getElementById('modalOverlay');

  const accentColor = entryEl.dataset.accent || getComputedStyle(entryEl).getPropertyValue('--accent').trim();
  modalBox.style.setProperty('--modal-accent', accentColor);
  modalOverlay.style.setProperty('--modal-accent', accentColor);

  document.getElementById('modalNote').innerHTML = titleHTML + locationHTML + textHTML;
  modalOverlay.classList.add('open');
  branchFrames.innerHTML = '';
  quoteCards.innerHTML = '';

  modalImg.onload = function () {
    sizeMainFrame(modalImg);

    if (extraImgs.length > 0) {
      modalBranch.classList.add('show');
      extraImgs.forEach(function (imgSource) {
        const branchFrame = document.createElement('div');
        branchFrame.className = 'branch-frame';
        const img = document.createElement('img');
        img.src = imgSource.getAttribute('src');
        img.alt = imgSource.getAttribute('alt') || '';
        branchFrame.appendChild(img);
        branchFrame.appendChild(makePushpin(accentColor));
        branchFrames.appendChild(branchFrame);
      });
    } else {
      modalBranch.classList.remove('show');
    }

    if (quoteSources.length > 0) {
      modalQuoteBranch.classList.add('show');
      const tint = lighten(accentColor, 0.88);
      quoteSources.forEach(function (quoteEl) {
        const card = document.createElement('div');
        card.className = 'quote-card';
        card.innerHTML = quoteEl.innerHTML;
        card.style.background = tint;
        card.style.borderColor = accentColor;
        card.appendChild(makePushpin(accentColor));
        quoteCards.appendChild(card);
      });
    } else {
      modalQuoteBranch.classList.remove('show');
    }
  };
  modalImg.src = mainImg.getAttribute('src');
  modalImg.alt = mainImg.getAttribute('alt') || '';
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
}

function closeModalOnBackdrop(e) {
  if (e.target.id === 'modalOverlay') closeModal();
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeModal();
});
