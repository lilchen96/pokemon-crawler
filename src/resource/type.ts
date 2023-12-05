import { typeDirPath } from '../config';
import { handlehandleCatchResourceList } from '../utils/utils';
import { getResourceList } from './resourceList';

const resourceName = 'type';

async function catchData() {
  const resourceList = await getResourceList(resourceName);
  handlehandleCatchResourceList(
    resourceList,
    resourceName,
    typeDirPath,
    true
  );
}

export const catchType = catchData;
