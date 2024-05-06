const typeDefs = `
type User {
    _id: ID
    username: String!
    password: String!
    name: String
    color: String
    avatar: String
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
    user: ID!
    postText: String!
    replies: [Response]
}

type Auth {
    token: ID
    user: User
}

type Query {
    users: [User]
    user(_id: ID!): User
}

type Mutation {
    addUser(username: String!, password: String!, name: String): User
    editUser(name: String, color: String, bio: String, avatar: String): User
    login(username: String!, password: String!): Auth
    addPost(userId: ID!, postText: String!): Post
}
`;

module.exports = typeDefs;