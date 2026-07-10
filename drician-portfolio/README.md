# Drician Cordon Portfolio Website

This version includes:

- The **DC icon and “Drician Cordon” label have been removed** from the upper-left navigation.
- Clean portrait with no floating labels or overlay cards.
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
