const { Schema, model} = require('mongoose')
const {userSchema} = require('./User')

const responseSchema = new Schema({
    user: [{userSchema}],
    responseText: {
        type: String,
        required: true,
        max: [150, "Response must be 150 characters or less."]
    }
})

const postSchema = new Schema ({
    user: [{userSchema}],
    postText: {
        type: String,
        required: true,
        max: [150, "Post must be 150 characters or less."]
    },
    replies: [{responseSchema}]
})

const Post = model('Post', postSchema)

module.exports = {Post, postSchema}