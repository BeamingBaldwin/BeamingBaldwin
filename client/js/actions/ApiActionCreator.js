var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../constants/Constants');

var ActionTypes = Constants.ActionTypes;


// See API-Payloads.md for payload object descriptions.

module.exports = {
  messageReceivedFromApi: function(message) {
    Dispatcher.dispatch({
      type: ActionTypes.RECEIVE_MESSAGE,
      message: message,
    });
  },

  threadInfoReceivedFromApi: function(threadInfo) {
    Dispatcher.dispatch({
      type: ActionTypes.RECEIVE_THREADINFO,
      threadInfo: threadInfo,
    });
  },

  userInfoReceivedFromApi: function(userInfo) {
    Dispatcher.dispatch({
      type: ActionTypes.RECEIVE_USERINFO,
      userInfo: userInfo,
    });
  },

  userRemovedFromThread: function(threadId) {
    Dispatcher.dispatch({
      type: ActionTypes.REMOVED_FROM_THREAD,
      threadId: threadId,
    });
  },
};
