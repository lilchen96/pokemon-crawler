import fs from 'fs/promises';
import path from 'path';
import {
  resourceListDirPath,
  pokemonSpeciesDirPath,
  pokemonDirPath,
  typeDirPath,
  formatDexListDirPath,
} from '../config';
import type { Resource } from '../type';

const typeBackgroundColorMap = {
  // 一般
  1: '#9fa19f',
  // 格斗
  2: '#ff8000',
  // 飞行
  3: '#81b9ef',
  // 毒
  4: '#9141cb',
  // 地面
  5: '#915121',
  // 岩石
  6: '#afa981',
  // 虫
  7: '#91a119',
  // 幽灵
  8: '#704170',
  // 钢
  9: '#60a1b8',
  // 火
  10: '#e62829',
  // 水
  11: '#2980ef',
  // 草
  12: '#3fa129',
  // 电
  13: '#fac000',
  // 超能
  14: '#ef4179',
  // 冰
  15: '#3fd8ff',
  // 龙
  16: '#5060e1',
  // 恶
  17: '#50413f',
  // 妖精
  18: '#ef70ef',
  // 未知
  10001: '#44685E',
  // shadow
  10002: '#44685E',
};

async function formatDexList() {
  const jsonData = await fs.readFile(
    path.resolve(resourceListDirPath, 'pokemon-species.json'),
    'utf8'
  );
  const pokemonSpeciesList: Resource[] = JSON.parse(jsonData) ?? [];
  const dexList = await Promise.all(
    pokemonSpeciesList.map((item) => getDexItem(item.name))
  );
  fs.writeFile(formatDexListDirPath, JSON.stringify(dexList));
}

async function getDexItem(name: string) {
  const pokemonSpeciesJsonData = await fs.readFile(
    path.resolve(pokemonSpeciesDirPath, `${name}.json`),
    'utf8'
  );
  const pokemonSpeciesData = JSON.parse(pokemonSpeciesJsonData);
  //   翻译后的宝可梦名称
  const translatedPokemonName = pokemonSpeciesData.names.find(
    (item) => item.language.name === 'zh-Hans'
  ).name;
  // 翻译后的宝可梦描述文本条目
  const translatedFlavorText =
    pokemonSpeciesData.flavor_text_entries.find(
      (item) => item.language.name === 'zh-Hans'
    )?.flavor_text ?? '';
  // 翻译后的宝可梦genus
  const translatedGenusName =
    pokemonSpeciesData.genera.find((item) => item.language.name === 'zh-Hans')
      ?.genus ?? '';

  const pokemonDataName = pokemonSpeciesData.varieties.find(
    (item) => item.is_default
  ).pokemon.name;
  const pokemonJsonData = await fs.readFile(
    path.resolve(pokemonDirPath, `${pokemonDataName}.json`),
    'utf8'
  );
  const pokemonData = JSON.parse(pokemonJsonData);

  // 翻译后的属性名称
  const formatTypes = await Promise.all(
    pokemonData.types.map(async (item) => {
      const typeName = item.type.name;
      const typeJsonData = await fs.readFile(
        path.resolve(typeDirPath, `${typeName}.json`),
        'utf8'
      );
      const typeData = JSON.parse(typeJsonData);
      const translatedTypeName = typeData.names.find(
        (it) => it.language.name === 'zh-Hans'
      ).name;
      return {
        id: typeData.id,
        name: translatedTypeName,
        color: typeBackgroundColorMap[typeData.id],
      };
    })
  );
  return {
    id: pokemonSpeciesData.id,
    name: translatedPokemonName,
    flavor_text: translatedFlavorText,
    types: formatTypes,
    genus_name: translatedGenusName,
  };
}

export { formatDexList };
