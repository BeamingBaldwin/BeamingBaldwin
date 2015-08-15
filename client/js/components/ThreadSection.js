var React = require('react');
var _ = require('lodash');

var ThreadListItem = require('./ThreadListItem');
var ThreadStore = require('../stores/ThreadStore');

var getStateFromStores = function() {
  return {
    currentState: ThreadStore.getCurrentStateOfThreadsAndMessages(),
    // currentState: {
    //   thread1: {
    //     info: {
    //       timestamp: Date.now(),
    //       parentId: '',
    //       participants: ['user1', 'user2'],
    //       threadId: 'thread1',
    //       title: 'Thread1 title',
    //       threadIdNumber: 1,
    //     },
    //     listOfchildren: ['thread2', 'thread3'],
    //     lastMessage: "Thread1 and two nested children: thread2 and thread3",
    //     children: [
    //       { // thread2
    //         info: {
    //           timestamp: Date.now(),
    //           parentId: 'thread1',
    //           participants: ['user3', 'user4'],
    //           threadId: 'thread2',
    //           title: 'Thread2 title',
    //           threadIdNumber: 0,
    //         },
    //         listOfchildren: [],
    //         lastMessage: "Thread2 nested inside thread1 as a chiln.",
    //         children: [],
    //       },
    //       { // thread3
    //         info: {
    //           timestamp: Date.now(),
    //           parentId: 'thread1',
    //           participants: ['user5', 'user6'],
    //           threadId: 'thread3',
    //           title: 'Thread3 title',
    //           threadIdNumber: 0,
    //         },
    //         listOfchildren: ['thread4'],
    //         lastMessage: "Thread3 nested inside thread1 as a chiln.",
    //         children: [
    //           {
    //             info: {
    //               timestamp: Date.now(),
    //               parentId: 'thread3',
    //               participants: ['user5', 'user6'],
    //               threadId: 'thread4',
    //               title: 'Thread4 title',
    //               threadIdNumber: 0,
    //             },
    //             listOfchildren: ['thread4'],
    //             lastMessage: "Thread4 nested inside thread3 as a child, which is nested inside thread1.",
    //             children: [],
    //           }
    //         ],
    //       }
    //     ],
    //   },
    //   thread5:{
    //     info: {
    //       timestamp: Date,
    //       parentId: '',
    //       participants: ['user7', 'user8'],
    //       threadId: 'thread5',
    //       title: 'Thread5 title',
    //       threadIdNumber: 0,
    //     },
    //     listOfchildren: [],
    //     lastMessage: "Thread5 and 0 nested children.",
    //     children: [],
    //   },
    // },
  };
};

var ThreadSection = React.createClass({

  getInitialState: function() {
    var state = getStateFromStores();
    return state;
  },
  componentDidMount: function() {
    ThreadStore.addChangeListener(this._onChange);
    // UnreadThreadStore.addChangeListener(this._onChange);
  },
  render: function() {
    var threadListItems;
    // console.log('render initial state');
    // console.log('currentState', this.state.currentState);
    threadListItems = _.map(this.state.currentState, function(state) {
      return (
        <ThreadListItem
          threadId={state.info.threadId}
          threadLastMessage={state.lastMessage}
          threadTitle={state.info.title}
          threadChildren={state.children}
        />
      );
    });
    return (
      <ul className="Thread">
        {threadListItems}
      </ul>
    );
  },
  _onChange: function() {
    this.setState(getStateFromStores());
  },
});

module.exports = ThreadSection;

// var React = require('react');
// var ThreadListItem = require('./ThreadListItem');
// var ThreadStore = require('../stores/ThreadStore');

// var ThreadSection = React.createClass({

//   getInitialState: function() {
//     // return this.state object
//     return {
//       // threads: ThreadStore.getAllThreads(),
//       threads: [
//         {
//           threadID: 't_1',
//           threadName: 'LOL',
//           lastMessageObj: {},
//         },
//         {
//           threadID: 't_2',
//           threadName: 'Sweet',
//           lastMessageObj: {},
//         },
//         {
//           threadID: 't_3',
//           threadName: 'Nice',
//           lastMessageObj: {},
//         },
//       ], // threads
//     };
//   }, // getInitialState

//   render: function() {
//     var threadListItems = this.state.threads.map(function(threadObj) {
//       return (
//         <ThreadListItem
//           key={threadObj.threadName}
//           threadObj={threadObj}
//         />
//       );
//     });
//     return (
//       <ul className="Thread">
//         {threadListItems}
//       </ul>
//     );
//   }, // render

// });

// module.exports = ThreadSection;
