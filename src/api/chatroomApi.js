import keys from '../../config/keys';

module.exports = {
  async getChatrooms(userId) {
    return await fetch(`${keys.apiURL}/api/user/chatrooms/` + userId)
      .then(res => res.json())
      .then(resJson => resJson.chatrooms)
      .catch(err => console.log(err));
  },
  async setUserUnseen(chatroomId, trueOrFalse) {
    const data = {
      unseenUser: trueOrFalse
    };
    return await fetch(`${keys.apiURL}/api/chatroom/update/${chatroomId}`, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(response => console.log('Success:', JSON.stringify(response)))
      .catch(error => console.error('Error:', error));
  }
};
