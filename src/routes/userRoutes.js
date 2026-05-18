const express = require('express')
const userController = require('../controller/userController')
const limiter = require('../middleware/rateLimiter')

const router = express.Router()
router.post('/register', userController.register)
router.post('/login', limiter, userController.login)

module.exports = router