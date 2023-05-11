import React, { useState } from "react";
import QuizForm from "./QuizForm";
import { gql, useQuery } from "@apollo/client";

const query = gql`
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

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < 480) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const { loading, error, data } = useQuery(query, {
    variables: { id: currentQuestionIndex },
  });
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <div className="py-10 px-5 sm:p-10 mx-auto w-5/6 sm:w-1/2 bg-slate-800 border-2 border-slate-700 rounded-lg">
      <QuizForm
        isLoading={loading}
        questionSet={data?.questionById}
        handleNextQuestion={handleNextQuestion}
        currentQuestionIndex={currentQuestionIndex}
      />
    </div>
  );
}
