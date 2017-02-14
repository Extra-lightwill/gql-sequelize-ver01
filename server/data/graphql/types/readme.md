Types:

Type = an object and its accompanying fields within the application 

const Post = new GraphQLObjectType({
  name: 'Post',
  description: 'Blog post',
  fields () {
    return {
      title: {
        type: GraphQLString,
        resolve (post) {
          return post.title;
        }
      },
      content: {
        type: GraphQLString,
        resolve (post) {
          return post.content;
        }
      },
      person: {
        type: Person,
        resolve (post) {
          return post.getPerson();
        }
      }
    };
  }
}); 