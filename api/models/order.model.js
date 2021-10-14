// importing required packages and modules
const mongoose = require(`mongoose`);

// Import required schemas
const { orderStatusSchema } = require(`./schemas/order-status.schema`);
const { updateLogSchema } = require(`./schemas/update-log.schema`);

// Importing required constants
const { ORDER_ID_PREFIX, ORDER_ID_BASE_VALUE, ORDER_ID_PREFIX_CHARS } = require(`../../dependencies/config`);



// defining Order schema
const orderSchema = new mongoose.Schema({

  _id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  _orderId: {
    type: String,
    immutable: true,
    uppercase: true,
    trim: true,
    unique: true
  },
  _customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: `User`
  },
  _deliveryBoyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: `User`
  },
  _productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: `Product`
  },
  bottlesPerDay: {
    type: Number,
    trim: true
  },
  totalDays: {
    type: Number,
    trim: true
  },
  totalPrice: {
    type: Number,
    trim: true
  },
  discount: {
    type: Number,
    trim: true
  },
  netPrice: {
    type: Number,
    trim: true
  },
  orderDate: {
    type: Date
  },
  orderStatus: {
    type: [orderStatusSchema]
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
orderSchema.pre(`save`, async function () {

  // this code runs just before saving the document

  // this method auto-generates and returns _orderId
  const generateOrderId = async () => {

    // fetching last order
    const order = (await mongoose.model(`Order`).find().limit(1).sort(`-createdAt`).lean().exec())[0];

    // fetching the _orderId of last order and storing it
    const orderId = order ? parseInt(order._orderId.substring(ORDER_ID_PREFIX_CHARS)) : ORDER_ID_BASE_VALUE;

    // calculating new order number
    const newOrderId = orderId + 1;

    // returning _orderId to its caller
    return `${ORDER_ID_PREFIX}${newOrderId}`;

  }

  this._orderId = await generateOrderId();

});



// exporting Model for order
module.exports = mongoose.model(`Order`, orderSchema);