// importing required packages and modules
const mongoose = require(`mongoose`);

// importing required config params
// const { ALLOWED_ZIP_CODES } = require(`../../dependencies/config`);



// defining postal address schema
const postalAddressSchema = new mongoose.Schema({

  street: {
    type: String,
    trim: true
  },
  city: {
    type: String,
    trim: true
  },
  state: {
    type: String,
    uppercase: true,
    // maxlength: 2,
    trim: true
  },
  zip: {
    type: String,
    trim: true,
    // enum: ALLOWED_ZIP_CODES
  }

}, {

  _id: false

});



// exporting scheme as a module
module.exports = {

  postalAddressSchema

};