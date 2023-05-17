import Link from "next/link";
import type { NextPage } from "next";
import { CustomLink } from "@azure-fundamentals/components/ExamButton";

const Home: NextPage = () => {
  return (
    <div className="mx-auto w-5/6 sm:w-2/5 text-center">
      <h2 className="text-white text-5xl text-leading font-bold uppercase mt-1">
        Welcome!
      </h2>
      <p className="text-white text-lg mt-4 mb-14 px-5 leading-6">
        Test your knowledge under pressure with our timed exam mode, or explore
        and master over 480 questions at your own pace with our practice mode.
      </p>
      <div className="flex max-sm:flex-col max-sm:align-center justify-center gap-4">
        <CustomLink
          href="/practice"
          mode="practice"
          heading="Practice mode"
          paragraph="Learn and familiarize yourself with the questions and answers without any time constraint."
          containerClassName="flex flex-col h-full group bg-slate-800 rounded-xl pt-[30%] px-7"
          headingClassName="text-white group-hover:bg-gradient-to-r group-hover:from-[#0284C7] group-hover:to-[#2DD48F] group-hover:text-transparent bg-clip-text uppercase text-3xl font-bold"
          paragraphClassName="text-sm text-slate-400 mt-7"
        />

        <CustomLink
          href="/exam"
          mode="exam"
          heading="Exam mode"
          paragraph="Put your knowledge to the test by answering a fixed number of randomly selected questions under a time limit."
          containerClassName="flex flex-col h-full group bg-slate-800 rounded-xl pt-[30%] px-7"
          headingClassName="text-white group-hover:bg-gradient-to-r group-hover:from-[#F97316] group-hover:to-[#FACC15] group-hover:text-transparent bg-clip-text uppercase text-3xl font-bold"
          paragraphClassName="text-sm text-slate-400 mt-7"
        />
      </div>
    </div>
  );
};

export default Home;
