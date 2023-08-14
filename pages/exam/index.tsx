import type { NextPage } from "next";
import useTimer from "@azure-fundamentals/hooks/useTimer";

const Exam: NextPage = () => {
  const { remainingTime, startTimer, stopTimer } = useTimer({ minutes: 10, seconds: 0 });
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
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
