import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta charSet="utf-8" />
        <link rel="dns-prefetch" href="cdn.sanity.io" />
        <link rel="manifest" href="/manifest.json" />
        <meta name='application-name' content='Adoctor' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <meta name='apple-mobile-web-app-title' content='Adoctor' />
        <meta name='description' content='Nextjs Template for Doctors/Clinic' />
        <meta name='format-detection' content='telephone=no' />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='msapplication-config' content='/browserconfig.xml' />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name='msapplication-tap-highlight' content='no' />
        <meta name="theme-color" content="#ffffff" />

        <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
        <link rel='apple-touch-icon' sizes='152x152' href='/apple-touch-icon-152x152-precomposed.png' />
        <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon-180x180-precomposed.png' />

        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel='manifest' href='/manifest.json' />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel='shortcut icon' href='/favicon.ico' />

        <meta name='twitter:card' content='summary' />
        <meta name='twitter:url' content='https://adoctor-next-js.vercel.app' />
        <meta name='twitter:title' content='Adoctor' />
        <meta name='twitter:description' content='Nextjs Template for Doctors/Clinic' />
        <meta name='twitter:image' content='https://adoctor-next-js.vercel.app/android-chrome-192x192.png' />
        <meta name='twitter:creator' content='@moroi' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content='Adoctor' />
        <meta property='og:description' content='Nextjs Template for Doctors/Clinic' />
        <meta property='og:site_name' content='Adoctor' />
        <meta property='og:url' content='https://adoctor-next-js.vercel.app' />
        <meta property='og:image' content='https://adoctor-next-js.vercel.app/apple-touch-icon.png' />

      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}