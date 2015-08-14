var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../constants/Constants');
var API = require('../utils/API');

var ActionTypes = Constants.ActionTypes;

function getCreatedMessageData(text, currentThreadID) {
  return {
    text: text,
    threadId: currentThreadID,
    userId: localStorage.username || 'Bill',
  };
}

module.exports = {
  createMessage: function(text, currentThreadID) {
    var messageObj;

    messageObj = getCreatedMessageData(text, currentThreadID);
    console.log('Sending message to the DB:', messageObj);
    API.sendMessage(messageObj);

    Dispatcher.dispatch({
      type: ActionTypes.CREATE_MESSAGE,
      text: text,
      currentThreadID: currentThreadID,
    });
  }, // createMessage
};
