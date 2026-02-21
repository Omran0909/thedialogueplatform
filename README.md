## The Dialogue Platform

A production-ready Next.js 14 website for institutions that treat dialogue as long-term governance infrastructure.

### Tech stack

- **Framework**: Next.js 14 (App Router, TypeScript)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion

### Running locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open `http://localhost:3000` in your browser.

### Environment variables

Create `.env.local` (optional during local development):

```bash
NEXT_PUBLIC_SITE_URL=https://thedialogueplatform.com
NEXT_PUBLIC_CONTACT_EMAIL=
NEXT_PUBLIC_CONTACT_PHONE=
RESEND_API_KEY=
CONTACT_FROM_EMAIL=
GOOGLE_SHEETS_WEBHOOK_URL=
CONTACT_DELIVERY_MODE=email
```

- Keep contact variables empty until your email and phone are ready.
- Add the same variables in Vercel project settings for production.
- `CONTACT_DELIVERY_MODE` supports:
  - `email` (default): existing email delivery path
  - `sheet`: save to Google Sheets webhook only
  - `sheet_and_email`: save to Google Sheets and continue email delivery
- Google Sheets setup guide: `docs/google-sheets-contact-setup.md`

### Deploying to Vercel

- Connect this repository to Vercel.
- Vercel will detect Next.js automatically.
- Use build command `npm run build` and output directory `.next` (default for Next.js).
- Set `NEXT_PUBLIC_SITE_URL` to your production domain.
- Point `thedialogueplatform.com` to the deployed Vercel project.

### Customisation next steps

- **Content**: Update page copy in `src/app` for your real mandates, partnerships, and case examples.
- **Branding**: Replace `public/assets/logo.png` with your final logo and update tokens in `tailwind.config.js` if needed.
- **Insights & Events**: Replace placeholders with CMS/data source integration.
- **Contact**: Set `NEXT_PUBLIC_CONTACT_EMAIL` and `NEXT_PUBLIC_CONTACT_PHONE` once ready.
