import TopNav from "@azure-fundamentals/components/TopNav";
import Head from "next/head";

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
      {children}
    </>
  );
}
