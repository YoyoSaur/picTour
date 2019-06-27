var convict = require('convict');
module.exports = convict({
  MONGODB: {
    default: "mongodb://mongo:27017/test",
    env: "MONGODB"
  }
})