import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.amadeusapp',
  appName: 'amadeus-app',
  webDir: 'dist',
  server: {
    url: 'https://1f6100e8-22fe-40b2-9f67-7c49279b1779.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#000000",
      showSpinner: false
    }
  }
};

export default config;