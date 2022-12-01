const mongoose = require('mongoose')

const mongoDBConnection = () => {
    try {
        mongoose.connect(process.env.CNN)
        console.log('Successfully connected!')
    } catch (error) {
        console.log('Connection error: ' + error)
    }
}

module.exports = { mongoDBConnection }