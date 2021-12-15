import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import '../styles/global.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { useAuthWallContextCreator } from '../contexts/authWallContext'

const queryClient = new QueryClient()

const App = ({ Component, pageProps }: AppProps) => {
  const [Context, state, dispatch] = useAuthWallContextCreator()

  return (
    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
      <QueryClientProvider client={queryClient}>
        <Context.Provider value={{ state, dispatch }}>
          <Component {...pageProps} />
        </Context.Provider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
