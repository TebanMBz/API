const { validationResult } = require('express-validator')
const User = require('../models/users')

const validator = (req, res, next) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json(error)
    }
    next()
}

const validateDocument = async (document = '') => {
    const documentValidation = await User.findOne({ document })
    if (documentValidation) {
        throw new Error(`An user with the document: ${document} already exists`)
    }
}

const validateEmail = async (email = '') => {
    const emailValidation = await User.findOne({ email })
    if (emailValidation) {
        throw new Error(`An user with the email: ${email} already exists`)
    }
}

module.exports = {
    validator,
    validateDocument,
    validateEmail
}