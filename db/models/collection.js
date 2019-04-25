/*
 * Collection: Contains place information and piece list
 */

var { db, mongoose } = require('../mongoClient');

var collection = new mongoose.Schema({
  collection_id: String,
  place_name: String,
  address: {
    street: String,
    postal_code: Number,
    state: String,
    country: String
  },
  piece_ids: [String],
  owner: String
});

collection.index({ owner: 1 })
/* 
 * collection.get_pieces: returns the piece_id list
 */
collection.methods.get_pieces = function () {
  return this.piece_ids;
}

var Collection = db.model('Collection', collection);

module.exports = Collection;