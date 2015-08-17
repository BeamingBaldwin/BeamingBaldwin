var React = require('react');
var Router = require('react-router');

var auth = require('../services/auth');

var Signin = React.createClass({
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
      <div className="Signin__container">
        <div className="Signin">
          <h2 className="Signin__h2">Login</h2>
          <form onSubmit={this.handler} className="Signin__form">
            <label className="Signin__label">Email:
              <input className="Signin__input" type="email" placeholder="you@example.com" ref="email"/>
            </label>
            <label className="Signin__label">Password:
              <input className="Signin__input" type="password" ref="password"/>
            </label>
            <input className="Signin__submit" type="submit" value="Login"/>
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

    // console.log('Trying to signin');
    // console.log('Email: ', email);
    // console.log('Password: ', password);

    auth.login(email, password, function(loggedIn) {
      var transition;
      if (!loggedIn) {
        return this.setState({error: true});
      }
      if (Signin.attemptedTransition) {
        transition = Signin.attemptedTransition;
        Signin.attemptedTransition = null;
        transition.retry();
      } else {
        this.replaceWith('/');
      }
    }.bind(this));
  },

});

module.exports = Signin;
