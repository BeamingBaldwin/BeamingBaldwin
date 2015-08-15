var ThreadStore;
var Dispatcher = require('../dispatcher/Dispatcher');
var ActionTypes = require('../constants/Constants').ActionTypes;

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _currThreadID = null;
var _threads = {};

var _messages = {};
var _listOfChildren = {};
var counter = 0;

var _getLastThreadId = function(_threads) {

};

var _getParentThreadId = function() {
  return _threads[_currThreadID]
 && _threads[_currThreadID].parentId || 0;
};

var _retrieveInfoForThread = function(thread) {
  return {
    timestamp: thread.createdAt,
    parentId: thread.parentId,
    participants: thread.participants,
    threadId: thread.threadId,
    title: thread.title,
  };
};

var _updateTreeOfChildren = function(thread) {
  if (thread.parentId !== undefined) {
    if (thread.parentId in _listOfChildren) {
      _listOfChildren[thread.parentId].push(thread.threadId);
    } else {
      _listOfChildren[thread.parentId] = [thread.threadId];
    }
  } else {
    // single thread with no children
    _listOfChildren[thread.threadId] = [];
  }
};

var _giveThreadsAnIdNumberForOrdering = function() {
  var timeStampAndThreads = {};
  var tempArrayDateThreadsOrganized = [];
  var thread;
  var i;
  var threadIdToChange;
  if (Object.keys(_threads).length > 0) {
    for (thread in _threads) {
      if (_threads[thread].info.parentId === '') {
        timeStampAndThreads[_threads[thread].info.createdAt] = _threads[thread].info.threadId;
        tempArrayDateThreadsOrganized.push(_threads[thread].info.createdAt);
      }
    }
    tempArrayDateThreadsOrganized.sort();
    for (i = 0; i < tempArrayDateThreadsOrganized.length; i++) {
      threadIdToChange = timeStampAndThreads[tempArrayDateThreadsOrganized[i]];
      _threads[threadIdToChange].info.threadIdNumber = i;
    }
  }
};

var _thereIsParentFor = function(thread, res) {
  // root when _threads[thread].info.parentId === ''
  var result = false;
  var eachThread;
  var recurse = function(children) {
    var i;
    if (children.length > 0) {
      for (i = 0; i < children.length; i++) {
        if (children[i].listOfchildren.indexOf(thread)) {
          result = true;
        } else {
          recurse(children[i].children);
        }
      }
    }
  };
  if (Object.keys(res).length > 0) {
    for (eachThread in res) {
      if (res[eachThread].listOfchildren.indexOf(thread) !== -1) result = true;
      if (res[eachThread].children.length > 0) {
        recurse(res[eachThread].children);
      }
    }
  }
  return result;
};

ThreadStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  getCurrentThreadID: function() {
    return _currThreadID;
  },
  storeInNestedParent: function(res, threadToStore) {
    var thread;
    var recurse = function(children) {
      var i;
      if (children.length > 0) {
        for (i = 0; i < children.length; i++) {
          if(children[i].listOfchildren.indexOf(threadToStore.info.threadId) !== -1) {
            children[i].children.push(threadToStore);
            return;
          } else {
            if (children[i].children.length > 0) recurse(children[i].children);
          }
        }
      }
    };
    if (Object.keys(res).length > 0) {
      for (thread in res) {
        // if threadToStore is a child of a parent in root res.
        if (res[thread].listOfchildren.indexOf(threadToStore.info.threadId) !== -1) {
          res[thread].children.push(threadToStore);
          return;
        }  else {
          if (res[thread].children.length > 0) recurse(res[thread].children);
        }
      }
    }
  },

  getCurrentStateOfThreadsAndMessages: function() {
    var res = {};
    var aThread = {};
    var orphans = {};
    var thread;
    _giveThreadsAnIdNumberForOrdering();
    // console.log('getting current State');
    if (Object.keys(_threads).length > 0) {
      for (thread in _threads) {
        aThread[thread] = {};
        // Create a type of object name aThread
        aThread[thread].info = _threads[thread].info || {};
        aThread[thread].listOfchildren = _listOfChildren[thread] || [];
        aThread[thread].lastMessage = _messages[thread] && _messages[thread].text || '';
        aThread[thread].children = []; // nested children objects will be insterded during iteration
        // thread without parent but it might have children
        // console.log('_threads[thread].info.parentId', _threads[thread].info.parentId);
        if (_threads[thread].info.parentId === undefined) {
          res[thread] = aThread[thread];
          aThread = {};
          // console.log('res[thread]', res[thread]);
        } else if (_threads[thread].info.parentId !== undefined && _thereIsParentFor(thread, res)) {
          ThreadStore.storeInNestedParent(res, aThread[thread]);
          aThread = {};
        } else if (_threads[thread].info.parentId !== undefined && !_thereIsParentFor(thread, res)) {
          orphans[thread] = aThread[thread];
          aThread = {};
        }
      }
    }
    // console.log('_threads', _threads);
    // console.log('res', res);
    // console.log('aThread', aThread);
    return res;
  },

  // Keeps track of all the threads send by the DB in an object.
  updateLocalThreadsStorage: function(thread) {
    _threads[thread.threadId] = {};
    _updateTreeOfChildren(thread);
    _threads[thread.threadId].info = _retrieveInfoForThread(thread);
    // console.log('updateLocalThreadsStorage', _threads[thread.threadId]);
  },

  // Keeps last messages sent by the DB for each thread.
  // Attach the last message as a property of thread within _threads.
  updateLocalLastMessagesStorage: function(payload) {
    if (payload.message.threadId in _messages) {
      if (_messages[payload.message.threadId].createdAt < payload.message.createdAt) {
        _messages[payload.message.threadId] = payload.message;
      }
    } else {
      // new ThreadId being attached to _messages
      _messages[payload.message.threadId] = payload.message;
    }
  },
  setCurrentThreadId: function() {
    var lastThreadId = _getLastThreadId();
    return lastThreadId;
  },
  getOneThreadFromStream: function() {
    return [];
  },
  getOneMessageFromStream: function() {
    return [];
  },

  getParentThreadId: _getParentThreadId,

});

ThreadStore.dispatchToken = Dispatcher.register(function(payload) {
  switch (payload.type) {

  case ActionTypes.CLICK_THREAD:
    _currThreadID = payload.threadId;
    ThreadStore.emitChange();
    break;

  case ActionTypes.RECEIVE_THREADINFO:
    // console.log('Listening to Thread DB', payload.threadInfo.threadId);
    ThreadStore.updateLocalThreadsStorage(payload.threadInfo);
    ThreadStore.setCurrentThreadId();
    // console.log('_threads[0]', _threads);
    ThreadStore.emitChange();
    break;

  case ActionTypes.RECEIVE_MESSAGE:
    // console.log('Listening to message DB', payload.message);
    ThreadStore.updateLocalLastMessagesStorage(payload);
    ThreadStore.emitChange();
    break;

  case ActionTypes.LOAD_DEFAULT_THREAD:

  default:
    // do nothing
  }
  return true;
});

module.exports = ThreadStore;

// var ThreadStore;
// var Dispatcher = require('../dispatcher/Dispatcher');
// var ActionTypes = require('../constants/Constants').ActionTypes;

// var EventEmitter = require('events').EventEmitter;
// var assign = require('object-assign');

// var CHANGE_EVENT = 'change';

// var _currThreadID = null;
// var _threads = {};

// ThreadStore = assign({}, EventEmitter.prototype, {

//   init: function() {

//   }, // init

//   emitChange: function() {
//     this.emit(CHANGE_EVENT);
//   }, // emit

//   addChangeListener: function(callback) {
//     this.on(CHANGE_EVENT, callback);
//   }, // addChangeListener

//   removeChangeListener: function(callback) {
//     this.on(CHANGE_EVENT, callback);
//   }, // removeChangeListener

//   getCurrentThreadID: function() {
//     return _currThreadID;
//   },

// });

// ThreadStore.dispatchToken = Dispatcher.register(function(payload) {
//   switch (payload.type) {

//   case ActionTypes.CLICK_THREAD:
//     _currThreadID = payload.threadID;
//     break;

//   default:
//     // do nothing
//   }
// });

// module.exports = ThreadStore;
