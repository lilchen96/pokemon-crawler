import { catchPokemonSpecies } from './resource/pokemonSpecies';
import { catchPokemon } from './resource/pokemon';
import { catchType } from './resource/type';
import fs from 'fs/promises';
import { existsSync } from 'fs';
import { deleteFolder, copyFolder } from './utils/utils';
import {
  dataDirPath,
  backUpDataDirPath,
  resourceListDirPath,
  pokemonSpeciesDirPath,
  pokemonDirPath,
  typeDirPath,
} from './config';

// 初始化数据文件
async function init() {
  if (existsSync(dataDirPath)) {
    // 备份文件
    if (existsSync(backUpDataDirPath)) {
      await deleteFolder(backUpDataDirPath);
    }
    await copyFolder(dataDirPath, backUpDataDirPath);
    await deleteFolder(dataDirPath);
  }
  await fs.mkdir(dataDirPath);
  initChildrenFolders();
}

function initChildrenFolders() {
  fs.mkdir(resourceListDirPath);
  fs.mkdir(pokemonSpeciesDirPath);
  fs.mkdir(pokemonDirPath);
  fs.mkdir(typeDirPath);
}

async function main() {
  await init();
  catchPokemonSpecies();
  catchPokemon();
  catchType();
}

main();
