import {
  DOMParser,
  HTMLDocument,
  Element,
} from "https://deno.land/x/deno_dom@v0.1.35-alpha/deno-dom-wasm.ts";
import { CRAWLERS } from "./main.ts";

export function parseContentsFromDocument(document: HTMLDocument) {
  const contents = Array.from(document.querySelectorAll(".item.text")).map(
    (question) => {
      const questionElement = question as Element;
      let tobeRemoved = false;
      Array.from(questionElement.children).forEach((node) => {
        if (node.classList.contains("twoRowsBlock")) {
          tobeRemoved = true;
          if (tobeRemoved) {
            node._remove();
          }
        }
      });
      questionElement
        .querySelectorAll(
          "script, .quotetitle, .quotecontent, .twoRowsBlock, .post_signature"
        )
        .forEach((node) => {
          node._remove();
        });
      questionElement.getElementsByTagName("b").forEach((node) => {
        if (
          node.innerText.startsWith("The OA will be automatically revealed on")
        ) {
          node.remove();
        }
      });
      return questionElement.innerHTML
        .replace(/<!--[\s\S]*?-->/g, "")
        .replace(/<br>_________________<br>/g, "")
        .trim()
        .replace(/^( |<br>)*(.*?)( |<br>)*$/, "$2");
    }
  );
  return contents;
}

export function parseTagsFromDocument(document: HTMLDocument) {
  const tags = Array.from(
    document.querySelectorAll("#taglist > a:not([onclick])")
  ).map((tag) => tag.textContent);
  return tags;
}

export function parseQuestionAndAnswersFromContent(content: string) {
  const lines = content.split("<br>").map((line) => line.trim());
  const regex = /^([A-Z]\.|[A-Z]:|\(?[A-Z]\))\s*/i;
  const answers = [] as string[],
    nonAnswers = [] as string[];
  lines.forEach((line) => {
    if (line.match(regex)) {
      answers.push(line);
    } else {
      nonAnswers.push(line);
    }
  });
  return {
    answers: answers.map((line) => line.replace(regex, "")),
    question: nonAnswers.join("<br>"),
  };
}

export function parseSubQuestionsFromQuestion(questionContent: string) {
  const dom = new DOMParser().parseFromString(questionContent, "text/html")!;
  const [question, subQuestionsContent] = Array.from(
    dom.querySelectorAll(".bbcodeBoxIn")
  ).map((d) => (d as Element).innerHTML);
  const questionDiv = new DOMParser().parseFromString(
    subQuestionsContent,
    "text/html"
  )!;
  const subQuestions: string[] = [];
  (Array.from(questionDiv.body.childNodes) as Element[]).forEach((el) => {
    if (el instanceof Element) {
      if (el.tagName.toUpperCase() !== "BR") {
        if (el.classList.contains("placeholderTimerRC")) {
          subQuestions.push("");
        } else {
          subQuestions[subQuestions.length - 1] += el.outerHTML;
        }
      }
    } else {
      subQuestions[subQuestions.length - 1] += "<br>" + el.textContent;
    }
  });
  return { question, subQuestions };
}

export function parseQuestionFromRawContent(
  rawContent: string,
  type: keyof typeof CRAWLERS
) {
  if (type === "RC") {
    const { question, subQuestions: subQuestionContents } =
      parseSubQuestionsFromQuestion(rawContent);
    const subQuestions = subQuestionContents.map((questionContent) =>
      parseQuestionAndAnswersFromContent(questionContent)
    );
    return {
      type,
      question,
      subQuestions,
    };
  } else {
    const { question, answers } =
      parseQuestionAndAnswersFromContent(rawContent);
    return {
      type,
      question,
      answers: type === "DS" ? DSAnswers : answers,
    };
  }
}

export const DSAnswers = [
  "Statement (1) ALONE is sufficient but statement (2) ALONE is not sufficient.",
  "Statement (2) ALONE is sufficient but statement (1) ALONE is not sufficient.",
  "BOTH statements TOGETHER are sufficient, but NEITHER statement ALONE is sufficient.",
  "EACH statement ALONE is sufficient.",
  "Statements (1) and (2) TOGETHER are not sufficient. ",
];
