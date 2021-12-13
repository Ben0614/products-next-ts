import GlobalStyle from '../styles/Globals'
import { ThemeProvider } from 'styled-components'
import { useState } from 'react'
import { AppProps } from 'next/app'

const theme = {
  colors: {
    header: 'blue',
  },
  lg: '992px',
}

function MyApp({ Component, pageProps }: AppProps) {
  const [keyWord, setKeyWord] = useState<string>('')
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Component {...pageProps} keyWord={keyWord} setKeyWord={setKeyWord} />
    </ThemeProvider>
  )
}

export default MyApp
