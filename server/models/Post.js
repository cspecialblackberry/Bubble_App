const { Schema, model} = require('mongoose')
const Mongoose = require('mongoose')

const responseSchema = new Schema({
    user: [Mongoose.ObjectId],
    responseText: {
        type: String,
        required: true,
        max: [150, "Response must be 150 characters or less."]
    }
})

const postSchema = new Schema ({
    user: [Mongoose.ObjectId],
    postText: {
        type: String,
        required: true,
        max: [150, "Post must be 150 characters or less."]
    },
    replies: [{responseSchema}]
})

const Post = model('Post', postSchema)

module.exports = {Post, postSchema}