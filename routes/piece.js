var { Piece } = require('../db/index');

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
        price
      } = req.body;
      var piece = new Piece({
        piece_name,
        address,
        collection_id: null,
        owner_id: null,
        price,
        date: Date.now()
      })
      piece.save();
      console.log(piece)
      await res.json(piece);
      next()
    }
  },
  {
    method: 'get',
    path: '/piece',
    validation: {},
    middleware: [],
    controller: async (req, res, next) => {
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
        (piece) => {
          _.assign(piece, {piece_name, address, price})
            res.json(piece)
        },
        (err) => {
          console.log(err)
           res.status(404).json({ message: 'piece_not_found' });
        })
      piece.save()
      await res.json(piece)
      next()
    }
  }
]