const { Piece } = require('../../db/index')
const _ = require('lodash')

describe('Piece Endpoints', async () => {
  var rubrik_piece
  beforeEach(async () => {
    rubrik_piece = new Piece({
      piece_name: 'Test Piece',
      address: {
        street: '299 West Street',
        postal_code: 94108,
        state: 'CA',
        country: 'USA'
      },
      collection_id: null,
      owner_id: null,
      price: 99900,
      date: Date.now()
    });
    rubrik_piece.save() 
  })
  describe('GET: /piece?piece_id', async () => {
    it('should get an existing piece in the database', async () => {
      let {body} = await server.get(`/piece/?piece_id=${rubrik_piece.get('_id')}`)
      //expect(body._id).to.equal(rubrik_piece.get('_id'))
      expect(body.piece_name).to.equal(rubrik_piece.get('piece_name'))
      expect(body.address).to.deep.equal(rubrik_piece.get('address'))
      expect(body.collection_id).to.equal(rubrik_piece.get('collection_id'))
      expect(body.owner_id).to.equal(rubrik_piece.get('owner_id'))
      expect(body.price).to.equal(rubrik_piece.get('price'))
      expect(Date(body.date)).to.equal(Date(rubrik_piece.get('date')))
    });
    it('should error when it can not get a piece', async() => {
      let {body} = await server.get(`/piece/?piece_id=4d21903890`)
      //expect(body._id).to.equal(rubrik_piece.get('_id'))
      expect(body.message).to.equal('piece_not_found')

    })
  });
});