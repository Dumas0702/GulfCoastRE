<<<<<<< HEAD
# GulfCoastRE
Real Estate Website
=======
# Gulf Coast Real Estate — Local Dev

## Prereqs
- Node.js 18+ (LTS) — https://nodejs.org

## Run locally
```bash
cd gulf-coast-real-estate
npm install
npm run dev
# open the URL printed in the terminal (usually http://localhost:5173)
```

## Build for production
```bash
npm run build
npm run preview
```

## Customize
- Edit quick settings at the top of `src/App.tsx` (name, phone, email, brokerage, colors).
- Replace `/public/headshot.png` with your headshot and keep the same filename.
- Update service areas and temporary Zillow search links.
- Tailwind is set up in `tailwind.config.js` and `src/index.css`.

## Next steps (AWS)
- Upload `dist/` to an S3 bucket with static hosting, put CloudFront in front, and add Route 53 for DNS.
- For the contact form, add an API Gateway + Lambda that sends email via Amazon SES.
>>>>>>> Initial Commit
