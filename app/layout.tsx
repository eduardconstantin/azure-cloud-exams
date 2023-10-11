import TopNav from "@azure-fundamentals/components/TopNav";
import Footer from "../components/Footer";
import { ReactNode } from "react";
import { Metadata } from "next";
import "styles/globals.css";
import Script from "next/script";
import ApolloProvider from "@azure-fundamentals/components/ApolloProvider";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Azure Fundamentals",
  openGraph: {
    title: "Azure Fundamentals",
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
          <Script
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
          </Script>
        </ApolloProvider>
      </body>
    </html>
  );
}
