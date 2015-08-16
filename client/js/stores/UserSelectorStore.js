var Dispatcher = require('../dispatcher/Dispatcher');
var ActionTypes = require('../constants/Constants').ActionTypes;
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var API = require('../utils/API');

var CHANGE_EVENT = 'change';

var _selections = {};

var UserSelectorStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getUserState: function(userId) {
    return _selections[userId];
  },

  getAll: function() {
    return _selections;
  },

  updateUserState: function(userId, selected) {
    _selections[userId].selected = selected;
    this.emitChange();
  },

  init: function() {
    this.wipe();
    API.listUsers(function(users){
      users.forEach(function(user){
        _selections[user.id] = {
          id: user.id,
          name: user.name,
          selected: false
        };
      });
      UserSelectorStore.emitChange();
    });
  },

  wipe: function() {
    _selections = {};
  },
});

UserSelectorStore.dispatchToken = Dispatcher.register(function(payload) {
  switch (payload.type) {

  case ActionTypes.TOGGLE_USER:
    _selections[payload.userId] = payload.completed;
    UserSelectorStore.emitChange();
    break;

  default:
    // do nothing
  }
});

module.exports = UserSelectorStore;
