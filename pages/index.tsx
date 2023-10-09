import type { NextPage } from "next";
import ExamLink from "@azure-fundamentals/components/ExamLink";

const Home: NextPage = () => {
  return (
    <div className=" mt-20 mx-auto w-5/6 sm:w-2/3 lg:w-3/5 text-center bg-gray-900 border-[1px] rounded-lg border-cyan-500">
      <h2 className="text-cyan-100 text-5xl text-leading font-bold uppercase mt-14">Welcome!</h2>
      <p className="text-slate-300 text-lg mt-4 mb-14 px-5 leading-6">
        Test your knowledge under pressure with our timed exam mode, or explore and master over 480 questions at your
        own pace with our practice mode.
      </p>
      <div className="flex max-sm:flex-col max-sm:align-center justify-center gap-10 m-14 max-md:flex-col">
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
