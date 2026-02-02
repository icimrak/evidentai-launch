# EvidentAI Launch Website (Vercel-ready)

A simple Next.js landing page with a waitlist form.

## 1) Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000

## 2) Make the waitlist form actually save emails
This project is designed to forward signups to a webhook so you can plug it into:
- Zapier
- Make.com
- Airtable
- Google Sheets
- Mailchimp / HubSpot, etc.

### Configure on Vercel
In Vercel Project Settings → Environment Variables:
- `WAITLIST_WEBHOOK_URL` = your webhook URL

The webhook will receive JSON like:
```json
{ "email": "person@example.com", "source": "evidentai-launch", "ts": "2026-02-02T12:34:56.000Z" }
```

## 3) Deploy on Vercel
1. Push this repo to GitHub
2. Import to Vercel
3. (Optional) add `WAITLIST_WEBHOOK_URL`
4. Your site will be live at `https://<project>.vercel.app`
