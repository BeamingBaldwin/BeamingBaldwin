var React = require('react');
var API = require('../utils/API');
var UserSelectorItem = require('./UserSelectorItem');
var _ = require('lodash');
var UserSelectorStore = require('../stores/UserSelectorStore');


var UserSelector = React.createClass({
  getInitialState: function() {
    UserSelectorStore.init();
    return {
      users: [],
    };
  },

  componentDidMount: function() {
    UserSelectorStore.addChangeListener(function() {
      this.setState({
        users: _.map(UserSelectorStore.getAll(), function(val) {
          return val;
        }),
      });
    }.bind(this));
  },

  render: function() {
    var userListItems = this.state.users
    .map(function(user) {
      return (
        <UserSelectorItem user={user} ref={user.id}/>
      );
    });
    return (
      <div className="UserSelector">
        <ul className="UserSelector__list">
          {userListItems}
        </ul>
      </div>
    );
  },

  componentDidUnmount: function() {
    UserSelectorStore.wipe();
  },
});

UserSelector.getSelected = function() {
  var selected = UserSelectorStore.getAll();
  var users = [];
  for(var user in selected) {
    if (selected[user]) {
      users.push(user);
    }
  }
  return users;
};

// UserSelector.setSelected = function(userSelectorRef, users) {
//   _.each(users, function(user) {
//     console.log('update', user);
//     UserSelectorStore.updateUserState(user.id, true);
//   })
// };
UserSelector.setSelected = function(threadId) {
  console.log('setSelected', threadId);
  API.listUsersInThread(threadId, function(users) {
    console.log(threadId, users);
    _.each(users, function(user) {
      console.log('update', user);
      UserSelectorStore.updateUserState(user.id, true);
    });
  });
};

module.exports = UserSelector;
