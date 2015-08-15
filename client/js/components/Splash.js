var React = require('react');
var RedirectWhenLoggedIn = require('../mixins/redirect_when_logged_in');

var Splash = React.createClass({

  mixins: [RedirectWhenLoggedIn],

  render: function() {
    return (
      <div>
        Please login...
      </div>
    );
  },

});

module.exports = Splash;
