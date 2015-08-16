var React = require('react');
var HeaderSection;
var Modal = require('react-modal');
var NewThreadForm = require('./NewThreadForm');
var ThreadStore = require('../stores/ThreadStore');
var API = require('../utils/API.js');
var ThreadActionCreators = require('../actions/ThreadActionCreators');
var ModifyParticipants = require('./ModifyParticipants');

var appElement = document.getElementById('react');
Modal.setAppElement(appElement);
Modal.injectCSS();

HeaderSection = React.createClass({
  getInitialState: function() {
    return {
      modalIsOpen: false,
      modifyParticipantsModalIsOpen: false,
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
          <button className="Modal__closeBtn" onClick={this._closeModal}>&times;</button>
          <NewThreadForm
            doClose={this._closeModal}
            threadProps={this.state.threadProps}
          />
        </Modal>

        <Modal
          isOpen={this.state.modifyParticipantsModalIsOpen}
          onRequestClose={this._closeModifyParticipantsModal}
        >
          <button onClick={this._closeModifyParticipantsModal}>Close</button>
          <ModifyParticipants
            doClose={this._closeModifyParticipantsModal}
            threadId={this.state.threadId}
          />
        </Modal>

      </header>
    );
  },

  // <button
  //   className="Header__modifyParticipantsBtn"
  //   onClick={this._openModifyParticipantsModal}
  // >
  //   Update Participants
  // </button>

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

  _openModifyParticipantsModal: function() {
    this.setState({
      modifyParticipantsModalIsOpen: true,
    });
  },

  _closeModal: function() {
    this.setState({modalIsOpen: false});
  },

  _closeModifyParticipantsModal: function() {
    this.setState({modifyParticipantsModalIsOpen: false});
  },

  _leaveThread: function() {
    var user = localStorage.email || 'Bobby Tables';
    API.removeUserFromThread(user, this.state.threadId);
    ThreadActionCreators.clickThread(ThreadStore.getParentThreadId());
  },
});

module.exports = HeaderSection;
