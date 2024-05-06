const { User, Post } = require('../models')
const { signToken, AuthenticationError } = require('../utils/auth')

const resolvers = {
    Query: {
        users: async () => {
            return await User.find({})
        },
        user: async (parent, { _id }) => {
            return await User.findById(_id)
        }
    },

    Mutation: {
        addUser: async (parent, { username, password, name }) => {
            return await User.create({ username, password, name })
        },
        editUser: async (parent, args, context) => {
            if (context.user) {
                return await User.findByIdAndUpdate(context.user._id, { args })
            }

            throw AuthenticationError
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
        addPost: async (parent, { userId, postText }, context) => {
            const post = await Post.create({
                user: userId,
                postText: postText
            })

            await User.findByIdAndUpdate(userId, { $push: { posts: post} })

            return post
        }
    }
}

module.exports = resolvers