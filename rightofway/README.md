# RIGHTOFWAY — Redesign

## What's in here

```
index.html                          → main landing page
designer-information-booklet.html   → full designer FAQ/guide page
css/styles.css                      → shared design system (colors, type, layout)
css/booklet.css                     → styles specific to the booklet page
js/main.js                          → scroll-reveal animation
images/                             → logo, favicon
images/photos/                      → background & feature photography
files/RIGHTOFWAY-Information-Deck.pdf → your existing PDF deck (unchanged, still linked)
```

This keeps the same file layout as your current GitHub Pages repo (index.html,
css/, images/, files/) so you can drop it straight into that repo. Your CNAME
and 404.html can stay as-is.

## Photos — please swap these

The photography currently used is extracted directly from your existing
Information Deck PDF, as placeholders:

- `photo-madrid-intersection.jpg` — hero background
- `photo-buenosaires-aerial.jpg` — "Our Approach" band
- `photo-westpalmbeach-street.jpg` — "Value for Designers"
- `photo-dc-street.jpg` — pilot episode placeholder frame
- `team-mateo-crop.jpg` / `team-benja-crop.jpg` — reused as-is from the deck's
  "Who We Are" slide (already bio-captioned, so left untouched)

Two extra images (`photo-madrid-aerial.jpg`, `photo-florida-boardwalk.jpg`)
are included but unused — spares if you want to swap a section's photo.

Since you mentioned having more/better high-res photography, swap any of the
above by replacing the file (keep the same filename) or updating the
`background-image` / `src` reference in the HTML.

## Pilot episode section

Built deliberately low-key per your instructions: no public embed, just a
still frame and a "preview available on request" note with a mailto link.
When you're ready to go public, replace `#pilot .pilot-frame` with a proper
`<iframe>` YouTube embed (unlisted or public) — the surrounding box styling
will still apply.

## One content update made

The Designer Info Booklet's "Next Steps" section had a stale timeline
("contact designers by end of 2025... publish by mid-2026") left over from
before production started. I updated it to reflect that the pilot is now in
final production, without inventing new dates — you'll want to tighten that
further once you have a real public launch date.

## Fonts

Uses Google Fonts (Overpass, IBM Plex Sans, IBM Plex Mono) loaded via
`<link>` tags — no local font files needed, works on any standard web host.

## Known limitation of this preview

I don't have a real browser available in this environment to screenshot the
final result, so QA screenshots were taken with an older rendering engine
that doesn't support CSS Grid or flexbox `gap` — meaning some things that
looked stacked/cramped in my previews (nav spacing, the two-column cards,
team photos) will render correctly side-by-side in any real browser (Chrome,
Safari, Firefox, Edge). Worth a quick visual check once it's live.
