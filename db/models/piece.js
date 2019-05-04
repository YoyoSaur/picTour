/*
 * Piece: Contains piece information
 */

var { db, mongoose } = require('../mongoClient');

/**
 * Basic piece owned by collection owners
 */
var piece = new mongoose.Schema({
  piece_name: String,
  address: {
    street: String,
    postal_code: Number,
    state: String,
    country: String
  },
  collection_id: String,
  owner_id: String,
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