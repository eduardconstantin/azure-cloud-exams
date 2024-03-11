import { type ReactNode } from "react";
import { type Metadata } from "next";
import TopNav from "@azure-fundamentals/components/TopNav";
import Footer from "../components/Footer";
import ApolloProvider from "@azure-fundamentals/components/ApolloProvider";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import "styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Azure Cloud Exams",
  openGraph: {
    title: "Azure Cloud Exams",
  },
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

  return (
    <html lang="en">
      <body className="bg-slate-900">
        <ApolloProvider>
          <TopNav />
          <main className="flex flex-col justify-between h-[calc(100vh-2.5rem-64px)]">
            {children}
            <Footer />
          </main>
          <GoogleTagManager gtmId={GA_TRACKING_ID!} />
          <GoogleAnalytics gaId={GA_TRACKING_ID!} />
          {/*<Script
            src={
              "https://www.googletagmanager.com/gtag/js?id=" + GA_TRACKING_ID
            }
          />
          <Script id="google-analytics">
            {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', '${GA_TRACKING_ID}', {
            page_path: window.location.pathname,
          });
        `}
        </Script>*/}
        </ApolloProvider>
      </body>
    </html>
  );
}
