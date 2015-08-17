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
    UserSelectorStore.addChangeListener(this._change);
  },

  render: function() {
    var userListItems = this.state.users
    .map(function(user) {
      return (
        <UserSelectorItem user={user}/>
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

  _change: function() {
    this.setState({
      users: _.map(UserSelectorStore.getAll(), function(val) {
        return val;
      }),
    });
  },
});

UserSelector.getSelected = function() {
  return UserSelectorStore.getSelected();

  // var selected = UserSelectorStore.getAll();
  // var users = [];
  // for (var user in selected) {
  //   if (selected[user]) {
  //     users.push(user);
  //   }
  // }
  // return users;
};

UserSelector.setSelected = function(threadId) {
  // console.log('setSelected', threadId);
  API.listUsers(function(allusers) {
    API.listUsersInThread(threadId, function(users) {
      _.each(allusers, function(eachAlluser, key) {
        allusers[key].selected = false;
        _.each(users, function(eachUser) {
          if (eachUser.id === eachAlluser.id) {
            allusers[key].selected = true;
          }
        });
      });
      UserSelectorStore.setAll(allusers);
    });
  });
};

module.exports = UserSelector;
