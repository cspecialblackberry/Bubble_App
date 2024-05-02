const {User, Post} = require('../models')

const resolvers = {
    Query: {
        users: () => {
            return User.find({})
        }
    },

    Mutation: {
        addUser: (parent, {username, password, name}) => {
            return User.create({username, password, name})
        }
    }
}

module.exports = resolvers