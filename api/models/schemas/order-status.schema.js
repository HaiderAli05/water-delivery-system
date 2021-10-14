// importing required packages and modules
const mongoose = require(`mongoose`);


// defining postal address schema
const orderStatusSchema = new mongoose.Schema({

  day: {
    type: Date
  },
  deliveryStatus: {
    type: String,
    trim: true
  },
  bottles: {
    type: Number,
    trim: true
  }

}, {

  _id: false

});



// exporting scheme as a module
module.exports = {

  orderStatusSchema

};