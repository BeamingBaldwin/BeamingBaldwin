var React = require('react');
var Router = require('react-router');

var auth = require('../services/auth');

var Signup = React.createClass({

  mixins: [Router.Navigation],

  statics: {
    attemptedTransition: null,
  },

  getInitialState: function() {
    return {
      error: false,
    };
  },

  render: function() {
    return (
      <div className="Signup__container">
        <div className="Signup">
          <h2 className="Signup__h2">Sign Up</h2>
          <form onSubmit={this.handler} className="Signup__form">
            <label className="Signup__label">Email:
              <input className="Signup__input" type="email" placeholder="you@example.com" ref="email"/>
            </label>
            <label className="Signup__label">Password:
              <input className="Signup__input" type="password" ref="password"/>
            </label>
            <input className="Signup__submit" type="submit" value="Sign Up"/>
          </form>
        </div>
      </div>
    );
  },

  handler: function(e) {
    e.preventDefault();
    var email = React.findDOMNode(this.refs.email).value;
    var password = React.findDOMNode(this.refs.password).value;
    React.findDOMNode(this.refs.email).value = '';
    React.findDOMNode(this.refs.password).value = '';

    // console.log('Trying to signup');
    // console.log('Email: ', email);
    // console.log('Password: ', password);

    auth.signup(email, password, function(loggedIn) {
      var transition;
      if (!loggedIn) {
        return this.setState({ error: true });
      }
      if (Signup.attemptedTransition) {
        transition = Signup.attemptedTransition;
        Signup.attemptedTransition = null;
        transition.retry();
      } else {
        this.replaceWith('/');
      }
    }.bind(this));
  },

});

module.exports = Signup;
