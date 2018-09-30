const couch = require('../api/_appUtils/couchdb');
const users = couch.use('users');

console.log('file: init_couch.js')

module.exports = createDbs;

const dbs = [
  'users',
  'accounts',
  'families',
];



const createMainDb = async (dbName) => {
  try {
    await couch.db.create(dbName);
    console.log(`${dbName} created`);
  } catch (err){
    if (err.statusCode !== 412) {
      throw err
    }
  }
}

function createDbs () {
  dbs.forEach(db => createMainDb(db))
}

createDbs();








