import keys from '../../config/keys';

module.exports = {
  getChatrooms(userId) {
    return fetch(`${keys.apiURL}/api/user/chatrooms/` + userId)
      .then(res => res.json())
      .then(resJson => resJson.chatrooms)
      .catch(err => console.log(err));
  }
};
