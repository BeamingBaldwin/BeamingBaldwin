var React = require('react');
var ReactPropTypes = React.PropTypes;
var UserSelectorStore = require('../stores/UserSelectorStore');
var UserSelectorItem = React.createClass({
  propTypes: {
    user: ReactPropTypes.object.isRequired,
  },

  getInitialState: function() {
    return {
      complete: UserSelectorStore.getUserState(this.props.user.id),
    };
  },

  componentDidMount: function() {
    UserSelectorStore.addChangeListener(function() {
      var state = UserSelectorStore.getUserState(this.props.user.id);
      this.setState({complete: state});
      this.refs.complete = state;
    }.bind(this));
  },

  render: function() {
    return (
      <li className="UserSelect__userli">
        <label className="UserSelect__userlabel">
          <input className="UserSelect__usercb"
            type="checkbox"
            ref="complete"
            onChange={this.toggle}
            defaultChecked={this.state.complete}
          />
          {this.props.user.name}
        </label>
      </li>
    );
  },

  componentDidUnmount: function() {
    UserSelectorStore.removeChangeListener();
  },

  toggle: function() {
    UserSelectorStore.updateUserState(this.props.user.id, !this.state.complete);
  },
});

module.exports = UserSelectorItem;
