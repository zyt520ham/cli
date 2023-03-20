#!/usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/index.ts
var import_commander = require("commander");
var import_kolorist2 = require("kolorist");

// package.json
var package_default = {
  name: "@gz/front-end-cli",
  version: "0.1.7",
  private: true,
  description: "web command lint tools",
  license: "",
  bin: {
    "gz-cli": "bin/index.mjs"
  },
  files: [
    "bin"
  ],
  scripts: {
    "base-bootstrap": "pnpm install --filter @gz/front-end-cli",
    bootstrap: "pnpm install -w",
    "re-install": "gz-cli re-install",
    commit: "gz-cli git-commit",
    "clean:cache": "rimraf node_modules/.cache/ && rimraf node_modules/.vite",
    updatepkg: "gz-cli update-pkg-lib-ver",
    "update:version": "bumpp package.json",
    build: "tsup",
    lint: "eslint . --fix",
    prepare: "simple-git-hooks",
    format: "gz-cli prettier-format"
  },
  dependencies: {
    commander: "^10.0.0",
    execa: "7.0.0",
    kolorist: "^1.7.0",
    minimist: "^1.2.8",
    "npm-check-updates": "^16.7.12",
    prompts: "^2.4.2",
    rimraf: "^4.4.0"
  },
  devDependencies: {
    "@gz/front-end-cli": "workspace:*",
    "@types/prompts": "^2.4.2",
    bumpp: "^9.0.0",
    eslint: "^8.36.0",
    "eslint-config-soybeanjs": "0.3.1",
    esno: "^0.16.3",
    "lint-staged": "^13.2.0",
    "simple-git-hooks": "^2.8.1",
    tsup: "^6.6.3",
    typescript: "^4.9.4"
  },
  "simple-git-hooks": {
    "commit-msg": "pnpm gz-cli git-commit-verify",
    "pre-commit": "pnpm exec lint-staged --concurrent false"
  },
  "lint-staged": {
    "*.{js,jsx,mjs,cjs,json,ts,tsx,mts,cts,vue,svelte,astro}": [
      "eslint . --fix"
    ]
  },
  publishConfig: {
    registry: ""
  }
};

// src/command/git/commit.ts
var import_prompts = __toESM(require("prompts"));
var import_execa = require("execa");

// src/command/git/config.ts
var types = [
  { value: "init", title: "init:  \u9879\u76EE\u521D\u59CB\u5316" },
  { value: "feat", title: "feat:  \u6DFB\u52A0\u65B0\u7279\u6027" },
  { value: "fix", title: "fix:  \u4FEE\u590Dbug" },
  { value: "docs", title: "docs:  \u4EC5\u4EC5\u4FEE\u6539\u6587\u6863" },
  { value: "style", title: "style:  \u4EC5\u4EC5\u4FEE\u6539\u4E86\u7A7A\u683C\u3001\u683C\u5F0F\u7F29\u8FDB\u3001\u9017\u53F7\u7B49\u7B49\uFF0C\u4E0D\u6539\u53D8\u4EE3\u7801\u903B\u8F91" },
  { value: "refactor", title: "refactor:  \u4EE3\u7801\u91CD\u6784\uFF0C\u6CA1\u6709\u52A0\u65B0\u529F\u80FD\u6216\u8005\u4FEE\u590Dbug" },
  { value: "perf", title: "perf:  \u4F18\u5316\u76F8\u5173\uFF0C\u6BD4\u5982\u63D0\u5347\u6027\u80FD\u3001\u4F53\u9A8C" },
  { value: "test", title: "test:  \u6DFB\u52A0\u6D4B\u8BD5\u7528\u4F8B" },
  { value: "build", title: "build:  \u4F9D\u8D56\u76F8\u5173\u7684\u5185\u5BB9" },
  { value: "ci", title: "ci:  CI\u914D\u7F6E\u76F8\u5173\uFF0C\u4F8B\u5982\u5BF9k8s\uFF0Cdocker\u7684\u914D\u7F6E\u6587\u4EF6\u7684\u4FEE\u6539" },
  { value: "chore", title: "chore:  \u6539\u53D8\u6784\u5EFA\u6D41\u7A0B\u3001\u6216\u8005\u589E\u52A0\u4F9D\u8D56\u5E93\u3001\u5DE5\u5177\u7B49" },
  { value: "revert", title: "revert:  \u56DE\u6EDA\u5230\u4E0A\u4E00\u4E2A\u7248\u672C" }
];
var scopes = [
  ["projects", "\u9879\u76EE\u642D\u5EFA"],
  ["components", "\u7EC4\u4EF6\u76F8\u5173"],
  ["hooks", "hook \u76F8\u5173"],
  ["utils", "utils \u76F8\u5173"],
  ["types", "ts\u7C7B\u578B\u76F8\u5173"],
  ["styles", "\u6837\u5F0F\u76F8\u5173"],
  ["deps", "\u9879\u76EE\u4F9D\u8D56"],
  ["auth", "\u5BF9 auth \u4FEE\u6539"],
  ["release", "\u7248\u672C\u53D1\u5E03"],
  ["other", "\u5176\u4ED6\u4FEE\u6539"]
].map(([value, description]) => {
  return {
    value,
    title: `${value.padEnd(30)} (${description})`
  };
});

// src/command/git/commit.ts
async function gitCommit() {
  const result = await (0, import_prompts.default)([
    {
      name: "types",
      type: "select",
      message: "\u8BF7\u9009\u62E9\u63D0\u4EA4\u7684\u7C7B\u578B",
      choices: types
    },
    {
      name: "scopes",
      type: "select",
      message: "\u9009\u62E9\u4E00\u4E2Ascope",
      choices: scopes
    },
    {
      name: "description",
      type: "text",
      message: "\u8BF7\u8F93\u5165\u63D0\u4EA4\u63CF\u8FF0"
    }
  ]);
  const commitMsg = `${result.types}(${result.scopes}): ${result.description}`;
  (0, import_execa.execa)("git", ["commit", "-m", commitMsg], { stdio: "inherit" });
}

// src/command/git/verify-commit.ts
var import_fs = require("fs");
var import_kolorist = require("kolorist");
function verifyGitCommit() {
  const gitMsgPath = "./.git/COMMIT_EDITMSG";
  const commitMsg = (0, import_fs.readFileSync)(gitMsgPath, "utf-8").trim();
  const RELEASE_MSG = "chore: release";
  const REG_EXP = new RegExp(
    `(${types.map((item) => item.value).join("|")})\\((${scopes.map((item) => item.value).join("|")})\\):\\s.{1,50}`
  );
  if (!REG_EXP.test(commitMsg) && !commitMsg.includes(RELEASE_MSG)) {
    throw new Error(
      `${(0, import_kolorist.bgRed)(" ERROR ")} ${(0, import_kolorist.red)("Git\u63D0\u4EA4\u4FE1\u606F\u4E0D\u7B26\u5408 Angular \u89C4\u8303!\n\n")}${(0, import_kolorist.green)(
        "\u63A8\u8350\u4F7F\u7528\u547D\u4EE4 pnpm commit \u751F\u6210\u7B26\u5408\u89C4\u8303\u7684Git\u63D0\u4EA4\u4FE1\u606F"
      )}`
    );
  }
}

// src/scripts/cleanup.ts
var import_rimraf = require("rimraf");
var buildResPathStrs = ["dist"];
var libResPathStrs = ["node_modules", "package-lock.json", "yarn.lock", "pnpm-lock.yaml"];
var viteCachePathStrs = ["node_modules/.cache/", "node_modules/.vite"];
async function cleanLib() {
  await (0, import_rimraf.rimraf)(libResPathStrs);
}
async function cleanLibDeep() {
  const deepPathStrs = libResPathStrs.map((item) => `./**/${item}`);
  const allPathStrs = libResPathStrs.concat(deepPathStrs);
  await (0, import_rimraf.rimraf)(allPathStrs);
}
async function cleanBuildRes() {
  await (0, import_rimraf.rimraf)(buildResPathStrs);
}
async function cleanBuildResDeep() {
  const deepPathStrs = buildResPathStrs.map((item) => `./**/${item}`);
  const allPathStrs = buildResPathStrs.concat(deepPathStrs);
  await (0, import_rimraf.rimraf)(allPathStrs);
}
async function cleanViteCache() {
  await (0, import_rimraf.rimraf)(viteCachePathStrs);
}
async function cleanViteCacheDeep() {
  const deepPathStrs = viteCachePathStrs.map((item) => `./**/${item}`);
  const allPathStrs = viteCachePathStrs.concat(deepPathStrs);
  await (0, import_rimraf.rimraf)(allPathStrs);
}

// src/scripts/git-hooks.ts
var import_fs2 = require("fs");
var import_execa2 = require("execa");
var import_rimraf2 = require("rimraf");
async function initSimpleGitHooks() {
  const huskyDir = `${process.cwd()}/.husky`;
  const existHusky = (0, import_fs2.existsSync)(huskyDir);
  if (existHusky) {
    await (0, import_rimraf2.rimraf)(".husky");
    await (0, import_execa2.execa)("git", ["config", "core.hooksPath", ".git/hooks/"], { stdio: "inherit" });
  }
  await (0, import_rimraf2.rimraf)(".git/hooks");
  await (0, import_execa2.execa)("npx", ["simple-git-hooks"], { stdio: "inherit" });
}

// src/scripts/update-pkg.ts
var import_execa3 = require("execa");
async function updatePkg() {
  (0, import_execa3.execa)("npx", ["ncu", "--deep", "-u"], { stdio: "inherit" });
}

// src/scripts/bootstrap.ts
var import_execa4 = require("execa");
var import_rimraf3 = require("rimraf");
async function bootstrap() {
  await (0, import_execa4.execa)("npx", ["install"]);
}
async function reInstall() {
  const libResPathStrs2 = ["node_modules", "package-lock.json", "yarn.lock", "pnpm-lock.yaml"];
  console.info("\u5F00\u59CB\u79FB\u9664\u4F9D\u8D56\u3002\u3002\u3002");
  await (0, import_rimraf3.rimraf)(libResPathStrs2);
  console.info("\u4F9D\u8D56\u5DF2\u7ECF\u79FB\u9664\uFF0C\u91CD\u65B0\u5B89\u88C5\u4F9D\u8D56\u4E2D\u3002\u3002\u3002");
  await (0, import_execa4.execa)("pnpm", ["install"]);
}

// src/scripts/format.ts
var import_execa5 = require("execa");
function prettierFormat() {
  const formatFiles = [
    "!**/*.{js,jsx,mjs,cjs,json,ts,tsx,mts,cts,vue,svelte,astro}",
    "!*.min.*",
    "!CHANGELOG.md",
    "!dist",
    "!LICENSE*",
    "!output",
    "!coverage",
    "!public",
    "!temp",
    "!package-lock.json",
    "!pnpm-lock.yaml",
    "!yarn.lock",
    "!__snapshots__"
  ];
  (0, import_execa5.execa)("npx", ["prettier", ".", "--write", ...formatFiles], {
    stdio: "inherit"
  });
}

// src/index.ts
import_commander.program.command("git-commit").description("\u751F\u6210\u7B26\u5408 Angular \u89C4\u8303\u7684 git commit").action(() => {
  return gitCommit();
});
import_commander.program.command("git-commit-verify").description("\u6821\u9A8Cgit\u7684commit\u662F\u5426\u7B26\u5408 Angular \u89C4\u8303").action(() => {
  verifyGitCommit();
});
import_commander.program.command("bootstrap").description("\u9996\u6B21\u5B89\u88C5\u4F9D\u8D56").action(() => {
  return bootstrap();
});
import_commander.program.command("re-install").description("\u91CD\u65B0\u5B89\u88C5\u4F9D\u8D56").action(() => {
  return reInstall();
});
import_commander.program.command("clean-cache").description("\u6E05\u7406vite\u7F13\u5B58").action(() => {
  return cleanViteCache();
});
import_commander.program.command("clean-cache-deep").description("\u6E05\u7406vite\u7F13\u5B58(\u5305\u542B\u5B50\u5305)").action(() => {
  return cleanViteCacheDeep();
});
import_commander.program.command("clean-lib").description("\u6E05\u7A7A\u4F9D\u8D56\u548C\u6784\u5EFA\u4EA7\u7269").action(() => {
  return cleanLib();
});
import_commander.program.command("clean-lib-deep").description("\u6E05\u7A7A\u4F9D\u8D56\u548C\u6784\u5EFA\u4EA7\u7269\uFF08\u5305\u542B\u5B50\u5305\uFF09").action(() => {
  return cleanLibDeep();
});
import_commander.program.command("clean-buildres").description("\u6E05\u7A7A\u6784\u5EFA\u4EA7\u7269").action(() => {
  return cleanBuildRes();
});
import_commander.program.command("clean-buildres-deep").description("\u6E05\u7A7A\u6784\u5EFA\u4EA7\u7269\uFF08\u5305\u542B\u5B50\u5305\uFF09").action(() => {
  return cleanBuildResDeep();
});
import_commander.program.command("init-git-hooks").description("\u521D\u59CB\u5316simple-git-hooks\u94A9\u5B50").action(() => {
  return initSimpleGitHooks();
});
import_commander.program.command("update-pkg-lib-ver").description("\u5347\u7EA7\u4F9D\u8D56").action(() => {
  return updatePkg();
});
import_commander.program.command("prettier-format").description("prettier\u683C\u5F0F\u5316").action(() => {
  prettierFormat();
});
import_commander.program.version(package_default.version).description((0, import_kolorist2.blue)("@gz/front-end-cli"));
import_commander.program.parse(process.argv);
