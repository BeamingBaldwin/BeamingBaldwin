var React = require('react');
var ReactPropTypes = React.PropTypes;

var MessageListItem = React.createClass({

  propTypes: {
    messageObj: ReactPropTypes.object,
  },

  render: function() {
    var messageObj = this.props.messageObj;
    return (
      <li className="Message__listItem">
        <h5 className="Message__listItemH5">{messageObj.userId}</h5>
        <p className="Message__listItemCreatedAt">{new Date(Number(messageObj.createdAt)).toString()}</p>
        <p className="Message__listItemText">{messageObj.text}</p>
      </li>
    );
  },

});

module.exports = MessageListItem;
