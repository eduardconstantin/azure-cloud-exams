export type Question = {
  question: string;
  options: Option[];
  images: Image[];
};

type Image = {
  alt: string;
  url: string;
};

type Option = {
  text: string;
  isAnswer: boolean;
};
