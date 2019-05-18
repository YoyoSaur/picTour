const { Piece } = require('../db/index');
const { piece_input } = require('../validation/piece');

module.exports = [
  {
    method: 'post',
    path: '/piece',
    validation: {},
    middleware: [],
    controller: async (req, res, next) => {
      let {
        piece_name,
        address,
        price,
        collection_id = null,
        owner_id = null,
      } = req.body;
      var piece = new Piece({
        piece_name,
        address,
        collection_id,
        owner_id,
        price,
        date: Date.now()
      })
      piece.save();
      console.log('Inserting into database', piece)
      await res.json(piece);
      next()
    }
  },
  {
    method: 'get',
    path: '/piece',
    validation: {
      query: piece_input
    },
    middleware: [],
    controller: async (req, res, next) => {
      console.log('in handler')
      let { piece_id } = req.query
      Piece.findById(piece_id).then(
        async (piece) => {
          await res.json(piece)
          next()
        },
        (err) => {
          console.log(err)
          res.status(404).json({ message: 'piece_not_found' });
          next()
        })
    }
  },
  {
    method: 'put',
    path: '/piece',
    validation: {},
    middleware: [],
    controller: async (req, res, next) => {
      let {
        piece_id,
        piece_name,
        address,
        price
      } = req.body;
      Piece.findById(piece_id).then(
        async (piece) => {
          _.assign(piece, { piece_name, address, price })
          piece.save()
          await res.json(piece)
          next()
        },
        async (err) => {
          console.log(err)
          await res.status(404).json({ message: 'piece_not_found' });
        })
    }
  }
]