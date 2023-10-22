import React, { useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { Question } from "./types";
import Image from "next/image";
import SelectionInput from "./SelectionInput";
import { Button } from "./Button";

type Props = {
  isLoading: boolean;
  questionSet: Question;
  handleNextQuestion: (q: number) => void;
  currentQuestionIndex: number;
  totalQuestions: number;
  windowWidth: number;
};

const QuizForm: React.FC<Props> = ({
  isLoading,
  questionSet,
  handleNextQuestion,
  currentQuestionIndex,
  totalQuestions,
  windowWidth,
}) => {
  const { register, handleSubmit, reset } = useForm();
  const [showCorrectAnswer, setShowCorrectAnswer] = useState<boolean>(false);
  const [lastIndex, setLastIndex] = useState<number>(0);
  const [canGoBack, setCanGoBack] = useState<boolean>(false);
  const [savedAnswers, setSavedAnswers] = useState<{ [key: number]: string | string[] }>({});

  const onSubmit = (data: FieldValues) => {
    setSavedAnswers((prev) => ({ ...prev, ...data.options }));
    setShowCorrectAnswer(true);
    setCanGoBack(true);
  };

  const isOptionChecked = (optionText: string): boolean | undefined => {
    if (!showCorrectAnswer) {
      return;
    }

    const savedAnswer = savedAnswers[currentQuestionIndex];
    return typeof savedAnswer === "string" || !savedAnswer
      ? savedAnswer === optionText
      : savedAnswer.includes(optionText);
  };

  if (isLoading) return <p>Loading...</p>;
  const { question, options } = questionSet!;
  const imgUrl: string = `/api/og?question=${question}&width=${windowWidth}`;

  const noOfAnswers = options.filter((el) => el.isAnswer === true).length;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="relative min-h-40">
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => {
              handleNextQuestion(currentQuestionIndex - 1);
            }}
            disabled={!(currentQuestionIndex > 1) || !canGoBack}
            className="group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-slate-300 group-disabled:text-transparent"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </button>
          <p className="text-white text-lg font-semibold flex justify-center relative w-[15%]">
            <span className="absolute text-white opacity-10 font-bold text-4xl bottom-0">Q&A</span>
            {currentQuestionIndex + 1}/{totalQuestions}
          </p>
          <button
            type="button"
            onClick={() => {
              handleNextQuestion(currentQuestionIndex + 1);
            }}
            disabled={!(currentQuestionIndex < lastIndex)}
            className="group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-slate-300 group-disabled:text-transparent"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>
        <Image src={imgUrl} alt="question" width={1200} height={200} priority={true} unoptimized loading="eager" />
      </div>
      <ul className="flex flex-col gap-2 mt-5 mb-16 select-none md:px-12 px-0 h-max min-h-[250px]">
        {options.map((option, index) => (
          <li key={index}>
            <SelectionInput
              {...register("options." + currentQuestionIndex)}
              index={index}
              type={noOfAnswers > 1 ? "checkbox" : "radio"}
              label={option.text}
              isAnswer={option.isAnswer}
              showCorrectAnswer={showCorrectAnswer}
              disabled={showCorrectAnswer}
              checked={isOptionChecked(option.text)}
            />
          </li>
        ))}
      </ul>
      <div className="flex justify-center flex-col sm:flex-row">
        <Button type="submit" intent="secondary" size="medium" disabled={showCorrectAnswer}>
          Reveal Answer
        </Button>
        <Button
          type="button"
          intent="primary"
          size="medium"
          disabled={currentQuestionIndex < lastIndex}
          onClick={() => {
            setShowCorrectAnswer(false);
            if (currentQuestionIndex + 1 === totalQuestions) {
              handleNextQuestion(0);
              setLastIndex(0);
              reset();
            } else {
              handleNextQuestion(currentQuestionIndex + 1);
              setLastIndex(currentQuestionIndex + 1);
            }
            setCanGoBack(false);
          }}
        >
          Next Question
        </Button>
      </div>
    </form>
  );
};

export default QuizForm;
