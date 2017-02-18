import React from 'react';
import Relay from 'react-relay';

import addTaskMutation from './addTaskMutation';

const ENTER_KEY_CODE = 13;
const ESC_KEY_CODE = 27;

class TasksMain extends React.Component {

	 constructor( props )
  {
    super( props );

      this.state = {
      viewer: this.props.viewer,
      tasks: this.props.viewer.tasks,
      isEditing: false,
      text: this.props.initialValue || '',
    };

    this._onNewTaskSave = this._onNewTaskSave.bind(this);
    this._handleTextInputCancel = this._handleTextInputCancel.bind(this);
  }

 
    _onNewTaskSave = (text) => {

    this.props.relay.commitUpdate(
      new addTaskMutation({ viewer: this.props.viewer, text })
    );
  };

    /*_onTextInputSave = (text) => {
    const { relay, task } = this.props;

    this.setEditMode(false);

    relay.commitUpdate(
      new RenameTodoMutation({ task, text })
    );
  };*/


    _setEditMode(isEditing) {
    this.setState({ isEditing });
  }

  
    renderTasks() {
    const { viewer, tasks } = this.props;

    return viewer.tasks.edges.map(({ node }) => (
      <div 
        key={node.id}
        viewer={viewer}
        task={node}
      />
    ));
  }
  

 
  onKeyDown = (e) => {
    if (this._handleTextInputCancel && e.keyCode === ESC_KEY_CODE) {
      this._handleTextInputCancel();
    } else if (e.keyCode === ENTER_KEY_CODE) {
      this._onNewTaskSave();
    }
  };
 
  onChange = (e) => {
    this.setState({ text: e.target.value });
  };

  onBlur = () => {
    if (this.props.commitOnBlur) {
      this._onNewTaskSave();
    }
  };


   commitUpdate() {
    const newText = this.state.text.trim();
    if (newText) {
      this.setState({ text: '' });
    }
  }

    _handleTextInputCancel = () => {
    this._setEditMode(false);
  };
  

	render () {	

    const { viewer, children, relay, text } = this.props;

		return (
			<div>

      <button  onClick={this._onNewTaskSave}>Add new task!</button>
      <button>Edit task</button>

      <br />
      <br />


      <input 
        //{...this.props}
        placeholder="add a new task here"
        onKeyDown={this.onKeyDown}
        onChange={this.onChange}
        onBlur={this.onBlur}
        value={this.state.text}
      />
     
      <br />
      <br />

      <div>
      I am a list of tasks:
      
      <br />
      <br />

       {this.renderTasks()}

      </div>

      <div>
      TOTAL COUNT (TASKS): 
      </div>

    </div>

			)
	}
}

export default Relay.createContainer( TasksMain, {
  fragments: {
    viewer: () => Relay.QL`
    fragment on User {
       tasks (
          first: 2147483647
        )
        {
          edges
          },

         ${addTaskMutation.getFragment('viewer')}
      }`
  },
});

/* {this.renderTasks()}  */

