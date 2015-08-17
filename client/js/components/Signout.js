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
    return (
      <div className="Signout__container">
        <div className="Signout">
          <h2 className="Signout__h2">You are now logged out.</h2>
        </div>
      </div>
    );
  },

});

module.exports = Signout;
