var React = require('react');

var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var auth = require('../services/auth');
var API = require('../utils/API');

var App = React.createClass({

  getInitialState: function() {
    if (localStorage.email) API.login(localStorage.email);
    return {
      loggedIn: auth.loggedIn(),
    };
  },

  componentDidMount: function() {
    auth.onChange = this.setStateOnAuth;
    auth.login();
  },

  render: function() {
    var signinOrOut = this.state.loggedIn ?
      <Link to="signout">Logout</Link> :
      <Link to="signin">Login</Link>;

    var signupOrNothing = this.state.loggedIn ? <div/> : <li className="Nav__li--signUp"><Link to="/signup">Sign Up</Link></li>;

    return (
      <div className="App">
        <ul className="Nav">
          <li className="Nav__li--home"><Link to="/">Slck</Link></li>
          <li className="Nav__li--signInOut">{signinOrOut}</li>
          {signupOrNothing}
        </ul>
        <RouteHandler/>
      </div>
    );
  },

  setStateOnAuth: function(loggedIn) {
    this.setState({
      loggedIn: loggedIn,
    });
  },
});

module.exports = App;
