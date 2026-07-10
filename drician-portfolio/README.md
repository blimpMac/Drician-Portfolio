# Drician Cordon Portfolio Website

This repository contains a personal portfolio website for Drician Francis D. Cordon. The site presents featured projects, background information, experience, resume and CV previews, a private contact form, visitor analytics, and site feedback collection.

The website is designed as a static frontend supported by Netlify Functions and Supabase for private server-side features.

## What This Website Uses

- HTML for the page structure
- CSS for layout, responsive styling, animations, and visual design
- JavaScript for project filtering, modals, document previews, visitor tracking, and feedback submission
- Netlify for hosting, redirects, forms, and serverless functions
- Netlify Forms for private contact form handling
- Netlify Functions for secure backend endpoints
- Supabase for storing visitor analytics and feedback data
- GitHub API for displaying the public repository count

## What This Website Utilizes

- A responsive portfolio layout for desktop and mobile screens
- Featured project cards with category filters
- Resume and CV preview modals with PDF and DOCX downloads
- A contact modal connected to Netlify Forms
- Visitor tracking through server-side Netlify Functions
- A feedback form with rating and written suggestions
- A protected admin dashboard for viewing analytics and feedback
- Environment variables for private credentials and secrets
- Supabase tables for storing page visits and feedback records

## Folder Structure

```text
drician-portfolio/
|-- admin/
|   |-- admin.css
|   |-- admin.js
|   `-- index.html
|-- assets/
|   `-- profile.jpg
|-- documents/
|   |-- pdf/
|   |   |-- Drician-Cordon-Professional-CV.pdf
|   |   `-- Drician-Cordon-Resume.pdf
|   |-- Drician-Cordon-Professional-CV.docx
|   `-- Drician-Cordon-Resume.docx
|-- netlify/
|   `-- functions/
|       |-- lib/
|       |   `-- common.js
|       |-- admin-login.js
|       |-- admin-logout.js
|       |-- admin-stats.js
|       |-- feedback.js
|       `-- track.js
|-- index.html
|-- netlify.toml
|-- README.md
|-- script.js
|-- styles.css
|-- supabase-schema.sql
`-- thanks.html
```

## Main Files

- `index.html` contains the main portfolio page.
- `styles.css` contains the full visual design and responsive styling.
- `script.js` handles browser interactions, project rendering, modals, tracking requests, and feedback submission.
- `thanks.html` is the confirmation page used after contact form submission.
- `netlify.toml` defines the Netlify publish folder, functions folder, and API redirects.
- `supabase-schema.sql` contains the database tables needed for analytics and feedback.

## Admin Area

The `admin` folder contains the private analytics dashboard interface. It connects to Netlify Functions that check the administrator session and return site statistics.

The admin password and Supabase service key are not stored in the public website files. They must be configured as Netlify environment variables.

## Serverless Functions

The `netlify/functions` folder contains backend endpoints used by the website:

- `track.js` records page visits in Supabase.
- `feedback.js` stores submitted ratings and comments.
- `admin-login.js` verifies administrator credentials.
- `admin-logout.js` clears the administrator session.
- `admin-stats.js` returns analytics and feedback data for the dashboard.
- `lib/common.js` contains shared helpers for JSON responses, cookies, sessions, and Supabase REST requests.

## Database

Supabase is used for storing private analytics data. The schema file creates tables for:

- Portfolio page visits
- Visitor hashes
- Page paths and referrers
- User feedback
- Star ratings
- Optional feedback names and comments

## Security Notes

Private values such as the Supabase service-role key, administrator username, administrator password, session secret, and visitor hash salt are stored in Netlify environment variables.

