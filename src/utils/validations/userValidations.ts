// validations/userValidation.js
import { body } from 'express-validator';

const registerUserValidation = [
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First Name is required')
    .isLength({ min: 3 })
    .withMessage('First Name must be at least 3 characters long'),
  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last Name is required')
    .isLength({ min: 3 })
    .withMessage('Last Name must be at least 3 characters long'),
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 3, max: 12 })
    .withMessage(
      'Username must be at least 3 and not more than 12 characters long'
    ),
  body('isOnline')
    .trim()
    .isLength({ min: 3, max: 12 })
    .withMessage(
      'Is Online must be at least 3 and not more than 12 characters long'
    ),
  body('email')
    .trim()
    .notEmpty()
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .notEmpty()
    .withMessage('Password must be at least 6 characters long')
    .matches(/\d/)
    .withMessage('Password must contain at least one number'),
];

exports = {
  registerUserValidation,
};
