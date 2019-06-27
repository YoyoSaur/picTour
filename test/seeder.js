const { Collection, Piece, Owner } = require('../db/index')
const _ = require('lodash')
function recursiveHelper(obj, keys, final_value) {
  if(keys.length === 0) {
    return final_value
  } else {
    if(!obj[keys[0]]) {
      obj[keys[0]] = {}
    } 
      obj[keys[0]] = recursiveHelper(obj[keys[0]], keys.slice(1), final_value)
    return obj
  }
}
async function seedModel(model) {
  var test = _.reduce(model.schema.paths, (seed, value, key) => {
    if(value.instance === 'Array') {
    }
    let vals = key.split('.')
    if (vals.length > 1) {
      seed = recursiveHelper(seed, vals, value.instance)
    } else {
      seed[key] = value.instance
    }
    return seed
  }, {})
}
/*
seedModel(Collection);
seedModel(Piece);
seedModel(Owner);
*/
module.exports = { }