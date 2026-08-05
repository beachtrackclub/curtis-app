# Beach Track Club — App Store handoff & next steps

A short brief for a developer taking the app to the iOS App Store. The app already exists and works on the web; the remaining work is packaging, a couple of Apple requirements, and the store upload.

## What it is
A track & field training app for a coach and their athletes. It's a React web app, already wrapped as a native iOS app with **Capacitor**. Because it's a client-side SPA talking to a hosted backend, the native app needs no app server.

- **Repo:** https://github.com/beachtrackclub/curtis-app (branch `main`)
- **Live web app:** https://curtis-app.pages.dev (Cloudflare Pages, auto-deploys on push to `main`)
- **Stack:** React + TypeScript + Vite, React Router (**HashRouter**), Supabase (auth + Postgres + storage). Native shell: **Capacitor 6**, appId `com.beachtrackclub.app`.

## What's already built and working
- Full auth: email/password, email confirmation + password reset (branded emails via Resend SMTP), admin approval flow, optional TOTP 2FA.
- Training inventory: categories → circuits → exercises, each with a demo clip (MP4) + coaching cues; admin edit mode (rename/reorder/hide/upload).
- Video library, global typo-tolerant search, "view as athlete" coach preview.
- The iOS Xcode project is scaffolded and committed in `ios/`. See `IOS_SETUP.md`.

## What's needed to reach the App Store (the actual next steps)

### 1. Accounts (owner)
- **Apple Developer Program** membership — ~$99/yr, enroll at developer.apple.com/programs (1–2 day approval). Required for TestFlight + App Store.

### 2. Build environment (needs a Mac with admin)
The project's Mac currently has only Command Line Tools. On the build machine:
```bash
# install Xcode from the Mac App Store first, then:
sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
sudo xcodebuild -license accept
sudo gem install cocoapods
```

### 3. Build & run
```bash
npm install
npm run build:ios          # builds web (base "/") and syncs into ios/
cd ios/App && pod install && cd ../..
npx cap open ios           # opens Xcode; pick a Simulator and Run
```
Re-run `npm run build:ios` after any web change.

### 4. Apple requirements to implement before submission
- **In-app account deletion** — Apple *hard requirement*. Needs a UI flow + a Supabase call to delete the user's account/data. Not built yet.
- **App icons** — currently the Capacitor default. Generate branded icons from `public/btc-logo.png` (e.g. `@capacitor/assets`). Note: iOS icons must be opaque/full-bleed (no transparency).
- **Privacy details** in App Store Connect (data collected: email, profile info). A privacy policy URL is required.
- **Sign in with Apple** — only required *if* other social logins are added. None are today, so it's optional for now.

### 5. Upload to TestFlight / App Store
1. Xcode → Signing & Capabilities → select the Apple Developer team (auto-signing).
2. Set version + build number.
3. Product → Archive → Distribute → App Store Connect → Upload.
4. App Store Connect → TestFlight → add internal testers (no review) or external (quick Beta App Review).
5. For public release: fill store listing, screenshots, privacy, and submit for review.

## Good to know
- Routing uses **HashRouter** (no server-side routes needed — ideal for Capacitor).
- Supabase access is protected by Row-Level Security; the anon key is public/publishable. **Secrets (service-role key, Resend key, account passwords) are held by the owner — ask for them directly, they are not in the repo.**
- `vite.config.ts` sets `base: "/"` when `CAPACITOR=1` so bundled assets resolve from the app root.
- Backend/data changes in Supabase are live instantly; only code changes deploy via git push.
- **Android** (Google Play, $25 one-time) is also possible from the same Capacitor project later.

## Open blockers summary
| Item | Owner | Status |
|---|---|---|
| Apple Developer Program account | Owner | Not yet enrolled |
| Full Xcode + CocoaPods on build Mac | Developer/Owner | Not installed |
| In-app account deletion | Developer | Not built |
| Branded app icons | Developer | Default placeholder |
| Privacy policy URL | Owner | Needed for listing |
