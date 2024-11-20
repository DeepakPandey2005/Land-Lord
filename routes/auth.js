const { signupValidation, loginValidation } = require('../authMiddleware/validation')
const { signup, login } = require('../controller/auth')

const router=require('express').Router()

router.post('/login',loginValidation,login);
router.post('/signup',signupValidation,signup);

module.exports=router