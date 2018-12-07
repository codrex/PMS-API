/* eslint-disable no-console,max-len */
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const command = 'NODE_ENV=test sequelize db:migrate:undo:all && NODE_ENV=test sequelize db:migrate';

async function setupDB() {
  try {
    console.log('\n\n****= Setting up test DB= *****');
    await exec(command);
    console.log('\n\n****= Setting complete= *****\n\n');
  } catch (error) {
    console.log(error);
  }
}

module.exports = setupDB;