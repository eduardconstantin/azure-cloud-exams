import { Question } from "@azure-fundamentals/components/types";
import { useState, useEffect } from "react";

export type ResultsHook = {
  points: number;
  setSavedAnswers: (data: any[]) => void;
  savedAnswers: any;
};

const useResults = (questions: Question[]): ResultsHook => {
  const [points, setPoints] = useState(0);
  const [savedAnswers, setSavedAnswers] = useState<any>([]);

  const countPoints = () => {
    let points = 0;
    for (let i = 0; i < questions?.length; i++) {
      if (!savedAnswers[i] || !questions[i]) continue;
      const noOfAnswers = questions[i]?.options
        ? questions[i]?.options?.filter((el: any) => el.isAnswer === true)
            .length
        : 0;
      if (noOfAnswers > 1) {
        let partialPoints = 0;
        const pointRaise = Math.round((1 / noOfAnswers) * 100) / 100;
        let isOneBad = false;
        let pointRaisedCount = 0;
        if (Array.isArray(savedAnswers[i])) {
          for (const answer of savedAnswers[i] ?? []) {
            if (
              questions[i]?.options
                ?.filter((el: any) => el.isAnswer === true)
                .some((el: any) => el.text === answer)
            ) {
              partialPoints = partialPoints + pointRaise;
              pointRaisedCount = pointRaisedCount + 1;
            }
            if (
              questions[i]?.options
                ?.filter((el: any) => el.isAnswer === false)
                .some((el: any) => el.text === answer)
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
      } else if (noOfAnswers === 1 && !Array.isArray(savedAnswers[i])) {
        if (
          questions[i]?.options?.filter((el: any) => el.isAnswer === true)[0]
            ?.text === savedAnswers[i]
        ) {
          points = Math.round((points + 1) * 100) / 100;
        }
      }
    }
    setPoints(points);
  };

  // Trigger countPoints when savedAnswers is updated
  useEffect(() => {
    if (savedAnswers.length === questions.length) {
      countPoints();
    }
  }, [savedAnswers]); // Depend on savedAnswers to trigger the effect

  return {
    points: points,
    setSavedAnswers: setSavedAnswers,
    savedAnswers: savedAnswers,
  };
};

export default useResults;
