const { Schema, model} = require('mongoose')
const mongoose = require('mongoose')



const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    color: {
        type: String,
        validate: {
            validator: function (color) {
                return /^#(?:[0-9a-fA-F]{3}){1,2}$/g.test(color)
            },
            message: 'Something went wrong!'
        }
    },
    bio: {
        type: String,
        max: [150, "Bio must be less than 150 characters."]
    },
    posts: [],
    friends: [mongoose.ObjectId],
    })

    const User = model('User', userSchema)

    module.exports = {User}