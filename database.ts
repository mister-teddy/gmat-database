import { CRAWLERS } from "./main.ts";

export interface SubQuestion {
  question: string;
  answers: string[];
}

export interface Question {
  id: string;
  src: string;
  type: keyof typeof CRAWLERS;
  question: string;
  answers?: string[];
  subQuestions?: SubQuestion[];
  explanations: string[];
}

export type Database = {
  [type in keyof typeof CRAWLERS]: string[];
};

export const database: Database = {
  RC: [],
  SC: [],
  CR: [],
  PS: [],
  DS: [],
};

try {
  const content = Deno.readTextFileSync("./output/index.json");
  Object.assign(database, JSON.parse(content));
} catch (error) {
  console.warn(">>> Cannot pickup pervious data. Init new database");
  console.error(error);
}

export const report = Object.keys(database).map((key) => ({
  key,
  count: database[key as keyof typeof database].length,
}));
