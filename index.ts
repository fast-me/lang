import { join } from 'path';
import { Project } from './project';

async function start() {
  console.log('Start Lang');
  const dir = 'fast';
  const project = new Project(join(process.cwd(), dir));
  console.log('Reading project');
  await project.readFiles();
  console.log(project.allContents);
}

start()
  .then((res) => {
    console.log('Completed');
  })
  .catch((err) => {
    console.error(err);
  });
