// Call these from the console within the app.

/* drop data */
__api.debug('users').remove();
__api.debug('threadMessages').remove();
// drop threads and rebuild General
__api.debug('threadInfo').set({ 0: { title: 'General' } });

// To add nested threads, keep a reference to the parentId returned by addThread.

backlog = __api.addThread({title: 'Backlog', participants: users});
__api.addThread({title: 'Features', parentId: backlog, participants: users});
__api.addThread({title: 'Bugs', parentId: backlog, participants: users});

food = __api.addThread({title: 'Food', participants: users});
__api.addThread({title: 'Cheap Food', parentId: food, participants: users});

vacation = __api.addThread({title: 'Vacation Ideas', participants: users});
london = __api.addThread({title: 'London', parentId: vacation, participants: users});
__api.addThread({title: 'Summer', parentId: vacation, participants: users});

__api.addThread({title: 'Big Ben', parentId: london, participants: users});

/* 
  recereate users that are already in the auth database
*/

var users = [
  'steve@slck.io',
  'brian@slck.io',
  'chris.ha@slck.io',
  'christopher@slck.io',
];


/* add users to threads */

//NB participants: [] adds thread to everyone, but doesn't create participants section that participants view depends on.
// add thread
backlog = __api.addThread({title: 'Backlog', participants: ['paul@paul.com']});
// add subthread
__api.addThread({title: 'Features', parentId: backlog, participants: ['paul@paul.com']});

__api.addUserToThread('brian@brian.com', backlog);

// only use for pre-registered users.
api.addUser({id: 'brian@brian.com', name: 'Brian Cleary'});