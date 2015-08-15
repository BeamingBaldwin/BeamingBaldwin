var keyMirror = require('keymirror');

module.exports = {
  ActionTypes: keyMirror({
    // API => MessageStore & ThreadStore
    RECEIVE_MESSAGE: null,

    // API => ThreadStore
    RECEIVE_THREADINFO: null,

    // API => ???
    RECEIVE_USERINFO: null,

    // API => ThreadStore
    REMOVED_FROM_THREAD: null,

    // ThreadListItem => ThreadActionCreators => MessageStore & ThreadStore
    CLICK_THREAD: null,
  }),
};
