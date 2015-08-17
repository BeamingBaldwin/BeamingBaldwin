var Dispatcher = require('../dispatcher/Dispatcher');
var ActionTypes = require('../constants/Constants').ActionTypes;

var UserSelectorActions = {
  toggle: function(user) {
    Dispatcher.dispatch({
      type: ActionTypes.TOGGLE_USERSELECTOR,
      user: user,
    });
  },
};

module.exports = UserSelectorActions;