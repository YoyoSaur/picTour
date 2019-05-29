const _ = require('lodash');
const asyncify = require('express-asyncify');
const router = asyncify(require('express').Router());
const joi = require('@hapi/joi');
// Require all the routes that matter
const piece = require('./routes/piece');
const collection = require('./routes/collection');
const owner = require('./routes/owner');
// put into array for processing
const routes = _.union(piece, collection, owner)

_.forEach(routes, (route) => {
  let {method, path, controller, validation, schema} = route
  // validate a query if it's needed to validate
  // otherwise, reject if a query is passed in
  if(validation.query) {
    router[method](path, async(req, res, next) => {
      let check = joi.validate(req.query, validation.query)
      if(check.error) {
        return res.status(500).json({error_code: 999})
      }
      next()
    })
  } else {
    router[method](path, async(req, res, next) => {
      if(req.query) {
        return res.status(500).json({error_code: 999})
      }
      next()
    })

  }
  // setup the schema endpoint
  if(schema) {
    router[method](`${path}/schema`, async(req, res, next) => {
      return res.json(schema);
    })
  }
  // the actual handler setup
  router[method](path, controller);
  // if response validation 
  if(validation.response) {
    router[method](path, async(req, res, next) => {
      console.log(req.responseBody)
      next()
    });

  }
});
router.use('/*', async (req, res) => {
  return res
})

module.exports = router;