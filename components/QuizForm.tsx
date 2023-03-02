import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Question } from "./types";
import Image from "next/image";
import SelectionInput from "./SelectionInput";

type Props = {
  isLoading: boolean;
  questionSet: Question;
  handleNextQuestion: () => void;
};

const QuizForm: React.FC<Props> = ({ isLoading, questionSet, handleNextQuestion }) => {
  const { register, handleSubmit, reset } = useForm();
  const [showCorrectAnswer, setShowCorrectAnswer] = useState<boolean>(false);

  if (isLoading) return <p>Loading...</p>;
  const { question, options } = questionSet!;
  const imgUrl: string = `/api/og?question=${question}`;

  const noOfAnswers = options.filter((el) => el.isAnswer === true).length;

  const onSubmit = () => {
    setShowCorrectAnswer(true);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="relative h-40">
        <Image src={imgUrl} alt="question" width={1200} height={200} unoptimized loading="eager" />
      </div>
      <ul className="flex flex-col gap-2 mt-5 mb-16 select-none md:px-12 px-0 h-max min-h-[250px]">
        {options.map((option, index) => (
          <li key={index}>
            <SelectionInput
              {...register("options")}
              index={index}
              type={noOfAnswers > 1 ? "checkbox" : "radio"}
              label={option.text}
              isAnswer={option.isAnswer}
              showCorrectAnswer={showCorrectAnswer}
              isDisabled={showCorrectAnswer}
            />
          </li>
        ))}
      </ul>
      <div className="flex justify-center flex-col sm:flex-row">
        <button
          className="text-white bg-emerald-600/50 hover:bg-emerald-600/60 border-emerald-600 border focus:ring-1 focus:ring-blue-300 font-medium rounded-lg text-xs sm:text-sm sm:px-5 py-2.5 sm:mr-2 mb-2 sm:mb-0 dark:bg-emerald-600/50 dark:hover:bg-emerald-600/60 focus:outline-none dark:focus:ring-green-800"
          type="submit"
        >
          Reveal Answer
        </button>
        <button
          className="text-white bg-blue-600/50 border-blue-600 border hover:bg-blue-600/60 focus:ring-1 focus:ring-blue-300 font-medium rounded-lg text-xs sm:text-sm sm:px-5 py-2.5 sm:mr-2 dark:bg-blue-600/50 dark:border-blue-600 dark:hover:bg-blue-600/60 focus:outline-none dark:focus:ring-blue-800"
          onClick={() => {
            reset();
            setShowCorrectAnswer(false);
            handleNextQuestion();
          }}
          type="button"
        >
          Next Question
        </button>
      </div>
    </form>
  );
};

export default QuizForm;
