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

  }

 
    onNewTaskSave = (text) => {

    relay.commitUpdate(
      new addTaskMutation({ viewer, text })
    );
  };

    _onTextInputSave = (text) => {
    const { relay, task } = this.props;

    this.setEditMode(false);

    relay.commitUpdate(
      new RenameTodoMutation({ task, text })
    );
  };


    setEditMode(isEditing) {
    this.setState({ isEditing });
  }

  
    renderTasks() {
    const { viewer, tasks } = this.props;

    return viewer.tasks.edges.map(({ node }) => (
      <div 
        key={node.id}
        viewer={viewer}
        Task={node}
      />
    ));
  }
  

 
  onKeyDown = (e) => {
    if (this.props.onCancel && e.keyCode === ESC_KEY_CODE) {
      this.props.onCancel();
    } else if (e.keyCode === ENTER_KEY_CODE) {
      this.commitChanges();
    }
  };
 
  onChange = (e) => {
    this.setState({ text: e.target.value });
  };

  onBlur = () => {
    if (this.props.commitOnBlur) {
      this.commitChanges();
    }
  };


   commitChanges() {
    const newText = this.state.text.trim();
    if (newText) {
      this.props.onSave(newText);
      this.setState({ text: '' });
    }
  }
  

	render () {	

    const { viewer, children, relay, text } = this.props;

		return (
			<div>

      <button>Add new task!</button>
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
         ${addTaskMutation.getFragment('viewer')}
      }`
  },
});

/* {this.renderTasks()}  


 tasks (
          first: 2147483647
        )
        {
          edges {
            node {
              id,
              ${Task.getFragment('task')},
            },
          },


*/