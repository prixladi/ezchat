declare global {
  interface Window {
    config: {
      apiUrl: string;
      urlikUrl: string;
      authApiUrl: string;
      authApiClientId: string;
      googleClientId: string;
    };
  }
}

const apiUrl =
  typeof window === 'undefined' ? process.env.NEXT_PUBLIC_API_URL : window.config.apiUrl;

const config = {
  apiUrl,
};

export default config;
