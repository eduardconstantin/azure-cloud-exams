import type { NextPage } from "next";
import Head from "next/head";
import useTimer from "@azure-fundamentals/hooks/useTimer";

const Exam: NextPage = () => {
  const { remainingTime, startTimer, stopTimer } = useTimer({ minutes: 10, seconds: 0 });
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <Head>
        <title>Azure Fundamentals - Exam</title>
        <meta property="og:title" content="Azure Fundamentals - Exam" key="title" />
      </Head>
      <h1 className="text-white font-bold text-6xl">COMING SOON</h1>
      <div className="w-full flex flex-row justify-center items-center gap-5">
        <button
          className="text-white font-bold text-xl border border-solid border-slate-50 p-1"
          type="button"
          onClick={() => startTimer()}
        >
          Start
        </button>
        <button
          className="text-white font-bold text-xl border border-solid border-slate-50 p-1"
          type="button"
          onClick={() => stopTimer()}
        >
          Stop
        </button>
        <p className="text-white font-bold text-xl">{remainingTime}</p>
      </div>
    </div>
  );
};

export default Exam;
