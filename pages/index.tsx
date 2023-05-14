import Link from "next/link";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="mx-auto w-5/6 sm:w-2/5 text-center">
      <h2 className="text-white text-5xl text-leading font-bold uppercase mt-14">Welcome!</h2>
      <p className="text-white text-lg mt-4 mb-14 px-5 leading-6">
        Test your knowledge under pressure with our timed exam mode, or explore and master over 480 questions at your
        own pace with our practice mode.
      </p>
      <div className="flex max-sm:flex-col max-sm:align-center justify-center gap-4">
        <Link
          href="/practice"
          className="group bg-slate-700 hover:bg-gradient-to-r from-[#0284C7] to-[#2DD48F] rounded-xl p-[2px] w-[350px] h-[350px] cursor-pointer"
        >
          <div className="flex flex-col h-full bg-slate-800 rounded-xl pt-[40%] px-7">
            <h2 className="text-white group-hover:bg-gradient-to-r group-hover:from-[#0284C7] group-hover:to-[#2DD48F] group-hover:text-transparent bg-clip-text uppercase text-3xl font-bold">
              Practice mode
            </h2>
            <p className="text-sm text-slate-400 mt-7">
              Learn and familiarize yourself with the questions and answers without any time constraint.
            </p>
          </div>
        </Link>
        <Link
          href="/exam"
          className="group bg-slate-700 hover:bg-gradient-to-r from-[#F97316] to-[#FACC15] rounded-xl p-[2px] w-[350px] h-[350px] cursor-pointer"
        >
          <div className="flex flex-col h-full bg-slate-800 rounded-xl pt-[40%] px-7">
            <h2 className="text-white group-hover:bg-gradient-to-r group-hover:from-[#F97316] group-hover:to-[#FACC15] group-hover:text-transparent bg-clip-text uppercase text-3xl font-bold">
              Exam mode
            </h2>
            <p className="text-sm text-slate-400 mt-7">
              Put your knowledge to the test by answering a fixed number of randomly selected questions under a time
              limit.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
