const { _, logger } = require('../required');
const { Collection } = require('../db/index');
const { get_collection_input, full_collection_output, create_collection_input, put_collection_input } = require('../validation/collection');
const { get_collection } = require('../schemas/collection')

module.exports = [
  {
    method: 'post',
    path: '/collection',
    validation: {
      body: create_collection_input,
      response: full_collection_output
    },
    middleware: [],
    controller: async (req, res, next) => {
      let {
        name,
        address,
        piece_ids,
        owner_id
      } = req.body;
      var collection = new Collection({
        name,
        address,
        piece_ids,
        owner_id
      });
      collection.save();
      logger.info('Owner saved to database: ', collection);

      await res.json(collection);
      next();
    }
  },
  {
    method: 'put',
    path: '/collection',
    validation: {
      body: put_collection_input,
      response: full_collection_output
    },
    middleware: [],
    controller: async (req, res, next) => {
      let {
        collection_id,
        name,
        address,
        piece_ids,
        owner_id
      } = req.body;
      var owner = Collection.findByIdAndUpdate(collection_id, {
        name,
        address,
        piece_ids,
        owner_id
      });
      logger.info('Owner saved to database: ', owner);

      await res.json(owner);
      next();
    }
  },
  {
    method: 'get',
    path: '/collection',
    validation: {
      query: get_collection_input,
      response: full_collection_output
    },
    middleware: [],
    schema: get_collection,
    controller: async (req, res, next) => {
      let { collection_id } = req.query
      collection.findById(collection_id).then(
        (collection) => {
          req.responseBody =collection 
          res.json(collection)
          next()
        },
        (err) => {
          logger.error('collection not found', req.query);
          res.status(404).json({ message: 'collection_not_found' });
          next()
        })
    }
  },
  {
    method: 'delete',
    path: '/collection',
    validation: {
      query: get_collection_input,
      response: full_collection_output
    },
    middleware: [],
    schema: get_collection,
    controller: async (req, res, next) => {
      let { collection_id } = req.query
      collection.findByIdAndDelete(collection_id).then(
        (collection) => {
          if (collection === null) {
            logger.error('collection not found', req.query);
            res.status(404).json({ message: 'collection_not_found' });
            next()
          } else {
            req.responseBody = collection;
            res.json(collection)
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