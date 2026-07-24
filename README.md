# ASF Information Technology — website

Static marketing site for **ASF Information Technology** (asftech.net).

## Structure

```
.
├── index.html
├── css/styles.css
├── js/main.js
├── assets/            # logo + favicons
├── package.json       # lets Railway (Nixpacks) install & serve the site
├── nixpacks.toml       # explicit start command, belt-and-braces
└── .gitignore
```

No build step — it's plain HTML/CSS/JS. `package.json` just installs the
[`serve`](https://www.npmjs.com/package/serve) package so Railway has a
process to run.

## Preview locally

```bash
npx serve -s .
```

Then open the printed local URL in your browser.

## Push to GitHub

From inside this folder:

```bash
git init
git add .
git commit -m "Initial ASF Information Technology website"
git branch -M main
git remote add origin https://github.com/<your-username>/asf-website.git
git push -u origin main
```

(Create the empty `asf-website` repo on GitHub first — no README/license,
so it doesn't conflict with this history.)

## Deploy on Railway

1. In Railway, **New Project → Deploy from GitHub repo**, and pick the repo
   you just pushed.
2. Railway detects `package.json` and Nixpacks automatically runs
   `npm install` then `npm start` (`serve -s . -l $PORT`) — no extra config
   needed.
3. Once it's deployed, go to the service's **Settings → Networking →
   Custom Domain**, and add `asftech.net` (and `www.asftech.net` if you
   want both).
4. Railway will show one or two DNS records (usually a `CNAME`, sometimes
   an `A`/`ANAME` for the bare root domain) — add those at your domain
   registrar's DNS settings for `asftech.net`. DNS propagation can take a
   few minutes to a few hours.

Every push to `main` after this will auto-redeploy.
