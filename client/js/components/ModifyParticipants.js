var React = require('react');
var ReactPropTypes = React.PropTypes;
var API = require('../utils/API');
var UserSelector = require('./UserSelector');
var UserSelectorStore = require('../stores/UserSelectorStore');

var ModifyParticipants = React.createClass({
  propTypes: {
    thread: ReactPropTypes.object.isRequired,
    doClose: ReactPropTypes.func.isRequired,
  },

  componentDidMount: function() {
    UserSelector.setSelected(this.props.thread.threadId);
  },

  render: function() {
    console.log('thread', this.props.thread);
    return (
      <div className="ModifyParticipants">
        <h2>Add/Remove Participants</h2>
        <form
          className="ModifyParticipants__form"
          onSubmit={this._handleSubmit}
        >
          <h3 className="ModifyParticipants__h3">{this.props.thread && this.props.thread.title}
          </h3>
          <UserSelector />
          <input className="ModifyParticipants__submit"
            type="submit"
            value="Save"
          />
        </form>
      </div>
    );
  },

  _handleSubmit: function(e) {
    var participants = UserSelectorStore.getSelected();
    e.preventDefault();
    API.updateParticipants(this.props.thread, participants);
    this.props.doClose();
    // return false;
  },
});

module.exports = ModifyParticipants;
