/*
this is the main MutationType file 
it imports all the mutations from the mutations folder 
and combines them into a single root MutationType 
*/












//could look like (URB):

/*

import { GraphQLObjectType } from 'graphql'

import _mutations from '../../configuration/graphql/_mutations'


export default new GraphQLObjectType( {
  name: 'Mutation',
  fields: {..._mutations, },
} )

*/

//or 

/*

import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
} from 'graphql';

// Responses
import CreateUserResponse from '../responses/CreateUserResponse';
import LoginResponse from '../responses/LoginResponse';
import LikeProjectResponse from '../responses/LikeProjectResponse';

// Actions / Logic
import createUser from '../logic/createUser';
import login from '../logic/login';
import likeProject from '../logic/likeProject';
import dislikeProject from '../logic/dislikeProject';


const MutationType = new GraphQLObjectType({
    name: "Mutation",
    fields: () => ({
        createUser: {
            type: CreateUserResponse,
            args: {
                email: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                firstname: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                lastname: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                username: {
                    type: new GraphQLNonNull(GraphQLString)
                },
            },
            resolve: createUser,
        },
        login: {
            type: LoginResponse,
            args: {
                email: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                password: {
                    type: new GraphQLNonNull(GraphQLString)
                },
            },
            resolve: login,
        },
        likeProject: {
            type: LikeProjectResponse,
            args: {
                project: {
                    type: new GraphQLNonNull(GraphQLString)
                },
            },
            resolve: likeProject,
        },
        dislikeProject: {
            type: LikeProjectResponse,
            args: {
                project: {
                    type: new GraphQLNonNull(GraphQLString)
                },
            },
            resolve: dislikeProject,
        },
    }),
});

export default MutationType;

*/