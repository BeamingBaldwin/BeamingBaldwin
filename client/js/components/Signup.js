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
      <div>
        <form>
            Email: <input type="email" placeholder="Please enter email" ref="email"/>
            Password: <input type="password" placeholder="Please enter password" ref="password"/>
            <input type="button" value="Signup" onClick={this.handler}/>
        </form>
      </div>
    );
  },

  handler: function() {
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
