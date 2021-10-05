// importing required packages and modules
const Joi = require(`joi`);

// importing required custom data validators
const { objectIdValidation } = require(`../helpers/input-validation.helpers`);



// defining validation schema for adding a new system role
const newSystemRoleSchema = Joi.object({

  name: Joi.string().min(1).required(),
  description: Joi.string().min(1),
  permissions: Joi.array().items(Joi.string().min(3)).required()

});

// defining validation schema for fetching all system roles
const allSystemRolesSchema = null;

// defining validation schema for fetching a specific system role
const specificSystemRoleSchema = Joi.object({

  systemRoleId: Joi.string().custom(objectIdValidation, `System Role ID Validation`).required()

});

// defining validation schema for updating a specific system role
const updateSpecificSystemRoleSchema = Joi.object({

  name: Joi.string().min(1).required(),
  description: Joi.string().min(1),
  permissions: Joi.array().items(Joi.string().min(3)).required()

});



// exporting as modules
module.exports = {

  newSystemRoleSchema,
  allSystemRolesSchema,
  specificSystemRoleSchema,
  updateSpecificSystemRoleSchema

};