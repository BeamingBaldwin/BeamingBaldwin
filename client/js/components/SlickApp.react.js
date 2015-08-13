var React = require('react');
var HeaderSection = require('./HeaderSection.react');
var ThreadSection = require('./ThreadSection.react');
// var MessageSection = require('./MessageSection.react');

var SlickApp = React.createClass({

  render: function() {
    return (
      <div className="SlickApp">
        <HeaderSection />
        <ThreadSection />
      </div>
    );
  }, // render

});

module.exports = SlickApp;
