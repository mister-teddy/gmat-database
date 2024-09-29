# GMAT Database

### How it works

The Deno scripts run in Github Actions workflow crawl the questions from GMAT Club and store them as JSON files on Github Pages. The script runs on demand and automatically refresh every day so those artifacts won't be exipred.

Here's how it works under the hood:

- The crawler script is executed on a schedule using Github Actions.
- The script retrieves a list of all the questions from the GMAT Club website.
- For each question, the script retrieves the relevant information, such as the question text, answer options, correct answer, and the explanation.
- The script stores this information as a JSON file in the Github Actions repository.

## Usage

To consume the data:

```ts
fetch(`https://mister-teddy.github.io/gmat-database/index.json`);
fetch(`https://mister-teddy.github.io/gmat-database/${questionId}.json`);
```

To study:
Install the Flutter application [GMAT Question Bank](https://github.com/mister-teddy/gmat_question_bank).

### License

This project is licensed under the MIT License. Feel free to make any contribution.
