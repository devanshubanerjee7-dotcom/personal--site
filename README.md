# Devanshu Banerjee — Builder's Command Center

A production-quality personal portfolio website built with plain HTML5, CSS3, and vanilla JavaScript. No build step, frameworks, or backend required.

## Live preview

Open `index.html` directly in any modern web browser:

```bash
# macOS
open index.html

# Linux
xdg-open index.html

# Windows
start index.html
```

Or serve the folder with any static file server for testing:

```bash
python3 -m http.server 8000
# Then visit http://localhost:8000
```

## Project structure

```
.
├── index.html          # Main page and content
├── style.css           # All styles (no framework)
├── script.js           # Vanilla JS interactions
├── assets/
│   └── favicon.svg     # Site favicon
└── README.md           # This file
```

## Features

- Single-page portfolio with semantic HTML
- Sticky navigation with scroll state and active section highlighting
- Mobile-first responsive design (320px to 1440px+)
- Accessible keyboard navigation and skip link
- `prefers-reduced-motion` support
- Scroll-reveal animations via IntersectionObserver
- Custom CSS-built system diagram in hero
- Honest project statuses and no fabricated metrics
- Editable placeholders for contact details and unverified links

## Customization guide

### 1. Email address

In `index.html`, replace:

```html
<a href="mailto:hello@example.com" class="contact-card__value contact-card__value--email" id="email-link">hello@example.com</a>
```

with your real email. The copy button will automatically enable itself once the placeholder is replaced.

### 2. LinkedIn URL

In `index.html`, replace:

```html
<span class="contact-card__value contact-card__value--placeholder">Add verified URL</span>
```

with a real link:

```html
<a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" class="contact-card__value">linkedin.com/in/yourprofile</a>
```

Also update the footer placeholder link:

```html
<a href="#" class="footer__link footer__link--placeholder" aria-disabled="true" tabindex="-1">LinkedIn</a>
```

### 3. Meta Lead Agent repository URL

In `index.html`, replace:

```html
<span class="project-card__placeholder">Repository link to be verified before publication</span>
```

with a verified GitHub link.

### 4. Domain and Open Graph metadata

In `index.html`, replace all `https://example.com` placeholders with your real domain and update the `og:image` path.

### 5. Currently building panel

Edit the `.current-build` block in `index.html` to reflect your current priorities.

### 6. Colors and typography

All design tokens are defined as CSS custom properties at the top of `style.css`.

## Items requiring your input before publication

- [ ] Real email address
- [ ] Verified LinkedIn URL
- [ ] Verified Meta Lead Agent repository URL
- [ ] Real domain / canonical URL
- [ ] Social sharing image (`assets/og-image.png`)
- [ ] Updated "Currently building and learning" panel
- [ ] Verified Agency Agents description and feature list

## Claims and statuses to verify

- **Deevuh:** Distinguish implemented features from planned or pending features before claiming they are live.
- **Meta Ads Client Acquisition System:** This is a workflow design project. Do not publish conversion rates, lead counts, or revenue figures without verified data.
- **Meta Lead Agent:** Verify repository URL and confirm which stages (AI qualification, orchestration, outreach) are implemented vs. planned.
- **Agency Agents:** Verify exact functionality; the current description is provisional.

## Browser support

Tested and designed for:

- Chrome / Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

© Devanshu Banerjee. All rights reserved.
