import fs from 'fs/promises';
import path from 'path';
import ora from 'ora';
import type { Resource } from '../type';
import axios from 'axios';

// 删除文件夹
export async function deleteFolder(path: string) {
  if (await fs.stat(path)) {
    const files = await fs.readdir(path);
    for (const file of files) {
      const curPath = `${path}/${file}`;
      if ((await fs.stat(curPath)).isDirectory()) {
        await deleteFolder(curPath);
      } else {
        await fs.unlink(curPath);
      }
    }
    await fs.rmdir(path);
  }
}

// 异步复制文件夹的函数
export async function copyFolder(source: string, destination: string) {
  try {
    await fs.mkdir(destination, { recursive: true });

    const files = await fs.readdir(source);
    for (const file of files) {
      const current = path.join(source, file);
      const target = path.join(destination, file);

      const stats = await fs.stat(current);
      if (stats.isDirectory()) {
        // 递归复制子文件夹
        await copyFolder(current, target);
      } else {
        // 复制文件
        await fs.copyFile(current, target);
      }
    }
  } catch (err) {}
}

// 抓取写入单个文件数据
export async function handleCatchResource(
  resource: Resource,
  writeDirPath: string
) {
  const response = await axios.request({
    method: 'GET',
    url: resource.url,
    responseType: 'text',
    timeout: 5000,
  });
  const filePath = path.resolve(writeDirPath, `${resource.name}.json`);
  await fs.writeFile(filePath, response.data);
}

// 批量抓取资源列表
export function handlehandleCatchResourceList(
  resourceList: Resource[],
  resourceName: string,
  writeDirPath: string,
  again = false
) {
  const spinner = ora(`Catch ${resourceName}`).start();
  let resTargetCount = resourceList.length;
  let errorResourceList: Resource[] = [];
  resourceList.forEach((resource) => {
    handleCatchResource(resource, writeDirPath)
      .then(() => {
        spinner.text = `Resource: ${resource.name} Success`;
      })
      .catch(() => {
        ora(`Resource: ${resource.name} Error`).warn();
        errorResourceList.push(resource);
      })
      .finally(() => {
        resTargetCount--;
        if (resTargetCount === 0) {
          const successSummary = `Catch ${resourceName} Success!`;
          const errorSummary = `Error Resource: ${errorResourceList
            .map((it) => it.name)
            .join()}`;
          spinner.stop();
          ora().succeed(successSummary);
          if (errorResourceList.length > 0) {
            ora().warn(errorSummary);
            if (again) {
              handlehandleCatchResourceList(
                errorResourceList,
                resourceName,
                writeDirPath,
                true
              );
            }
          }
        }
      });
  });
}
