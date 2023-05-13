import Head from "next/head";
import Quiz from "@azure-fundamentals/components/Quiz";
import TopNav from "@azure-fundamentals/components/TopNav";
export default function Home() {
  return (
    <>
      <Head>
        <title>Azure Fundamentals Exam</title>
        <meta name="description" content="Azure Fundamentals Exam Questions" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopNav />
       <Quiz /> 
    </>
  );
}
