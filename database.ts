interface Question {
  question: string;
  explainations: string[];
}

interface Database {
  questions: { [id: string]: Question };
}

export const database: Database = {
  questions: {},
};
