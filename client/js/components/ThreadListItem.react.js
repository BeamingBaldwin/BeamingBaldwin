var React = require('react');
var classNames = require('classnames');
var ThreadListItem;

var ReactPropTypes = React.PropTypes;

ThreadListItem = React.createClass({

  propTypes: {
    threadObj: ReactPropTypes.object,
  }, // propTypes

  render: function() {
    var classes = classNames({
      'Threads-listItem': true,
    });

    return (
      <li
        className={classes}
        onClick={this._onClick}>
        {this.props.threadObj.threadName}
      </li>
    );
  }, // render

});

module.exports = ThreadListItem;
