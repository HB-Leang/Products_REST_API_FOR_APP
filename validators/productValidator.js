import { body, param} from 'express-validator';

export const validateProduct = [
  
  body("name")
    .isString()
    .notEmpty()
    .withMessage("Name is required and must be a string")
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Name must be between 1 and 100 characters"),
  body("price")
    .isFloat({ min: 0 })
    .withMessage("Price must be a number greater than or equal to 0"),
  body("stock")
    .isInt({ min: 0 })
    .withMessage("Stock must be an integer greater than or equal to 0"),
];

export const validateParam = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('ID must be a positive integer')
    .toInt(),
];
