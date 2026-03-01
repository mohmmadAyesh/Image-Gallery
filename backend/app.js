require("dotenv").config();
const express = require("express");
const cors = require("cors");
const port = process.env.PORT;
const { PostgresSQL } = require("./db/db");
const bodyParser = require("body-parser");
const app = express();
const routes = require("./routers/routes");
const messages = require("./services/error-handler");
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(PostgresSQL);
app.use("/", routes);
app.use((err, req, res, _next) => {
  let error = err;
  const statusCode = error.statusCode || 500;
  const errorMessage = messages[error.message] || "Internal Server Error";
  res.status(statusCode).json({
    error: errorMessage,
  });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
