// importing required modules
const mongoose = require(`mongoose`);



// defining system role schema
const systemRoleSchema = new mongoose.Schema({

  _id: {
    type: mongoose.Schema.Types.ObjectId
  },
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  name: {
    type: String,
    uppercase: true,
    trim: true,
    unique: true,
    default: null
  },
  description: {
    type: String,
    uppercase: true,
    trim: true,
    default: null
  },
  permissions: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: `SystemPermission`,
    default: []
  },
  isDeleted: {
    type: Boolean,
    default: false
  }

}, {

  timestamps: true

});



// exporting schema model as a module
module.exports = mongoose.model('SystemRole', systemRoleSchema, `system-roles`);