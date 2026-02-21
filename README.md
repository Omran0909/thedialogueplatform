## The Dialogue Platform

A production-ready, content-first Next.js 14 site designed for institutions that treat dialogue as a long-term governance and learning practice.

### Tech stack

- **Framework**: Next.js 14 (App Router, TypeScript)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion (subtle, accessibility-aware)

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

### Deploying to Vercel

- Connect the GitHub repository that contains this project to Vercel.
- Vercel will detect Next.js automatically; use the default build command (`npm run build`) and output directory (`.next`).
- Point the `thedialogueplatform.com` domain in Vercel to the deployed project.

### Customisation next steps

- **Content**: Update page copy in `src/app` to reflect concrete mandates, partnerships, and examples as they become public.
- **Branding**: Replace `public/assets/logo.png` with a refined logo and, if desired, extend the Tailwind colour tokens in `tailwind.config.ts`.
- **Insights & Events**: Replace placeholder structures in `events` and `insights` pages with real data sources or CMS integration when ready.
- **Contact**: Update `contact@thedialogueplatform.com` in the Contact page with your actual email address.

