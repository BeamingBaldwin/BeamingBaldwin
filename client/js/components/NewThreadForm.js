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
              ref="title"
              name="title"
              placeholder="Slick Title"
              type="text"
            />
          </label>
          <label className="NewThreadForm__label">Participants:
            <input
              className="NewThreadForm__input"
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

  _inputOnChange: function(e) {
    this.setState({participants: e.target.value});
  },

  _handleSubmit: function(e) {
    var title = React.findDOMNode(this.refs.title).value.trim();
    var participants = React.findDOMNode(this.refs.participants).value.trim().split(' ');
    // var participants = UserSelector.getSelected(this.refs.UserSelector);
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
