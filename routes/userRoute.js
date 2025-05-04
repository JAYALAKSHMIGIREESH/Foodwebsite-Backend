const express = require('express')
const { loginUser, registerUser, adminLogin } = require('../controllers/userControllers');


const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)

module.exports = userRouter