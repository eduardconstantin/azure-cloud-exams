import { Container } from "@azure/cosmos";
import { fetchQuestions } from "./repoQuestions";
import { getQuestionsContainer } from "./cosmos-client";

export const QuestionsDataSource = (container: Container) => {
  return {
    async getQuestion(id: string) {
      const querySpec = {
        query: "SELECT * FROM c WHERE c.id = @id",
        parameters: [
          {
            name: "@id",
            value: id,
          },
        ],
      };

      try {
        const { resources: items } = await container.items
          .query(querySpec)
          .fetchAll();
        return items[0];
      } catch (err) {
        throw new Error("Error: " + err);
      }
    },
    async getQuestions() {
      const querySpec = {
        query: "SELECT VALUE COUNT(c.id) FROM c",
      };

      try {
        const { resources: items } = await container.items
          .query(querySpec)
          .fetchAll();
        return { count: items[0] };
      } catch (err) {
        throw new Error("Error: " + err);
      }
    },
  };
};

export const RepoQuestionsDataSource = (container: any) => {
  return {
    async getQuestion(id: string) {
      try {
        return container.filter((el: any) => el.id === id)[0];
      } catch (err) {
        throw new Error("Question Error: " + err);
      }
    },
    async getQuestions() {
      try {
        return { count: container.length };
      } catch (err) {
        throw new Error("Questions Count Error: " + err);
      }
    },
    async getRandomQuestions(range: number) {
      try {
        const shuffled = [...container].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, range);
      } catch (err) {
        throw new Error("Random Questions Error: " + err);
      }
    },
  };
};

// Helper function to extract exam ID from URL
const extractExamId = (link: string): string => {
  const segments = link.split("/");
  return segments[segments.length - 3].replace(/-/g, "_").toLowerCase();
};

export const CombinedQuestionsDataSource = () => {
  return {
    async getQuestion(id: string, link: string) {
      try {
        const examId = extractExamId(link);
        const questionsContainer = await getQuestionsContainer();

        // Try Cosmos DB first (most efficient)
        const querySpec = {
          query: "SELECT * FROM c WHERE c.id = @id AND c.examId = @examId",
          parameters: [
            { name: "@id", value: id },
            { name: "@examId", value: examId },
          ],
        };
        const { resources: items } = await questionsContainer.items
          .query(querySpec)
          .fetchAll();

        if (items.length > 0) {
          return items[0];
        }

        // Fallback to GitHub if not found in database
        const questions = await fetchQuestions(link);
        if (questions) {
          const question = questions.find((q: any) => q.id === id);
          if (question) {
            // Add examId to the question document and upload to database
            const questionWithExamId = {
              ...question,
              examId: examId,
            };

            try {
              await questionsContainer.items.upsert(questionWithExamId);
            } catch (err) {
              console.warn("Failed to upload question to Cosmos DB:", err);
            }
            return question;
          }
        }

        return null;
      } catch (err) {
        throw new Error("Error fetching question: " + err);
      }
    },

    async getQuestions(link: string) {
      try {
        const examId = extractExamId(link);
        const questionsContainer = await getQuestionsContainer();

        // Try Cosmos DB first
        const querySpec = {
          query: "SELECT VALUE COUNT(c.id) FROM c WHERE c.examId = @examId",
          parameters: [{ name: "@examId", value: examId }],
        };
        const { resources: items } = await questionsContainer.items
          .query(querySpec)
          .fetchAll();

        if (items[0] > 0) {
          return { count: items[0] };
        }

        // Fallback to GitHub if no questions found in database
        const questions = await fetchQuestions(link);
        if (questions) {
          // Upload all questions to database (only if they don't exist)
          try {
            for (const question of questions) {
              const questionWithExamId = {
                ...question,
                examId: examId,
              };
              await questionsContainer.items.upsert(questionWithExamId);
            }
          } catch (err) {
            console.warn("Failed to upload questions to Cosmos DB:", err);
          }
          return { count: questions.length };
        }

        return { count: 0 };
      } catch (err) {
        throw new Error("Error fetching questions: " + err);
      }
    },

    async getRandomQuestions(range: number, link: string) {
      try {
        const examId = extractExamId(link);
        const questionsContainer = await getQuestionsContainer();

        // Try Cosmos DB first
        const querySpec = {
          query: "SELECT * FROM c WHERE c.examId = @examId",
          parameters: [{ name: "@examId", value: examId }],
        };
        const { resources: items } = await questionsContainer.items
          .query(querySpec)
          .fetchAll();

        if (items.length > 0) {
          // Questions exist in database, return random selection
          const shuffled = [...items].sort(() => 0.5 - Math.random());
          return shuffled.slice(0, range);
        }

        // Fallback to GitHub if no questions found in database
        const questions = await fetchQuestions(link);
        if (questions) {
          const shuffled = [...questions].sort(() => 0.5 - Math.random());
          const selected = shuffled.slice(0, range);

          // Upload selected questions to database (only if they don't exist)
          try {
            for (const question of selected) {
              const questionWithExamId = {
                ...question,
                examId: examId,
              };
              await questionsContainer.items.upsert(questionWithExamId);
            }
          } catch (err) {
            console.warn("Failed to upload questions to Cosmos DB:", err);
          }

          return selected;
        }

        return [];
      } catch (err) {
        throw new Error("Error fetching random questions: " + err);
      }
    },
  };
};
