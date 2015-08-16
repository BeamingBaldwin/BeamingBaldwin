var React = require('react');
var ReactPropTypes = React.PropTypes;
var API = require('../utils/API');
var ThreadActionCreators = require('../actions/ThreadActionCreators');
var UserSelector = require('./UserSelector');

var ModifyParticipants = React.createClass({
  propTypes: {
    threadId: ReactPropTypes.string,
    doClose: ReactPropTypes.func,
  },

  componentDidMount: function() {
    UserSelector.setSelected(this.props.threadId);
  },

  render: function() {
    return (
      <div className="ModifyParticipantsForm">
        <h2>Add/Remove Participants</h2>
        <form
          className="ModifyParticipantsForm__form"
          onSubmit={this._handleSubmit}
        >
          <label className="ModifyParticipantsForm__label">Topic:
          </label>
          <input className="ModifyParticipantsForm__submit"
            type="submit"
            value="Save"
          />
          <UserSelector ref="UserSelector"/>
        </form>
      </div>
    );
  },

  _handleSubmit: function(e) {
    var participants = UserSelector.getSelected(this.refs.UserSelector);
    e.preventDefault();
    this.props.doClose();
  },
});

module.exports = ModifyParticipants;
