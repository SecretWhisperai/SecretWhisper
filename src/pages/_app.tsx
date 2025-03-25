import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Web3ReactProvider } from '@web3-react/core'
import { theme } from '@/styles/theme'
import { Web3Provider as Web3ContextProvider } from '@/contexts/Web3Context'
import { getLibrary } from '@/utils/web3'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ContextProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </Web3ContextProvider>
    </Web3ReactProvider>
  )
} 