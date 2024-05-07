const { User, Post, Response } = require('../models')
const { signToken, AuthenticationError } = require('../utils/auth')
const { ObjectId } = require('mongodb')

const resolvers = {
    Query: {
        //all working
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
        //working
        addUser: async (parent, { username, password, name }) => {
            return await User.create({ username, password, name })
        },
        //not working
        editUser: async (parent, args, context) => {
            console.log(args)
            return await User.findByIdAndUpdate(args.userId, {$set: { ...args }})
        },
        //working
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
        //working
        addFriend: async (parent, { userId, friendId }) => {
            try {
                const friend = await User.findById(friendId)
                await User.findByIdAndUpdate(userId, { $push: { friends: friend._id } })
            } catch (err) {
                return err
            }
        },
        //working
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
        //working
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
            try {
                const user = await User.findById(userId)
                console.log(user)
                console.log(user.posts[0]._id.toString() === postId)
                const postIndex = user.posts.indexOf(user.posts.find((obj) => obj._id.toString() === postId))
                console.log(postIndex)
                user.posts.splice(postIndex, 1)
                console.log(user.posts)
                const update = User.findByIdAndUpdate(userId, { posts: user.posts })
                console.log('update', update._update)
                Post.findByIdAndDelete(postId)
            } catch (err) {
                console.error(err)
                return err
            }
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
            Post.findByIdAndUpdate(postId, {post})
            // Post.updateOne({
            //     _id: postId
            // }, {$push: {replies: {
            //     user: userId,
            //     responseText
            // }}})
        },
        deleteReply: async (parent, { postId, replyId }) => {

        }
    }
}

module.exports = resolvers