// importing required packages and modules
const mongoose = require(`mongoose`);

// importing required schemas
const { updateSchema } = require(`./update.schema`);



// defining update log schema
const updateLogSchema = new mongoose.Schema({

  update: {
    type: updateSchema
  },
  updatedBy: {
    type: mongoose.Schema.ObjectId,
    ref: `User`
  },
  updatedAt: {
    type: Date
  }

}, {

  _id: false

});



// exporting schema as module
module.exports = {

  updateLogSchema

};