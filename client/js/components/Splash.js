var React = require('react');
var RedirectWhenLoggedIn = require('../mixins/redirect_when_logged_in');

var Splash = React.createClass({

  mixins: [RedirectWhenLoggedIn],

  render: function() {
    return (
      <div className="Splash__container">
        <div className="Splash">
          <h2 className="Splash__h2">Slck</h2>
          <h3 className="Splash__h3">For people who find email slow and chats chaotic</h3>
          <p className="Splash__p">The number one productivity pain point in any organization is communication. Slck will allow you to become more productive than ever by allowing you to communicate at the speed of thought.</p>
          <h3 className="Splash__h3">Problem</h3>
          <p className="Splash__p">Have you ever run into an email and think, "I'll respond to this later"? Maybe you will, maybe you won't. With chat, you can respond in an instant, but the conversation could get lost in a sea of messages.</p>
          <h3 className="Splash__h3">Solution</h3>
          <p className="Splash__p">Slck provides a way for you to organize your chats into searchable emailesque threads. Now you can sift through your chats without them ever getting lost.</p>
          <blockquote className="Splash__blockquote">"It's as if email and chat had a baby!" – Chris Ha</blockquote>
          <blockquote className="Splash__blockquote">"I love emails!" – No one ever</blockquote>
          <div className="Splash__instructions">
            <h3 className="Splash__h3">How to Get Started</h3>
            <ol className="Splash__ol">
              <li className="Splash__li">Sign up</li>
              <li className="Splash__li">Create a new thread</li>
              <li className="Splash__li">Invite some participants</li>
              <li className="Splash__li">Profit!</li>
            </ol>
          </div>
          <h4 className="Splash__h4">Sign up and get your thread on!</h4>
        </div>
      </div>
    );
  },

});

module.exports = Splash;
