import { type ReactNode } from "react";
import { type Metadata } from "next";
import TopNav from "@azure-fundamentals/components/TopNav";
import Footer from "@azure-fundamentals/components/Footer";
import ApolloProvider from "@azure-fundamentals/components/ApolloProvider";
import Cookie from "@azure-fundamentals/components/Cookie";
import "styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "🧪 Practice Exams Platform | Ditectrev",
  openGraph: {
    title: "🧪 Practice Exams Platform | Ditectrev",
  },
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <link rel="manifest" href="/manifest.json" />
      <body className="bg-slate-900">
        <ApolloProvider>
          <TopNav />
          <main className="flex flex-col justify-between md:h-[calc(100vh-2.5rem-64px)] h-full">
            {children}
            <Footer />
            <Cookie />
          </main>
        </ApolloProvider>
      </body>
    </html>
  );
}
