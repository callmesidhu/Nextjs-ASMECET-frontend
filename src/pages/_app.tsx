// src/pages/_app.tsx
import type { AppProps } from 'next/app';
import '../app/globals.css';


function MyApp({ Component, pageProps }: AppProps) {
  return (
  <>
    <Component {...pageProps} />
  </>
  )
}

export default MyApp;