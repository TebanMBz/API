const { Router } = require('express')
const { check } = require('express-validator')
const { validator, validateDocument, validateEmail } = require('../middlewares/validations')
const { getUser, getUserById, postUser, putUser, deleteUser } = require('../controllers/users')
const router = Router()

router.get('/', getUser)

router.get('/:id', [
    check('id', "This user does not exist.").isMongoId(),
    validator
], getUserById)

router.post('/', [
    check('role', 'The role is necessary.').notEmpty(),
    check('role', 'Invalid role.').isIn(['employee', 'costumer']),
    check('document', 'The document is necessary.').notEmpty(),
    check('document', 'Invalid document.').isNumeric(),
    check('document', 'Invalid document length.').isLength({ min: 8, max: 10 }),
    check('document').custom(validateDocument),
    check('email', 'The email is necessary.').notEmpty(),
    check('email', 'Invalid email.').isEmail(),
    check('email').custom(validateEmail),
    check('password', 'The password is necessary.').notEmpty(),
    check('password', 'Invalid password length.').isLength({ min: 8 }),
    validator
], postUser)

router.put('/:id', [
    check('id', "This user does not exist.").isMongoId(),
    validator
], putUser)

router.delete('/:id', [
    check('id', "This user does not exist.").isMongoId(),
    validator
], deleteUser)

module.exports = router