const couch = require('../api/_utils/couchdb');
const users = couch.use('users');

console.log('file: init_couch.js')

module.exports = createDbs;

const dbs = [
  'users',
  'weekly_expectation',
  'monthly_expectation',
  'salary_expectation',
  'outgoings_types',
  'months',
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








