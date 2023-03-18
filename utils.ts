import { database, report } from "./database.ts";

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function throttle() {
  const throttling = Math.random() * 5000 + 5000;
  console.warn(`Throttling for ${throttling / 1000}s`);
  await wait(throttling);
}

export function generateReport() {
  console.log(`# Action finished :rocket:

Question changes:
${report
  .map(
    ({ key, count }) =>
      `**${key}**: ${database[key as keyof typeof database].length - count}`
  )
  .join("\n")}`);
}
