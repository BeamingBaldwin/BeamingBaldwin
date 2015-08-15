var React = require('react');
var MessageSection;
var MessageListItem = require('./MessageListItem');
var MessageComposer = require('./MessageComposer');
var MessageStore = require('../stores/MessageStore');
var ThreadStore = require('../stores/ThreadStore');

function getStateFromStores() {
  return {
    messagesArr: MessageStore.getMessagesforCurrentThread(),
    userName: localStorage.email || 'Bobby Tables',
    threadID: ThreadStore.getCurrentThreadID() || '0',
  };
}

MessageSection = React.createClass({

  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    this._scrollToBottom();
    MessageStore.addChangeListener(this._onChange);
    ThreadStore.addChangeListener(this._onChange);
  },

  componentDidUpdate: function() {
    this._scrollToBottom();
  },

  render: function() {
    var messageListItems = this.state.messagesArr.map(function(messageObj) {
      return (
        <MessageListItem
          key={messageObj.messageId}
          messageObj={messageObj}
        />
      );
    });
    return (
      <div className="Message">
        <ul className="Message__list" ref="messageList">
          {messageListItems}
        </ul>
        <MessageComposer threadID={this.state.threadID} userName={this.state.userName}/>
      </div>
    );
  },

  componentDidUnmount: function() {
    MessageStore.removeChangeListener(this._onChange);
    ThreadStore.removeChangeListener(this._onChange);
  },

  _scrollToBottom: function() {
    var ul = this.refs.messageList.getDOMNode();
    ul.scrollTop = ul.scrollHeight;
  },

  _onChange: function() {
    if (this.isMounted()) {
      this.setState(getStateFromStores());
    }
  },

});

module.exports = MessageSection;
