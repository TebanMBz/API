const { Schema, model } = require('mongoose')

const userModel = new Schema({
    "role": {
        type: String,
        required: ['The role is necessary']
    },
    "document": {
        type: String,
        required: ['The document is necessary'],
        unique: true
    },
    "email": {
        type: String,
        required: ['The email is necessary'],
        unique: true
    },
    "password": {
        type: String,
        required: ['The password is necessary']
    },
    "status": {
        type: Boolean,
        default: true
    }
})

module.exports = model('user', userModel)