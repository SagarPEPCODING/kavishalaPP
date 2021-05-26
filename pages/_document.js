import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-155126359-1"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'UA-155126359-1');`,
            }}
          /> */}
          <link rel="canonical" href="https://kavishala.in"></link>
          <link
            rel="stylesheet"
            type="text/css"
            charSet="UTF-8"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          />
          <link rel="manifest" href="/manifest.json" />
          <script
            data-ad-client="ca-pub-4584592581913308"
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          ></script>
          <link rel="icon" href="/images/favicon.png" />
          <link
            rel="preload"
            href="/_next/static/webfonts/dxicons.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          {/* Preconnecting to the server */}
          <link
            rel="preconnect"
            href="https://kavishala.s3.amazonaws.com"
            crossOrigin="anonymous"
          ></link>
          <link
            rel="preconnect"
            href="https://admin.kavishala.in"
            crossOrigin="anonymous"
          ></link>
          {/* LIBRARY SUPPORT */}
          <script
            type="text/javascript"
            src="https://ajax.aspnetcdn.com/ajax/jquery/jquery-3.4.1.min.js"
            defer
          ></script>
          <script
            src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.bundle.min.js"
            defer
          ></script>
          {/* Google Fonts */}
          <link
            href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
            rel="stylesheet"
            integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
            crossOrigin="anonymous"
          ></link>
          <link
            defer
            rel="stylesheet"
            type="text/css"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Roboto&display=swap"
            rel="stylesheet"
          ></link>
          {/* <link
            rel="stylesheet"
            href="https://kavishalafoundation.org/kavishala/style.css"
          /> */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: `{
            "@context": "http://schema.org",
            "@type": "WebPage",
            "@id": "https://kavishala.in/#webpage",
            "url": "https://kavishala.in/",
            "inLanguage": "en_US",
            "name": "Kavishala",
            "datePublished": "2020-01-01T09:08:09+00:00",
            "dateModified": "2020-08-03T20:38:18.176Z",
            "description": "Kavishala is literary paltform for poets and writers.  Kavishala is the most loved poetry platform, connect a global community of 20+ Million poets & poetry lovers through the power of Poetry.",
            "isPartOf": {
            "@type": "WebSite",
            "@id": "https://kavishala.in/#website",
            "url": "https://kavishala.in/",
            "name": "Kavishala",
            "headline": "Kavishala",
            "description": "Welcome! India's most loved poetry platform. We connect a global community of 20+ Million poets & poetry lovers through the power of Poetry.",
            "publisher": {
            "@type": "Organization",
            "name": "Kavishala",
            "alternateName": ["Kavishala", "Kavishala Foundation", "Kavishala Labs"],
            "logo": {
            "@type": "ImageObject",
            "url": "https://kavishala.in/images/kavishala_logo.png",
            "width": 292,
            "height": 60,
            "caption": "Kavishala"
            },
            "url": "https://kavishala.in",
            "sameAs": [
            "https://www.facebook.com/kavishala.in",
            "https://twitter.com/kavishala",
            "https://www.youtube.com/channel/UCI9cjrcfqrkONnRZZPn1KNQ",
            "https://instagram.com/kavishala.in",
            "https://www.linkedin.com/company/9368586/"
            ]
            }
            }
            }`,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
