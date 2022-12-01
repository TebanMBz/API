const jwt = require('jsonwebtoken')

const token = (id, role, document) => {
    return new Promise((resolve, reject) => {
        const payload = {
            id,
            role,
            document
        }
        jwt.sign(payload, process.env.SECRETKEY, {
            expiresIn: '30m'
        }, (err, token) => {
            if (err) {
                reject('Error while generating token!' + err)
            } else {
                resolve(token)
            }
        })
    })
}

module.exports = { token }