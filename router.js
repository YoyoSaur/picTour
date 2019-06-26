const { _, logger } = require('./required');
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
  // the different validations are done the same way, but not functionalized
  // this is because they are the only two and we may want to have some extra 
  // functionality going on
  // validate a query if it's needed to validate
  // otherwise, reject if a query is passed in
  if(validation.query) {
    router[method](path, async(req, res, next) => {
      let check = joi.validate(req.query, validation.query)
      if(check.error) {
        logger.error('QUERY VALIDATION: ', check.error);
        return res.status(500).json({error_code: 999});
      }
      next()
    })
  } else {
    router[method](path, async(req, res, next) => {
      if(!_.isEmpty(req.query)) {
        logger.error('UNEXPECTED QUERY: ', req.query);
        return res.status(500).json({error_code: 999});
      }
      next();
    })
  }

  // validate a body if it's needed to validate
  // otherwise, reject if a body is passed in
  if(validation.body) {
    router[method](path, async(req, res, next) => {
      let check = joi.validate(req.body, validation.body)
      if(check.error) {
        logger.error('BODY VALIDATION:  ', check.error);
        return res.status(500).json({error_code: 999});
      }
      next()
    })
  } else {
    router[method](path, async(req, res, next) => {
      if(!_.isEmpty(req.body)) {
        logger.error('UNEXPECTED BODY: ', req.body);
        return res.status(500).json({error_code: 999});
      }
      next();
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
      next()
    });

  }
});
router.use('/*', async (req, res) => {
  return res
})

module.exports = router;