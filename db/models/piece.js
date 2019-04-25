/*
 * Piece: Contains piece information
 */

var { db, mongoose } = require('../mongoClient');

var piece = new mongoose.Schema({
  piece_id: String,
  piece_name: String,
  address: {
    street: String,
    postal_code: Number,
    state: String,
    country: String
  },
  collection_id: String,
  owner: String,
  price: Number,
  date: Date
});

piece.index({ owner: 1 })
/* 
 * piece.get_collection: returns the collection_id
 */
piece.methods.get_collection = function () {
  return this.collection_id;
}

var Piece = db.model('Piece', piece);

module.exports = Piece;