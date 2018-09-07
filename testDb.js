const couch = require('./apiMethods/_utils/couchdb');
const users = couch.db.use('users');

const checkIfUserExist = async () => {
  let response = 1;
  let error;
  const q = {
    selector: {
      user: { "$eq": "abcdefghi"},
    },
    limit:50
  };
  await users.find(q).then((doc) => {
    console.log(doc.docs.length)
    response = doc.docs.length;
    if(doc.docs.length > 1) return{
      status: 409,
      message: 'User already exist'
    }
    else return false;
  }).catch(err=> {
    return err
  })
}

checkIfUserExist();


