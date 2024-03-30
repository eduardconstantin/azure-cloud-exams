"use client";

import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { gql, useQuery } from "@apollo/client";
import useTimer from "@azure-fundamentals/hooks/useTimer";
import { Button } from "@azure-fundamentals/components/Button";
import QuizExamForm from "@azure-fundamentals/components/QuizExamForm";
import { Question } from "@azure-fundamentals/components/types";
import ExamResult from "@azure-fundamentals/components/ExamResult";

const questionsQuery = gql`
  query RandomQuestions($range: Int!, $link: String) {
    randomQuestions(range: $range, link: $link) {
      question
      options {
        isAnswer
        text
      }
      images {
        url
        alt
      }
    }
  }
`;

const Exam: NextPage<{ searchParams: { url: string; name: string } }> = ({
  searchParams,
}) => {
  const { url } = searchParams;
  const { minutes, seconds } = {
    minutes: 15,
    seconds: 0,
  };
  const totalTimeInSeconds = minutes * 60 + seconds;
  const { remainingTime, startTimer, stopTimer, isRunning, isFinished } =
    useTimer({ minutes: minutes, seconds: seconds });
  const [currentQuestion, setCurrentQuestion] = useState<Question>();
  const [revealExam, setRevealExam] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [countAnswered, setCountAnswered] = useState<number>(0);
  const { data, loading, error } = useQuery(questionsQuery, {
    variables: { range: 30, link: url },
  });
  const [resultPoints, setResultPoints] = useState<number>(0);
  const [passed, setPassed] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const editedUrl = url.substring(0, url.lastIndexOf("/") + 1);
  const elapsedSeconds =
    totalTimeInSeconds -
    (parseInt(remainingTime.split(":")[0]) * 60 +
      parseInt(remainingTime.split(":")[1]));

  const handleCountAnswered = () => {
    setCountAnswered(countAnswered + 1);
  };

  const handleSkipQuestion = (questionNo: number) => {
    setCurrentQuestionIndex(questionNo);
    setCurrentQuestion(data?.randomQuestions[questionNo]);
  };

  const handleNextQuestion = (questionNo: number) => {
    setCurrentQuestionIndex(questionNo);
    setCurrentQuestion(data?.randomQuestions[questionNo]);
  };

  const getResultPoints = (points: number) => {
    const maxPoints = data?.randomQuestions?.length;
    const percentage = Math.round((points / maxPoints) * 10000) / 100;
    if (percentage >= 75) {
      setPassed(true);
    } else {
      setPassed(false);
    }

    setResultPoints(percentage);
  };

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    setCurrentQuestion(data?.randomQuestions[0]);
  }, [data]);

  if (loading) return <p>Loading</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  const numberOfQuestions = data.randomQuestions.length || 0;

  return (
    <div className="py-10 px-5 mb-6 mx-auto w-[90vw] lg:w-[60vw] 2xl:w-[45%] bg-slate-800 border-2 border-slate-700 rounded-lg">
      <div>
        <div className="px-2 sm:px-10 w-full flex flex-row justify-between items-center">
          <p className="text-white font-bold text-sm sm:text-2xl">
            {countAnswered}/{numberOfQuestions}
          </p>
          <h1 className="text-white font-bold text-lg sm:text-3xl">
            PRACTICE EXAM
          </h1>
          <p className="text-white font-bold text-sm sm:text-2xl">
            {remainingTime}
          </p>
        </div>
        {!isRunning && isFinished && !revealExam && (
          <ExamResult
            status={passed}
            points={resultPoints}
            elapsedSeconds={elapsedSeconds}
            setRevealExam={setRevealExam}
          />
        )}
        <div
          className={`${
            (isRunning && !isFinished) || revealExam ? "" : "hidden"
          }`}
        >
          <div className="h-max">
            <QuizExamForm
              remainingTime={remainingTime}
              isLoading={loading}
              handleCountAnswered={handleCountAnswered}
              handleSkipQuestion={handleSkipQuestion}
              handleNextQuestion={handleNextQuestion}
              totalQuestions={data.randomQuestions?.length}
              currentQuestionIndex={currentQuestionIndex}
              question={currentQuestion?.question ?? ""}
              options={currentQuestion?.options}
              images={currentQuestion?.images}
              stopTimer={stopTimer}
              revealExam={revealExam}
              getResultPoints={getResultPoints}
              questions={data.randomQuestions}
              hideExam={() => {
                setRevealExam(false);
              }}
              link={editedUrl}
            />
          </div>
        </div>
        {!isRunning && !isFinished && !revealExam && (
          <div>
            <div className="h-max">
              <div className="grid pt-20 place-items-center">
                <svg width="40" height="40" viewBox="0 0 40 40">
                  <path
                    fill="#FFFFFF"
                    d="M20,0C8.96,0,0,8.96,0,20c0,11.05,8.96,20,20,20s20-8.95,20-20C40,8.96,31.04,0,20,0z M20,8.87
                c1.87,0,3.39,1.52,3.39,3.39s-1.52,3.39-3.39,3.39s-3.39-1.52-3.39-3.39S18.13,8.87,20,8.87z M24.52,29.35
                c0,0.53-0.43,0.97-0.97,0.97h-7.1c-0.53,0-0.97-0.43-0.97-0.97v-1.94c0-0.53,0.43-0.97,0.97-0.97h0.97v-5.16h-0.97
                c-0.53,0-0.97-0.43-0.97-0.97v-1.94c0-0.53,0.43-0.97,0.97-0.97h5.16c0.53,0,0.97,0.43,0.97,0.97v8.06h0.97
                c0.53,0,0.97,0.43,0.97,0.97V29.35z"
                  />
                </svg>
                <p className="text-white text-center pt-6 px-6">
                  Practice Exam help you practice skills, assess your knowledge,
                  and identify the areas where you need additional preparation
                  to accelerate your chances of succeeding on certification
                  exams. Practice Exams are intended to provide an overview of
                  the style, wording, and difficulty of the questions that you
                  are likely to experience on Azure Fundamentals real exam.
                </p>
              </div>
              <p className="text-white font-bold text-xl text-center pt-20 px-6 mb-40">
                This Practice Exam contains {numberOfQuestions} random questions
                (seen in upper left corner) and has a completion time limit of{" "}
                {remainingTime.split(":")[0]} minutes (seen in upper right
                corner).
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center">
              <Button
                type="button"
                intent="secondary"
                size="medium"
                onClick={() => startTimer()}
              >
                Begin exam
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Exam;
