import Relay from 'react-relay';

class addTaskMutation extends Relay.Mutation {

  static fragments = {
    viewer: () => Relay.QL`
      fragment on User {
        tasks (first: 10) {
          edges
        }
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


  /*getOptimisticResponse() {
    return {
      // FIXME: totalCount gets updated optimistically, but this edge does not
      // get added until the server responds
      todoEdge: {
        node: {
          complete: false,
          text: this.props.text,
        },
      },
      viewer: {
        id: this.props.viewer.id,
        totalCount: this.props.viewer.totalCount + 1,
      },
    };*/

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

      getOptimisticResponse() {
    return {
      // FIXME: totalCount gets updated optimistically, but this edge does not
      // get added until the server responds
      todoEdge: {
        node: {
          complete: false,
          text: this.props.text,
        },
      },
      viewer: {
        id: this.props.viewer.id,
        totalCount: this.props.viewer.totalCount + 1,
      },
    };
  }
  }*/
