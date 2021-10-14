// importing required modules
const express = require(`express`);

// importing required middlewares
const { authenticateRequest } = require(`../middlewares/authentication.middleware`);
const { authorizeRequest } = require(`../middlewares/authorization.middleware`);
const { validateInput } = require(`../middlewares/input-validation.middleware`);

// importing required data validators
const { newProductSchema, allProductsSchema, specificProductSchema, updateSpecificProductSchema } = require(`../../dependencies/input-validation-schemas/product.schemas`);

// importing required controllers
const { addSystemRole, getAllSystemRoles, fetchSpecificSystemRole, updateSystemRole, deleteSystemRole, loginUser } = require(`../controllers/product.controllers`);



// creating productRouter
const productRouter = express.Router();



// 1-> route to add a new user in the database
productRouter.post(`/addproduct`, /*authenticateRequest, authorizeRequest,*/ validateInput(newProductSchema, `BODY`), addSystemRole);


// 2-> route to fetch a specific user from database via _id
productRouter.get(`/:_id`, /*authenticateRequest, authorizeRequest,*/ validateInput(specificProductSchema, `PARAMS`), fetchSpecificSystemRole);

// 2.1-> route to fetch all users as an array from database
productRouter.get(`/`, /*authenticateRequest, authorizeRequest,*/ validateInput(allProductsSchema, `NONE`), getAllSystemRoles);


// 3-> route to update a specific user in the database via _id
productRouter.patch(`/:_id`, /*authenticateRequest, authorizeRequest,*/ validateInput(specificProductSchema, `PARAMS`), validateInput(updateSpecificProductSchema, `BODY`), updateSystemRole);


// 4-> route to delete a specific systemRole from database via _id
productRouter.delete(`/:_id`, /*authenticateRequest, authorizeRequest,*/ validateInput(specificProductSchema, `PARAMS`), deleteSystemRole);



// exporting productRouter as a module
module.exports = productRouter;