const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const router = require('./router');

var port = 9999;

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(cors());
router(app);

app.listen(port);
console.log('Your server is running on port ' + port + '.');
