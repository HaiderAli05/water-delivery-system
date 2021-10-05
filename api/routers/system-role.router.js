// importing required modules
const express = require(`express`);

// importing required middlewares
const { authenticateRequest } = require(`../middlewares/authentication.middleware`);
const { authorizeRequest } = require(`../middlewares/authorization.middleware`);
const { validateInput } = require(`../middlewares/input-validation.middleware`);

// importing required data validators
const { newSystemRoleSchema, allSystemRolesSchema, specificSystemRoleSchema, updateSpecificSystemRoleSchema } = require(`../../dependencies/input-validation-schemas/system-role.schemas`);

// importing required controllers
const { addSystemRole, getAllSystemRoles, fetchSpecificSystemRole, updateSystemRole, deleteSystemRole } = require(`../controllers/system-role.controllers`);



// creating router
const systemRoleRouter = express.Router();



// 1-> route to add a new system role in the database
systemRoleRouter.post(`/`, authenticateRequest, authorizeRequest, validateInput(newSystemRoleSchema, `BODY`), addSystemRole);

// 1-> route to fetch a specific system role from database via _id
// 2-> route to fetch all system roles as an array from database
systemRoleRouter.get(`/:systemRoleId`, authenticateRequest, authorizeRequest, validateInput(specificSystemRoleSchema, `PARAMS`), fetchSpecificSystemRole);
systemRoleRouter.get(`/`, authenticateRequest, authorizeRequest, validateInput(allSystemRolesSchema, `NONE`), getAllSystemRoles);

// 1-> route to update a specific system role in the database via _id
systemRoleRouter.patch(`/:systemRoleId`, authenticateRequest, authorizeRequest, validateInput(specificSystemRoleSchema, `PARAMS`), validateInput(updateSpecificSystemRoleSchema, `BODY`), updateSystemRole);

// 1-> route to delete a specific systemRole from database via _id
systemRoleRouter.delete(`/:systemRoleId`, authenticateRequest, authorizeRequest, validateInput(specificSystemRoleSchema, `PARAMS`), deleteSystemRole);



// exporting router as a module
module.exports = {

  systemRoleRouter

};