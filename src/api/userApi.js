const keys = require('../../config/keys');

module.exports = {
  getByUsername(username) {
    console.log(`${keys.apiURL}/api/user/find/` + username);
    return fetch(`${keys.apiURL}/api/user/find/` + username)
      .then(res => res.json())
      .then(resJson => {
        console.log('blah', resJson);
        return resJson[0];
      })
      .catch(err => console.log(err, 'blah'));
  }
};
