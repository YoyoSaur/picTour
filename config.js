var convict = require('convict');
module.exports = convict({
  MONGODB: {
    default: "mongodb://localhost/test",
    env: "MONGODB"
  }
})