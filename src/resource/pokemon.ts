import { pokemonDirPath } from '../config';
import { handleCatchResourceList } from '../utils/utils';
import { getResourceList } from './resourceList';

const resourceName = 'pokemon';

async function catchData() {
  const resourceList = await getResourceList(resourceName);
  
  handleCatchResourceList(
    resourceList,
    resourceName,
    pokemonDirPath,
    true
  );
}

export const catchPokemon = catchData;
