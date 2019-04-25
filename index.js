var express = require('express');
var {Collection} = require('./db/index');

var app = express();

app.get('/collection/:collectionId', async (req, res) => {
  Collection.findById(req.param.collectionId)
});