// importing required packages and modules
const mongoose = require(`mongoose`);

// Importing required constants
const { PRODUCT_ID_PREFIX, PRODUCT_ID_BASE_VALUE, PRODUCT_ID_PREFIX_CHARS } = require(`../../dependencies/config`);

// importing required schema models
const { updateLogSchema } = require(`./schemas/update-log.schema`);



// defining product schema
const productSchema = new mongoose.Schema({

  _id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  _productId: {
    type: String,
    immutable: true,
    uppercase: true,
    trim: true,
    unique: true
  },
  bottleSize: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  bottlePrice: {
    type: Number,
    trim: true
  },
  updateLogs: {
    type: [updateLogSchema]
  },
  isDeleted: {
    type: Boolean,
    default: false
  }

}, {

  timestamps: true

});



// Mongoose Middleware for custom id generator
productSchema.pre(`save`, async function () {

  // this code runs just before saving the document

  // this method auto-generates and returns _productId
  const generateProductId = async () => {

    // fetching last product
    const product = (await mongoose.model(`Product`).find().limit(1).sort(`-createdAt`).lean().exec())[0];

    // fetching the _productId of last product and storing it
    const productId = product ? parseInt(product._productId.substring(PRODUCT_ID_PREFIX_CHARS)) : PRODUCT_ID_BASE_VALUE;

    // calculating new product number
    const newProductId = productId + 1;

    // returning _productId to its caller
    return `${PRODUCT_ID_PREFIX}${newProductId}`;

  }

  this._productId = await generateProductId();

});



// exporting Model for product
module.exports = mongoose.model(`Product`, productSchema);