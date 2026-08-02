# KREO — demo

Static prototype. No build step, no backend, no environment variables.

```
repo root/
  index.html     the whole app
  vercel.json    headers + noindex
  robots.txt     blocks crawlers
  .gitignore
```

---

## The one thing that breaks a linked repo

Vercel builds from the **repo root** by default. If `index.html` sits in a
subfolder, you get a 404 with no build error — nothing failed, Vercel just
found nothing to serve.

Pick one:

- **Files at repo root** (simplest). Leave Root Directory blank.
- **Files in a subfolder.** Project → Settings → General → **Root Directory**
  → set it to that folder name.

`vercel.json` must live in whichever directory Vercel treats as the root. In a
subfolder it is silently ignored, and you lose the noindex headers without
being told.

---

## Push

If the repo is already linked, deploying is a push.

```bash
# from the repo
cp /path/to/index.html /path/to/vercel.json /path/to/robots.txt .
cp /path/to/.gitignore .

git add index.html vercel.json robots.txt .gitignore
git commit -m "KREO demo build"
git push
```

Vercel builds on push. Framework preset should be **Other**, build command and
output directory both empty. If the project was created expecting a framework,
change it in Settings → General → Build & Development Settings, then redeploy —
the setting does not apply retroactively.

## Branch behaviour

- `main` → production URL
- any other branch → its own preview URL

Use a `demo` branch for the client and keep `main` clean. You then iterate on
`demo` without changing the link they have open, and the preview URL is also
what free-tier password protection covers.

```bash
git checkout -b demo
git push -u origin demo
```

---

## Protect it before sending the link

Project → Settings → **Deployment Protection** → Password Protection.

`robots.txt` and the `X-Robots-Tag` header stop crawlers. They do not stop a
person with the URL. On the free tier, protection covers **preview**
deployments — so send the client the preview URL, not production.

---

## Works deployed, not locally

HTTPS enables three things that fail when you open the file directly:

- **Geolocation** — "Use my location"
- **Clipboard** — share sheet copy
- **Map tiles** — Leaflet loads reliably

Re-test these after the first deploy. They are the parts you cannot check by
double-clicking the file.

---

## Before the client sees it

- [ ] Replace the demo hosts with **real committed organisers**
- [ ] Swap Unsplash covers for real event photos — hotlinked images fail on
      restrictive networks and the layout goes blank
- [ ] Open it on a phone, on mobile data
- [ ] Have an answer ready for "is this live?"

## Known limits — say these before they are found

- **Data resets on refresh.** Bookings, saves and check-ins are in memory.
- **Sign-in is theatre.** Either button works; nothing is checked.
- **Role guards are client-side.** Devtools makes anyone a host.
- **No payments.** Stripe checkout is UI only.
- **Images are hotlinked** from a third-party CDN.

These are not bugs to fix here. They are why the production build is separate
work.

---

## When this repo becomes production

It will be tempting to keep building on this. Two rules from day one:

1. **Never commit `.env`.** The `.gitignore` covers it. Vercel env vars are set
   in the dashboard, never in the repo.
2. **The Supabase service-role key is server-side only.** In client code it
   bypasses every row-level security policy you write.

## Custom domain

Settings → Domains. Point a subdomain such as `demo.kreo.ae` at it rather than
the apex, so the real site can launch on the apex later without a migration.
