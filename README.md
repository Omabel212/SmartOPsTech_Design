# SmartOpsTech

A static website for Juliet Ihuoma Uzoeshi's industrial automation, software and applied AI practice. Designed for Vercel, using HTML, CSS, JavaScript and locally hosted fonts.

## Edit and build

The content and shared page templates live in `scripts/build-pages.py`. Edit that file, then run:

```sh
python3 scripts/build-pages.py
node --check assets/site.js
```

This writes the ready-to-serve HTML pages and sitemap into the repository root. Vercel can serve the root directly with the Other framework preset; there is no Node dependency installation or application server.

- `assets/site.css`: responsive layouts, colours and motion preferences.
- `assets/site.js`: navigation, project filters, demo scenarios and the email draft builder.
- `assets/fonts.css` and `assets/fonts/`: self-hosted Manrope and IBM Plex Mono, with their OFL licences.
- `assets/social-card.svg`: editable source of the sharing image.
- `docs/REDESIGN_REVIEW.md`: scope, audit findings, checks and publication notes.

## Behaviour

The intelligence dashboard is an explicitly labelled simulation. Project walkthroughs link to their public source repositories and distinguish demonstrations from future integration work.

The enquiry form validates input and prepares a local email draft. Visitors review the text and open their own email app or copy it. The site does not send, save or log form contents, and has no email delivery service. With JavaScript unavailable, a direct email link remains available and the submit button stays disabled. No analytics or advertising scripts are included.

The Academy pages describe learning themes and enquiry options. They do not sell courses, take payments or promise accreditation.

## Deployment

Production address: https://smartopstech.com

Review the redesign on its branch and Vercel preview before merging. The existing Vercel Git integration should create a preview for non-production branches. Confirm the preview's content and the intended project before merging into the production branch.

The original home, training, blog and article routes remain available. The homepage retains its established section anchors. Custom error, privacy, research, work and contact pages are included.
