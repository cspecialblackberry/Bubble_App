const { User, Post, Response } = require('../models')
const { signToken, AuthenticationError } = require('../utils/auth')
const { ObjectId } = require('mongodb')

const resolvers = {
    Query: {
        users: async () => {
            return await User.find({})
        },
        user: async (parent, { _id }) => {
            return await User.findById(_id)
        },
        posts: async () => {
            return await Post.find({}).populate("replies")
        },
        post: async (parent, { _id }) => {
            return await Post.findById(_id)
        },
        replies: async () => {
            return await Response.find({})
        }
    },

    Mutation: {
        addUser: async (parent, { username, password, name }) => {
            return await User.create({ username, password, name })
        },
        //INCOMPLETE
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
            try {
                const friend = await User.findById(friendId)
                await User.findByIdAndUpdate(userId, { $push: { friends: friend._id } })
            } catch (err) {
                return err
            }
        },
        removeFriend: async (parent, { userId, friendId }) => {
            try {
                const user = await User.findById(userId)
                const friendIndex = user.friends.indexOf(friendId)
                user.friends.splice(friendIndex, 1)
                const update = await User.updateOne({
                    _id: userId
                }, user)
            } catch (err) {
                return err
            }
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
        //not working
        deletePost: async (parent, { userId, postId }) => {
            const user = await User.findById(userId)
            console.log(user)
            console.log(user.posts[0]._id.toString()===postId)
            const postIndex = user.posts.indexOf(user.posts.find((obj) => obj._id.toString() === postId))
            console.log(postIndex)
            user.posts.splice(postIndex, 1)
            const update = User.updateOne({
                _id: new ObjectId(userId)
            }, user)
            Post.deleteOne({
                _id: postId
            })
        },
        //not working
        addReply: async (parent, { postId, userId, responseText }) => {
            const post = await Post.findById(postId)
            console.log(post)
            post.replies.push({
                user: userId,
                responseText
            })
            console.log(post)
            Post.updateOne({
                _id: postId
            }, post)
        },
        deleteReply: async (parent, { postId, replyId }) => {

        }
    }
}

module.exports = resolvers