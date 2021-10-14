// importing required packages and modules
const mongoose = require(`mongoose`);
const bcrypt = require(`bcryptjs`);
const jwt = require(`jsonwebtoken`);
const { logWarning, logError } = require(`../helpers/console.helpers`);

// importing required config params
const { HTTP_STATUS_CODES: { SUCCESS, CREATED, BAD_REQUEST, UNAUTHORIZED, FORBIDDEN, NOT_FOUND, CONFLICT, SERVER_ERROR } } = require(`../config`);

// importing required data dependencies
const { ADMIN_KEY, DELIVERY_BOY_KEY, CUSTOMER_KEY } = require(`../credentials`);

// requiring required schemas
const User = require(`../../api/models/user.model`);



// this data service takes in system role data obj and _creator, saves system
// role in the local database and returns response to its caller
const saveSystemRole = async (systemRoleData, _creator) => {

  try {

    // creating an object to store new system role
    const newSystemRole = new User({

      _id: new mongoose.Types.ObjectId,
      // _creator,
      ...systemRoleData

    });

    // saving new system role in the database
    const result = await newSystemRole.save();

    // returning saved system role to its caller
    return {

      status: CREATED,
      data: result

    };

  } catch (error) {
    // this code runs in case of an error @ runtime

    // logging error messages to the console
    logError(`ERROR @ saveSystemRole -> system-role.services.js`, error);

    // checking if the error stems from duplicate value in database
    const isDuplicateError = error && error.code === 11000;

    // fetching fields which caused duplication error
    const duplicateErrorFields = (Object.keys(error.keyValue)).join(`, `);

    // setting value of status and description
    const [status, err] = [isDuplicateError ? CONFLICT : SERVER_ERROR, isDuplicateError ? `System role creation failed due to duplicate ${duplicateErrorFields}.` : `Unhandled exception occurred on the server.`];

    // returning response to indicate failure to its caller
    return {

      status,
      error: err

    };

  }

}

// Login a User
const loginUserServive = async (systemRoleData) => {

  try {

    const { email, password } = systemRoleData;

    // querying database for the requested User
    const result = await User.findOne({ email, isDeleted: false }).lean().exec();

    if (!result) {
      // this code runs in case email not found in database.

      return {

        status: BAD_REQUEST,
        error: `Wrong Credentials.`

      };
    }

    // Check if password is correct or not
    const correctPassword = await bcrypt.compare(password, result.password);

    // checking the result of the query
    if (!correctPassword) {

      // this code runs in case password is wrong

      return {

        status: BAD_REQUEST,
        error: `Wrong Credentials.`

      };


    } else {

      //This code will generate Token depending on User Role
      let token;
      let role = result.userRole;
      let userId = result._userId;

      if (role === `ADMIN`) {

        token = jwt.sign({ email, role, userId }, ADMIN_KEY, { expiresIn: `1h` });

      } else if (role === `DELIVERY_BOY`) {

        token = jwt.sign({ email, role, userId }, DELIVERY_BOY_KEY, { expiresIn: '1h' });

      } else {

        token = jwt.sign({ email, role, userId }, CUSTOMER_KEY, { expiresIn: '1h' });

      }

      // creating an obj to store query config params
      const configParams = {

        new: true,
        runValidators: true

      };

      let updateQuery = {
        token,
      };

      // querying database for the requested User
      const finalResult = await User.findOneAndUpdate({ email, isDeleted: false }, updateQuery, configParams).lean().exec();


      // returning fetched data to its caller
      return {

        status: SUCCESS,
        data: finalResult

      };

    }

  } catch (error) {
    // this code runs in case of an error @ runtime

    // loggine error messages to the console
    logError(`ERROR @ findSystemRoleById -> system-role.services.js`, error);

    // returning 'SERVER_ERROR' to indicate failure to its caller
    return {

      status: SERVER_ERROR,
      error: `Unhandled exception occurred on the server.`

    };

  }

}

// this data service takes in query scope, fetches all system roles stored in
// the database
const findSystemRoles = async (queryScope) => {

  try {

    // querying database for all system roles
    const result = await User.find({ isDeleted: false }).populate({ path: `_creator`, select: `fullName systemPermissions` }).select(queryScope).lean().exec();

    // returning saved system roles to its caller
    return {

      status: SUCCESS,
      data: result

    };

  } catch (error) {
    // this code runs in case of an error @ runtime

    // loggine error messages to the console
    logError(`ERROR @ findSystemRoles -> system-role.services.js`, error);

    // returning response to indicate failure to its caller
    return {

      status: SERVER_ERROR,
      error: `Unhandled exception occurred on the server.`

    };

  }

}

// this data service takes in system role id and query scope, fetches
// system role stored in the database
const findSystemRoleById = async (systemRole, queryScope) => {

  try {

    // querying database for the requested system role
    const result = await User.findOne({ _id: systemRole }).populate({ path: `_creator`, select: `fullName allowedSystemPermissions photo` }).select(queryScope).lean().exec();

    // checking the result of the query
    if (!result) {
      // this code runs in case query didn't return anything from database

      return {

        status: NOT_FOUND,
        error: `Requested data not found in database.`

      };


    }

    // returning fetched data to its caller
    return {

      status: SUCCESS,
      data: result

    };

  } catch (error) {
    // this code runs in case of an error @ runtime

    // loggine error messages to the console
    logError(`ERROR @ findSystemRoleById -> system-role.services.js`, error);

    // returning 'SERVER_ERROR' to indicate failure to its caller
    return {

      status: SERVER_ERROR,
      error: `Unhandled exception occurred on the server.`

    };

  }

}

// this data service takes in system role id, update data object and query
// scope, updates system role stored in the database according to the
// provided params and returns the updated system role.
const findSystemRoleByIdAndUpdate = async (systemRoleId, updateData, updateBy, queryScope) => {

  try {

    // fetching required data from incoming updateBy
    // const { _bearer, allowedSystemPermissions } = updateBy; TODO: uncomment this line

    const _bearer = new mongoose.Types.ObjectId

    // creating an obj to store query config params
    const configParams = {

      new: true,
      runValidators: true

    };

    let updateQuery = {};
    let updateLogs = []

    // looping through update data obj to parse it as required
    for (const attr in updateData) {

      // checking current attr and parsing data accordingly
      if (attr === `isDeleted`) {
        // this code runs in case current field is 'isDeleted'

        // adding change log in the database
        updateLogs.push({

          update: {

            field: attr,
            value: updateData[attr]

          },

          updatedBy: _bearer,
          updatedAt: Date.now()

        });





        // stopping the current loop
        break;

      } else {
        // this code runs in case current attr doesn't match any of
        // above

        if (typeof updateData[attr] == `object`) {

          // updateQuery[attr] = {}

          for (const subAttr in updateData[attr]) {

            updateQuery[attr + `.` + subAttr] = updateData[attr][subAttr]


            updateLogs.push({

              update: {

                field: `${attr} --> ${subAttr}`,
                value: updateData[attr][subAttr]

              },
              updatedBy: _bearer,
              updatedAt: Date.now()

            })

          }

        } else {
          // adding change log in the database

          updateQuery[attr] = updateData[attr]


          updateLogs.push({

            update: {

              field: attr,
              value: updateData[attr]

            },
            updatedBy: _bearer,
            updatedAt: Date.now()

          })


        }
      }

    }



    updateQuery[`$push`] = { [`updateLogs`]: { "$each": updateLogs } }

    // querying database for the requested User
    const result = await User.findOneAndUpdate({ _id: systemRoleId, isDeleted: false }, updateQuery, configParams).select(queryScope).lean().exec();


    // checking the result of the query
    if (!result) {
      // this code runs in case query didn't return anything from database

      return {

        status: NOT_FOUND,
        error: `Requested data not found in database.`

      };

    }

    // returning fetched student to its caller
    return {

      status: SUCCESS,
      data: result

    };

  } catch (error) {
    // this code runs in case of an error @ runtime

    // loggine error messages to the console
    logError(`ERROR @ findSystemRoleByIdAndUpdate -> system-role.services.js`, error);

    // checking if the error stems from duplicate value in database
    const isDuplicateError = error && error.code === 11000;

    // fetching fields which caused duplication error
    const duplicateErrorFields = (Object.keys(error.keyValue)).join(`, `);

    // setting value of status and description
    const [status, err] = [isDuplicateError ? CONFLICT : SERVER_ERROR, isDuplicateError ? `System role update failed due to duplicate ${duplicateErrorFields}.` : `Unhandled exception occurred on the server.`];

    // returning response to indicate failure to its caller
    return {

      status,
      error: err

    };

  }

}



// exporting controllers as modules
module.exports = {

  saveSystemRole,
  findSystemRoles,
  findSystemRoleById,
  findSystemRoleByIdAndUpdate,
  loginUserServive

};