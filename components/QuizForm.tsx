import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Question } from "./types";
import Image from "next/image";
import SelectionInput from "./SelectionInput";
import { Button } from "./Button";

type Props = {
  isLoading: boolean;
  questionSet: Question;
  handleNextQuestion: () => void;
};

const QuizForm: React.FC<Props> = ({
  isLoading,
  questionSet,
  handleNextQuestion,
}) => {
  const { register, reset } = useForm();
  const [showCorrectAnswer, setShowCorrectAnswer] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [questionsSolved, setQuestionsSolved] = useState<number>(0);
  // const [totalQuestions, setTotalQuestions] = useState<number>(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  // useEffect(() => {
  //   if (questionSet) {
  //     setTotalQuestions(questionSet.length); // Update total questions
  //   }
  // }, [questionSet]);

  if (isLoading) return <p>Loading...</p>;
  const { question, options } = questionSet!;
  const imgUrl: string = `/api/og?question=${question}&width=${windowWidth}`;

  const noOfAnswers = options.filter((el) => el.isAnswer === true).length;

  const onSubmit = () => {
    setShowCorrectAnswer(true);
  };

  const handleNext = () => {
    reset();
    setShowCorrectAnswer(false);
    setQuestionsSolved(questionsSolved + 1);
    handleNextQuestion();
  };

  return (
    <div className="relative">
      <div className="flex justify-center items-center mb-2">
        <p className="text-white font-medium text-sm">
          {questionsSolved + 1} / 480
        </p>
      </div>
      <div className="relative h-40">
        <Image
          src={imgUrl}
          alt="question"
          width={1200}
          height={200}
          unoptimized
          loading="eager"
        />
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
        <Button
          type="submit"
          intent="secondary"
          size="medium"
          onClick={onSubmit}
        >
          Reveal Answer
        </Button>

        <Button
          type="button"
          intent="primary"
          size="medium"
          onClick={handleNext}
        >
          Next Question
        </Button>
      </div>
    </div>
  );
};

export default QuizForm;
