export interface Question {
  question: string;
  options: Option[];
}

interface Option {
  text: string;
  isAnswer: boolean;
}
