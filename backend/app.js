require('dotenv').config();
const express = require('express')
const app = express()
const port = process.env.PORT
const {PostgresSQL} = require('./db/db');
const bodyParser = require('body-parser');
const routes = require('./routers/routes');
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
app.use(PostgresSQL);
app.use('/', routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})