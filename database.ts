import { CRAWLERS } from "./main.ts";

export interface Question {
  src: string;
  question: string;
  explainations: string[];
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
