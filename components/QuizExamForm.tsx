import React, { use, useCallback, useEffect, useState } from "react";
import { useForm, FieldValues, set } from "react-hook-form";
import { Question } from "./types";
import Image from "next/image";
import SelectionInput from "./SelectionInput";
import {FieldArray, FormikProvider, Field, useFormik} from "formik"
import { Button } from "./Button";
import useResults from "@azure-fundamentals/hooks/useResults";

type Props = {
  isLoading: boolean;
  handleNextQuestion: (q: number) => void;
  currentQuestionIndex: number;
  totalQuestions: number;
  windowWidth: number;
  question: string;
  questions: Question[];
  options: any;
  stopTimer: () => void;
  getResultPoints: (data: number) => void;
  revealExam?: boolean;
  hideExam?: () => void;
};

const QuizExamForm: React.FC<Props> = ({
  isLoading,
  handleNextQuestion,
  currentQuestionIndex,
  totalQuestions,
  windowWidth,
  question,
  options,
  stopTimer,
  getResultPoints,
  questions,
  revealExam,
  hideExam
}) => {
  const { register, handleSubmit, reset, getValues } = useForm();
  const [showCorrectAnswer, setShowCorrectAnswer] = useState<boolean>(false);
  const [savedAnswers, setSavedAnswers] = useState<any>([]);

  const noOfAnswers = options ? options?.filter((el: any) => el.isAnswer === true).length : 0;

  const formik = useFormik({
    initialValues: {
      options: [
        {
          checked: false,
          text: "Option 1",
          isAnswer: false
        }
      ]
    },
    onSubmit: () => {
      saveAnswers().then(() => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        console.profile
        const { points } = useResults({ questions: questions, answers: savedAnswers });
        console.profileEnd
        getResultPoints(points);
      })
      stopTimer()
    }
  });

  useEffect(() => {
    if (revealExam) {
      setShowCorrectAnswer(true);
    }
  }, [revealExam]);

  const areAllQuestionsAnswered = (): boolean => {
    for (const answers of savedAnswers) {
      if (answers == null) {
        return false;
      }
    }
    return true;
  }

  const isLastQuestionAnswered = (): boolean => {
    if (currentQuestionIndex === totalQuestions - 1) {
      for (const answer of formik.values.options) {
        if (answer.checked === true) {
          return true;
        }
      }
      return savedAnswers[currentQuestionIndex] != null
    }
    return false;
  }

  const isOptionChecked = (optionText: string): boolean | undefined => {
    /* if (!showCorrectAnswer) {
      return false;
    } */

    const savedAnswer = savedAnswers[currentQuestionIndex];
    return typeof savedAnswer === "string" || !savedAnswer
      ? savedAnswer === optionText
      : savedAnswer.includes(optionText);
  };

  useEffect(() => {
    const savedAnswersInit = []
    for(let i = 0; i < totalQuestions; i++) {
      savedAnswersInit.push(null)
    }
    setSavedAnswers(savedAnswersInit)
  }, [])

  useEffect(() => {
    const opt = options?.map((option: any) => {
      return {
        checked: isOptionChecked(option.text),
        text: option.text,
        isAnswer: option.isAnswer
      }
    })
    formik.setFieldValue("options", opt ?? []);
  }, [options])

  const saveAnswers = async () => {
    let selectedArr = [];
    let selected = null;
    for (const answer of formik.values.options) {
      if (answer.checked && noOfAnswers > 1) {
        selectedArr.push(answer.text);
      } else if (answer.checked && noOfAnswers == 1) {
        selected = answer.text;
      }
    }
    let saved = savedAnswers;
    saved[currentQuestionIndex] = noOfAnswers > 1 && selectedArr?.length > 0 ? selectedArr : selected;
    setSavedAnswers(saved);
  }

  if (isLoading) return <p>Loading...</p>;
  const imgUrl: string = `/api/og?question=${question}&width=${windowWidth}`;

  return (
    <FormikProvider value={formik} >
      <div className="relative min-h-40">
        <Image src={imgUrl} alt="question" width={1200} height={200} priority={true} unoptimized loading="eager" />
      </div>
      <ul className="flex flex-col gap-2 mt-5 mb-16 select-none md:px-12 px-0 h-max min-h-[250px]">
        <FieldArray
            name="options"
            render={() => (
              formik.values?.options?.length > 0 ? formik.values?.options?.map((option: any, index: any) => (
              <>
                <Field className="peer hidden [&:checked_+_label_svg]:block" key={`options.${currentQuestionIndex}.${index}`} disabled={showCorrectAnswer} type={"checkbox"} id={`options.${currentQuestionIndex}.${index}`} name={`options.${index}.checked`} value={formik.values.options[index]?.checked} checked={formik.values.options[index]?.checked} onChange={() => {
                  if (noOfAnswers === 1 && !formik.values.options[index]?.checked) {
                    for (let i = 0; i < formik.values.options.length; i++) {
                      if (i !== index) {
                        formik.setFieldValue(`options.${i}.checked`, false)
                      }
                    }
                    formik.setFieldValue(`options.${index}.checked`, !formik.values.options[index]?.checked)
                  } else {
                    formik.setFieldValue(`options.${index}.checked`, !formik.values.options[index]?.checked)
                  }
                }} />
                <label
                  htmlFor={`options.${currentQuestionIndex}.${index}`}
                  className={`flex cursor-pointer items-center rounded-lg border p-4 text-xs sm:text-sm font-medium shadow-sm ${
                    showCorrectAnswer && formik.values.options[index]?.isAnswer
                      ? "border-emerald-500 dark:hover:border-emerald-400 bg-emerald-500/25"
                      : "hover:border-gray-500 border-gray-600 bg-gray-600/25"
                  }`}
                >
                  <svg
                    className={`hidden absolute h-5 w-5 ${showCorrectAnswer && formik.values.options[index]?.isAnswer ? "text-emerald-500" : "text-gray-200"}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-200 pl-7 break-words inline-block w-full">{option?.text}</span>
                </label>
              </>
              )) : null
            )}
        />
      </ul>
      <div className="flex justify-between sm:flex-row">
        <Button
          type="button"
          intent="primary"
          size="medium"
          disabled={currentQuestionIndex === 0}
          onClick={async () => {
            //setShowCorrectAnswer(false);
            saveAnswers()
            if (currentQuestionIndex - 1 === 0) {
              handleNextQuestion(0);
            } else {
              handleNextQuestion(currentQuestionIndex - 1);
            }
          }}
        >
          <span className={`${currentQuestionIndex === 0 ? "opacity-50" : ""}`}>Previous Question</span>
        </Button>
        <Button
          type="button"
          intent="primary"
          size="medium"
          disabled={currentQuestionIndex === totalQuestions - 1}
          onClick={async () => {
            //setShowCorrectAnswer(false);
            saveAnswers()
            if (currentQuestionIndex + 1 === totalQuestions) {
              handleNextQuestion(totalQuestions);
            } else {
              handleNextQuestion(currentQuestionIndex + 1);
            }
          }}
        >
          <span className={`${currentQuestionIndex === totalQuestions - 1 ? "opacity-50" : ""}`}>Next Question</span>
        </Button>
      </div>
      <div className="mt-5 flex justify-center sm:flex-row">
        {!revealExam ? <Button
          type="button"
          intent="primary"
          size="medium"
          disabled={!areAllQuestionsAnswered() && !isLastQuestionAnswered()}
          onClick={() => {
            formik.submitForm()
          }}
        >
          <span className={`${!areAllQuestionsAnswered() && !isLastQuestionAnswered() ? "opacity-50" : ""}`}>Submit</span>
        </Button> : <Button
                      type="button"
                      intent="primary"
                      size="medium"
                      disabled={!areAllQuestionsAnswered() && !isLastQuestionAnswered()}
                      onClick={() => {
                        if (hideExam) {
                          hideExam()
                        }
                      }}
                    >
                      <span className={`${!areAllQuestionsAnswered() && !isLastQuestionAnswered() ? "opacity-50" : ""}`}>Back</span>
                    </Button>}
      </div>
    </FormikProvider>
  );
};

export default QuizExamForm;
