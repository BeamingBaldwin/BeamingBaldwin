var React = require('react');
var API = require('../utils/API');

var ReactPropTypes = React.PropTypes;

var ENTER_KEY_CODE = 13;

var MessageComposer = React.createClass({

  propTypes: {
    threadID: ReactPropTypes.string.isRequired,
    userName: ReactPropTypes.string.isRequired,
  },

  getInitialState: function() {
    return {text: ''};
  },

  render: function() {
    return (
      <textarea
        className="Message__composer"
        name="message"
        value={this.state.text}
        onChange={this._onChange}
        onKeyDown={this._onKeyDown}
      />
    );
  },

  _onChange: function(event) {
    this.setState({
      text: event.target.value,
    });
  },

  _onKeyDown: function(event) {
    var textToSend;

    if (event.keyCode === ENTER_KEY_CODE) {
      event.preventDefault();
      textToSend = this.state.text.trim();
      if (textToSend) {
        API.sendMessage({
          threadId: this.props.threadID || 0, // TODO: need to wire up API to serve ThreadStore with data to set a currentThreadID
          text: textToSend,
          userId: this.props.userName,
        });
      }
      this.setState({text: ''});
    }
  },

});

module.exports = MessageComposer;
