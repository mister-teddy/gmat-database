import { database } from "./database.ts";
import { generateReport } from "./utils.ts";

async function dropQuestion(questionId?: string) {
  if (questionId) {
    for (const key in database) {
      const questionType = key as keyof typeof database;
      const question = database[questionType].find((id) => id === questionId);
      if (question) {
        database[questionType].splice(
          database[questionType].indexOf(question),
          1
        );
        await Deno.writeTextFile(
          "./output/index.json",
          JSON.stringify(database)
        );
        await Deno.removeSync(`./output/${questionId}.json`);
      }
    }
  }
}

await dropQuestion(Deno.env.get("QUESTION_ID"));
generateReport();
