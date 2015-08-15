var auth = require('../services/auth');
var Signin = require('../components/Signin');

var Authentication = {
  statics: {
    willTransitionTo: function(transition) {
      if (!auth.loggedIn()) {
        Signin.attemptedTransition = transition;
        transition.redirect('/splash');
      }
    },
  },
};

module.exports = Authentication;
