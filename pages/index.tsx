import type { NextPage } from "next";
import Head from "next/head";
import ExamLink from "@azure-fundamentals/components/ExamLink";

const Home: NextPage = () => {
  return (
    <div className="mx-auto w-5/6 sm:w-2/3 lg:w-2/3 xl:w-2/4 text-center  ">
      <Head>
        <title>Azure Fundamentals</title>
        <meta property="og:title" content="Azure Fundamentals" key="title" />
      </Head>
      <h2 className="text-white text-5xl text-leading font-bold uppercase mt-14">
        Welcome!
      </h2>
      <p className="text-white text-lg mt-4 mb-14 px-5 leading-6">
        Test your knowledge under pressure with our timed exam mode, or explore
        and master over 480 questions at your own pace with our practice mode.
      </p>
      <div className="flex max-sm:flex-col max-sm:align-center justify-center gap-10 sm:mx-16">
        <ExamLink
          href="/practice"
          heading="Practice mode"
          paragraph="Learn and familiarize yourself with the questions and answers without any time constraint."
          wrapperClassNames="from-[#0284C7] to-[#2DD48F]"
          headingClassNames="group-hover:from-[#0284C7] group-hover:to-[#2DD48F]"
        />
        <ExamLink
          href="/exam"
          heading="Exam mode"
          paragraph="Put your knowledge to the test by answering a fixed number of randomly selected questions under a time
            limit."
          wrapperClassNames="from-[#F97316] to-[#FACC15]"
          headingClassNames="group-hover:from-[#F97316] group-hover:to-[#FACC15]"
        />
      </div>
    </div>
  );
};

export default Home;
