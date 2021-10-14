// importing required data dependencies
const { DB_USERNAME, DB_PASSWORD } = require(`./credentials`);

// setting allowed app modes
const ALLOWED_APP_MODES = [`DEV`, `STAGE`, `PROD`];

// fetching app mode from environment
const APP_MODE = process.env.APP_MODE && ALLOWED_APP_MODES.includes(process.env.APP_MODE) ? process.env.APP_MODE : `PROD`;



// exporting config params as module
module.exports = {

  APP_MODE,

  NODE_PORT: 3000,

  API_BASE_URL: APP_MODE === `DEV` ? `http://localhost:3000` : APP_MODE === `STAGE` ? `https://www.staging.example.com` : `https://www.example.com`,

  MONGO_ATLAS_CONNECTION_URI: `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.3dftb.mongodb.net/${APP_MODE === `PROD` ? `prod-db-name` : `water-delivery-system`}?retryWrites=true&w=majority`,

  ALLOWED_APP_MODES,

  ALLOWED_MARITAL_STATUSES: [`SINGLE`, `MARRIED`, `DIVORCED`, `WIDOWED`, `COMPLICATED`],

  ALLOWED_GENDERS: [`MALE`, `FEMALE`, `NONBINARY`],

  ALLOWED_CUSTOM_ID_LENGTH: 8,

  HTTP_STATUS_CODES: {

    SUCCESS: 200,

    CREATED: 201,

    BAD_REQUEST: 400,

    UNAUTHORIZED: 401,

    FORBIDDEN: 403,

    NOT_FOUND: 404,

    CONFLICT: 409,

    SERVER_ERROR: 500

  },

  ALLOWED_VALIDATION_SCHEMA_SCOPES: {

    BODY: `BODY`,

    PARAMS: `PARAMS`,

    NONE: `NONE`

  },

  DEFAULT_RECORDS_PER_PAGE: 50,

  ALLOWED_MIN_PASSWORD_LENGTH: 8,

  MAX_FILE_SIZE_ALLOWED_BYTES: 1024 * 1024 * 10,

  ALLOWED_INCOMING_FILE_TYPES: [`jpg`, `jpeg`, `png`],

  JWT_EXPIRY_IN_SECONDS: 2592000, // 30 Days,

  //ADMIN
  ADMIN_ID_PREFIX: `AD`,

  ADMIN_ID_BASE_VALUE: 1000,

  ADMIN_ID_PREFIX_CHARS: 2,

  //DELIVERY_BOY
  DELIVERY_BOY_ID_PREFIX: `DB`,

  DELIVERY_BOY_ID_BASE_VALUE: 1000,

  DELIVERY_BOY_ID_PREFIX_CHARS: 2,

  //CUSTOMER
  CUSTOMER_ID_PREFIX: `CT`,

  CUSTOMER_ID_BASE_VALUE: 1000,

  CUSTOMER_ID_PREFIX_CHARS: 2,

  //PRODUCTS
  PRODUCT_ID_PREFIX: `PD`,

  PRODUCT_ID_BASE_VALUE: 1000,

  PRODUCT_ID_PREFIX_CHARS: 2,

  //PRODUCTS
  ORDER_ID_PREFIX: `OD`,

  ORDER_ID_BASE_VALUE: 1000,

  ORDER_ID_PREFIX_CHARS: 2

};