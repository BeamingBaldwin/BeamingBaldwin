var React = require('react');
var ReactPropTypes = React.PropTypes;

var _ = require('lodash');
var ThreadStore = require('../stores/ThreadStore');

var ThreadActionCreators = require('../actions/ThreadActionCreators');

var getStateFromStores = function() {
  return {
    currentState: ThreadStore.getCurrentStateOfThreadsAndMessages(),
  };
};

var ThreadSection = React.createClass({

  propTypes: {
    node: ReactPropTypes.array,
  },

  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    ThreadStore.addChangeListener(this._onChange);
  },

  render: function() {
    var threadListItems;
    var nodes = this.state.currentState;
    var classOfElement = 'Thread__listItem--';
    if (Object.keys(nodes).length > 0) {
      threadListItems = _.map(this.props.node || nodes, function(node) {
        return (
          <li onClick={this._onClick.bind(null, node.info.threadId)} ref="myInput" data-thread-id={node.info.threadId} className={classOfElement + node.info.depth}>
            <span className="Thread__listItemTitle">{node.info.title}</span>
            <ThreadSection node={node.children}/>
          </li>
        );
      }.bind(this));
    }
    return (
      <div>
        <ul className="Thread__ul" node={nodes}>
          {threadListItems}
        </ul>
      </div>
    );
  },

  _onChange: function() {
    if (this.isMounted()) {
      this.setState(getStateFromStores());
      this.forceUpdate();
    }
  },

  _onClick: function(id, e) {
    e.stopPropagation();
    ThreadActionCreators.clickThread(id);
  },

});

module.exports = ThreadSection;
