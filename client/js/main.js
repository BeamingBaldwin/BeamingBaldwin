var React = require('react');

var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var App = require('./components/App');
var Signup = require('./components/Signup');
var Signin = require('./components/Signin');
var Signout = require('./components/Signout');
var Splash = require('./components/Splash');
var SlickApp = require('./components/SlickApp');

var routes = (
  <Route handler={App} path="/">
    <Route name="signup" handler={Signup}/>
    <Route name="signin" handler={Signin}/>
    <Route name="signout" handler={Signout}/>
    <Route name="splash" handler={Splash}/>
    <Route name="app" path="/" handler={SlickApp}/>
  </Route>
);

Router.run(routes, function(Handler) {
  React.render(<Handler />, document.getElementById('react'));
});
