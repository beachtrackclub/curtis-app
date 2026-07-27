# iOS / TestFlight setup

The web app is wrapped as a native iOS app with **Capacitor** (`com.beachtrackclub.app`, "Beach Track Club"). The Xcode project lives in `ios/`. Because it's a `HashRouter` SPA served from the app bundle, it runs natively with no server.

> **Status:** the JS/Capacitor setup and the iOS Xcode project are scaffolded and committed. Building/running requires the host prerequisites below (this Mac had only Command Line Tools, not full Xcode).

## Prerequisites (owner — one-time)

1. **Apple Developer Program** — enroll at https://developer.apple.com/programs (~$99/yr; approval can take 1–2 days). Required for TestFlight + App Store.
2. **Install Xcode** — from the Mac App Store (free; ~7–12 GB). A full Xcode, not just Command Line Tools.
3. **Point the toolchain at Xcode** (needs your admin password):
   ```bash
   sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
   sudo xcodebuild -license accept
   ```
4. **Install CocoaPods**:
   ```bash
   sudo gem install cocoapods
   ```
   (or `brew install cocoapods` if you use Homebrew)

## Build & run (once prerequisites are done)

```bash
# builds the web app with the native base path and syncs into ios/
npm run build:ios
# first time only: install native pods
cd ios/App && pod install && cd ../..
# open in Xcode
npx cap open ios
```
In Xcode: pick a Simulator (e.g. iPhone 15) → Run (▶). To test on your own iPhone, plug it in, select it, and set your Team under Signing & Capabilities.

## TestFlight (once the Apple account is active)

1. In Xcode → **Signing & Capabilities** → select your Team (auto-manages signing).
2. Set a version + build number (Target → General).
3. **Product → Archive** → Distribute App → **App Store Connect** → Upload.
4. In **App Store Connect** → your app → **TestFlight** tab → add internal testers (up to 100, no review needed) or external testers (needs a quick Beta App Review).

## Apple requirements to remember

- **In-app account deletion** is a hard App Store requirement before public release (not needed for internal TestFlight, but build it before submitting for review).
- App icon: still the Capacitor default — generate branded icons from `public/btc-logo.png` with `@capacitor/assets` once Xcode is set up (so we can verify them in the Simulator).

## Notes

- `vite.config.ts` uses `base: "/"` when `CAPACITOR=1` (set by `build:ios`) so bundled asset paths resolve from the app root.
- Re-run `npm run build:ios` after any web change to refresh the native app.
- Supabase works from the native app over HTTPS as-is (no extra config).
