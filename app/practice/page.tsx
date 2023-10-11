"use client";

import React, { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import type { NextPage } from "next";
import QuizForm from "@azure-fundamentals/components/QuizForm";

const questionQuery = gql`
  query QuestionById($id: ID!) {
    questionById(id: $id) {
      question
      options {
        isAnswer
        text
      }
    }
  }
`;

const questionsQuery = gql`
  query Questions {
    questions {
      count
    }
  }
`;

const Practice: NextPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(1);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  const { loading, error, data } = useQuery(questionQuery, {
    variables: { id: currentQuestionIndex - 1 },
  });

  const {
    data: questionsData,
    loading: questionsLoading,
    error: questionsError,
  } = useQuery(questionsQuery);

  const handleNextQuestion = (questionNo: number) => {
    if (questionNo > 0 && questionNo - 1 < questionsData?.questions?.count) {
      setCurrentQuestionIndex(questionNo);
    }
  };

  if (error) return <p>Oh no... {error.message}</p>;
  if (questionsError) return <p>Oh no... {questionsError.message}</p>;

  return (
    <div className="py-10 px-5 sm:p-10 mx-auto w-5/6 sm:w-1/2 bg-slate-800 border-2 border-slate-700 rounded-lg">
      <QuizForm
        windowWidth={windowWidth}
        isLoading={loading || questionsLoading}
        questionSet={data?.questionById}
        handleNextQuestion={handleNextQuestion}
        totalQuestions={questionsData?.questions?.count}
        currentQuestionIndex={currentQuestionIndex}
      />
    </div>
  );
};

export default Practice;
