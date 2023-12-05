import { pokemonSpeciesDirPath } from '../config';
import { handlehandleCatchResourceList } from '../utils/utils';
import { getResourceList } from './resourceList';

const resourceName = 'pokemon-species';

async function catchData() {
  const resourceList = await getResourceList(resourceName);
  handlehandleCatchResourceList(
    resourceList,
    resourceName,
    pokemonSpeciesDirPath,
    true
  );
}

export const catchPokemonSpecies = catchData;
