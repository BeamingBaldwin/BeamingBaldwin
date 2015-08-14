var React = require('react');
var auth = require('../services/auth');

var Signout = React.createClass({
  statics: {
    willTransitionTo: function(transition) {
      if (!auth.loggedIn()) {
        transition.redirect('/');
      }
    },
  },

  componentDidMount: function() {
    auth.logout();
  },

  render: function() {
    return <p>You are now logged out</p>;
  },
});

module.exports = Signout;
