import path from 'path';

export const pokeapi = 'https://pokeapi.co/api/v2/';
export const dataDirPath = path.resolve(process.cwd(), 'data');
export const backUpDataDirPath = path.resolve(process.cwd(), 'data-backup');
export const resourceListDirPath = path.resolve(dataDirPath, 'resource-list');
export const pokemonSpeciesDirPath = path.resolve(
  dataDirPath,
  'pokemon-species'
);
export const pokemonDirPath = path.resolve(dataDirPath, 'pokemon');
export const typeDirPath = path.resolve(dataDirPath, 'type');

export const formatDataDirPath = path.resolve(process.cwd(), 'format-data');
export const formatDexListDirPath = path.resolve(formatDataDirPath, 'dex-list.json');
