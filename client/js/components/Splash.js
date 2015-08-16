var React = require('react');
var RedirectWhenLoggedIn = require('../mixins/redirect_when_logged_in');

var Splash = React.createClass({

  mixins: [RedirectWhenLoggedIn],

  render: function() {
    return (
      <div className="Splash__container">
        <div className="Splash">
          <h2 className="Splash__h2">Please login...</h2>
        </div>
      </div>
    );
  },

});

module.exports = Splash;
