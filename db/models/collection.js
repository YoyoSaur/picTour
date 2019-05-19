/*
 * Collection: Contains place information and piece list
 */
const { _ } = require('../../required');
const { db, mongoose } = require('../mongoClient');
const { Piece } = require('../index');

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
  owner: { type: String, index: true }
});

/* 
 * collection.get_pieces: returns the pieces associated with collection
 */
collection.methods.get_pieces = function () {
  let ids = _.map(this.piece_ids, (id) => mongoose.Types.ObjectId(id));
  // uses the in mongo syntax to get all piece_ids associated with a collection
  return Piece.find({
    '_id': { $in: ids }
  }, (err, docs) => {
    console.log(docs, err);
    return docs
  });
}

var Collection = db.model('Collection', collection);

module.exports = Collection;