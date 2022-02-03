import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from "next/head";
import { Header } from '../components/header'
import { Footer } from '../components/footer'


function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <meta charSet="UTF-8" />
      <meta name="keywords" content="flbn, nextjs"/>
      <meta name="author" content="flbn" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" type="image/png" sizes="32x32" href="./assets/favicon-32x32.png"/>
    </Head>

      <Header/>
      <Component {...pageProps} />
      <Footer/>
  </>
}

export default MyApp
