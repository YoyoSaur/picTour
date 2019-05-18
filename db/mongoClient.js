var mongoose = require('mongoose');
var config = require('../config');
var db = mongoose.createConnection(config.get('MONGODB'), {useNewUrlParser: true});

module.exports = {mongoose, db}