var React = require('react');
// var classNames = require('classnames');
// var _ = require('lodash');

var ReactPropTypes = React.PropTypes;

var ChildListItem = require('./ChildListItem');
var ThreadActionCreators = require('../actions/ThreadActionCreators');

var ThreadListItem = React.createClass({

  propTypes: {
    threadObj: ReactPropTypes.object,
    threadChildren: ReactPropTypes.array,
    threadTitle: ReactPropTypes.string,
    threadLastMessage: ReactPropTypes.string,
    threadId: ReactPropTypes.string,
  },

  render: function() {
    var renderChildrenThread = function(children) {
      var i;
      var child;
      if (children.length > 0) {
        for (i = 0; i < children.length; i++) {
          child = children[i];
          // console.log('child', children.length);
          if (child.children.length > 0) {
            // console.log('children of child', child.children);
            renderChildrenThread(child.children);
          }
          return (
            <ChildListItem
              className="Thread__listItem--2"
              childTitle={child.info.title}
            />
          );
        }
      }
    };
    var myChildren = this.props.threadChildren;
    return (
      <li
        className="Thread__listItem--1">
        <div onClick={this._onClick}>
          <p>Title: {this.props.threadTitle} </p>
        </div>
        {renderChildrenThread(myChildren)}
      </li>
    );
  },

  _onClick: function() {
    // console.log('Hello from ', this.props.threadTitle, ' with id: ', this.props.threadId);
    ThreadActionCreators.clickThread(this.props.threadId);
  },

});

module.exports = ThreadListItem;

// var React = require('react');
// var classNames = require('classnames');

// var ReactPropTypes = React.PropTypes;

// var ThreadListItem = React.createClass({

//   propTypes: {
//     threadObj: ReactPropTypes.object,
//   },

//   render: function() {
//     var classes = classNames({
//       'Thread-listItem': true,
//     });
//     return (
//       <li
//         className={classes}
//         onClick={this._onClick}>
//         {this.props.threadObj.threadName}
//       </li>
//     );
//   },

// });

// module.exports = ThreadListItem;
