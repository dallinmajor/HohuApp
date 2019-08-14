import keys from '../../config/keys';

module.exports = {
  getMessages(chatroomId) {
    return fetch(`${keys.apiURL}/api/chatroom/` + chatroomId)
      .then(res => res.json())
      .catch(err => console.log(err));
  }
};
