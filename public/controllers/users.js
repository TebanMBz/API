const bcryptjs = require('bcryptjs')
const User = require('../models/users')

const getUser = async (req, res) => {
    const user = await User.find()
    res.json({
        "ok": 200,
        user
    })
}

const getUserById = async (req, res) => {
    const id = req.params.id
    const user = await User.find({ _id: id })
    res.json({
        "ok": 200,
        user
    })
}

const postUser = async (req, res) => {
    const data = req.body
    const user = new User(data)
    user.password = bcryptjs.hashSync(user.password, 10)
    await user.save()
    res.json({
        "ok": 200,
        "type": "User created successfully!"
    })
}

const putUser = async (req, res) => {
    const id = req.params.id
    const data = req.body
    if (data.password) {
        data.password = bcryptjs.hashSync(data.password, 10)
    }
    await User.findByIdAndUpdate(id, data)
    res.json({
        "ok": 200,
        "type": "User updated successfully!"
    })
}

const deleteUser = async (req, res) => {
    const id = req.params.id
    await User.findByIdAndDelete(id)
    res.json({
        "ok": 200,
        "type": "User deleted successfully!"
    })
}

module.exports = {
    getUser,
    getUserById,
    postUser,
    putUser,
    deleteUser
}