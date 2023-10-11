import SelectionInput from "@azure-fundamentals/components/SelectionInput";
import { Button } from "@azure-fundamentals/components/Button";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Question } from "@azure-fundamentals/components/types";

type Props = {
  isLoading: boolean;
  questionSet: Question;
  handleNextQuestion: (q: number) => void;
  currentQuestionIndex: number;
  totalQuestions: number;
  setAnswer: (isCorrect: boolean) => void;
};

const ExamQuizForm: React.FC<Props> = ({
  isLoading,
  questionSet,
  handleNextQuestion,
  currentQuestionIndex,
  totalQuestions,
  setAnswer,
}) => {
  const { register, handleSubmit, reset } = useForm();
  const [lastIndex, setLastIndex] = useState<number>(0);

  const onSubmit = () => {
    if (currentQuestionIndex > totalQuestions) {
      reset();
      return;
    }
    handleNextQuestion(currentQuestionIndex + 1);
    setLastIndex(currentQuestionIndex + 1);
  };

  if (isLoading) return <p>Loading...</p>;
  const { question, options } = questionSet;

  const noOfAnswers = options.filter((el) => el.isAnswer).length;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="relative min-h-40 mt-8">
        <p className="text-white px-12 py-6 select-none">{question}</p>
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
              onClick={() => setAnswer(option.isAnswer)}
            />
          </li>
        ))}
      </ul>
      <div className="flex justify-center flex-col sm:flex-row gap-4">
        <Button type="submit" intent="primary" size="medium">
          Skip Question
        </Button>
        <Button
          type="button"
          intent="secondary"
          size="medium"
          disabled={currentQuestionIndex < lastIndex}
          onClick={onSubmit}
        >
          Next Question
        </Button>
      </div>
    </form>
  );
};

export default ExamQuizForm;
