const express = require('express')
const router = express.Router()
const {
	register,
	activateEmail,
	login,
} = require('../controllers/controller.auth')
router.post('/register', register)
router.post('/activate', activateEmail)
router.post('/login', login)
module.exports = router
