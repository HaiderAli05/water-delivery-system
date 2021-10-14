// importing required packages and modules
const Joi = require(`joi`);

// importing required custom data validators
const { objectIdValidation } = require(`../helpers/joi.helpers`);



// defining validation schema for adding a new system role
const newProductSchema = Joi.object({

  bottleSize: Joi.string().min(2).required(),
  description: Joi.string().min(3),
  bottlePrice: Joi.number().required()

});

// defining validation schema for fetching all system roles
const allProductsSchema = null;

// defining validation schema for fetching a specific system role
const specificProductSchema = Joi.object({

  _id: Joi.string().custom(objectIdValidation, `User ID Validation`).required()

});

// defining validation schema for updating a specific system role
const updateSpecificProductSchema = Joi.object({

  bottleSize: Joi.string().min(2),
  description: Joi.string().min(3),
  bottlePrice: Joi.number()

});



// exporting as modules
module.exports = {

  newProductSchema,
  allProductsSchema,
  specificProductSchema,
  updateSpecificProductSchema

};