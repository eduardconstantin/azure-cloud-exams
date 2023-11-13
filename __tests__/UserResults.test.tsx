import { renderHook } from '@testing-library/react-hooks';
import useResults, { ResultsData, ResultsHook } from '../hooks/useResults'; // Adjust the import path accordingly

const mockData: ResultsData = {
    questions: [
      {
        question: "Is this a test question?",
        options: [
            {
                text: "Yes.",
                isAnswer: true
            },
            {
                text: "No.",
                isAnswer: false
            },
        ]
      },
      {
        question: "Is this a test question no.2?",
        options: [
            {
                text: "Yes.",
                isAnswer: true
            },
            {
                text: "No.",
                isAnswer: false
            },
        ]
      },
    ],
    answers: [
      "Yes.", "No."
    ],
  };

  const mockData2: ResultsData = {
    questions: [
      {
        question: "Is this a test question?",
        options: [
            {
                text: "Yes.",
                isAnswer: true
            },
            {
                text: "No.",
                isAnswer: true
            },
            {
                text: "Maybe.",
                isAnswer: true
            },
            {
                text: "Probably.",
                isAnswer: false
            },
        ]
      },
      {
        question: "Is this a test question no.2?",
        options: [
            {
                text: "Yes.",
                isAnswer: true
            },
            {
                text: "No.",
                isAnswer: false
            },
            {
                text: "Maybe.",
                isAnswer: true
            },
            {
                text: "Probably.",
                isAnswer: false
            },
        ]
      },
    ],
    answers: [
      ["Yes.", "No.", "Probably."], ["Yes."]
    ],
  };

  const mockData3: ResultsData = {
    questions: [
      {
        question: "Is this a test question?",
        options: [
            {
                text: "Yes.",
                isAnswer: true
            },
            {
                text: "No.",
                isAnswer: true
            },
            {
                text: "Maybe.",
                isAnswer: true
            },
            {
                text: "Probably.",
                isAnswer: false
            },
        ]
      },
      {
        question: "Is this a test question no.2?",
        options: [
            {
                text: "Yes.",
                isAnswer: true
            },
            {
                text: "No.",
                isAnswer: false
            },
            {
                text: "Maybe.",
                isAnswer: true
            },
            {
                text: "Probably.",
                isAnswer: false
            },
        ]
      },
    ],
    answers: [
      null, null
    ],
  };

  describe('useResults Hook', () => {
    it('should calculate points correctly for a single-choice question with a correct answer', () => {
      const { result } = renderHook(() => useResults(mockData));
  
      expect(result.current.points).toBe(1);
    });
  
    it('should calculate points correctly for a multi-choice question with some correct answers', () => {
      const { result } = renderHook(() => useResults(mockData2));
  
      expect(result.current.points).toBe(0.83); // Assuming partial points are not allowed for all correct answers
    });
  
    it('should calculate 0 points for because of null answers', () => {
      const { result } = renderHook(() => useResults(mockData3));
  
      expect(result.current.points).toBe(0); // Assuming no partial points for multi-choice questions with incorrect answers
    });
  
    // Add more test cases as needed
  });