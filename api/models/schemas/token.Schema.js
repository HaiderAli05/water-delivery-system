// importing required packages and modules
const mongoose = require(`mongoose`);



// defining token schema
const tokenSchema = new mongoose.Schema({

  token: {
    type: String
  },
  createdAt: {
    type: Date
  }

}, {

  _id: false

});



// exporting schema as module
module.exports = {

  tokenSchema

};