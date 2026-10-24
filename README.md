# Zahra Health Clinic website

Static HTML, CSS and JavaScript website. HTML pages stay in the project root so existing `.html` URLs and links remain unchanged.

## Project layout

- `*.html`: public website pages.
- `css/`: shared styles, responsive navigation, page imagery and chatbot styles.
- `scripts/script.js`: shared website interactions and booking forms.
- `scripts/chatbot/`: chatbot interface, matching engine and generated knowledge.
- `assets/logo/`, `assets/home/`, `assets/pages/`, `assets/doctors/`, `assets/before-after/`: images and icons.
- `scripts/`: website JavaScript, chatbot files and content-generation utilities.
- `tests/`: automated checks.
- `docs/CHATBOT.md`: chatbot maintenance instructions.
- `docs/image-prompts/`: image-generation prompts and editing notes.
- `favicon.ico`, `robots.txt`, `sitemap.xml`: public browser/search assets kept at the root.

## Local preview

Run from this project directory and open the printed localhost address:

```powershell
python -m http.server 8767 --bind 127.0.0.1
```

No build step or npm installation is required to serve this site. When deploying, include the complete `assets/` directory along with the root HTML pages.

## Refresh chatbot answers and verify

Node.js is needed only for these maintenance commands:

```powershell
node scripts/build-chatbot-data.js
node --test tests/chatbot.test.js
```

The builder writes `scripts/chatbot/chatbot-knowledge.js`. Commit that generated file with content changes. Keep the knowledge, engine and interface scripts in that order in each page. See `docs/CHATBOT.md` for cache-version guidance.
