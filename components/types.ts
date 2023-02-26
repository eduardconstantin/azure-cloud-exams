export type Question = {
  question: string;
  options: Option[];
};

type Option = {
  text: string;
  isAnswer: boolean;
};
