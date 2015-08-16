var React = require('react');

var MessageSection = require('./MessageSection');
var HeaderSection = require('./HeaderSection');
var ThreadSection = require('./ThreadSection');

var Authentication = require('../mixins/authentication');

var SlickApp = React.createClass({

  mixins: [ Authentication ],

  render: function() {
    return (
      <div className="SlickApp">
        <HeaderSection/>
        <div className="Body">
          <div className="Thread">
            <ThreadSection/>
          </div>
          <MessageSection/>
        </div>
      </div>
    );
  },

});

module.exports = SlickApp;
