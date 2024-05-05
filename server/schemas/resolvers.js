const { User, Post } = require('../models')
const { signToken, AuthenticationError } = require('../utils/auth')

const resolvers = {
    Query: {
        users: async () => {
            return await User.find({})
        }
    },

    Mutation: {
        addUser: async (parent, { username, password, name }) => {
            return await User.create({ username, password, name })
        },
        editUser: async (parent, args, context) => {
            // return await User.findByIdAndUpdate(context.user._id, {args})
            return context
        },
        login: async (parent, { username, password }) => {
            const user = await User.findOne({ username });

            if (!user) {
                throw AuthenticationError;
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(user);

            return { token, user };
        },
        addPost: async (parent, args, context) => {
            if (context.user) {
                const post = await Post.create(args)

                await User.findByIdAndUpdate(context.user._id, {$push: {posts: post}})

                return post
            }
            
            throw AuthenticationError
        }
    }
}

module.exports = resolvers