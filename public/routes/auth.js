const { Router } = require('express')
const { check } = require('express-validator')
const { validator } = require('../middlewares/validations')
const { postAuth, } = require('../controllers/auth')
const router = Router()

router.post('/', [
    check('email', 'The email is necessary.').notEmpty(),
    check('email', 'Invalid email.').isEmail(),
    check('password', 'The password is necessary.').notEmpty(),
    check('password', 'Invalid password length.').isLength({ min: 8 }),
    validator
], postAuth)

module.exports = router