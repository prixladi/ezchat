import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useAuthWallContextCreator } from '@lib/contexts/authWallContext';
import { useMemo } from 'react';

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  const [Context, state, dispatch] = useAuthWallContextCreator();
  const value = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch],
  );

  return (
    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
      <QueryClientProvider client={queryClient}>
        <Context.Provider value={value}>
          <Component {...pageProps} />
        </Context.Provider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
