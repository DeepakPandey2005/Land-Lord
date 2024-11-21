const {
  signupValidation,
  loginValidation,
} = require("../authMiddleware/validation");
const { signup, login } = require("../controller/auth");

const router = require("express").Router();

router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);

module.exports = router;
