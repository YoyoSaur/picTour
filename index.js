const bodyParser = require('body-parser');
const express = require('express');
//const {Collection} = require('./db/index');

var app = express();
app.use(bodyParser.json());
app.use(require('./router'));
console.log('should be after');

app.listen(3000, () => {
  console.log('listening on 300')
});