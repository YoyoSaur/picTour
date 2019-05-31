const { _, logger } = require('../required');
const { Owner } = require('../db/index');
const { get_owner_input, full_owner_output, create_owner_input } = require('../validation/owner');
const { get_owner } = require('../schemas/owner')

module.exports = [
  {
    method: 'post',
    path: '/owner',
    validation: {
      body: create_owner_input,
      response: full_owner_output
    },
    middleware: [],
    controller: async (req, res, next) => {
      let {
        owner_first_name,
        owner_last_name,
        collection_ids,
        piece_ids = []
      } = req.body;
      var owner = new Owner({
        owner_first_name,
        owner_last_name,
        collection_ids,
        piece_ids,
        date: Date.now()
      });
      owner.save();
      logger.info('Owner saved to database: ', owner);

      await res.json(owner);
      next();
    }
  },
  {
    method: 'get',
    path: '/owner',
    validation: {
      query: get_owner_input,
      response: full_owner_output
    },
    middleware: [],
    schema: get_owner,
    controller: async (req, res, next) => {
      let { owner_id } = req.query
      owner.findById(owner_id).then(
        (owner) => {
          req.responseBody =owner 
          res.json(owner)
          next()
        },
        (err) => {
          logger.error('owner not found', req.query);
          res.status(404).json({ message: 'owner_not_found' });
          next()
        })
    }
  },
  {
    method: 'delete',
    path: '/owner',
    validation: {
      query: get_owner_input,
      response: full_owner_output
    },
    middleware: [],
    schema: get_owner,
    controller: async (req, res, next) => {
      let { owner_id } = req.query
      owner.findByIdAndDelete(owner_id).then(
        (owner) => {
          if (owner === null) {
            logger.error('owner not found', req.query);
            res.status(404).json({ message: 'owner_not_found' });
            next()
          } else {
            req.responseBody = owner;
            res.json(owner)
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