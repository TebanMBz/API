const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const { mongoDBConnection } = require('../public/config/connection')

class Server {
    constructor() {
        this.app = express()
        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.app.use(express.static('public'))
        this.app.use(express.json())
        this.app.use(cors())
        this.connection()
    }

    connection() {
        mongoDBConnection()
    }

    routes() {
        this.app.use('/api/auth/', require('../public/routes/auth'))
        this.app.use('/api/users/', require('../public/routes/users'))
    }

    listen() {
        this.app.listen(process.env.PORT)
        console.log('Program running on: http://localhost:' + process.env.PORT);
    }
}

module.exports = Server