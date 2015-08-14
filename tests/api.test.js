/* usage:
var api = require('./tests/api.test')
*/

var api = require('../client/js/utils/API');

/* drop data */
api.debug('users').remove(function() {
  api.debug('threads').remove(tests);
});

var tests = function(){
  api.addUser({id: 'brian', name: 'brian cleary'}, function() {
    api.login('brian');
    api.addUser({id: 'shan', name: 'shannon foss'}, function() {
      var privateThreadId = api.addThread({
        title: 'brian\'s thread',
        parentId: null,
        participants: ['brian'],
      });
      var mainThreadId = api.addThread({
        title: 'main',
        parentId: null,
        participants: null,
      });

      // no next callback on addThread, so wait a bit.
      setTimeout(function() {
        api.sendMessage({
          threadId: privateThreadId,
          text: 'test text',
          userId: 'brian',
        });

        api.addUserToThread('shan', privateThreadId);
        setTimeout(function() {
          api.removeUserFromThread('brian', mainThreadId);
        }, 1000);

        api.login('shan');
        console.log('shan in main, both in private');

        setTimeout(function() {
          api.sendMessage({
            threadId: privateThreadId,
            text: 'second private message',
            userId: 'brian',
          });
        }, 250);
      }, 250);
    });
  });
};

module.exports = api;
