var keyMirror = require('keymirror');

module.exports = {
  ActionTypes: keyMirror({
    // ChatWebAPIUtils => MessageStore & ThreadStore
    RECEIVE_MESSAGE: null,

    // MessageComposer => ChatWebAPIUtils
    CREATE_MESSAGE: null,
  }),
};
