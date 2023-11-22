//import { renderHook } from '@testing-library/react-hooks';
import { renderHook } from "@testing-library/react";
import useResults, { ResultsData, ResultsHook } from "../hooks/useResults"; // Adjust the import path accordingly

const mockData: ResultsData = {
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

const mockData2: ResultsData = {
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
          isAnswer: true,
        },
        {
          text: "Maybe.",
          isAnswer: true,
        },
        {
          text: "Probably.",
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
        {
          text: "Maybe.",
          isAnswer: true,
        },
        {
          text: "Probably.",
          isAnswer: false,
        },
      ],
    },
  ],
  answers: [["Yes.", "No.", "Probably."], ["Yes."]],
};

const mockData3: ResultsData = {
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
          isAnswer: true,
        },
        {
          text: "Maybe.",
          isAnswer: true,
        },
        {
          text: "Probably.",
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
        {
          text: "Maybe.",
          isAnswer: true,
        },
        {
          text: "Probably.",
          isAnswer: false,
        },
      ],
    },
  ],
  answers: [null, null],
};

const mockData4: ResultsData = {
  questions: [],
  answers: ["answer", ["answer1", "answer2"], null, null, "answer2"],
};

const mockData5: ResultsData = {
  questions: [
    {
      question: "Is this a test question?",
      options: [
        {
          text: "Yes.",
          isAnswer: false,
        },
        {
          text: "No.",
          isAnswer: true,
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
    {
      question: "Is this a test question no.3?",
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
      question: "Is this a test question no.4?",
      options: [
        {
          text: "Yes.",
          isAnswer: false,
        },
        {
          text: "No.",
          isAnswer: true,
        },
      ],
    },
  ],
  answers: ["No.", "Yes.", "Yes.", "No."],
};

const mockData6: ResultsData = {
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
          isAnswer: true,
        },
        {
          text: "Maybe.",
          isAnswer: true,
        },
        {
          text: "Probably.",
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
        {
          text: "Maybe.",
          isAnswer: true,
        },
        {
          text: "Probably.",
          isAnswer: false,
        },
      ],
    },
  ],
  answers: [
    ["Yes.", "No.", "Maybe."],
    ["Yes.", "Maybe."],
  ],
};

const mockData7: ResultsData = {
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
          isAnswer: true,
        },
        {
          text: "Maybe.",
          isAnswer: true,
        },
        {
          text: "Probably.",
          isAnswer: false,
        },
      ],
    },
    {
      question: "Is this a test question no.2?",
      options: [
        {
          text: "Yes.",
          isAnswer: false,
        },
        {
          text: "No.",
          isAnswer: true,
        },
      ],
    },
  ],
  answers: [["Yes.", "No.", "Maybe."], "No."],
};

const mockData8: ResultsData = {
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
          isAnswer: true,
        },
        {
          text: "Maybe.",
          isAnswer: true,
        },
        {
          text: "Probably.",
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
          isAnswer: true,
        },
        {
          text: "Maybe.",
          isAnswer: false,
        },
        {
          text: "Probably.",
          isAnswer: true,
        },
      ],
    },
  ],
  answers: [["Probably."], ["Maybe."]],
};

const mockData9: ResultsData = {
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
  answers: ["No.", "No."],
};

const mockData10: ResultsData = {
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
          isAnswer: true,
        },
        {
          text: "Maybe.",
          isAnswer: false,
        },
        {
          text: "Probably.",
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
        {
          text: "Maybe.",
          isAnswer: false,
        },
        {
          text: "Probably.",
          isAnswer: true,
        },
      ],
    },
  ],
  answers: [
    ["Yes.", "No.", "Probably.", "Maybe."],
    ["Yes.", "No.", "Probably.", "Maybe."],
  ],
};

const mockData11: ResultsData = {
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
          isAnswer: true,
        },
        {
          text: "Maybe.",
          isAnswer: false,
        },
        {
          text: "Probably.",
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
        {
          text: "Maybe.",
          isAnswer: false,
        },
        {
          text: "Probably.",
          isAnswer: true,
        },
      ],
    },
  ],
  answers: [
    ["Yes.", "No.", "Probably.", "Maybe."],
    ["Yes.", "No.", "Probably."],
  ],
};

const mockData12: ResultsData = {
  questions: [],
  answers: [],
};

const mockData13: ResultsData = {
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
          isAnswer: true,
        },
        {
          text: "Maybe.",
          isAnswer: false,
        },
        {
          text: "Probably.",
          isAnswer: true,
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
  answers: [["Yes.", "No.", "Probably.", "Maybe."], "Yes."],
};

const mockData14: ResultsData = {
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
          isAnswer: true,
        },
        {
          text: "Maybe.",
          isAnswer: false,
        },
        {
          text: "Probably.",
          isAnswer: true,
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
  answers: ["Yes.", ["No."]],
};

const mockData15: ResultsData = {
  questions: [
    {
      question: "Is this a test question?",
      options: [
        {
          text: "Yes.",
          isAnswer: false,
        },
        {
          text: "No.",
          isAnswer: false,
        },
        {
          text: "Maybe.",
          isAnswer: false,
        },
        {
          text: "Probably.",
          isAnswer: false,
        },
      ],
    },
    {
      question: "Is this a test question no.2?",
      options: [
        {
          text: "Yes.",
          isAnswer: false,
        },
        {
          text: "No.",
          isAnswer: false,
        },
      ],
    },
  ],
  answers: [["Yes."], "Yes."],
};

describe("useResults Hook", () => {
  it("should calculate points correctly for a one single-choice question correct and one incorrect", () => {
    const { result } = renderHook(() => useResults(mockData));

    expect(result.current.points).toBe(1);
  });

  it("should calculate points correctly for a multi-choice question with some correct answers", () => {
    const { result } = renderHook(() => useResults(mockData2));

    expect(result.current.points).toBe(0.83); // Assuming partial points are not allowed for all correct answers
  });

  it("should calculate 0 points because of empty answers", () => {
    const { result } = renderHook(() => useResults(mockData3));

    expect(result.current.points).toBe(0); // Assuming no partial points for multi-choice questions with incorrect answers
  });

  it("should calculate 0 points because of empty questions", () => {
    const { result } = renderHook(() => useResults(mockData4));

    expect(result.current.points).toBe(0); // Assuming no partial points for multi-choice questions with incorrect answers
  });

  it("should calculate all points for because all single answers are correct", () => {
    const { result } = renderHook(() => useResults(mockData5));

    expect(result.current.points).toBe(4); // Assuming no partial points for multi-choice questions with incorrect answers
  });

  it("should calculate all points for because all multiple answers are correct", () => {
    const { result } = renderHook(() => useResults(mockData6));

    expect(result.current.points).toBe(2); // Assuming no partial points for multi-choice questions with incorrect answers
  });

  it("should calculate all points for because multiple answers question and single answer question are correct", () => {
    const { result } = renderHook(() => useResults(mockData7));

    expect(result.current.points).toBe(2); // Assuming no partial points for multi-choice questions with incorrect answers
  });

  it("should calculate 0 points because of multichoice questions are incorrect", () => {
    const { result } = renderHook(() => useResults(mockData8));

    expect(result.current.points).toBe(0); // Assuming no partial points for multi-choice questions with incorrect answers
  });

  it("should calculate 0 points because of single choice questions are incorrect", () => {
    const { result } = renderHook(() => useResults(mockData9));

    expect(result.current.points).toBe(0); // Assuming no partial points for multi-choice questions with incorrect answers
  });

  it("should calculate 0 points because of multichoice questions are halfcorrect and halfincorrect", () => {
    const { result } = renderHook(() => useResults(mockData10));

    expect(result.current.points).toBe(0); // Assuming no partial points for multi-choice questions with incorrect answers
  });

  it("should calculate 0.5 points because of one multichoice question is halfcorrect and halfincorrect and second is semicorrect", () => {
    const { result } = renderHook(() => useResults(mockData11));

    expect(result.current.points).toBe(0.5); // Assuming no partial points for multi-choice questions with incorrect answers
  });

  it("should calculate 0 points because of empty questions and empty answers", () => {
    const { result } = renderHook(() => useResults(mockData12));

    expect(result.current.points).toBe(0); // Assuming no partial points for multi-choice questions with incorrect answers
  });

  it("should calculate 1.66 points because one multichoice question is semicorrect and one singlechoice question is correct", () => {
    const { result } = renderHook(() => useResults(mockData13));

    expect(result.current.points).toBe(1.66); // Assuming no partial points for multi-choice questions with incorrect answers
  });

  it("should calculate 0 points because answer input is incorrect for question type", () => {
    const { result } = renderHook(() => useResults(mockData14));

    expect(result.current.points).toBe(0); // Assuming no partial points for multi-choice questions with incorrect answers
  });

  it("should calculate 0 points because none of question have at least 1 correct answer", () => {
    const { result } = renderHook(() => useResults(mockData15));

    expect(result.current.points).toBe(0); // Assuming no partial points for multi-choice questions with incorrect answers
  });

  // Add more test cases as needed
});
