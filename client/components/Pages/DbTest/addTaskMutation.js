import Relay from 'react-relay';

class addTaskMutation extends Relay.Mutation {

  static fragments = {
    viewer: () => Relay.QL`
      fragment on User {
        tasks,
      }
    `,
  };

  getMutation() {
    return Relay.QL`
      mutation {addTask}`;
  }

  getVariables() {
    return {
      text: this.props.text,
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on addTaskPayload {
        viewer { 
          tasks,
        }
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'Task',
      edgeName: 'taskEdge',
      rangeBehaviors: {
        '': 'append',
      },
    }];
  }
}

export default addTaskMutation;


//RELAY EXAMPLE ADDTODO MUTATION


/*export default class AddTodoMutation extends Relay.Mutation {
  static fragments = {
    viewer: () => Relay.QL`
      fragment on User {
        id,
        totalCount,
      }
    `,
  };
  getMutation() {
    return Relay.QL`mutation{addTodo}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on AddTodoPayload {
        todoEdge,
        viewer {
          todos,
          totalCount,
        },
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'todos',
      edgeName: 'todoEdge',
      rangeBehaviors: {
        '': 'append',
        'status(any)': 'append',
        'status(active)': 'append',
        'status(completed)': 'ignore',
      },
    }];
  }
  getVariables() {
    return {
      text: this.props.text,
    };
  }*/
