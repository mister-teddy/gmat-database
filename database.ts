import { CRAWLERS } from "./main.ts";

interface Question {
  question: string;
  explainations: string[];
}

interface Database {
  questions: { [type in keyof typeof CRAWLERS]: { [id: string]: Question } };
}

export const database: Database = {
  questions: {
    PS: {},
  },
};
