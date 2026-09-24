## Summary

<!-- What changed and why. Link the issue: Closes #N -->

## Visual change?

<!-- Yes: do not merge until the owner has seen it (preview link or screenshots). -->

## Checklist

- [ ] `npm run build`, `npm run lint` and `npm test` pass
- [ ] **Light and dark** checked (same structure in both, no component only in one)
- [ ] **Spanish and English** checked (Spanish runs about 20% longer)
- [ ] **Desktop and mobile** checked (320px to 1280px), no horizontal scroll, 48px touch targets
- [ ] Colors come from tokens in `src/index.css` (no literals); new tokens have a dark value
- [ ] Text contrast is AA in both themes (`text-secondary` is not used for small text on white)
- [ ] Keyboard: focus visible and logical order; images have `alt` (empty if decorative)
- [ ] Layers respected (pages orchestrate, logic in hooks/services, no network outside `services/http`)
- [ ] User-facing text is in both dictionaries
