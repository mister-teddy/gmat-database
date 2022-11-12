interface Question {
  question: string;
  answer: string;
}

interface Database {
  questions: { [id: string]: Question };
}

export const database: Database = {
  questions: {},
};
