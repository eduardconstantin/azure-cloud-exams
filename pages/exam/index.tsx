import type { NextPage } from "next";
import { gql, useQuery } from "@apollo/client";
import Head from "next/head";
import useTimer from "@azure-fundamentals/hooks/useTimer";
import { Button } from "@azure-fundamentals/components/Button";

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
  const { remainingTime, startTimer, stopTimer } = useTimer({ minutes: 10, seconds: 0 });
  const { data, loading, error } = useQuery(questionsQuery, {
    variables: { range: 35 },
  });
  console.log(data);

  if (loading) return <p>Loading</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  return (
    <div className="h-screen w-full grid place-items-center">
      <Head>
        <title>Azure Fundamentals - Exam</title>
        <meta property="og:title" content="Azure Fundamentals - Exam" key="title" />
      </Head>
      <div className="py-10 px-5 sm:p-10 w-5/6 bg-slate-800 border-2 border-slate-700 rounded-lg">
        <div className="w-full flex flex-col lg:flex-row justify-between items-center">
          <p className="text-white font-bold text-2xl">0/30</p>
          <h1 className="text-white font-bold text-4xl">PRACTICE EXAM</h1>
          <p className="text-white font-bold text-2xl">{remainingTime}</p>
        </div>
        <div className="h-max min-h-[852px]">
          <div className="grid pt-36 place-items-center">
            <svg
              width="45"
              height="45"
              viewBox="0 0 45 45"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.5 0.703125C10.4628 0.703125 0.703125 10.4663 0.703125 22.5C0.703125 34.5408 10.4628 44.2969 22.5 44.2969C34.5372 44.2969 44.2969 34.5408 44.2969 22.5C44.2969 10.4663 34.5372 0.703125 22.5 0.703125ZM22.5 10.3711C24.5387 10.3711 26.1914 12.0238 26.1914 14.0625C26.1914 16.1012 24.5387 17.7539 22.5 17.7539C20.4613 17.7539 18.8086 16.1012 18.8086 14.0625C18.8086 12.0238 20.4613 10.3711 22.5 10.3711ZM27.4219 32.6953C27.4219 33.2778 26.9496 33.75 26.3672 33.75H18.6328C18.0504 33.75 17.5781 33.2778 17.5781 32.6953V30.5859C17.5781 30.0035 18.0504 29.5312 18.6328 29.5312H19.6875V23.9062H18.6328C18.0504 23.9062 17.5781 23.434 17.5781 22.8516V20.7422C17.5781 20.1597 18.0504 19.6875 18.6328 19.6875H24.2578C24.8403 19.6875 25.3125 20.1597 25.3125 20.7422V29.5312H26.3672C26.9496 29.5312 27.4219 30.0035 27.4219 30.5859V32.6953Z"
                fill="white"
              />
            </svg>
            <p className="text-white text-xl text-center pt-6">
              Practice Exam help you practice skills, assess your knowledge, and
              identify the areas where you need additional preparation to
              accelerate your chances of succeeding on certification exams.
              Practice Exams are intended to provide an overview of the style,
              wording, and difficulty of the questions that you are likely to
              experience on Azure Fundamentals real exam.
            </p>
          </div>
          <p className="text-white font-bold text-2xl text-center pt-20 mb-40">
            This Practice Exam contains 30 random questions (seen in upper left
            corner) and has a completion time limit of 15 minutes (seen in upper
            right corner).
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center">
          <Button
            type="button"
            intent="secondary"
            size="medium"
            onClick={() => startTimer()}
          >
            Begin exam
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Exam;
