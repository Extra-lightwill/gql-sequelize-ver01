import React from 'react';
import Relay from 'react-relay';

import addTaskMutation from './addTaskMutation';

class TasksMain extends React.Component {

	 constructor( props )
  {
    super( props );

      this.state = {
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
    const { viewer } = this.props;

    return viewer.tasks.edges.map(({ node }) => (
      <div 
        key={node.id}
        viewer={viewer}
        task={node}
      />
    ));
  }
  

 
  onKeyDown = (e) => {
    if (this.props.onCancel && e.keyCode === keycode.codes.esc) {
      this.props.onCancel();
    } else if (e.keyCode === keycode.codes.enter) {
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
      <input 
        //{...this.props}
        placeholder="add a new task here"
        onKeyDown={this.onKeyDown}
        onChange={this.onChange}
        onBlur={this.onBlur}
        value={this.state.text}
        onSave={this.onNewTaskSave}
      >
      </input>

      <div>

       {this.renderTasks()}     
      
      </div>

      <div>
      TOTAL COUNT: 
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
