import 'bootstrap/dist/css/bootstrap.min.css'
import { CookiesProvider, useCookies } from 'react-cookie'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import * as ga from '../lib/ga'
import Head from 'next/head'
import { Footer } from '../components/Footer'
import { NavigationBar } from '../components/NavigationBar'
import { url } from '../config/next.config'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [cookies, setCookie, removeCookie] = useCookies(['noAnalytics']);

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url)
    }
    // When the component is mounted, subscribe to router changes
    // and log those page views
    router.events.on('routeChangeComplete', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <Head>
        {/* Google Analytics Scripts */}
        {/* noAnalytics 쿠키가 true일 경우, 비활성화됩니다. */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />
        <script dangerouslySetInnerHTML={{
          __html: `
      window['ga-disable-${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}'] = ${cookies.noAnalytics};
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
      `
        }} />
      </Head>
      <NavigationBar titles={pageProps.titles}/>
      <CookiesProvider><Component {...pageProps} /></CookiesProvider>

      {/* 공통 Footer */}
      <footer>
        <Footer />
      </footer>
    </>
  );
}

MyApp.getInitialProps  = async ({ Component, ctx }) => {
  let pageProps = {};
  const data = await fetch(`${url}/courses/title`);
  const titles = await data.json();

  // _app에서 props 추가 (모든 컴포넌트에서 공통적으로 사용할 값 추가)
  pageProps = { ...pageProps, titles };

  return { pageProps };
};


export default MyApp;
