const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Query {
    user(id: ID!): User
    users: [User]
    usersByName(name: String!): [User]
    post(id: ID!): Post
    posts: [Post]
  }

  type Mutation {
    addUser(
      name: String!, 
      email: String!): User,
    updateUser(
      id: ID!, 
      name: String, 
      email: String): User,
    deleteUser(
      id: ID!): User,
    addFriend(
      currentUserID: ID!, 
      friendID: ID!): User,
    deleteFriend(
      currentUserID: ID!, 
      friendID: ID!): User,
    addPost(
      title: String!, 
      content: String!, 
      author: ID!): Post,
    updatePost(
      id: ID!, 
      title: String, 
      content: String): Post
    deletePost(
      id: ID!): Post
  }


  type User {
    _id: ID!
    name: String
    email: String
    posts: [Post]
    friends: [User]
  }

  type Post {
    _id: ID!
    title: String
    content: String
    author: User
  }
`);
