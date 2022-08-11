import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head />
      <link rel="icon" href="/favicon.ico" />
      <body>
        <Main />
        <NextScript />

        <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>

        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-15752161-3"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag() { window.dataLayer.push(arguments) }
            gtag('js', new Date());
  
            gtag('config', 'UA-15752161-3', { page_path: window.location.pathname });
            `,
          }}
        />
      </body>
    </Html>
  )
}