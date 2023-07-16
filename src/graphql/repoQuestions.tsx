const url =
  "https://raw.githubusercontent.com/Ditectrev/Microsoft-Azure-AZ-900-Microsoft-Azure-Fundamentals-Exam-Questions-Answers/main/README.md";

const scrapeQuestions = (markdownText: string) => {
  const regex = /### (.*?)\n\n((?:- \[(?:x| )\] .*?\n)+)/gs;
  const optionsRegex = /- \[(x| )\] (.*?)(?=\n- \[|$)/g;
  const questions = [];
  let match;
  let id = 0;

  while ((match = regex.exec(markdownText)) !== null) {
    const question = match[1].trim();
    const optionsText = match[2].trim();

    let optionMatch;
    const options = [];

    while ((optionMatch = optionsRegex.exec(optionsText)) !== null) {
      const isAnswer = optionMatch[1].trim() === "x";
      const optionText = optionMatch[2].trim();
      options.push({ text: optionText, isAnswer });
    }

    questions.push({
      id: id.toString(),
      question,
      options,
    });

    id++;
  }

  return questions;
};

export const FetchQuestions = async () => {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const markdown = await res.text();
    return scrapeQuestions(markdown);
  } catch (err: any) {
    console.error(err.message);
  }
};
