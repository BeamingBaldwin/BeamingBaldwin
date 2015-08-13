var ThreadStore;
var SlickAppDispatcher = require('../dispatcher/SlickAppDispatcher');
var SlickConstants = require('../constants/SlickConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = SlickConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _currThread = null;
var _threads = {};

ThreadStore = assign({}, EventEmitter.prototype, {

  init: function() {

  }, // init

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  }, // emit

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  }, // addChangeListener

  removeChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  }, // removeChangeListener

});

ThreadStore.dispatchToken = SlickAppDispatcher.register(function(payload) {
  switch (payload.type) {

  case ActionTypes.CLICK_THREAD:
    break;

  default:
    // do nothing
  }
});

module.exports = ThreadStore;
