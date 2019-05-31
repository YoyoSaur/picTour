const get_owner = {
  query: {
    owner_id: ['String', 'required']
  },
  response: {
    _id: ['String', 'required', 'unique'],
    owner_first_name: ['String', 'required'],
    owner_first_name: ['String', 'required'],
    collection_ids: ['String', 'Array'],
    piece_ids: ['String', 'Array'],
    date: ['Timestamp', 'required']
  }
}

module.exports = { get_owner };