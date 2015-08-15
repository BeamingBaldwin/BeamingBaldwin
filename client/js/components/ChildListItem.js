var React = require('react');
var ReactPropTypes = React.PropTypes;

var ChildListItem = React.createClass({

  propTypes: {
    childTitle: ReactPropTypes.string,
    childLastMessage: ReactPropTypes.string,
  },

  render: function() {
    // console.log('ChildListItem', ChildListItem);
    return (
      <ul
      rt-if="this.props.children"
      className="Thread__listItem--2">
        <li>Title: {this.props.childTitle}</li>
      </ul>
      );
  },
});

module.exports = ChildListItem;
