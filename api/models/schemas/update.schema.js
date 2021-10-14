// importing required packages and modules
const mongoose = require(`mongoose`);



// defining update schema
const updateSchema = new mongoose.Schema({

  field: {
    type: String
  },
  value: {
    type: String
  }

}, {

  _id: false

});



// exporting schema as module
module.exports = {

  updateSchema

};