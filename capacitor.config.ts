import type { CapacitorConfig } from '@capacitor/core';

const config: CapacitorConfig = {
  appId: 'dev.pages.k_ejr2.twa',
  appName: 'Kailasa',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystorePassword: undefined,
      keystoreAlias: undefined,
      keystoreAliasPassword: undefined,
      signingType: 'apksigner'
    }
  }
};

export default config;
