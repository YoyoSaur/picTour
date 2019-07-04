/*
 * Owner: Contains owner information
 */

var { db, mongoose } = require('../mongoClient');

var owner = new mongoose.Schema({
  owner_first_name: String,
  owner_last_name: String,
  collection_ids: [String],
  piece_ids: [String],
  date_created: Date
});

/* 
 * owner.get_collections: returns the collection_ids
 */
owner.methods.get_collections = function () {
  return this.collection_ids;
}

/* 
 * owner.get_pieces: returns the piece_ids
 */
owner.methods.get_pieces = function () {
  return this.piece_ids;
}

var Owner = db.model('Owner', owner);

module.exports = Owner;