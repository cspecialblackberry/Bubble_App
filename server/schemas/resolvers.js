const {User, Post} = require('../models')

const resolvers = {
    Query: {
        users: async () => {
            return await User.find({}).clone()
        }
    },

    Mutation: {
        addUser: (parent, {username, password, name}) => {
            return User.create({username, password, name})
        }
    }
}

module.exports = resolvers