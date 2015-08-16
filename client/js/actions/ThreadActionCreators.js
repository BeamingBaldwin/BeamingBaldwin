var Dispatcher = require('../dispatcher/Dispatcher');
var ActionTypes = require('../constants/Constants').ActionTypes;

module.exports = {

  clickThread: function(threadId) {
    Dispatcher.dispatch({
      type: ActionTypes.CLICK_THREAD,
      threadId: threadId,
    });
  },

};
