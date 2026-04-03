# Gallery Lightbox Rewrite — Design Spec
**Date:** 2026-04-03

## Problem

The existing gallery lightbox had several persistent failures on mobile/iOS:

- iOS Safari scroll jump when opening (caused by `overflow:hidden` body scroll lock)
- Nav bar (`z-index: 999998 !important`) covering the top of photos
- 300ms double-tap delay on gallery items (div `onclick` quirk on iOS)
- No prev/next navigation
- Close button hard to find (overlapping image)

## Solution: Native `<dialog>` Lightbox

Replace the custom `<div id="lb">` overlay with the browser's built-in `<dialog>` element.

**Why `<dialog>`:**
- Browser handles scroll lock natively — no iOS position:fixed hack needed
- Browser manages z-index stacking — dialog always renders above everything
- Built-in `Escape` key to close, focus trapping, and ARIA roles
- `dialog::backdrop` provides the dark overlay without a custom div
- Supported: iOS Safari 15.4+, Chrome 37+, Firefox 98+

## Architecture

### HTML
```html
<dialog id="photo-dialog" aria-label="Photo viewer">
  <img id="pd-img" src="" alt="">
  <div id="pd-bar">
    <button class="pd-nav" id="pd-prev">‹</button>
    <div id="pd-info">
      <span id="pd-caption"></span>
      <span id="pd-counter"></span>
    </div>
    <button class="pd-nav" id="pd-next">›</button>
    <button id="pd-close">✕ Close</button>
  </div>
</dialog>
```

### CSS
- `dialog` fills 100vw × 100dvh (uses `dvh` for mobile keyboard safety, fallback `vh`)
- `dialog::backdrop` provides the dark overlay
- `#pd-img` — `flex:1; object-fit:contain` fills all space above the bottom bar
- `#pd-bar` — `flex-shrink:0`, always visible at bottom with safe-area padding for iPhone home bar

### JavaScript
- Inline `onclick` attributes stripped at init; converted to `data-src` / `data-caption`
- Single tap: `touchend` listener prevents 300ms ghost click on iOS
- On open: build `currentPhotos[]` array from the visible album's items
- `photoDialog.showModal()` to open, `photoDialog.close()` to close
- Backdrop click: detected by `e.target === photoDialog`
- Prev/Next: wraps around (last → first)
- Keyboard: `ArrowLeft` / `ArrowRight`; `Escape` handled natively by `<dialog>`
- Swipe: `touchstart` + `touchend` delta, 40px horizontal threshold

## Features Added
- Prev / Next navigation with circular wrap
- Photo counter ("3 / 9")
- Swipe left/right on mobile
- Keyboard arrow navigation on desktop
- Subtle scale + fade animation on photo change
