import { execa } from 'execa';
import { rimraf } from 'rimraf';

export async function bootstrap() {
  await execa('npx', ['install']);
}
export async function reInstall() {
  const libResPathStrs = ['node_modules', 'package-lock.json', 'yarn.lock', 'pnpm-lock.yaml'];
  console.info('开始移除依赖。。。');
  await rimraf(libResPathStrs);
  console.info('依赖已经移除，重新安装依赖中。。。');
  await execa('pnpm', ['install']);
}
