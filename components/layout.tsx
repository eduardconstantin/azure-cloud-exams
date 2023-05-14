import TopNav from "@azure-fundamentals/components/TopNav";
import Head from "next/head";
import Footer from "./Footer";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>Azure Fundamentals Exam</title>
        <meta name="description" content="Azure Fundamentals Exam Questions" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopNav />
      <main className="flex flex-col justify-between h-[calc(100vh-2.5rem-64px)]">
        {children}
        <Footer />
      </main>
    </>
  );
}
