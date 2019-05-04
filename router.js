const _ = require('lodash');
const asyncify = require('express-asyncify');
const router = asyncify(require('express').Router());
// Require all the routes that matter
const piece = require('./routes/piece');
const collection = require('./routes/collection');
const owner = require('./routes/owner');
// put into array for processing
const routes = _.union(piece, collection, owner)

_.forEach(routes, (route) => {
  console.log(route.method)
      router[route.method](route.path, route.controller);
});
router.use('/*', async (req, res) => {
  console.log(res.body)
  return res
})

module.exports = router;