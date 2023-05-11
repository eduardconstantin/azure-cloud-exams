export type Question = {
  // length(length: any): unknown;
  question: string;
  options: Option[];
};

type Option = {
  text: string;
  isAnswer: boolean;
};
