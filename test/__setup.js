const chai = require('chai');
const chai_http = require('chai-http');
const app = require('../index');
const db = require('../db/index')
const _ = require('lodash')

before(async () => {
  chai.use(chai_http)
  global.server = chai.request(await app).keepOpen()
  global.expect = chai.expect
  //let x = Piece.schema.obj.piece_id()
  //console.log(x)
  global.db = db
})