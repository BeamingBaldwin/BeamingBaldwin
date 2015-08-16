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

var _getLastThreadId = function(_threads) {
};

var _getParentThreadId = function() {
  return _threads[_currThreadID] && _threads[_currThreadID].info.parentId || '0';
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

ThreadStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getCurrentThreadID: function() {
    return _currThreadID;
  },

  getCurrentThreadTitle: function() {
    if (!_threads[_currThreadID]) { return; }
    return _threads[_currThreadID].info.title;
  },

  getCurrentStateOfThreadsAndMessages: function() {
    var res = {};
    var aThread = {};
    var thread;
    var counter;
    var threadToStore;
    var _thereIsParentFor = function(thread, res) {
      var result = false;
      var recurse = function(children) {
        var i;
        var eachThread;
        if (children.length > 0) {
          for (i = 0; i < children.length; i++) {
            if (children[i].listOfchildren.indexOf(thread)) {
              result = true;
              break;
            } else {
              recurse(children[i].children);
            }
          }
        }
      };
      for (eachThread in res) {
        if (res[eachThread].listOfchildren.indexOf(thread) !== -1) {
          result = true;
          break;
        } else if (res[eachThread].children.length > 0) {
          recurse(res[eachThread].children);
        }
      }
      return result;
    };
    var recurse = function(children) {
      var i;
      counter++;
      if (children.length > 0) {
        for (i = 0; i < children.length; i++) {
          if (children[i].listOfchildren.indexOf(threadToStore.info.threadId) !== -1) {
            threadToStore.info['depth'] = counter;
            children[i].children.push(threadToStore);
          } else {
            if (children[i].children.length > 0) recurse(children[i].children);
          }
        }
      }
      counter--;
    };
    for (thread in _threads) {
      if (!!_threads[thread]) {
        counter = 1;
        aThread[thread] = {
          info: _threads[thread].info || {},
          listOfchildren: _listOfChildren[thread] || [],
          lastMessage: _messages[thread] && _messages[thread].text || '',
          children: [],
        };
        if (_threads[thread].info.parentId === undefined) {
          aThread[thread].info['depth'] = 0;
          res[thread] = aThread[thread];
        } else if (_thereIsParentFor(thread, res)) {
          threadToStore = aThread[thread];
          if (Object.keys(res).length > 0) {
            for (thread in res) {
              if (res[thread].listOfchildren.indexOf(threadToStore.info.threadId) !== -1) {
                threadToStore.info['depth'] = counter;
                res[thread].children.push(threadToStore);
              }  else {
                if (res[thread].children.length > 0) recurse(res[thread].children);
              }
            }
          }
        }
      }
    }
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

  case ActionTypes.REMOVED_FROM_THREAD:
    delete _threads[payload.threadId];
    ThreadStore.emitChange();
    break;

  case ActionTypes.LOAD_DEFAULT_THREAD:
    break;

  default:
    // do nothing
  }
  return true;
});

module.exports = ThreadStore;
