var React = require('react');
var Router = require('react-router');

var auth = require('../services/auth');

var Signout = React.createClass({
  mixins: [Router.Navigation],

  statics: {
    willTransitionTo: function(transition) {
      if (!auth.loggedIn()) {
        transition.redirect('/');
      }
    },

    attemptedTransition: null,

  },

  componentDidMount: function() {
    auth.logout(function() {
      var transition;
      if (Signout.attemptedTransition) {
        transition = Signout.attemptedTransition;
        Signout.attemptedTransition = null;
        transition.retry();
      } else {
        setTimeout(function() {
          this.replaceWith('/');
        }.bind(this), 2000);
      }
    }.bind(this));
  },

  render: function() {
    return (
      <div className="Signout__container">
        <div className="Signout">
          <h2 className="Signout__h2">You are now logged out.</h2>
          <h3 className="Signout__h3">Redirecting you back to home in two seconds.</h3>
        </div>
      </div>
    );
  },

});

module.exports = Signout;
