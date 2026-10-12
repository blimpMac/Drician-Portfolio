# Drician Cordon Portfolio Website

This version includes:

- The header is now a **compact floating navigation bar centered at the top** on desktop, with a centered hamburger menu on mobile and no left-side branding.
- The portrait has been removed from the homepage and the public assets; the hero now uses centered typography, action buttons, and subtle background lighting.
- Resume and CV preview modals, plus PDF and DOCX downloads.
- Private-recipient contact form through Netlify Forms.
- Visitor analytics stored in Supabase.
- A password-protected analytics dashboard at `/admin/`.
- A 1–5 star rating and written feedback form.
- No recipient email address is embedded in the public HTML or JavaScript.

## Important architecture note

A secure visitor tracker cannot be implemented with HTML and JavaScript alone. This project therefore uses:

- **Netlify** for hosting, forms, and serverless functions.
- **Supabase** for the private analytics database.
- Netlify environment variables for your administrator username, password, database credentials, and signing secrets.

The administrator password is never placed in the public website files. The dashboard session is stored in an `HttpOnly`, `Secure`, `SameSite=Strict` cookie.

---

# Deployment guide

## 1. Create a GitHub repository

1. Sign in to GitHub.
2. Select **New repository**.
3. Name it, for example, `drician-portfolio`.
4. Keep it private or public. Either works with Netlify.
5. Extract this ZIP.
6. Upload the contents of the `drician-portfolio` folder to the repository root.

The repository root should directly contain `index.html`, `netlify.toml`, `styles.css`, `script.js`, `admin`, `netlify`, and the other folders.

## 2. Create the Supabase database

1. Create a project at Supabase.
2. Open **SQL Editor**.
3. Open `supabase-schema.sql` from this package.
4. Paste the entire file into the SQL Editor and run it.
5. In Supabase, open **Project Settings → API**.
6. Copy these values for the next step:
   - Project URL
   - `service_role` key

Keep the service-role key private. Never put it in `script.js`, HTML, or a GitHub commit.

## 3. Deploy through Netlify

1. Sign in to Netlify.
2. Select **Add new project → Import an existing project**.
3. Connect GitHub and choose the portfolio repository.
4. Netlify should read `netlify.toml` automatically.
5. Leave the build command empty.
6. The publish directory should be `.`.
7. Deploy the site.

## 4. Configure private environment variables

In Netlify, open:

**Project configuration → Environment variables**

Add all six variables below:

| Variable | Value |
|---|---|
| `SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Your private Supabase `service_role` key |
| `ADMIN_USERNAME` | The private username you want to use |
| `ADMIN_PASSWORD` | A long, unique password with at least 16 characters |
| `ADMIN_SESSION_SECRET` | A random secret of at least 32 characters |
| `VISITOR_HASH_SALT` | Another random secret of at least 32 characters |

Generate the last two values with a password manager or this PowerShell command:

```powershell
-join ((48..57)+(65..90)+(97..122) | Get-Random -Count 48 | ForEach-Object {[char]$_})
```

After adding the variables, select **Deploys → Trigger deploy → Deploy site** so the functions receive the new configuration.

## 5. Configure the hidden recipient for the contact form

The contact form uses Netlify Forms and does not expose your recipient email in the source code.

1. Submit one test contact message from the deployed site.
2. Open the Netlify project dashboard.
3. Open **Forms** and verify that `portfolio-contact` appears.
4. Open **Project configuration → Notifications → Emails and webhooks**.
5. Add a **Form submission notification**.
6. Enter the private recipient email in Netlify's dashboard only.

The recipient address remains outside the public website files.

## 6. Access the analytics dashboard

Open:

```text
https://your-site-name.netlify.app/admin/
```

Sign in with the values you configured as `ADMIN_USERNAME` and `ADMIN_PASSWORD`.

The dashboard displays:

- Total page visits retained in the database
- Unique browser identifiers
- Today's visits
- Average site rating
- Visits for the last 14 days
- Recent ratings and written improvement suggestions

The dashboard URL itself is not a secret. Security comes from server-side authentication and the private environment variables. Do not rely on merely hiding the URL.

---

# How tracking works

When a visitor opens the deployed site:

1. The browser creates a random local identifier.
2. A Netlify Function hashes that identifier with your private salt.
3. Only the hash, page path, referrer, timestamp, and browser user-agent are stored.
4. The raw identifier and administrator credentials are not stored in the public code.

The current implementation does not deliberately store IP addresses. Netlify may retain standard platform request logs according to its own settings and policies.

## Local preview limitations

Opening `index.html` directly from a `file://` path still previews the design, document modals, and navigation. These server-backed features require the deployed Netlify site:

- Contact form processing
- Visitor tracking
- Rating and feedback submission
- Administrator login and analytics dashboard

## Updating the site

Edit the files, commit the changes to GitHub, and push them. Netlify will automatically deploy the new version.

## Project showcase

The featured projects are BlockGo, Digital Survey System (`ASPNet2.0`), Library Management System (`FinalProjectForASPNET`), and React MessengerStyle. Visitors can switch between cards and a list; the selected layout is remembered locally. Clicking a project opens its description, features, tech stack and screenshot gallery. The repository opens only through the separate source link.

Screenshot assets are stored in `assets/projects/`. Survey/Library captures contain sample data and BlockGo captures contain demo profiles, as labeled in each showcase. To add a demo reel later, set the relevant project's `demo` field in `script.js` to a local video path or hosted video URL. The video player remains hidden until that field is populated.

Netlify must have this repository connected, `main` selected as its production branch, and automatic builds enabled. Set the base directory to `drician-portfolio` so its `netlify.toml`, publish directory and functions resolve correctly. The repository alone cannot confirm those Netlify dashboard settings or the live site URL.

## Minor works: native desktop application previews

The Minor Works page includes two additional projects from the linked GitHub account:

- **APT / EWT Accounting Calculator** — [Accounting-Calculator](https://github.com/blimpMac/Accounting-Calculator), a Python/Tkinter desktop utility with light/dark themes. Its code excerpt is taken from `apt_calculator.py`.
- **Faculty Attendance System** — [PythonFinals](https://github.com/blimpMac/PythonFinals), a Tkinter desktop app with faculty check-in/out, reports and analytics. Its code excerpt is taken from `attendance_app.py`.

The four SVG interface images in `assets/projects/` are **source-based visual reconstructions, not runtime screenshots**, because the original project repositories do not contain screenshots. They are labeled accordingly on the page. To replace them with real captures, take screenshots from the desktop applications, add the resulting images to `assets/projects/`, update each project's `screenshots` entries in `projects-data.js`, and remove its `previewNotice` after the assets are verified.

`projects-data.js` holds the Minor Works catalog and excerpts; `catalog.js` renders the project gallery and code block. Keep source links aligned with the code excerpt's repository and branch.

## Page alignment and navigation fixes

- Home now begins at the top of the homepage from every portfolio page. The **Explore projects** button still jumps directly to the projects section.
- The main heading is **Welcome to BlimpMac's Software Development Portfolio**.
- Homepage sections are aligned within the same responsive maximum-width layout as Major Works and Minor Works.
- Internal section links use consistent scroll positioning, taking account of the floating header and the section's padding; direct cross-page hash links are re-aligned after fonts have loaded.
- Screenshot galleries and project thumbnails use `object-fit: contain` so the full application interface is visible rather than clipped.
- Reveal animations are progressive enhancements; if animations are unavailable, sections remain visible.
- PDF previews open using the embedded viewer's fit-page setting rather than fit-width alone. Browser PDF renderers may offer their own zoom and scroll controls.

The website is static HTML/CSS/JavaScript. After pushing or merging to `main`, allow your Netlify configuration to deploy it and verify the navigation on your target devices.
