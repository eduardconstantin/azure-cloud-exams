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
  type Query {
    allQuestions: [Question]
    questionById(id: ID!): Question
  }
`;

export default typeDefs;
