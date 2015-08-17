var React = require('react');
var ParticipantsSection;
var _ = require('lodash');
var ThreadStore = require('../stores/ThreadStore');
var API = require('../utils/API');

var getStateFromStores = function() {
  return {
    listOfParticipants: ThreadStore.getCurrentParticipants(),
  };
};

ParticipantsSection = React.createClass({
  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    // console.log('componentDidMount');
    ThreadStore.addChangeListener(this._onChange);
  },

  render: function() {
    var renderList;
    var list;
    res = [];
    list = this.state.listOfParticipants;
    if (this.state !== undefined) {
      renderList = _.map(list, function(user) {
        return (
          <li className="Participants__li">{user.name}</li>
        );
      });
    }
    return (
      <div className="Participants">
        <h2 className="Participants__h2">Participants</h2>
        <ul className="Participants__ul">
          {renderList}
        </ul>
      </div>
    );
  },
  _onChange: function() {
    var thread = ThreadStore.getCurrentThread();
    if (thread) {
      API.listUsersInThread(thread.threadId, function(users) {
        // console.log('thead users', users);
        this.setState({
          listOfParticipants: users,
        });
      }.bind(this));
    }
  },
});

module.exports = ParticipantsSection;
