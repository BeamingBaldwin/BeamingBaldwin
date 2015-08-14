var React = require('react');
var MessageSection;
var MessageListItem = require('./MessageListItem');
var MessageComposer = require('./MessageComposer');
var MessageStore = require('../stores/MessageStore');
var ThreadStore = require('../stores/ThreadStore');

/** message: id, authorname, date, text */

function getStateFromStores() {
  return {
    messagesArr: MessageStore.getMessagesforCurrentThread(),
    // userName: MessageStore.getUserNameForCurrentThread(), // TODO: this should come from a UserStore
    userName: localStorage.email || 'Bobby Tables',
    threadID: ThreadStore.getCurrentThreadID() || '0',
  };
}

MessageSection = React.createClass({

  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    MessageStore.addChangeListener(this._onChange);
    // ThreadStore.addChangeListener(this._onChange);
  },

  componentDidUnmount: function() {
    MessageStore.removeChangeListener(this._onChange);
    // ThreadStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    if (this.isMounted()) {
      this.setState(getStateFromStores());
    }
  },

  render: function() {
    var messageListItems = this.state.messagesArr.map(function(messageObj) {
      return (
        <MessageListItem
          key={messageObj.messageID}
          messageObj={messageObj}
        />
      );
    });

    return (
      <div className="Message">
        <ul className="Message__list">
          {messageListItems}
        </ul>
        <MessageComposer threadID={this.state.threadID} userName={this.state.userName}/>
      </div>
    );
  },
});

module.exports = MessageSection;
