var Dispatcher = require('../dispatcher/Dispatcher');
var ActionTypes = require('../constants/Constants').ActionTypes;
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var API = require('../utils/API');
var _ = require('lodash');

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

  getSelected: function() {
    return _.filter(_selections, function(user) {
      return user.selected;
    });
  },

  updateUserState: function(userId, selected) {
    if (!_selections[userId]) {
      console.warn(userId, _selections);
    }
    _selections[userId].selected = selected;
    this.emitChange();
  },

  init: function() {
    var currentUser = API.getCurrentUser();
    this.wipe();
    API.listUsers(function(users) {
      users.forEach(function(user) {
        _selections[user.id] = {
          id: user.id,
          name: user.name,
          selected: false || user.id === currentUser,
        };
      });
      UserSelectorStore.emitChange();
    });
  },

  wipe: function() {
    _selections = {};
  },

  setAll: function(users) {
    _selections = {};
    _.each(users, function(user) {
      _selections[user.id] = user;
    });
    this.emitChange();
  },
});

UserSelectorStore.dispatchToken = Dispatcher.register(function(payload) {
  switch (payload.type) {

  case ActionTypes.TOGGLE_USERSELECTOR:
    var user = payload.user;
    user.selected = !user.selected;
    _selections[user.id] = user;
    UserSelectorStore.emitChange();
    break;

  default:
    // do nothing
  }
});

module.exports = UserSelectorStore;
