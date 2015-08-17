/*
  API snippets for rebuilding database.

  Open chat app, then paste these in console.
*/


/* drop data */
__api.debug('users').remove();
__api.debug('threadMessages').remove();

// drop threads and rebuild General
__api.debug('threadInfo').set({ 0: { title: 'General' } });




/* adding pre-registered user back to database */
api.addUser({id: 'brian@brian.com', name: 'Brian Cleary'});
// NB this allows pretty names in a way the app doesn't



/* adding threads */
backlog = __api.addThread({title: 'Backlog', participants: ['paul@paul.com']});

// add subthread
__api.addThread({title: 'Features', parentId: backlog, participants: ['paul@paul.com']});



/* join thread */
__api.addUserToThread('brian@brian.com', backlog);



//NB in addThread, participants: [] adds thread to everyone, but doesn't create participants section that participants view depends on.