/*
this is the main QueryType file 
it imports all the types from the objectTypes folder 
and combines them into a single root QueryType 

declare args - fields that can be queried on particular object types 
*/









//could look like (URB):

/*
export default new GraphQLObjectType( {
  name: "Query",
  fields: () => ( {
    node: {
      type: NodeInterface,
      args: {
        id: { type: new GraphQLNonNull( GraphQLID ) }
      },
      resolve: resolveNodeField
    },
    Viewer: {
      type: ViewerType,
      resolve: ( parent, args, context, { rootValue: objectManager } ) => objectManager.getOneObject( 'User', { id: objectManager.getViewerUserId() } )
    },
  } )
} )*/

//or 

/* (PRO-COLLAB)

import {
    GraphQLObjectType,
    GraphQLList,
    GraphQLBoolean,
    GraphQLString,
    GraphQLInt,
} from 'graphql';

import { resolver } from 'graphql-sequelize';

import { Users, Projects, Privacies } from '../model';

import checkPermission from '../logic/checkPermission';
import UserType from './UserType';
import ProjectType from './ProjectType';

const QueryType = new GraphQLObjectType({
    name: "Query",
    fields: () => ({
        isLoggedIn: {
            type: GraphQLBoolean,
            resolve: (root, args, { viewer }) => {
                return checkPermission(viewer);
            }
        },
        me: {
            type: UserType,
            resolve: (root, args, context, info) => {
                if(!checkPermission(context.viewer)) {
                    return null;
                }
                return resolver(Users, {
                    before: (options, args, { viewer }) => {
                        return Object.assign(options, {
                            where: {
                                id: viewer.id
                            },
                        });
                    }
                })(root, args, context, info);
            },
        },
        users: {
            type: new GraphQLList(UserType),
            args: {
                id: {type: GraphQLInt},
                username: {type: GraphQLString},
                firstname: {type: GraphQLString},
                lastname: {type: GraphQLString},
                order: {type: GraphQLString},
                limit: {type: GraphQLInt},
            },
            resolve: resolver(Users),
        },
        projects: {
            type: new GraphQLList(ProjectType),
            args: {
                id: {type: GraphQLInt},
                title: {type: GraphQLString},
                privacy: {type: GraphQLString},
                collaboratorsNeeded: {type: GraphQLBoolean},
                order: {type: GraphQLString},
                limit: {type: GraphQLInt},
            },
            resolve: resolver(Projects, {
                before: (options, args) => {
                    let projectsWhere = {};
                    if (args.collaboratorsNeeded !== undefined) {
                        projectsWhere.collaboratorsNeeded = args.collaboratorsNeeded ? { $gt: 0 } : 0;
                    }

                    let privaciesWhere = {};
                    if (args.privacy !== undefined) {
                        privaciesWhere.name = args.privacy;
                    }

                    return Object.assign(options, {
                        where: {
                            ...options.where,
                            ...projectsWhere
                        },
                        include: args.privacy !== undefined ? [{
                            model: Privacies,
                            where: privaciesWhere
                        }] : null
                    });
                }
            }),
        },
    }),
});

export default QueryType;

*/