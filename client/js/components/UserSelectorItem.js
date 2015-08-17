var React = require('react');
var ReactPropTypes = React.PropTypes;
var UserSelectorStore = require('../stores/UserSelectorStore');
var UserSelectorActions = require('../actions/UserSelectorActions');

var UserSelectorItem = React.createClass({
  propTypes: {
    user: ReactPropTypes.object.isRequired,
  },

  // componentDidMount: function() {
  //   UserSelectorStore.addChangeListener(this._change);
  // },

  render: function() {
    var user = this.props.user;
    return (
      <li className="UserSelect__li">
        <label className="UserSelect__label">
          <input className="UserSelect__checkbox"
            type="checkbox"
            onChange={this.toggle}
            checked={user.selected}
          />
          {user.name}
        </label>
      </li>
    );
  },

  // componentDidUnmount: function() {
  //   UserSelectorStore.removeChangeListener(_change);
  // },

  toggle: function() {
    UserSelectorActions.toggle(this.props.user);
  },

  // _change: function() {
  //   var state = UserSelectorStore.getUserState(this.props.user.id);
  //   console.log('state', state);
  //   // this.setState({selected: state});
  //   // this.refs.selected = state;
  //   window.__usi = this;
  // },
});

module.exports = UserSelectorItem;
