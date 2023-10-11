import { gql } from "@apollo/client";

const typeDefs = gql`
  type Option {
    text: String
    isAnswer: Boolean
  }
  type Question {
    id: String
    question: String
    options: [Option]
  }
  type Questions {
    count: Int
  }
  type Query {
    questions: Questions
    questionById(id: ID!): Question
    randomQuestions(range: Int!): [Question]
  }
`;

export default typeDefs;
