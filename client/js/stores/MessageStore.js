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
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  getMessagesforCurrentThread: function() {
    var key = ThreadStore.getCurrentThreadID() || '0';
    console.log('currentThreadID:', key);
    return !_messagesObj[key] ? [] : _messagesObj[key];
  },

});

MessageStore.dispatchToken = Dispatcher.register(function(payload) {
  switch (payload.type) {

  case ActionTypes.CLICK_THREAD:
    Dispatcher.waitFor([ThreadStore.dispatchToken]);
    // TODO: Add back read markings
    MessageStore.emitChange();
    break;

  case ActionTypes.RECEIVE_MESSAGE:
    Dispatcher.waitFor([ThreadStore.dispatchToken]);
    _addMessageToMessagesObj(payload.message);
    MessageStore.emitChange();
    break;

  default:
    // do nothing
  }
  return true;
});

module.exports = MessageStore;
