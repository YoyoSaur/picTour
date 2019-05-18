const bodyParser = require('body-parser');
const express = require('express');
//const {Collection} = require('./db/index');

var app = express();
app.use(bodyParser.json());
app.use(require('./router'));

app.listen(3000, () => {
  console.log('listening on 3000')
});