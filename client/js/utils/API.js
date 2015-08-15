var Firebase = require('firebase');
var pretty = require('prettyjson').render;
var Actions = require('../actions/ApiActionCreator');
/* Private variables & methods */

var uri = 'https://amber-inferno-3412.firebaseio.com';
var _user;

function _ref(path) {
  var defaultedPath = path || '';
  if (defaultedPath instanceof Array) {
    defaultedPath = defaultedPath.join('/');
  }
  return new Firebase(uri + '/' + defaultedPath);
}

function _escape(str) {
  return str.replace(/[\.#@$\[\]]/g, '-');
}

function _subscribeThread(snapshot) {
  var threadId = snapshot.key();
  console.log('_subscribeThread', threadId);

  // subscribe to messages
  _ref(['threadMessages', threadId])
  .on('child_added', function(__snapshot) {
    var child = __snapshot.val();
    var message = {
      createdAt: child.createdAt,
      messageId: __snapshot.key(),
      text: child.text,
      threadId: threadId,
      userId: child.userId,
    };
    Actions.messageReceivedFromApi(message);
  });

  // subscribe the thread info changes
  _ref(['threadInfo', threadId])
  .on('value', function(__snapshot) {
    var threadInfo = __snapshot.val();
    threadInfo.threadId = threadId;
    Actions.threadInfoReceivedFromApi(threadInfo);
    // console.log('Getting thread info from DB', threadInfo);
  });
}

function _userThreadsDo(callback) {
  // enumerate user's threads
  _ref(['users', _user, 'threads']).once('value', callback);
}

function _unsubscribeThreads() {
  _userThreadsDo(function(snapshot) {
    snapshot.forEach(function(thread) {
      // unsubscribe from threadInfo
      _ref(['threadInfo', thread.key()]).off();
      // unsubscribe from threadMessages
      _ref(['threadMessages', thread.key()]).off();
    });
  });
}

function _subscribeThreads() {
  _userThreadsDo(function(snapshot) {
    snapshot.forEach(function(thread) {
      console.log('_subscribeThreads', thread);
      _subscribeThread(thread);
    });
  });
}

function _unsubscribeAll() {
  // unsubscribe from user object
  _ref(['users', _user]).off();
  _unsubscribeThreads();
}

// NB orderByChild: "If you want to use orderByChild() on a production app, you should define the keys you will be indexing on via the .indexOn rule in your Security and Firebase Rules." https://www.firebase.com/docs/web/guide/retrieving-data.html

function _addThreadToUsers(threadId, users) {
  var user;
  var threadStub = {};
  threadStub[threadId] = true;
  for (user of users) {
    console.log('adding', user, 'to', threadId);
    _ref(['users', user, 'threads'])
    .update(threadStub);
  }
}

function _addUserToThread(user, threadId) {
  var userStub = {};
  user = _escape(user); // no-param-reassign
  userStub[user] = true;
  console.log('_addUserToThread', user, threadId);
  _ref(['threadInfo', threadId, 'participants'])
  .update(userStub);

  _addThreadToUsers(threadId, [user]);
}

function _removeUserFromThread(user, threadId) {
  user = _escape(user);
  console.log('_removeUserFromThread', user, threadId);
  _ref(['users', user, 'threads', threadId]).remove();
  _ref(['threadInfo', threadId, 'participants', user]).remove();
}

/**
 * Callback on changes to the user object in order
 * to update thread subscriptions and inform user
 * store of changes.
 */
function _userChanged(snapshot) {
  var user = snapshot.val();
  user.id = snapshot.key();
  console.log('_userChanged', pretty(user));
  // kill existing thread listeners,
  _unsubscribeThreads();

  // then restore.  Beware aware of race.
  _subscribeThreads();
  Actions.userInfoReceivedFromApi(user);
}

function _unsubscribeThread(snapshot) {
  var threadId = snapshot.key();
  _ref(['threadMessages', threadId]).off();
  _ref(['threadInfo', threadId]).off();
  Actions.userRemovedFromThread(threadId);
}

function _subscribeUser(user) {
  console.log('_subscribeUser', user);
  _user = user;
  // _ref(['users', user]).on('value', _userChanged);
  // subscribe to specific user attributes.
  var threads = _ref(['users', _user, 'threads']);
  threads.on('child_added', _unsubscribeThread);
  threads.on('child_added', _subscribeThread);

  _ref(['users', _user]).once('value', function(snapshot) {
    var userInfo = snapshot.val();
    userInfo.id = snapshot.key();
    console.log('got user subscriptions', pretty(userInfo));
    Actions.userInfoReceivedFromApi(userInfo);
  });
}

/* exported methods */

module.exports = {
  debug: _ref,

  /**
  * Appends message to thread's messages collection.
  * @param { threadId, text, userId } message
  */
  sendMessage: function(message) {
    var threadId = message.threadId;
    var messageId = _ref(['threadMessages', threadId]).push({
      text: message.text,
      userId: message.userId,
      createdAt: Firebase.ServerValue.TIMESTAMP,
    });
    return messageId;
  },

  /**
  * Appends thread to thread collection and
  * to each participants threads collection.
  * @param { title, parentId, participants } thread
  */
  addThread: function(thread) {
    var participants = thread.participants && thread.participants.reduce(function(memo, user) {
        memo[_escape(user)] = true;
        return memo;
      }, {});

    // create threadInfo block
    var threadId = _ref('threadInfo').push({
      title: thread.title,
      parentId: thread.parentId,
      participants: participants,
    }).key();

    // if no participants specified, add to all users.
    if (!thread.participants || !thread.participants.length) {
      _ref('users').once('value', function(data) {
        var users = Object.keys(data.val());
        _addThreadToUsers(threadId, users);
      });
      return threadId;
    }
    _addThreadToUsers(threadId, thread.participants.map(function(user) {
      return _escape(user);
    }));
    return threadId;
  },

  addUser: function(user, next) {
    // TODO check for existing user.
    // TODO find way to use default array keys, but query by user id child.
    user.id = _escape(user.id);
    _ref(['users', user.id]).set({
      name: user.name,
      threads: [ 0 ], // 0 is default thread
    }, next);
  },

  login: function(user) {
    console.log('login', user);
    _subscribeUser(_escape(user));
  },

  logout: _unsubscribeAll,

  addUserToThread: _addUserToThread,

  removeUserFromThread: _removeUserFromThread,
};

window.__api = module.exports;
