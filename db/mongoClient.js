var mongoose = require('mongoose');
var config = require('../config');
var db = mongoose.createConnection(config.get('MONGODB'));

module.exports = {mongoose, db}