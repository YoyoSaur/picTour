const joi = require('@hapi/joi');

/**
 * Input for GET owner/
 */
const get_owner_input = {
  owner_id: joi.string().required()
}

/**
 * Full output for base owner/
 */
const full_owner_output = {
    _id: joi.string().required(),
    owner_first_name: joi.string().required(),
    owner_last_name: joi.string().required(),
    collection_ids: joi.array().items(joi.string()),
    piece_ids: joi.array().items(joi.string())
}

/**
 * input for post owner/
 */
const create_owner_input = {
    owner_first_name: joi.string().required(),
    owner_last_name: joi.string().required(),
    collection_ids: joi.array().items(joi.string()),
    piece_ids: joi.array().items(joi.string())
}

/**
 * input for put owner/
 */
const put_owner_input = {
    owner_id: joi.string().required(),
    owner_first_name: joi.string().required(),
    owner_last_name: joi.string().required(),
    collection_ids: joi.array().items(joi.string()),
    piece_ids: joi.array().items(joi.string())
}

module.exports = { get_owner_input, full_owner_output, create_owner_input, put_owner_input }