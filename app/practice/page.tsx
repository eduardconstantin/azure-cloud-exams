"use client";

import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import type { NextPage } from "next";
import QuizForm from "@azure-fundamentals/components/QuizForm";

const questionQuery = gql`
  query QuestionById($id: ID!, $link: String) {
    questionById(id: $id, link: $link) {
      question
      options {
        isAnswer
        text
      }
      images {
        alt
        url
      }
    }
  }
`;

const questionsQuery = gql`
  query Questions($link: String) {
    questions(link: $link) {
      count
    }
  }
`;

const Practice: NextPage<{ searchParams: { url: string; name: string } }> = ({
  searchParams,
}) => {
  const { url } = searchParams;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(1);
  const editedUrl = url.substring(0, url.lastIndexOf("/") + 1);

  const { loading, error, data } = useQuery(questionQuery, {
    variables: { id: currentQuestionIndex - 1, link: url },
  });

  const {
    data: questionsData,
    loading: questionsLoading,
    error: questionsError,
  } = useQuery(questionsQuery, {
    variables: { link: url },
  });

  const handleNextQuestion = (questionNo: number) => {
    if (questionNo > 0 && questionNo - 1 < questionsData?.questions?.count) {
      setCurrentQuestionIndex(questionNo);
    }
  };

  if (error) return <p>Oh no... {error.message}</p>;
  if (questionsError) return <p>Oh no... {questionsError.message}</p>;

  return (
    <div className="py-10 px-5 mb-6 sm:p-10 mx-auto w-[90vw] lg:w-[60vw] 2xl:w-[45%] bg-slate-800 border-2 border-slate-700 rounded-lg">
      <QuizForm
        isLoading={loading || questionsLoading}
        questionSet={data?.questionById}
        handleNextQuestion={handleNextQuestion}
        totalQuestions={questionsData?.questions?.count}
        currentQuestionIndex={currentQuestionIndex}
        link={editedUrl}
      />
    </div>
  );
};

export default Practice;
