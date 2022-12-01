const bcryptjs = require('bcryptjs')
const User = require('../models/users')
const { token } = require('../helpers/tokenJWT')

const postAuth = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                "ok": 400,
                "type": "Wrong email! Please try again.",
            })
        } else {
            const comparePassword = bcryptjs.compareSync(password, user.password)
            if (!comparePassword) {
                return res.status(400).json({
                    "ok": 400,
                    "type": "Wrong password! Please try again.",
                })
            } else {
                if (!user.status) {
                    return res.status(400).json({
                        "ok": 400,
                        "type": "Denied access! This user is not active",
                    })
                } else {
                    const userToken = await token(user.id, user.role, user.document)
                    if (userToken) {
                        res.json({
                            "ok": 200,
                            "type": "Successfully login!",
                            userToken
                        })
                    }

                }
            }
        }

        // const userAuth = () => {
        //     return new Promise(async (resolve, reject) => {
        //         const user = await User.findOne({ email })
        //         if (!user) {
        //             reject(res.status(400).json({
        //                 "ok": 400,
        //                 "type": "Wrong email!, please try again."
        //             }))
        //         } else {
        //             if (!user.status) {
        //                 reject(res.status(400).json({
        //                     "ok": 400,
        //                     "type": "This user is not active!"
        //                 }))
        //             } else {
        //                 resolve(userPassAuth(user))
        //             }
        //         }
        //     })
        // }
        // const userPassAuth = (user) => {
        //     return new Promise(async (resolve, reject) => {
        //         const comparePassword = bcryptjs.compareSync(password, user.password)
        //         if (!comparePassword) {
        //             reject(res.status(400).json({
        //                 "ok": 400,
        //                 "type": "Wrong password! Please try again."
        //             }))
        //         } else {
        //             resolve(res.json({
        //                 "ok": 200,
        //                 "type": "Successfully login!"
        //             }))
        //         }
        //     })
        // }
        // userAuth()
        //     .then(res => {
        //         return res
        //     })
        //     .then(res => {
        //         res
        //     })
        //     .catch(err => {
        //         err
        //     })
    } catch (error) {
        console.log('Authentication Error: ' + error)
    }
}

module.exports = { postAuth }