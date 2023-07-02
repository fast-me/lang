import { Project } from 'language';
import { join } from 'path';
import './std';

async function start() {
  const project = new Project(join(process.cwd(), 'fast'));
  await project.read();
  await project.parse();
  await project.output();
}

start()
  .then((res) => {
    console.log('Completed');
  })
  .catch((err) => {
    console.error(err);
  });
