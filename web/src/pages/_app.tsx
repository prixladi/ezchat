import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Head from 'next/head';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 30,
    },
  },
});

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      {/* eslint-disable-next-line */}
      <script src="/config.js" />
    </Head>
    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  </>
);

export default App;
