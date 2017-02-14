import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
} from 'graphql';

 const TodoType = new GraphQLObjectType({
    name: "Todo",
    description: 'A todo item',
    fields: () => ({
        id: globalIdField('Todo'),
        message: {
            type: GraphQLString,
        },
    }),
    interfaces: [nodeInterface]
});


export default TodoType;