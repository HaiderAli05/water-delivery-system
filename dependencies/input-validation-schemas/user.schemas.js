// importing required packages and modules
const Joi = require(`joi`);

// importing required custom data validators
const { objectIdValidation } = require(`../helpers/joi.helpers`);



// defining validation schema for adding a new system role
const newSystemRoleSchema = Joi.object({

  userRole: Joi.string().min(3).required(),
  firstName: Joi.string().min(3).required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  password: Joi.string().required(),
  postalAddress: Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    zip: Joi.string().required()
  }),
  deliveryArea: Joi.string(),

});

// defining validation schema for fetching all system roles
const allSystemRolesSchema = null;

// defining validation schema for fetching a specific system role
const specificSystemRoleSchema = Joi.object({

  _id: Joi.string().custom(objectIdValidation, `User ID Validation`).required()

});

// defining validation schema for updating a specific system role
const updateSpecificSystemRoleSchema = Joi.object({

  userRole: Joi.string().min(3),
  firstName: Joi.string().min(3),
  lastName: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
  password: Joi.string(),
  postalAddress: Joi.object({
    street: Joi.string(),
    city: Joi.string(),
    state: Joi.string(),
    zip: Joi.string()
  }),
  deliveryArea: Joi.string(),

});

const loginSpecificSystemRoleSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

// exporting as modules
module.exports = {

  newSystemRoleSchema,
  allSystemRolesSchema,
  specificSystemRoleSchema,
  updateSpecificSystemRoleSchema,
  loginSpecificSystemRoleSchema

};