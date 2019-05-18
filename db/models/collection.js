/*
 * Collection: Contains place information and piece list
 */
var { db, mongoose } = require('../mongoClient');
var { Piece } = require('../index')

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
  owner: {type: String, index: true}
});

/* 
 * collection.get_pieces: returns the piece_id list
 */
collection.methods.get_pieces = function () {
  return Piece.findById([this.piece_ids])
}

var Collection = db.model('Collection', collection);

module.exports = Collection;