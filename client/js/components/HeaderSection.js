var React = require('react');
var HeaderSection;
var Modal = require('react-modal');
var NewThreadForm = require('./NewThreadForm');
var ThreadStore = require('../stores/ThreadStore');
var api = require('../utils/API.js');
var ThreadActionCreators = require('../actions/ThreadActionCreators');


var appElement = document.getElementById('react');
Modal.setAppElement(appElement);
Modal.injectCSS();

HeaderSection = React.createClass({
  getInitialState: function() {
    return {
      modalIsOpen: false,
      threadId: ThreadStore.getCurrentThreadID() || '0',
    };
  },

  componentDidMount: function() {
    ThreadStore.addChangeListener(function() {
      this.setState({
        threadId: ThreadStore.getCurrentThreadID() || '0',
      });
    }.bind(this));
  },

  render: function() {
    return (
      <header className="Header">

        <button
          className="Header__newThreadBtn"
          onClick={this._openModal}
        >
          New Thread
        </button>

        <button
          className="Header__newChildThreadBtn"
          onClick={this._openModal}
          data="new"
        >
          New Child Thread
        </button>

        <button
          className="Header__leaveThreadBtn"
          onClick={this._leaveThread}
        >
          Leave Thread
        </button>

        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this._closeModal}
        >
          <button onClick={this._closeModal}>Close</button>
          <NewThreadForm
            doClose={this._closeModal}
            threadProps={this.state.threadProps}
          />
        </Modal>

      </header>
    );
  },

  _openModal: function(event) {
    var threadProps = {};
    if (event.target.getAttribute('data') === 'new') {
      threadProps.parentId = this.state.threadId;
    }
    this.setState({
      modalIsOpen: true,
      threadProps: threadProps,
    });
  },

  _closeModal: function() {
    this.setState({modalIsOpen: false});
  },

  _leaveThread: function() {
    var user = localStorage.email || 'Bobby Tables';
    api.removeUserFromThread(user, this.state.threadId);
    ThreadActionCreators.clickThread(ThreadStore.getParentThreadId());
  },
});

module.exports = HeaderSection;
