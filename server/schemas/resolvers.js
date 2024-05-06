const { User, Post } = require('../models')
const { signToken, AuthenticationError } = require('../utils/auth')
const { Mongoose } = require('mongoose')

const resolvers = {
    Query: {
        users: async () => {
            return await User.find({})
        },
        user: async (parent, { _id }) => {
            return await User.findById(_id)
        },
        posts: async () => {
            return await Post.find({})
        },
        post: async (parent, { _id }) => {
            return await Post.findById(_id)
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
        addFriend: async (parent, { userId, friendId }) => {
            try{
            const friend = await User.findById(friendId)
            await User.findByIdAndUpdate(userId, { $push: { friends: friend._id } })
            }catch(err){
                return err
            }
        },
        removeFriend: async (parent, { userId, friendId }) => {

        },
        addPost: async (parent, { userId, postText }, context) => {
            console.log({ userId, postText })
            const user = await User.findById(userId)
            console.log(user)
            try {
                const post = await Post.create({
                    user: user._id,
                    postText: postText
                })
                console.log({ post })
                await User.findByIdAndUpdate(userId, { $push: { posts: post } })

                return post
            } catch (err) {
                console.error(err)
                return err
            }


        },
        deletePost: async (parent, { userId, postId }) => {

        },
        addReply: async (parent, { postId, userId, responseText }) => {

        },
        deleteReply: async (parent, { postId, replyId }) => {

        }
    }
}

module.exports = resolvers