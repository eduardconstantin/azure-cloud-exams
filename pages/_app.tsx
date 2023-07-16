import "@azure-fundamentals/styles/globals.css";
import Script from "next/script";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import client from "@azure-fundamentals/src/graphql/apollo-client";
import Layout from "@azure-fundamentals/components/layout";

export default function App({ Component, pageProps }: AppProps) {
  const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Script src={"https://www.googletagmanager.com/gtag/js?id=" + GA_TRACKING_ID} />
        <Script id="google-analytics">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', '${GA_TRACKING_ID}', {
            page_path: window.location.pathname,
          });
        `}
        </Script>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}
