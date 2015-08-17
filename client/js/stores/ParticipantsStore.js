var ParticipantsStore;
var Dispatcher = require('../dispatcher/Dispatcher');
var ActionTypes = require('../constants/Constants').ActionTypes;
var ThreadStore = require('./ThreadStore');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

ParticipantsStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    // console.log('emitChange');
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    // console.log('addChangeListener');
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

});

ParticipantsStore.dispatchToken = Dispatcher.register(function(payload) {
  switch (payload.type) {

  case ActionTypes.CLICK_THREAD:
    // console.log('ParticipantsStore', payload.threadId);
    Dispatcher.waitFor([ThreadStore.dispatchToken]);
    // ParticipantsStore.getUsersForThread(payload.threadId);
    ParticipantsStore.emitChange();
    break;

  default:
      // do nothing
  }
});

module.exports = ParticipantsStore;
