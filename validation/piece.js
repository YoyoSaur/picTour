const joi = require('@hapi/joi');

const get_piece_input = {
  piece_id: joi.string().required()
}

const get_piece_output = {
    address: {
      street: joi.string().required(),
      postal_code: joi.number().integer().required(),
      state: joi.string().required(),
      country:joi.string().required() 
    },
    _id: joi.string().required(),
    piece_name: joi.string().required(),
    collection_id: joi.string().allow('null'),
    owner_id: joi.string().allow('null'),
    price: joi.number().integer()
}

module.exports = { get_piece_input, get_piece_output }