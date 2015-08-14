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
        <ThreadSection/>
        <MessageSection/>
      </div>
    );
  },
});

module.exports = SlickApp;
