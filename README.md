# UNHEARD

A private archive of records you've set aside and not yet played.

Albums come in from the Apple Music catalogue — paste a link or type a name — and
the artwork does the talking. One record is drawn for you each day; up to seven can
be pulled for the week.

---

## Publishing it

1. Create a new repository on GitHub.
2. Upload **everything in this folder** (keep the file names as they are).
3. Repo **Settings → Pages → Source: Deploy from a branch**, branch `main`, folder `/ (root)`, **Save**.
4. Wait a minute, then open `https://<your-username>.github.io/<repo-name>/`.

That's it — there's no build step and no dependencies to install.

### Using your own domain
Add a file named `CNAME` containing just your domain (e.g. `unheard.example.com`),
then point a CNAME DNS record at `<your-username>.github.io`.

---

## Moving your existing archive over

Your records are stored **in your browser**, and browsers keep storage separate per
address. So the copy running on your new web address starts empty — your current
archive isn't lost, it just lives at the old address.

1. Open the copy that *has* your records.
2. **Menu → Export a dated copy** — you'll get `UNHEARD_UH-ARC_<date>_<time>.json`.
3. Open your new GitHub Pages address.
4. **Menu → Import .json** and choose that file.

Do this **before** you retire the old copy.

---

## Your records stay yours

Making the repository public publishes **the app, not your archive**. Your records,
notes and pulls never leave your browser — they aren't in these files and they don't
get committed anywhere. The only outbound request is a catalogue lookup to Apple when
you add an album.

Hosting on GitHub Pages also means HTTPS and a stable address, which is the most
reliable setup for the app's saving. The footer always shows the live state — click
**SAVED** at any time for a per-store breakdown.

---

## Install it on your phone

Once it's live, it can sit on your home screen like a native app.

- **iPhone (Safari):** Share → *Add to Home Screen*
- **Android (Chrome):** menu → *Install app*

It opens full-screen with its own icon, and the shell works offline — though artwork
and adding new albums need a connection.

---

## The files

| File | What it's for |
|---|---|
| `index.html` | The entire app — markup, styles and logic in one file |
| `manifest.webmanifest` | Name, colours and icons for home-screen install |
| `sw.js` | Offline shell. Network-first, so a new deploy is never masked by an old cache |
| `icon-192.png` `icon-512.png` `apple-touch-icon.png` `favicon.svg` `favicon-32.png` | Icons |
| `.nojekyll` | Tells GitHub Pages to serve the files as-is |

Only `index.html` is strictly required. Everything else adds the install, icon and
offline behaviour.

---

## Keybindings

`1` Today · `2` Turn · `3` Pulls · `4` Index · `A` add a record
`←` `→` move through Turn or the open entry · `Enter` open · `P` pull for the week · `Esc` close

## Updating later
Replace `index.html` with a newer copy and re-upload. The service worker is
network-first, so a refresh picks up the new version — no cache clearing needed.
