const joi = require('@hapi/joi');

const piece_input = {
  piece_id: joi.string().required()
}

module.exports = { piece_input }