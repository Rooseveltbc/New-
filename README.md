# linksharepro — Next.js + Firebase (MVP)

## Overview
linksharepro lets an admin (Google sign-in) paste multiple links (one per line). Each link becomes a public post with an auto-embedded preview (YouTube, Vimeo, Google Drive, Wikipedia, generic).

## Quick start (local)
1. Install dependencies: `npm install`
2. Run dev: `npm run dev`
3. Open `http://localhost:3000`

## Firebase
The firebase config is already injected in `firebase.js`. Make sure your Firebase project has:
- Authentication → Google enabled
- Firestore database (create in production or test mode)

## Admin
The admin email is `wwebitme@gmail.com`. Sign in with that Google account to publish.

## Deploy
Recommended: Vercel + Firebase. Create a Vercel project and connect to this repo. Add environment variables if you prefer (not required—the config is injected).

## Notes
- This is an MVP. For production, secure Firestore with the rules in the project, and consider using server-side APIs for better SEO.
