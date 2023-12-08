import path from 'path';

export const pokeapi = 'https://pokeapi.co/api/v2/';
export const dataDirPath = path.resolve(process.cwd(), 'data');
export const backUpDataDirPath = path.resolve(process.cwd(), 'data-backup');
export const resourceListDirPath = path.resolve(dataDirPath, 'resource-list');

// 宝可梦物种
export const pokemonSpeciesDirPath = path.resolve(
  dataDirPath,
  'pokemon-species'
);
// 宝可梦
export const pokemonDirPath = path.resolve(dataDirPath, 'pokemon');
// 类型
export const typeDirPath = path.resolve(dataDirPath, 'type');
// 进化链
export const evolutionChainDirPath = path.resolve(
  dataDirPath,
  'evolution-chain'
);

export const formatDataDirPath = path.resolve(process.cwd(), 'format-data');
// 图鉴列表
export const formatDexListDirPath = path.resolve(
  formatDataDirPath,
  'dex-list.json'
);
