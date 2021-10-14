// importing required modules
const express = require(`express`);

// importing required middlewares
const { authenticateRequest } = require(`../middlewares/authentication.middleware`);
const { authorizeRequest } = require(`../middlewares/authorization.middleware`);
const { validateInput } = require(`../middlewares/input-validation.middleware`);

// importing required data validators
const { newOrderSchema, allOrdersSchema, specificOrderSchema, updateSpecificOrderSchema } = require(`../../dependencies/input-validation-schemas/order.shemas`);

// importing required controllers
const { addSystemRole, getAllSystemRoles, fetchSpecificSystemRole, updateSystemRole, deleteSystemRole, loginUser } = require(`../controllers/order.controllers`);



// creating orderRouter
const orderRouter = express.Router();



// 1-> route to add a new user in the database
orderRouter.post(`/addorder`, /*authenticateRequest, authorizeRequest,*/ validateInput(newOrderSchema, `BODY`), addSystemRole);


// 2-> route to fetch a specific user from database via _id
orderRouter.get(`/:_id`, /*authenticateRequest, authorizeRequest,*/ validateInput(specificOrderSchema, `PARAMS`), fetchSpecificSystemRole);

// 2.1-> route to fetch all users as an array from database
orderRouter.get(`/`, /*authenticateRequest, authorizeRequest,*/ validateInput(allOrdersSchema, `NONE`), getAllSystemRoles);


// 3-> route to update a specific user in the database via _id
orderRouter.patch(`/:_id`, /*authenticateRequest, authorizeRequest,*/ validateInput(specificOrderSchema, `PARAMS`), validateInput(updateSpecificOrderSchema, `BODY`), updateSystemRole);


// 4-> route to delete a specific systemRole from database via _id
orderRouter.delete(`/:_id`, /*authenticateRequest, authorizeRequest,*/ validateInput(specificOrderSchema, `PARAMS`), deleteSystemRole);



// exporting orderRouter as a module
module.exports = orderRouter;