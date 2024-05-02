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
    _id
    user: [User]
    postText: String!
    replies: [Response]
}
`;

module.exports = typeDefs;