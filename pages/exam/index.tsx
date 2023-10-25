import type { NextPage } from "next";
import { gql, useQuery } from "@apollo/client";
import Head from "next/head";
import useTimer from "@azure-fundamentals/hooks/useTimer";
import { Button } from "@azure-fundamentals/components/Button";
import React, { useCallback, useEffect, useState } from "react";
import ExamQuizForm from "@azure-fundamentals/components/ExamQuizForm";
import ExamResult from "@azure-fundamentals/components/ExamResult";
import { IQueue, Queue } from "@azure-fundamentals/utils/Queue";

const questionsQuery = gql`
  query RandomQuestions($range: Int!) {
    randomQuestions(range: $range) {
      question
      options {
        isAnswer
        text
      }
    }
  }
`;

const Exam: NextPage = () => {
  const [status, setStatus] = useState<
    "waiting" | "playing" | "success" | "failed"
  >("waiting");
  const [points, setPoints] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [skippedQuestions, setSkippedQuestions] = useState<IQueue<number>>(
    Queue<number>(),
  );
  const [allQuestionsTouched, setAllQuestionsTouched] =
    useState<boolean>(false);
  const [answers, setAnswers] = useState<{
    [key: number]: boolean;
  }>({});

  const { remainingTime, startTimer, stopTimer, resetTimer } = useTimer({
    minutes: 3,
    seconds: 0,
  });

  const { loading, error, data } = useQuery(questionsQuery, {
    variables: { range: 30 },
  });

  const checkPassed = useCallback(() => {
    const numberOfCorrectAnswers =
      Object.values(answers).filter(Boolean).length;
    const percent = Math.floor(
      (numberOfCorrectAnswers / numberOfQuestions) * 100,
    );

    setPoints(percent);
    stopTimer();

    if (percent >= 75) {
      setStatus("success");
      return;
    }

    setStatus("failed");
  }, [answers, stopTimer]);

  useEffect(() => {
    if (remainingTime === "00:00") {
      checkPassed();
    }
  }, [checkPassed, remainingTime]);

  const totalSeconds = 3 * 60;
  const elapsedSeconds =
    totalSeconds -
    (parseInt(remainingTime.split(":")[0]) * 60 +
      parseInt(remainingTime.split(":")[1]));

  if (error) return <p>Oh no... {error.message}</p>;

  const numberOfQuestions = data?.randomQuestions.length || 0;

  const handleNextQuestion = (questionNo: number) => {
    if (questionNo <= numberOfQuestions) {
      if (!allQuestionsTouched) {
        setCurrentQuestionIndex(questionNo);
      } else if (!skippedQuestions.isEmpty()) {
        setCurrentQuestionIndex(
          skippedQuestions.dequeue() ?? numberOfQuestions,
        );
      } else {
        setCurrentQuestionIndex(numberOfQuestions);
        checkPassed();
      }
    } else {
      setAllQuestionsTouched(true);

      if (!skippedQuestions.isEmpty()) {
        setCurrentQuestionIndex(
          skippedQuestions.dequeue() ?? numberOfQuestions,
        );
      } else {
        setCurrentQuestionIndex(numberOfQuestions);
        checkPassed();
      }
    }
  };

  const handleSkipQuestion = (questionNo: number) => {
    skippedQuestions.enqueue(questionNo);

    // Unset any selected answer
    setAnswers((prevState) => {
      const updatedAnswers = { ...prevState };

      // Reset the response if an answer was selected
      if (updatedAnswers.hasOwnProperty(questionNo)) {
        delete updatedAnswers[questionNo];
      }

      // Replace with the updated state
      return updatedAnswers;
    });

    handleNextQuestion(questionNo + 1);
  };

  const handleSetAnswer = (isCorrect: boolean) => {
    setAnswers((prevState) => {
      return {
        ...prevState,
        [currentQuestionIndex]: isCorrect,
      };
    });
  };

  const handleRetakeExam = () => {
    resetTimer();
    setStatus("playing");
    setAnswers({});
    setAllQuestionsTouched(false);
    skippedQuestions.clear();

    setCurrentQuestionIndex(1);
    startTimer();
  };

  const isQuestionAnswered = (questionIndex: number) => {
    return Object.hasOwn(answers, questionIndex);
  };

  const getNumberOfAnsweredQuestions = (): number => {
    return Object.keys(answers).filter((questionNumber) =>
      isQuestionAnswered(Number(questionNumber)),
    ).length;
  };

  return (
    <div className="py-10 px-5 mx-auto w-5/6 sm:w-1/2 bg-slate-800 border-2 border-slate-700 rounded-lg">
      <Head>
        <title>Azure Fundamentals - Exam</title>
        <meta
          property="og:title"
          content="Azure Fundamentals - Exam"
          key="title"
        />
      </Head>
      <div>
        <div className="px-2 sm:px-10 w-full flex flex-row justify-between items-center">
          <p className="text-white font-bold text-sm sm:text-2xl">
            {getNumberOfAnsweredQuestions()}/{numberOfQuestions}
          </p>
          <h1 className="text-white font-bold text-lg sm:text-3xl">
            PRACTICE EXAM
          </h1>
          <p className="text-white font-bold text-sm sm:text-2xl">
            {remainingTime}
          </p>
        </div>
        {status === "waiting" && (
          <>
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
                onClick={() => {
                  startTimer();
                  setStatus("playing");
                  setCurrentQuestionIndex(1);
                }}
              >
                Begin exam
              </Button>
            </div>
          </>
        )}
        {status === "playing" && (
          <ExamQuizForm
            isLoading={loading}
            questionSet={data.randomQuestions[currentQuestionIndex - 1]}
            handleNextQuestion={handleNextQuestion}
            handleSkipQuestion={handleSkipQuestion}
            totalQuestions={numberOfQuestions}
            currentQuestionIndex={currentQuestionIndex}
            setAnswer={handleSetAnswer}
            isQuestionAnswered={isQuestionAnswered}
          />
        )}
        {status === "success" && (
          <ExamResult
            status={"success"}
            render={
              <>
                <p>Congratulations!</p>
                <p>
                  You completed the exam in {Math.floor(elapsedSeconds / 60)}{" "}
                  minutes and {elapsedSeconds % 60} seconds.
                </p>
              </>
            }
            points={points}
            handleRetakeExam={handleRetakeExam}
          />
        )}
        {status === "failed" && (
          <ExamResult
            status={"failed"}
            render={
              <>
                You didn't pass the exam, you need to score above 75 to pass,
                keep learning and try again.
              </>
            }
            points={points}
            handleRetakeExam={handleRetakeExam}
          />
        )}
      </div>
    </div>
  );
};

export default Exam;
