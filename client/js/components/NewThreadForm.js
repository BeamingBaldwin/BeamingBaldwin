var React = require('react');
var ReactPropTypes = React.PropTypes;
var API = require('../utils/API');
var ThreadActionCreators = require('../actions/ThreadActionCreators');

var NewThreadForm = React.createClass({
  propTypes: {
    threadProps: ReactPropTypes.object,
    doClose: ReactPropTypes.func,
  },
  getInitialState: function() {
    return {
      title: '',
      participants: localStorage.email || 'Bobby Tables',
    };
  },

  render: function() {
    return (
      <div className="NewThreadForm">
        <h2 className="NewThreadForm__h2">New Thread</h2>
        <form
          className="NewThreadForm__form"
          onSubmit={this._handleSubmit}
        >
          <label className="NewThreadForm__label">Topic:
            <input
              className="NewThreadForm__input"
              onChange={this._inputOnChangeTitle}
              ref="title"
              name="title"
              placeholder="Slick Title"
              type="text"
            />
          </label>
          <label className="NewThreadForm__label">Participants:
            <input
              className="NewThreadForm__input"
              onChange={this._inputOnChangeParticipants}
              ref="participants"
              name="participants"
              type="text"
              value={this.state.participants}
            />
          </label>
          <input className="NewThreadForm__submit"
            type="submit"
            value="Create"
          />
        </form>
      </div>
    );
  },

  _inputOnChangeTitle: function(e) {
    e.preventDefault();
    this.setState({
      title: e.target.value,
      participants: this.state.participants,
    });
  },

  _inputOnChangeParticipants: function(e) {
    e.preventDefault();
    this.setState({
      title: this.state.title,
      participants: e.target.value,
    });
  },

  _handleSubmit: function(e) {
    var title = this.state.title;
    var participants = this.state.participants.trim().split(' ');
    var threadInfo;
    e.preventDefault();

    if (!participants || !title) {
      console.error('You must provide a title and participants');
      return;
    }

    threadInfo = {
      participants: participants,
      title: title,
    };
    if (this.props.threadProps.parentId) {
      threadInfo.parentId = this.props.threadProps.parentId;
    }

    React.findDOMNode(this.refs.title).value = '';

    this.props.doClose();
    ThreadActionCreators.clickThread(API.addThread(threadInfo));
  },

});

module.exports = NewThreadForm;
