type Image = {
  alt: string;
  url: string;
};

export type Option = {
  text: string;
  isAnswer: boolean;
};

export type Question = {
  question: string;
  options: Option[];
  images: Image[];
};

export type Props = {
  isLoading: boolean;
  questionSet: Question;
  handleNextQuestion: (q: number) => void;
  currentQuestionIndex: number;
  totalQuestions: number;
  link: string;
};
