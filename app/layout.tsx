import { type ReactNode } from "react";
import { type Metadata } from "next";
import TopNav from "@azure-fundamentals/components/TopNav";
import Footer from "@azure-fundamentals/components/Footer";
import ApolloProvider from "@azure-fundamentals/components/ApolloProvider";
import Cookie from "@azure-fundamentals/components/Cookie";
import "styles/globals.css";

export const metadata: Metadata = {
  appleWebApp: {
    capable: true,
    title: "🧪 Practice Exams Platform | Ditectrev",
    statusBarStyle: "black",
  },
  applicationName: "🧪 Practice Exams Platform | Ditectrev",
  authors: [
    {
      name: "Daniel Danielecki",
      url: "https://github.com/danieldanielecki",
    },
    {
      name: "Eduard-Constantin Ibinceanu",
      url: "https://github.com/eduardconstantin",
    },
  ],
  creator: "Eduard-Constantin Ibinceanu",
  description:
    "🎓 Practice Exams (Web) Platform developed by Ditectrev's Community.",
  formatDetection: { telephone: true },
  icons: [
    {
      rel: "apple-touch-icon",
      type: "image/x-icon",
      url: "/favicon.ico",
    },
    {
      rel: "icon",
      type: "image/x-icon",
      url: "/favicon.ico",
    },
  ],
  keywords: [
    "AWS Exams",
    "Azure Exams",
    "Exams Simulator",
    "GCP Exams",
    "ITIL4 Exams",
    "Practice Exams Platform",
    "Practice Tests Platform",
    "Scrum Exams",
  ],
  manifest: "/manifest.json",
  metadataBase: new URL("https://education.ditectrev.com"),
  openGraph: {
    description:
      "🎓 Practice Exams (Web) Platform developed by Ditectrev's Community.",
    images: [
      {
        alt: "Ditectrev Logo",
        url: "/logo.svg",
      },
    ],
    siteName: "🧪 Practice Exams Platform | Ditectrev",
    title: "🧪 Practice Exams Platform | Ditectrev",
    type: "website",
    url: "https://education.ditectrev.com",
  },
  publisher: "Ditectrev",
  referrer: "strict-origin-when-cross-origin",
  robots: {
    follow: true,
    index: true,
  },
  themeColor: "#3f51b5",
  title: {
    default: "🧪 Practice Exams Platform - %s | Ditectrev",
    template: "🧪 Practice Exams Platform - %s | Ditectrev",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@ditectrev",
    description:
      "🎓 Practice Exams (Web) Platform developed by Ditectrev's Community.",
    images: [
      {
        alt: "Ditectrev Logo",
        url: "/logo.svg",
      },
    ],
    site: "@ditectrev",
    title: "🧪 Practice Exams Platform | Ditectrev",
  },
  viewport: {
    initialScale: 1,
    width: "device-width",
  },
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <meta
        name="google-adsense-account"
        content="ca-pub-4827919789464418"
      ></meta>
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
