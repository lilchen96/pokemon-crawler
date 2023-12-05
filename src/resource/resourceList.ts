import axios from 'axios';
import { pokeapi } from '../config';

export async function getResourceList(resourceName: string) {
  const response = await axios.request({
    method: 'GET',
    url: `${pokeapi}${resourceName}?limit=100000&offset=0`,
  });
  return response.data.results;
}
