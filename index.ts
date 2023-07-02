import { Project } from 'language';
import { join } from 'path';
import './std';

async function start() {
  const project = new Project(join(process.cwd(), 'fast'));
  try {
    console.log('Project read');
    await project.read();
    console.log('Project parse');
    await project.parse();
    console.log('Project output');
    await project.output();
  } catch (err) {
    console.error(err);
  }
}

start()
  .then((res) => {
    console.log('Completed');
  })
  .catch((err) => {
    console.error(err);
  });
