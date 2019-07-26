const joi = require('@hapi/joi');

/**
 * Input for GET /piece
 */
const get_piece_input = {
  piece_id: joi.string().required()
}

/**
 * Full output for base /piece
 */
const full_piece_output = {
  address: {
    street: joi.string().required(),
    postal_code: joi.number().integer().required(),
    state: joi.string().required(),
    country: joi.string().required()
  },
  _id: joi.string().required(),
  piece_name: joi.string().required(),
  collection_id: joi.string().allow('null'),
  owner_id: joi.string().allow('null'),
  price: joi.number().integer()
}

/**
 * Input for POST /piece
 */
const create_piece_input = {
  address: {
    street: joi.string().required(),
    postal_code: joi.number().integer().required(),
    state: joi.string().required(),
    country: joi.string().required()
  },
  piece_name: joi.string().required(),
  collection_id: joi.string().allow('null'),
  owner_id: joi.string().allow('null'),
  price: joi.number().integer()
}

/**
 * Input for put /piece
 */
const put_piece_input = {
  piece_id: joi.string().required(),
  address: {
    street: joi.string().required(),
    postal_code: joi.number().integer().required(),
    state: joi.string().required(),
    country: joi.string().required()
  },
  piece_name: joi.string().required(),
  collection_id: joi.string().allow('null'),
  owner_id: joi.string().allow('null'),
  price: joi.number().integer()
}

module.exports = { get_piece_input, full_piece_output, create_piece_input, put_piece_input }