import keys from '../../config/keys';

module.exports = {
  async getMessages(chatroomId) {
    return await fetch(`${keys.apiURL}/api/chatroom/` + chatroomId)
      .then(res => res.json())
      .catch(err => console.log(err));
  }
};
