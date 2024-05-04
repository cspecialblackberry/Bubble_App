const typeDefs = `
type User {
    _id: ID
    username: String!
    password: String!
    name: String
    color: String
    bio: String
    posts: [ID]
    friends: [ID]
}

type Response {
    _id: ID
    user: [User]
    responseText: String!
}

type Post {
    _id: ID
    user: [User]
    postText: String!
    replies: [Response]
}

type Auth {
    token: ID
    user: User
}

type Query {
    users: [User]
}

type Mutation {
    addUser(username: String!, password: String!, name: String): User
    login(username: String!, password: String!): Auth
    addPost(postText: String!): Post
}
`;

module.exports = typeDefs;