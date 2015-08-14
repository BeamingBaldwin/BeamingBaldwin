var React = require('react');
var ThreadListItem = require('./ThreadListItem');
var ThreadStore = require('../stores/ThreadStore');

var ThreadSection = React.createClass({

  getInitialState: function() {
    // return this.state object
    return {
      // threads: ThreadStore.getAllThreads(),
      threads: [
        {
          threadID: 't_1',
          threadName: 'LOL',
          lastMessageObj: {},
        },
        {
          threadID: 't_2',
          threadName: 'Sweet',
          lastMessageObj: {},
        },
        {
          threadID: 't_3',
          threadName: 'Nice',
          lastMessageObj: {},
        },
      ], // threads
    };
  }, // getInitialState

  render: function() {
    var threadListItems = this.state.threads.map(function(threadObj) {
      return (
        <ThreadListItem
          key={threadObj.threadName}
          threadObj={threadObj}
        />
      );
    });
    return (
      <ul className="Thread">
        {threadListItems}
      </ul>
    );
  }, // render

});

module.exports = ThreadSection;
