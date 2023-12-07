import { formatDexList } from './dexList';
import { formatDataDirPath } from '../config';
import { existsSync } from 'fs';
import fs from 'fs/promises';
import { deleteFolder } from '../utils/utils';

// 初始化数据文件
async function init() {
  if (existsSync(formatDataDirPath)) {
    await deleteFolder(formatDataDirPath);
  }
  await fs.mkdir(formatDataDirPath);
  initChildrenFolders();
}

function initChildrenFolders() {}

async function main() {
  await init();
  formatDexList();
}

main();
