require('dotenv').config();
const express = require('express')
const cors = require('cors');
const port = process.env.PORT
const {PostgresSQL} = require('./db/db');
const bodyParser = require('body-parser');
const app = express()
const routes = require('./routers/routes');
app.use(cors());
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(PostgresSQL);
app.use('/', routes);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})