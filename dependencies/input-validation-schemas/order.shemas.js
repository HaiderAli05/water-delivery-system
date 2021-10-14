// importing required packages and modules
const Joi = require(`joi`);

// importing required custom data validators
const { objectIdValidation } = require(`../helpers/joi.helpers`);



// defining validation schema for adding a new system role
const newOrderSchema = Joi.object({

  _customerId: Joi.string().custom(objectIdValidation, `Customer ID Validation`).required(),
  _deliveryBoyId: Joi.string().custom(objectIdValidation, `Delivery_Boy ID Validation`).required(),
  _productId: Joi.string().custom(objectIdValidation, `Product ID Validation`).required(),
  bottlesPerDay: Joi.number().required(),
  totalDays: Joi.number().required(),
  totalPrice: Joi.number().required(),
  discount: Joi.number().required(),
  netPrice: Joi.number().required(),
  orderStatus: Joi.object({
    deliveryStatus: Joi.string().required(),
    bottles: Joi.number().required()
  })

});

// defining validation schema for fetching all system roles
const allOrdersSchema = null;

// defining validation schema for fetching a specific system role
const specificOrderSchema = Joi.object({

  _id: Joi.string().custom(objectIdValidation, `User ID Validation`).required()

});

// defining validation schema for updating a specific system role
const updateSpecificOrderSchema = Joi.object({

  _customerId: Joi.string().custom(objectIdValidation, `Customer ID Validation`),
  _deliveryBoyId: Joi.string().custom(objectIdValidation, `Delivery_Boy ID Validation`),
  _productId: Joi.string().custom(objectIdValidation, `Product ID Validation`),
  bottlesPerDay: Joi.number(),
  totalDays: Joi.number(),
  totalPrice: Joi.number(),
  discount: Joi.number(),
  netPrice: Joi.number(),
  orderStatus: Joi.object({
    deliveryStatus: Joi.string(),
    bottles: Joi.number()
  })

});



// exporting as modules
module.exports = {

  newOrderSchema,
  allOrdersSchema,
  specificOrderSchema,
  updateSpecificOrderSchema

};