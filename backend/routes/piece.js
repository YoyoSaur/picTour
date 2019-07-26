const { _, logger } = require('../required');
const { Piece } = require('../db/index');
const { get_piece_input, full_piece_output, create_piece_input, put_piece_input } = require('../validation/piece');
const { get_piece } = require('../schemas/piece')

module.exports = [
  {
    method: 'post',
    path: '/piece',
    validation: {
      body: create_piece_input,
      response: full_piece_output
    },
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
      });
      piece.save();
      logger.info('Piece saved to database: ', piece);

      await res.json(piece);
      next();
    }
  },
  {
    method: 'put',
    path: '/piece',
    validation: {
      query: get_piece_input,
      body: create_piece_input,
      response: full_piece_output
    },
    middleware: [],
    controller: async (req, res, next) => {
      let {
        piece_id,
        piece_name,
        address,
        price,
        collection_id = null,
        owner_id = null,
      } = req.body;
      var piece = Piece.findByIdAndUpdate(piece_id, {
        piece_name,
        address,
        price,
        collection_id,
        owner_id
      });
      logger.info('Piece saved to database: ', piece);
      
      await res.json(piece);
      next();
    }
  },
  {
    method: 'get',
    path: '/piece',
    validation: {
      query: get_piece_input,
      response: full_piece_output
    },
    middleware: [],
    schema: get_piece,
    controller: async (req, res, next) => {
      let { piece_id } = req.query
      Piece.findById(piece_id).then(
        (piece) => {
          req.responseBody = piece
          res.json(piece)
          next()
        },
        (err) => {
          logger.error('Piece not found', req.query);
          res.status(404).json({ message: 'piece_not_found' });
          next()
        })
    }
  },
  {
    method: 'delete',
    path: '/piece',
    validation: {
      query: get_piece_input,
      response: full_piece_output
    },
    middleware: [],
    schema: get_piece,
    controller: async (req, res, next) => {
      let { piece_id } = req.query
      Piece.findByIdAndDelete(piece_id).then(
        (piece) => {
          if (piece === null) {
            logger.error('Piece not found', req.query);
            res.status(404).json({ message: 'piece_not_found' });
            next()
          } else {
            req.responseBody = piece;
            res.json(piece)
            next()
          }
        },
        (err) => {
          logger.error('Datbase Error: ', err);
          res.status(500).json({ message: 'database_error' });
          next()
        }
      )
    }
  }
]