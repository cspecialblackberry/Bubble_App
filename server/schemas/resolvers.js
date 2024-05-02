const {User, Post} = require('../models')

const resolvers = {
    Query: {
        users: async () => {
            return await User.find({}).clone()
        }
    },

    Mutation: {
        addUser: async (parent, {username, password, name}) => {
            return await User.create({username, password, name})
        }
    }
}

module.exports = resolvers