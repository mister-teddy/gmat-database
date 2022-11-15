export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function throttle() {
  const throttling = Math.random() * 5000 + 5000;
  console.warn(`Throttling for ${throttling / 1000}s`);
  await wait(throttling);
}
