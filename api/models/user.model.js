// importing required packages and modules
const mongoose = require(`mongoose`);
const bcrypt = require(`bcryptjs`);


// importing required schema models
const { postalAddressSchema } = require(`./schemas/postal-address.schema`);
// const { noteSchema } = require(`./note.schema`);
const { updateLogSchema } = require(`./schemas/update-log.schema`);
const { tokenSchema } = require(`./schemas/token.Schema`);

// // Importing required constants
const {
  ADMIN_ID_PREFIX, ADMIN_ID_BASE_VALUE, ADMIN_ID_PREFIX_CHARS,
  DELIVERY_BOY_ID_PREFIX, DELIVERY_BOY_ID_BASE_VALUE, DELIVERY_BOY_ID_PREFIX_CHARS,
  CUSTOMER_ID_PREFIX, CUSTOMER_ID_BASE_VALUE, CUSTOMER_ID_PREFIX_CHARS
} = require(`../../dependencies/config`);



// defining User schema
const userSchema = new mongoose.Schema({

  _id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  _userId: {
    type: String,
    immutable: true,
    uppercase: true,
    trim: true,
    unique: true
  },
  userRole: {
    type: String,
    uppercase: true,
    trim: true
  },
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true
  },
  phone: {
    type: String,
    trim: true
  },
  password: {
    type: String,
    trim: true
  },
  postalAddress: {
    type: postalAddressSchema
  },
  updateLogs: {
    type: [updateLogSchema]
  },
  token: {
    type: String,
    trim: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  }

}, {

  timestamps: true

});



// Mongoose Middleware for custom id generator
userSchema.pre(`save`, async function () {

  // this code runs just before saving the document

  // this method auto-generates and returns _userId
  const generateAdminId = async () => {

    // fetching last user
    const user = (await mongoose.model(`User`).find({ userRole: `ADMIN` }).limit(1).sort(`-createdAt`).lean().exec())[0];

    // fetching the _userId of last user and storing it
    const userId = user ? parseInt(user._userId.substring(ADMIN_ID_PREFIX_CHARS)) : ADMIN_ID_BASE_VALUE;

    // calculating new user number
    const newUserId = userId + 1;

    // returning _userId to its caller
    return `${ADMIN_ID_PREFIX}${newUserId}`;

  }

  const generateDeliveryBoyId = async () => {

    // fetching last user
    const user = (await mongoose.model(`User`).find({ userRole: `DELIVERY_BOY` }).limit(1).sort(`-createdAt`).lean().exec())[0];

    // fetching the _userId of last user and storing it
    const userId = user ? parseInt(user._userId.substring(DELIVERY_BOY_ID_PREFIX_CHARS)) : DELIVERY_BOY_ID_BASE_VALUE;

    // calculating new user number
    const newUserId = userId + 1;

    // returning _userId to its caller
    return `${DELIVERY_BOY_ID_PREFIX}${newUserId}`;

  }

  const generateCustomerId = async () => {

    // fetching last user
    const user = (await mongoose.model(`User`).find({ userRole: `CUSTOMER` }).limit(1).sort(`-createdAt`).lean().exec())[0];

    // fetching the _userId of last user and storing it
    const userId = user ? parseInt(user._userId.substring(CUSTOMER_ID_PREFIX_CHARS)) : CUSTOMER_ID_BASE_VALUE;

    // calculating new user number
    const newUserId = userId + 1;

    // returning _userId to its caller
    return `${CUSTOMER_ID_PREFIX}${newUserId}`;

  }

  if (this.userRole == "ADMIN") {

    //If UserRole is ADMIN then this code will run
    this._userId = await generateAdminId();

  } else if (this.userRole == "DELIVERY_BOY") {

    //If UserRole is DELIVERY_BOY then this code will run
    this._userId = await generateDeliveryBoyId();

  } else {

    //If UserRole is CUSTOMER then this code will run
    this._userId = await generateCustomerId();

  }

  // this code will convert plain password into hash password
  this.password = await bcrypt.hash(this.password, 10);

});



// exporting Model for User
module.exports = mongoose.model(`User`, userSchema);