const typeDefs = `
type Response {
    _id: ID
    user: String!
    responseText: String!
}

type Post {
    _id: ID
    user: String!
    postText: String!
    replies: [Response]
}

type User {
    _id: ID
    username: String!
    password: String!
    name: String
    color: String
    avatar: String
    bio: String
    posts: [Post]
    friends: [String]
}

type Auth {
    token: ID
    user: User
}

type Query {
    users: [User]
    user(_id: ID!): User
    posts: [Post]
    post: Post
}

type Mutation {
    addUser(username: String!, password: String!, name: String): User
    editUser(name: String, color: String, bio: String, avatar: String): User
    addFriend(userId: ID!, friendId: ID!): User
    removeFriend(userId: ID!, friendId: ID!): User
    login(username: String!, password: String!): Auth
    addPost(userId: ID!, postText: String!): Post
    deletePost(userId: ID!, postId: ID!): Post
}
`;

module.exports = typeDefs;