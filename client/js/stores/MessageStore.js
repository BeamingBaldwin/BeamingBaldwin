var MessageStore;
var ThreadStore = require('./ThreadStore');
var Dispatcher = require('../dispatcher/Dispatcher');
var ActionTypes = require('../constants/Constants').ActionTypes;

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _messagesObj = {
  '0': [],
};

function _addMessageToMessagesObj(messagePayloadObj) {
  if (_messagesObj[messagePayloadObj.threadId] === undefined) {
    _messagesObj[messagePayloadObj.threadId] = [];
  }
  _messagesObj[messagePayloadObj.threadId].push(messagePayloadObj);
}

MessageStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  }, // emit

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  }, // addChangeListener

  removeChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  }, // removeChangeListener

  getMessagesforCurrentThread: function() {
    // TODO: sort the messages by chronological order
    return _messagesObj['0'];
    // return _messagesObj[ThreadStore.getCurrentThreadID()];
  }, // getMessagesforCurrentThread

});

MessageStore.dispatchToken = Dispatcher.register(function(payload) {
  console.log(payload);
  switch (payload.type) {

  case ActionTypes.CLICK_THREAD:
    Dispatcher.waitFor([ThreadStore.dispatchToken]);
    break;

  case ActionTypes.RECEIVE_MESSAGE:
    // Dispatcher.waitFor([ThreadStore.dispatchToken]);
    _addMessageToMessagesObj(payload.message);
    MessageStore.emitChange();
    break;

  default:
    // do nothing
  }
});

module.exports = MessageStore;
