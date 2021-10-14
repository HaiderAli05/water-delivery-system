// importing required modules
const express = require(`express`);

// importing required middlewares
const { authenticateRequest } = require(`../middlewares/authentication.middleware`);
const { authorizeRequest } = require(`../middlewares/authorization.middleware`);
const { validateInput } = require(`../middlewares/input-validation.middleware`);

// importing required data validators
const { newSystemRoleSchema, allSystemRolesSchema, specificSystemRoleSchema, updateSpecificSystemRoleSchema, loginSpecificSystemRoleSchema } = require(`../../dependencies/input-validation-schemas/user.schemas.js`);

// importing required controllers
const { addSystemRole, getAllSystemRoles, fetchSpecificSystemRole, updateSystemRole, deleteSystemRole, loginUser } = require(`../controllers/user.controllers`);



// creating userRouter
const userRouter = express.Router();



// 1-> route to add a new user in the database
userRouter.post(`/register`, /*authenticateRequest, authorizeRequest,*/ validateInput(newSystemRoleSchema, `BODY`), addSystemRole);

// 1.1-> route to login a user
userRouter.post(`/login`, /*authenticateRequest, authorizeRequest,*/ validateInput(loginSpecificSystemRoleSchema, `BODY`), loginUser);

// 2-> route to fetch a specific user from database via _id
userRouter.get(`/:_id`, /*authenticateRequest, authorizeRequest,*/ validateInput(specificSystemRoleSchema, `PARAMS`), fetchSpecificSystemRole);

// 2.1-> route to fetch all users as an array from database
userRouter.get(`/`, /*authenticateRequest, authorizeRequest,*/ validateInput(allSystemRolesSchema, `NONE`), getAllSystemRoles);


// 3-> route to update a specific user in the database via _id
userRouter.patch(`/:_id`, /*authenticateRequest, authorizeRequest,*/ validateInput(specificSystemRoleSchema, `PARAMS`), validateInput(updateSpecificSystemRoleSchema, `BODY`), updateSystemRole);


// 4-> route to delete a specific systemRole from database via _id
userRouter.delete(`/:_id`, /*authenticateRequest, authorizeRequest,*/ validateInput(specificSystemRoleSchema, `PARAMS`), deleteSystemRole);



// exporting userRouter as a module
module.exports = userRouter;