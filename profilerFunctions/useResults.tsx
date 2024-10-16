import { Question } from "../components/types";

interface Option {
  text: string;
  isAnswer: boolean;
}

interface Data {
  questions: Question[];
  answers: (string | string[])[];
}

interface Result {
  result: {
    points: number;
  };
}

const useResults = (data: Data): Result => {
  let points = 0;

  for (let i = 0; i < data.questions?.length; i++) {
    if (!data.answers[i] || !data.questions[i]) continue;
    const noOfAnswers = data.questions[i]?.options
      ? data.questions[i]?.options?.filter((el) => el.isAnswer === true).length
      : 0;
    if (noOfAnswers > 1) {
      let partialPoints = 0;
      const pointRaise = Math.round((1 / noOfAnswers) * 100) / 100;
      let isOneBad = false;
      let pointRaisedCount = 0;
      if (Array.isArray(data.answers[i])) {
        for (const answer of data.answers[i] ?? []) {
          if (
            data.questions[i]?.options
              ?.filter((el) => el.isAnswer === true)
              .some((el) => el.text === answer)
          ) {
            partialPoints = partialPoints + pointRaise;
            pointRaisedCount = pointRaisedCount + 1;
          }
          if (
            data.questions[i]?.options
              ?.filter((el) => el.isAnswer === false)
              .some((el) => el.text === answer)
          ) {
            partialPoints = partialPoints - pointRaise;
            isOneBad = true;
          }
        }
      }
      if (!isOneBad && pointRaisedCount === noOfAnswers) {
        points = Math.round((points + 1) * 100) / 100;
      } else {
        points =
          points +
          (partialPoints > 0 ? Math.round(partialPoints * 100) / 100 : 0);
        points = Math.round(points * 100) / 100;
      }
    } else if (noOfAnswers === 1 && !Array.isArray(data.answers[i])) {
      if (
        data.questions[i]?.options?.filter((el) => el.isAnswer === true)[0]
          ?.text === data.answers[i]
      ) {
        points = Math.round((points + 1) * 100) / 100;
      }
    }
  }

  return {
    result: {
      points: points,
    },
  };
};

const mockData: Data = {
  questions: [
    {
      question: "Is this a test question?",
      options: [
        {
          text: "Yes.",
          isAnswer: true,
        },
        {
          text: "No.",
          isAnswer: false,
        },
      ],
    },
    {
      question: "Is this a test question no.2?",
      options: [
        {
          text: "Yes.",
          isAnswer: true,
        },
        {
          text: "No.",
          isAnswer: false,
        },
      ],
    },
  ],
  answers: ["Yes.", "No."],
};

console.profile;
// eslint-disable-next-line react-hooks/rules-of-hooks
const { result } = useResults(mockData);
console.profileEnd("useResultsProfile");
