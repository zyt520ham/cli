import { $ } from 'zx';

export async function bootstrap() {
  await $`pnpm install`;
}
export async function reInstall() {
  await $`pnpm rimraf node_modules package-lock.json yarn.lock pnpm-lock.yaml ./**/node_modules./**/package-lock.json ./**/yarn.lock ./**/pnpm-lock.yaml && pnpm install`;
}
