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
    <div className="w-[900px] max-h-screen mx-auto">
    <div className="mt-16 grid place-items-center gap-8">
      {status === "success" ? (
        <h2 className="text-4xl font-semibold text-center text-green-500">
          EXAM PASSED
        </h2>
      ) : (
        <h2 className="text-4xl font-semibold text-center text-red-500">
          EXAM FAILED
        </h2>
      )}

      <div className="flex justify-center relative z-[1]">
        <span className="text-white opacity-10 font-bold text-8xl sm:text-6xl md:text-8xl lg:text-9xl -z-[1] select-none">
          POINTS
        </span>

        <div className="absolute text-white text-6xl font-semibold text-center grid place-items-center top-0 bottom-0">
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
      <p className="text-white text-lg mx-auto w-[490px] text-center">{render}</p>
      
      <div className="pb-[30px]">
        <Button
        type="button"
        intent="primary"
        size="medium"
        onClick={handleRetakeExam}
      >
        Retake Exam
      </Button>
      </div>
    </div>
  </div>
  );
};

export default ExamResult;
