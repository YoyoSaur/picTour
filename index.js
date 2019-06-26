const bodyParser = require('body-parser');
const express = require('express');
//const {Collection} = require('./db/index');


module.exports = new Promise(async (resolve) => {

  var app = express();
  app.use(bodyParser.json());
  app.use(require('./router'));

  app.listen(3000, () => {
    console.log('listening on 3000')
    resolve(app)
  });

})
