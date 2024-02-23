import { gql } from "@apollo/client";

const typeDefs = gql`
  type Option {
    text: String
    isAnswer: Boolean
  }
  type Images {
    alt: String
    url: String
  }
  type Question {
    id: String
    question: String
    options: [Option]
    images: [Images]
  }
  type Questions {
    count: Int
  }
  type Query {
    questions(link: String): Questions
    questionById(id: ID!, link: String): Question
    randomQuestions(range: Int!, link: String): [Question]
  }
`;

export default typeDefs;
