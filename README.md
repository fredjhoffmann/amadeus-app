# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/1f6100e8-22fe-40b2-9f67-7c49279b1779

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/1f6100e8-22fe-40b2-9f67-7c49279b1779) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Capacitor (for native mobile apps)

## How can I run this as a native iOS app?

This project is configured to run as a native iOS app using Capacitor. Follow these steps:

### Prerequisites
- macOS with Xcode installed
- Node.js & npm

### Setup Steps

1. **Export to GitHub and clone locally:**
   ```sh
   # Clone your GitHub repository
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   npm install
   ```

2. **Add iOS platform:**
   ```sh
   npx cap add ios
   ```

3. **Build and sync:**
   ```sh
   npm run build
   npx cap sync
   ```

4. **Open in Xcode:**
   ```sh
   npx cap open ios
   ```
   
   Or run directly:
   ```sh
   npx cap run ios
   ```

### iOS Configuration

For background audio playback (recommended for this music app):

1. Open the iOS project in Xcode
2. Select your app target
3. Go to "Signing & Capabilities"
4. Add "Background Modes" capability
5. Check "Audio, AirPlay, and Picture in Picture"

### Development with Hot Reload

The app is configured to load from the Lovable preview URL for development, enabling hot reload on your device when connected to the same network.

### Production Build

For App Store submission, you'll need to:
1. Change the `server.url` to point to your production domain
2. Update the app icon and splash screen
3. Configure proper signing certificates in Xcode

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/1f6100e8-22fe-40b2-9f67-7c49279b1779) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
