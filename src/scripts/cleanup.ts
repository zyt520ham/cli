/*
 * @Description:
 * @Author: Gavin
 * @Date: 2023-03-20 12:29:15
 * @LastEditors: Gavin
 * @LastEditTime: 2023-03-20 12:36:10
 * @FilePath: /cli/src/scripts/cleanup.ts
 */
import { rimraf } from 'rimraf';

const pathStrs = ['node_modules', 'dist', 'package-lock.json', 'yarn.lock', 'pnpm-lock.yaml'];

const buildResPathStrs = ['dist'];

const libResPathStrs = ['node_modules', 'package-lock.json', 'yarn.lock', 'pnpm-lock.yaml'];
const viteCachePathStrs = ['node_modules/.cache/', 'node_modules/.vite'];

export function cleanup() {
  rimraf(pathStrs);
}

export async function cleanupDeep() {
  const deepPathStrs = pathStrs.map(item => `./**/${item}`);

  const allPathStrs = pathStrs.concat(deepPathStrs);

  rimraf(allPathStrs);
}

/** 删除依赖 */
export async function cleanLib() {
  await rimraf(libResPathStrs);
}
/** 删除依赖（包含子包） */
export async function cleanLibDeep() {
  const deepPathStrs = libResPathStrs.map(item => `./**/${item}`);

  const allPathStrs = libResPathStrs.concat(deepPathStrs);

  await rimraf(allPathStrs);
}
/** 删除构建（dist）（包含子包） */
export async function cleanBuildRes() {
  await rimraf(buildResPathStrs);
}
/** 删除构建（dist）（包含子包） */
export async function cleanBuildResDeep() {
  const deepPathStrs = buildResPathStrs.map(item => `./**/${item}`);
  const allPathStrs = buildResPathStrs.concat(deepPathStrs);
  await rimraf(allPathStrs);
}
/** 删除Vite Cache */
export async function cleanViteCache() {
  await rimraf(viteCachePathStrs);
}
/** 删除Vite Cache（包含子包） */
export async function cleanViteCacheDeep() {
  const deepPathStrs = viteCachePathStrs.map(item => `./**/${item}`);
  const allPathStrs = viteCachePathStrs.concat(deepPathStrs);
  await rimraf(allPathStrs);
}
