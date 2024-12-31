import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.grandeplans',
  appName: 'numerology-calc',
  webDir: "out",
  server :{
    "androidScheme": "https"
  }
};

export default config;
