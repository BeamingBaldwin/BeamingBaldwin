var React = require('react');

var MessageSection = require('./MessageSection');
var HeaderSection = require('./HeaderSection');
var ThreadSection = require('./ThreadSection');
var ParticipantsSection = require('./ParticipantsSection');

var Authentication = require('../mixins/authentication');

var SlickApp = React.createClass({

  mixins: [ Authentication ],

  render: function() {
    return (
      <div className="SlickApp">
        <HeaderSection/>
        <div className="Body">
          <div className="Thread">
            <h2 className="Thread__h2">Threads</h2>
            <ThreadSection />
          </div>
          <MessageSection />
          <ParticipantsSection />
        </div>
      </div>
    );
  },

});

module.exports = SlickApp;
