import { typeDirPath } from '../config';
import { handleCatchResourceList } from '../utils/utils';
import { getResourceList } from './resourceList';

const resourceName = 'type';

async function catchData() {
  const resourceList = await getResourceList(resourceName);
  handleCatchResourceList(
    resourceList,
    resourceName,
    typeDirPath,
    true
  );
}

export const catchType = catchData;
