import { pokemonSpeciesDirPath } from '../config';
import { handleCatchResourceList } from '../utils/utils';
import { getResourceList } from './resourceList';

const resourceName = 'pokemon-species';

async function catchData() {
  const resourceList = await getResourceList(resourceName);
  handleCatchResourceList(
    resourceList,
    resourceName,
    pokemonSpeciesDirPath,
    true
  );
}

export const catchPokemonSpecies = catchData;
