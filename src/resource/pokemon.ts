import { pokemonDirPath } from '../config';
import { handlehandleCatchResourceList } from '../utils/utils';
import { getResourceList } from './resourceList';

const resourceName = 'pokemon';

async function catchData() {
  const resourceList = await getResourceList(resourceName);
  
  handlehandleCatchResourceList(
    resourceList,
    resourceName,
    pokemonDirPath,
    true
  );
}

export const catchPokemon = catchData;
