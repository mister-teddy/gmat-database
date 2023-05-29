import { database, Question } from "./database.ts";
import { parseQuestionFromRawContent } from "./parser.ts";
import { generateReport } from "./utils.ts";

async function editQuestion(questionId?: string, content?: string) {
  if (questionId && content) {
    for (const key in database) {
      const questionType = key as keyof typeof database;
      const question = database[questionType].find((id) => id === questionId);
      if (question) {
        const originalContent = await Deno.readTextFile(
          `./output/${questionId}.json`
        );
        const question = JSON.parse(originalContent) as Question;
        const newQuestion = parseQuestionFromRawContent(content, questionType);
        Object.assign(question, newQuestion);
        await Deno.writeTextFile(
          `./output/${questionId}.json`,
          JSON.stringify(question)
        );
        console.info(
          `New question content: https://teddyfullstack.github.io/gmat-database/${questionId}.json`
        );
      }
    }
  }
}

await editQuestion(
  Deno.env.get("QUESTION_ID"),
  Deno.env.get("QUESTION_CONTENT")
);
generateReport();
