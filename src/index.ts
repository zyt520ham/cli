#!/usr/bin/env node
import { program } from 'commander';
import { blue } from 'kolorist';
import pkg from '../package.json';
import { gitCommit, verifyGitCommit } from './command';
import { cleanLib, cleanBuildRes, initSimpleGitHooks, updatePkg, bootstrap, reInstall, cleanCache } from './scripts';

program
  .command('bootstrap')
  .description('首次安装依赖')
  .action(() => {
    bootstrap();
  });

program
  .command('re-install')
  .description('重新安装依赖')
  .action(() => {
    reInstall();
  });
program
  .command('clean-cache')
  .description('清理vite缓存')
  .action(() => {
    cleanCache();
  });
program
  .command('clean-lib')
  .description('清空依赖和构建产物')
  .action(() => {
    cleanLib();
  });
program
  .command('clean-buildres')
  .description('清空构建产物')
  .action(() => {
    cleanBuildRes();
  });
program
  .command('git-commit')
  .description('生成符合 Angular 规范的 git commit')
  .action(() => {
    gitCommit();
  });

program
  .command('git-commit-verify')
  .description('校验git的commit是否符合 Angular 规范')
  .action(() => {
    verifyGitCommit();
  });

program
  .command('init-git-hooks')
  .description('初始化git钩子')
  .action(() => {
    initSimpleGitHooks();
  });

program
  .command('update-pkg')
  .description('升级依赖')
  .action(() => {
    updatePkg();
  });

// 配置options
// program
//   .option('-t, --transform <package name or path>', '插件路径或者npm包名称,支持多个插件，逗号分隔')
//   .option('-o, --out <path>', '输出文件路径')
//   .option('-s, --src <path>', '需要转换的源文件路径');

program.version(pkg.version).description(blue('@gz/front-end-cli'));

// 接管命令行输入，参数处理
program.parse(process.argv);
