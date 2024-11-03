import { useEffect, useState, type FC } from "react";
import Image from "next/image";
import { Question } from "./types";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button } from "./Button";
import useResults from "@azure-fundamentals/hooks/useResults";

type Props = {
  isLoading: boolean;
  handleNextQuestion: (q: number) => void;
  handleSkipQuestion: (q: number) => void;
  handleCountAnswered: () => void;
  currentQuestionIndex: number;
  totalQuestions: number;
  question: string;
  questions: Question[];
  options: any;
  stopTimer: () => void;
  getResultPoints: (data: number) => void;
  revealExam?: boolean;
  hideExam?: () => void;
  remainingTime?: string;
  link: string;
  images?: { url: string; alt: string }[];
};

const QuizExamForm: FC<Props> = ({
  isLoading,
  handleNextQuestion,
  handleSkipQuestion,
  handleCountAnswered,
  currentQuestionIndex,
  totalQuestions,
  question,
  options,
  stopTimer,
  getResultPoints,
  questions,
  revealExam,
  hideExam,
  remainingTime,
  link,
  images,
}) => {
  const [showCorrectAnswer, setShowCorrectAnswer] = useState<boolean>(false);
  const [savedAnswers, setSavedAnswers] = useState<any>([]);
  const { points, reCount } = useResults();
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    alt: string;
  } | null>(null);
  const noOfAnswers = options
    ? options?.filter((el: any) => el.isAnswer === true).length
    : 0;

  const { control, handleSubmit, setValue, watch, register } = useForm({
    defaultValues: {
      options: [{ checked: false, text: "Option 1", isAnswer: false }],
    },
  });

  const { fields, replace } = useFieldArray({
    control,
    name: "options",
  });

  const onSubmit = (data) => {
    reCount({ questions: questions, answers: savedAnswers });
    stopTimer();
  };

  useEffect(() => {
    getResultPoints(points);
  }, [points]);

  useEffect(() => {
    if (revealExam) {
      setShowCorrectAnswer(true);
    }
  }, [revealExam]);

  useEffect(() => {
    if (remainingTime === "00:00") {
      handleSubmit(onSubmit)();
    }
  }, [remainingTime]);

  useEffect(() => {
    if (savedAnswers.length > 0) {
      let done = true;
      for (let x = 0; x < savedAnswers.length; x++) {
        if (savedAnswers[x] === null) {
          done = false;
          break;
        }
      }
      if (done === true) {
        handleSubmit(onSubmit)();
      }
    }
  }, [savedAnswers]);

  const nextQuestion = (skip: boolean) => {
    saveAnswers(skip);
    let areAllQuestionsAnswered = false;
    let i = currentQuestionIndex + 1;
    while (savedAnswers[i] !== null && i < totalQuestions) {
      i++;
    }
    if (i >= totalQuestions) {
      i = 0;
    }
    while (savedAnswers[i] !== null && i < totalQuestions) {
      i++;
    }
    if (i >= totalQuestions) {
      areAllQuestionsAnswered = true;
    }
    if (skip === true) {
      handleSkipQuestion(i);
    } else {
      if (areAllQuestionsAnswered) {
        handleSubmit(onSubmit)();
      } else {
        handleCountAnswered();
        handleNextQuestion(i);
      }
    }
  };

  const isQuestionAnswered = () => {
    const options = watch("options");
    return options.some((option) => option.checked);
  };

  const isOptionChecked = (optionText: string): boolean | undefined => {
    const savedAnswer = savedAnswers[currentQuestionIndex];
    return typeof savedAnswer === "string" || !savedAnswer
      ? savedAnswer === optionText
      : savedAnswer.includes(optionText);
  };

  useEffect(() => {
    const savedAnswersInit = Array(totalQuestions).fill(null);
    setSavedAnswers(savedAnswersInit);
  }, [totalQuestions]);

  useEffect(() => {
    const opt = options?.map((option) => ({
      checked: isOptionChecked(option.text),
      text: option.text,
      isAnswer: option.isAnswer,
    }));
    replace(opt || []);
  }, [options]);

  const saveAnswers = async (skip = false) => {
    if (skip) {
      let saved = [...savedAnswers];
      saved[currentQuestionIndex] = null;
      setSavedAnswers(saved);
      return;
    }

    const options = watch("options");
    let selectedArr = [];
    let selected = null;

    options.forEach((answer) => {
      if (answer.checked && noOfAnswers > 1) {
        selectedArr.push(answer.text);
      } else if (answer.checked && noOfAnswers === 1) {
        selected = answer.text;
      }
    });

    let saved = [...savedAnswers];
    saved[currentQuestionIndex] =
      noOfAnswers > 1 && selectedArr.length > 0 ? selectedArr : selected;
    setSavedAnswers(saved);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="relative min-h-40">
        <div className="relative min-h-40 mt-8">
          <p className="text-white px-12 py-6 select-none">
            {currentQuestionIndex + 1}. {question}
          </p>
        </div>
        {images && (
          <ul className="flex flex-row justify-center gap-2 mt-5 mb-8 select-none md:px-12 px-0">
            {images.map((image) => (
              <li
                key={image.alt}
                className="w-[40px] h-[40px] rounded-md border border-white overflow-hidden flex flex-row justify-center"
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={link + image.url}
                  alt={image.alt}
                  className="max-h-max max-w-max hover:opacity-60"
                  unoptimized
                  width={200}
                  height={200}
                />
              </li>
            ))}
          </ul>
        )}
        {selectedImage && (
          <div className="fixed top-0 left-0 z-50 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
            <img
              src={link + selectedImage.url}
              alt={selectedImage.alt}
              className="max-w-[90%] max-h-[90%]"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-3 right-5 px-3 py-1 bg-white text-black rounded-md"
            >
              Close
            </button>
          </div>
        )}
      </div>
      <ul className="flex flex-col gap-2 mt-5 mb-16 select-none md:px-12 px-0 h-max min-h-[250px]">
        {fields.map((option, index) => (
          <li key={option.id}>
            <Controller
              name={`options.${index}.checked`}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="checkbox"
                  id={`options.${currentQuestionIndex}.${index}`}
                  className={`peer hidden [&:checked_+_label_svg_path]:block `}
                  disabled={showCorrectAnswer}
                  checked={field.value}
                  onChange={(e) => {
                    if (noOfAnswers === 1) {
                      fields.forEach((_, idx) => {
                        if (idx !== index) {
                          setValue(`options.${idx}.checked`, false);
                        }
                      });
                      setValue(`options.${index}.checked`, e.target.checked);
                    } else {
                      setValue(`options.${index}.checked`, e.target.checked);
                    }
                  }}
                />
              )}
            />
            <label
              htmlFor={`options.${currentQuestionIndex}.${index}`}
              className={`m-[1px] flex cursor-pointer items-center rounded-lg border hover:bg-slate-600 p-4 text-xs sm:text-sm font-medium shadow-sm ${
                showCorrectAnswer && option.isAnswer
                  ? option.checked
                    ? "border-emerald-500 bg-emerald-500/25 hover:border-emerald-400 hover:bg-emerald-600/50"
                    : `border-emerald-500 bg-emerald-500/25 hover:border-emerald-400 hover:bg-emerald-600/50 ${
                        option.checked
                          ? "border-emerald-500 bg-emerald-500/50"
                          : ""
                      }`
                  : option.checked
                  ? "border-gray-400 bg-gray-500/25 hover:border-gray-300 hover:bg-gray-600"
                  : `border-slate-500 bg-gray-600/25 hover:border-gray-400/75 hover:bg-gray-600/75 ${
                      option.checked
                        ? "border-gray-400 hover:border-slate-300 bg-gray-600"
                        : ""
                    }`
              }`}
            >
              <svg
                className={`border ${
                  noOfAnswers > 1 ? "rounded" : "rounded-full"
                } absolute h-5 w-5 p-0.5 ${
                  showCorrectAnswer && option.isAnswer
                    ? "text-emerald-500 border-emerald-600"
                    : "text-gray-200 border-slate-500"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path
                  className={`${option.checked ? "block" : "hidden"}`}
                  fillRule="evenodd"
                  d="M 2 0 a 2 2 0 0 0 -2 2 v 12 a 2 2 0 0 0 2 2 h 12 a 2 2 0 0 0 2 -2 V 2 a 2 2 0 0 0 -2 -2 H 2 z z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-gray-200 pl-7 break-words inline-block w-full">
                {option?.text}
              </span>
            </label>
          </li>
        ))}
      </ul>
      {!revealExam ? (
        <div className="flex justify-center flex-col sm:flex-row gap-4">
          <Button
            type="button"
            intent="primary"
            size="medium"
            onClick={async () => {
              nextQuestion(true);
            }}
          >
            <span>Skip Question</span>
          </Button>
          <Button
            type="button"
            intent="secondary"
            size="medium"
            disabled={!isQuestionAnswered()}
            onClick={async () => {
              nextQuestion(false);
            }}
          >
            <span className={`${!isQuestionAnswered() ? "opacity-50" : ""}`}>
              Next Question
            </span>
          </Button>
        </div>
      ) : (
        <div className="flex justify-center flex-col sm:flex-row gap-4">
          <Button
            type="button"
            intent="primary"
            size="medium"
            disabled={currentQuestionIndex === 0}
            onClick={async () => {
              handleNextQuestion(currentQuestionIndex - 1);
            }}
          >
            <span
              className={`${currentQuestionIndex === 0 ? "opacity-50" : ""}`}
            >
              Previous Question
            </span>
          </Button>
          <Button
            type="button"
            intent="primary"
            size="medium"
            disabled={currentQuestionIndex === totalQuestions - 1}
            onClick={async () => {
              handleNextQuestion(currentQuestionIndex + 1);
            }}
          >
            <span
              className={`${
                currentQuestionIndex === totalQuestions - 1 ? "opacity-50" : ""
              }`}
            >
              Next Question
            </span>
          </Button>
          <Button
            type="button"
            intent="secondary"
            size="medium"
            onClick={() => {
              if (hideExam) {
                hideExam();
              }
            }}
          >
            <span>Back</span>
          </Button>
        </div>
      )}
    </form>
  );
};

export default QuizExamForm;
