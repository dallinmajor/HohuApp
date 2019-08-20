const keys = require('../../config/keys');

module.exports = {
  async getByUsername(username) {
    return await fetch(`${keys.apiURL}/api/user/find/` + username)
      .then(res => res.json())
      .then(resJson => {
        return resJson[0];
      })
      .catch(err => console.log(err, 'blah'));
  }
};
