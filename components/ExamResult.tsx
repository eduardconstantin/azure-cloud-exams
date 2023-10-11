import React, { ReactNode } from "react";
import { Button } from "@azure-fundamentals/components/Button";

type Props = {
  status: "failed" | "success";
  points: number;
  render: ReactNode;
  handleRetakeExam: () => void;
};

const ExamResult: React.FC<Props> = ({
  status,
  points,
  render,
  handleRetakeExam,
}) => {
  return (
    <div className="mt-16 flex flex-col place-items-center gap-8">
      {status === "success" ? (
        <h2 className="text-3xl sm:text-4xl font-semibold text-center text-green-500 sm:mt-5">
          EXAM PASSED
        </h2>
      ) : (
        <h2 className="text-3xl sm:text-4xl font-semibold text-center text-red-500 sm:mt-5">
          EXAM FAILED
        </h2>
      )}

      <div className="flex justify-center relative z-[1]">
        <span className="text-white opacity-10 font-bold text-7xl sm:text-6xl md:text-8xl lg:text-9xl -z-[1] select-none">
          POINTS
        </span>

        <div className="absolute text-white text-4xl sm:text-6xl font-semibold text-center grid place-items-center top-0 bottom-0">
          <p>
            <span
              className={
                status === "success" ? "text-green-500" : "text-red-500"
              }
            >
              {points}
            </span>
            /100
          </p>
        </div>
      </div>
      <p className="text-white text-sm sm:text-lg mx-auto sm:w-[490px] text-center mt-5 mb-10 sm:mb-20">
        {render}
      </p>
      <Button
        type="button"
        intent="primary"
        size="medium"
        onClick={handleRetakeExam}
      >
        Retake Exam
      </Button>
    </div>
  );
};

export default ExamResult;
