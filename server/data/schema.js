/* eslint-disable no-unused-vars, no-use-before-define */

//https://github.com/mickhansen/graphql-sequelize/issues/227 

import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
  cursorForObjectInConnection
} from 'graphql-relay';

import {
  //User,
  Feature,
  getUser,
  getFeature,
  getFeatures,
  addFeature
} from './databaseRFSDRAFT';

//import instance of sequelize for node definitions

import Conn from './db/connection';

//import graphql-sequelize logic

import { resolver, 
          relay, 
          attributeFields,
          typeMapper 
} from 'graphql-sequelize';

//declare node definitions 

const { sequelizeConnection, sequelizeNodeInterface } = relay; 

const {
    nodeInterface,
    nodeField,
    nodeTypeMapper
  } = sequelizeNodeInterface(Conn);

//import models

import {
    User,
    Task,
    Project,
    ProjectUser,
} from './db/model';


//-----Type Mapping------//

nodeTypeMapper.mapTypes({
  [User.name]: { type: userType },
  [Task.name]: { type: taskType },
  viewer: { type: queryType }
});

/**
 * TYPES 
 */

const viewer = User.build({
        id: Math.ceil(Math.random() * 999)
      });

const userType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: globalIdField('User'),
    username: {
      type: GraphQLString,
      description: 'Users\'s username'
    },
    test01: {
      type: GraphQLString,
      description: 'User\'s website'
    },
    test02: {
      type: GraphQLString,
      description: 'User\'s website'
    },  
     website: {
      type: GraphQLString,
      description: 'User\'s website'
    },
      /*projects: {
        type: new GraphQLList(projectType),
        args: {
          limit: {
            type: GraphQLInt
          },
          order: {
            type: GraphQLString
          }
        },
        resolve: resolver(Project)
      },*/
      users: {
        type: new GraphQLList(userType),
        args: {
          limit: {
            type: GraphQLInt
          },
          order: {
            type: GraphQLString
          }
        },
        resolve: resolver(User)
      },
       tasks: {
            type: taskConnection.connectionType,
            args: taskConnection.connectionArgs,
            resolve: taskConnection.resolve
        },
})
});


const taskType = new GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    id: globalIdField('Task'),
    completed: {
      type: GraphQLBoolean
    },
    name: {
      type: GraphQLString
    },
    user: {
      type: userType,
      resolve: resolver(Task.User)
    },
    /*subTasks: {
      type: subtaskConnection.connectionType,
      args: connectionArgs,
      resolve: resolver(Task.SubTask)
    }*/
  }),
  interfaces: [nodeInterface]
});

/*const projectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: globalIdField('Project'),
    users: {
      type: userConnection.connectionType,
      args: connectionArgs,
      resolve: resolver(Project.Users)
    }
  }),
  interfaces: [nodeInterface]
});*/

const featureType = new GraphQLObjectType({
  name: 'Feature',
  description: 'Feature integrated in our starter kit',
  fields: () => ({
    id: globalIdField('Feature'),
    name: {
      type: GraphQLString,
      description: 'Name of the feature'
    },
    description: {
      type: GraphQLString,
      description: 'Description of the feature'
    },
    url: {
      type: GraphQLString,
      description: 'Url of the feature'
    }
  }),
  interfaces: [nodeInterface]
});


/**
 * CONNECTIONS 
 */

const { connectionType: featureConnection, edgeType: featureEdge } = connectionDefinitions({ name: 'Feature', nodeType: featureType });

/*const taskConnection = connectionDefinitions({name: 'Task', nodeType: taskType,}),  
      subordinateConnection = connectionDefinitions({name: 'Subordinate', nodeType: userType}), 
      subtaskConnection = connectionDefinitions({name: 'Subtask', nodeType: taskType}), 
      userConnection = connectionDefinitions({name: 'User', nodeType: userType});*/


const taskConnection = sequelizeConnection({
        name: Task.name,
        nodeType: taskType,
        target: User.Tasks,
});
/**
 * MUTATIONS 
 */


const addTaskMutation = mutationWithClientMutationId({
          name: 'addTask',
          inputFields: {
            title: {
              type: new GraphQLNonNull(GraphQLString)
            }
          },
          outputFields: () => ({
            viewer: {
              type: userType,
              resolve: (payload, {viewer}) => {
                return viewer;
              }
            },
            task: {
              type: taskType,
              resolve: (payload) => payload.Task
            },
            taskEdge: {
              type: taskConnection.edgeType,
              resolve: (payload) => taskConnection.resolveEdge(payload.Task)
            }
          }),
          mutateAndGetPayload: async ({title}, {viewer}) => {
            let Task = await this.Task.create({
              title: title,
              userId: viewer.id
            });

            return {
              task: Task
            };
          }
        });


const addFeatureMutation = mutationWithClientMutationId({
  name: 'AddFeature',
  inputFields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    url: { type: new GraphQLNonNull(GraphQLString) },
  },

  outputFields: {
    featureEdge: {
      type: featureEdge,
      resolve: (obj) => {
        const cursorId = cursorForObjectInConnection(getFeatures(), obj);
        return { node: obj, cursor: cursorId };
      }
    },
    viewer: {
      type: userType,
      resolve: resolver(User)
    },
  },

  mutateAndGetPayload: ({ name, description, url }) => addFeature(name, description, url)
});



/**
 * This is the type that will be the root of our query,
 * and the entry point into our schema.
 */

    const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
    viewer: {
      type: userType,
      resolve: () => viewer
    },
    node: nodeField,
    }
  })

/**
 * This is the type that will be the root of our mutations,
 * and the entry point into performing writes in our schema.
 */
const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addFeature: addFeatureMutation,
    addTask: addTaskMutation,
  })
});

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
export default new GraphQLSchema({
  query: queryType,
  mutation: mutationType
});







        





