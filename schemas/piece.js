const get_piece = {
  query: {
    piece_id: ['String', 'required']
  },
  response: {
    address: {
      street: ['String', 'required'],
      postal_code: ['Integer', 'required'],
      state: ['String', 'required'],
      country: ['String', 'required']
    },
    _id: ['String', 'required', 'unique'],
    piece_name: ['String', 'required'],
    collection_id: ['String'],
    owner_id: ['String'],
    price: ['Integer'],
    date: ['Timestamp', 'required']
  }
}

module.exports = { get_piece };