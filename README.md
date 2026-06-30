# My website

This is my little corner of the internet — a personal site and somewhere to
write things down now and then.

It's deliberately simple: hand-written HTML and CSS, one small JavaScript file,
and that's about it. No framework, no build step, nothing to `npm install`. I
wanted something I fully understand and that'll still work in ten years.

I work in security, so I also like that there's almost nothing here to go wrong —
no dependencies to patch, no third-party scripts, no tracking. It loads fast and
keeps to itself.

## Running it locally

It's just static files, so any static server does the job. With Python:

```sh
python -m http.server 8000
```

Then open <http://localhost:8000>.

## Writing a post

No CMS, no build. To add a post:

1. Copy `writing/post-template.html` to `writing/some-slug.html`.
2. Fill in the title, date, and body. The template has examples for code blocks,
   images, and video.
3. Add a line for it at the top of the list in `writing/index.html`.

Code blocks get syntax highlighting from a self-hosted copy of highlight.js, so
even that makes no outside requests.

## The doodles

On a wide screen there are a few faint doodles floating above the headline on the
home page — things I like. Click them. That's the whole feature; I just had fun
with it.

## How it's laid out

- `index.html` — home
- `writing/` — the blog
- `projects/` — projects, including Yonder
- `assets/` — styles, fonts, the dark-mode toggle, the doodles, my résumé
- `_headers` — security headers (applied by Cloudflare)

Colours, fonts, and spacing live as CSS variables at the top of
`assets/style.css`, so the whole look changes from one place.

## Deploying

Hosted on Cloudflare Pages. It's static, so there's nothing to build — I just set
the build command to `rm -f writing/post-template.html` so the blank template
stays here as a reference but doesn't ship.

---

Built by hand. Borrow anything you find useful.
