const Joi = require("joi");

const signupValidation = (req, res, next) => {
  try {
    const schema = Joi.object({
      name: Joi.string().min(3).max(100).required().messages({
        "string.base": "Name must be a string",
        "string.empty": "Name is required",
        "string.min": "Name must be at least 3 characters long",
        "string.max": "Name must be less than or equal to 100 characters",
        "any.required": "Name is required",
      }),
      email: Joi.string().email().required().messages({
        "string.base": "Email must be a string",
        "string.empty": "Email is required",
        "string.email": "Email must be a valid email address",
        "any.required": "Email is required",
      }),
      password: Joi.string().min(8).max(15).required().messages({
        "string.base": "Password must be a string",
        "string.empty": "Password is required",
        "string.min": "Password must be at least 8 characters long",
        "string.max": "Password must be less than or equal to 15 characters",
        "any.required": "Password is required",
      }),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      // Return a user-friendly error response
      return res.status(400).json({
        success: false,
        message: error.details[0].message, // First validation error message
      });
    }

    next(); // Proceed to the next middleware/controller
  } catch (err) {
    // Handle unexpected server errors
    res.status(500).json({
      success: false,
      message: "Internal Server Error !",
    });
  }
};

const loginValidation = (req, res, next) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required().messages({
        "string.base": "Email must be a string",
        "string.empty": "Email is required",
        "string.email": "Email must be a valid email address",
        "any.required": "Email is required",
      }),
      password: Joi.string().min(8).max(15).required().messages({
        "string.base": "Password must be a string",
        "string.empty": "Password is required",
        "string.min": "Password must be at least 8 characters long",
        "string.max": "Password must be less than or equal to 15 characters",
        "any.required": "Password is required",
      }),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message, // First validation error
      });
    }

    next();
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { signupValidation, loginValidation };
