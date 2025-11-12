export const API_CONFIG = {
  ENABLE_MOCKS: process.env.EXPO_PUBLIC_ENABLE_MOCKS === 'true' || __DEV__,
  BASE_URL: process.env.EXPO_PUBLIC_API_URL || 'https://api.zet.app',
  TIMEOUT: 30000,
} as const;
