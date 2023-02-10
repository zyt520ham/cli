import { $ } from 'zx';

export async function cleanLib() {
  await $`pnpm rimraf node_modules package-lock.json yarn.lock pnpm-lock.yaml ./**/node_modules ./**/package-lock.json ./**/yarn.lock ./**/pnpm-lock.yaml`;
}
export async function cleanBuildRes() {
  await $`pnpm rimraf  dist  ./**/dist`;
}
export async function cleanCache() {
  await $`pnpm rimraf node_modules/.cache/ && rimraf node_modules/.vite`;
}
