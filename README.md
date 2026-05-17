# The Dialogue Platform

Production website for **The Dialogue Platform**, an independent peacebuilding and public dialogue initiative founded by Omran Adam in Lillestrom, Norway.

Website: https://www.thedialogueplatform.com/en

## Overview

The Dialogue Platform creates safe, respectful spaces for conversations across political, cultural, academic, religious, and community backgrounds. The initiative focuses on peacebuilding, trust-building, coexistence, civic participation, and constructive dialogue, especially in response to polarization and conflict affecting Sudanese communities during the war in Sudan.

The platform combines dialogue methodology inspired by the Nansen model with modern media, digital outreach, and AI-supported communication.

## What This Website Supports

- Public-facing information about the initiative
- Dialogue seminars, panel discussions, podcasts, and events
- Media and international outreach
- Community engagement and contact workflows
- Multilingual/public communication infrastructure
- AI-supported visitor assistance and knowledge access

## Technical Stack

| Area | Technology |
| --- | --- |
| Framework | Next.js 14, App Router, TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Deployment | Vercel |
| Integrations | Contact delivery, optional Google Sheets workflow, AI assistant endpoint |

## My Role

Omran Adam founded the initiative and built the website as a long-term digital platform for dialogue, media, civic engagement, and public trust.

The work includes:

- Product direction and content architecture
- Website design and implementation
- AI-supported communication features
- Deployment and production setup
- Public-impact storytelling and outreach structure
- Technical maintenance and iteration

## Running Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Environment Variables

Create `.env.local` for local development and configure matching values in Vercel for production.

```bash
NEXT_PUBLIC_SITE_URL=https://thedialogueplatform.com
NEXT_PUBLIC_CONTACT_EMAIL=
NEXT_PUBLIC_CONTACT_PHONE=
NEXT_PUBLIC_MEMBERSHIP_FORM_URL=
RESEND_API_KEY=
CONTACT_FROM_EMAIL=
GOOGLE_SHEETS_WEBHOOK_URL=
CONTACT_DELIVERY_MODE=email
```

`CONTACT_DELIVERY_MODE` supports:

- `email`: send contact messages by email
- `sheet`: save to Google Sheets webhook only
- `sheet_and_email`: save to Google Sheets and send email

Google Sheets setup guide: `docs/google-sheets-contact-setup.md`

## Deployment

The site is deployed with Vercel. Configure the production domain, environment variables, and build settings through the Vercel project dashboard.

## Related Links

- Website: https://www.thedialogueplatform.com/en
- YouTube: https://youtube.com/@thedialogueplattform
- Facebook: https://www.facebook.com/share/18n46rPQzg/?mibextid=wwXIfr
- Omran Adam: https://omranadam.com
