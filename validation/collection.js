
const joi = require('@hapi/joi');

/**
 * Input for GET collection/
 */
const get_collection_input = {
  collection_id: joi.string().required()
}

/**
 * Full output for base collection/
 */
const full_collection_output = {
  address: {
    street: joi.string().required(),
    postal_code: joi.number().integer().required(),
    state: joi.string().required(),
    country: joi.string().required()
  },
  _id: joi.string().required(),
  name: joi.string().required(),
  piece_ids: joi.array().items(joi.string().allow('null')),
  owner_id: joi.string().required()
}

/**
 * Input for POST collection/
 */
const create_collection_input = {

  address: {
    street: joi.string().required(),
    postal_code: joi.number().integer().required(),
    state: joi.string().required(),
    country: joi.string().required()
  },
  name: joi.string().required(),
  piece_ids: joi.array().items(joi.string().allow('null')),
  owner_id: joi.string().required()
}

/**
 * Input for PUT collection/
 */
const put_collection_input = {
  collection_id: joi.string().required(),
  address: {
    street: joi.string().required(),
    postal_code: joi.number().integer().required(),
    state: joi.string().required(),
    country: joi.string().required()
  },
  name: joi.string().required(),
  piece_ids: joi.array().items(joi.string().allow('null')),
  owner_id: joi.string().required()
}

module.exports = { get_collection_input, full_collection_output, create_collection_input, put_collection_input }