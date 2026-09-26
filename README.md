# Digital Literacy Hub

Practise the digital decisions that matter: spot a scam, check a claim, protect your data, find opportunity.

A free, no-account digital literacy hub built in Zimbabwe.

## What it is

Digital literacy is deciding well in the ten seconds before you tap. This site is a set of short, interactive situations — a stranger sends you money by mistake, a claim needs checking, a form asks for your details — and you see what each choice would have cost.

## Features

- **Learn** — a skills map covering scam spotting, fact-checking, data protection, and more.
- **Situations** — choose-your-own-outcome scenarios to practise real decisions.
- **Interactive** — hands-on labs for checking claims, reading sources, and analysing images.
- **Assessment** — a 12-question challenge to test what you have learned.
- **My Progress** — track your results across sessions (stored locally).
- **Digital Future** — essays on prosperity, skills, and the internet.
- **About, Glossary, People, Planet, Zimbabwe, Resources** — supporting pages.

## Getting started

Open `index.html` in any modern browser. No build step, no account, no internet required after the first load (the site registers a service worker for offline use).

## Project structure

```
index.html              Home / hero page
about.html              About the project
ai.html                 Artificial intelligence
challenge.html          12-question assessment
glossary.html           Glossary of terms
information.html        Information lab
interactive.html        Interactive index
people.html             People
planet.html             Planet
pledge.html             Digital pledge
progress.html           Progress tracker
prosperity.html         Digital future / prosperity
resources.html          Resources
safety.html             Online safety
situations.html         Situations index
skills.html             Skills map
zimbabwe.html           Zimbabwe context

assets/                 Favicons, logos, icons
css/style.css           Base styles
css/hub.css             Hub-specific styles
js/main.js              Navigation, icons, service worker registration
js/labs.js              Interactive lab logic
js/pledge.js            Pledge interactions
js/scenario.js          Scenario / choose-your-own-outcome engine
js/situations.js        Situations list and filtering
js/icons.js             Icon rendering
manifest.webmanifest    PWA manifest
sw.js                   Service worker for offline caching
```

