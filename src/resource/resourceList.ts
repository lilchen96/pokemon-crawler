import axios from 'axios';
import { pokeapi, resourceListDirPath } from '../config';
import path from 'path';
import fs from 'fs/promises';

export async function getResourceList(resourceName: string) {
  const response = await axios.request({
    method: 'GET',
    url: `${pokeapi}${resourceName}?limit=100000&offset=0`,
  });
  const list = response.data.results;
  const filePath = path.resolve(resourceListDirPath, `${resourceName}.json`);
  fs.writeFile(filePath, JSON.stringify(list));
  return list;
}
