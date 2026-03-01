require("dotenv").config();
const express = require("express");
const cors = require("cors");
const port = process.env.PORT;
const { PostgresSQL } = require("./db/db");
const bodyParser = require("body-parser");
const app = express();
const routes = require("./routers/routes");
const messages = require("./services/error-handler");
const e = require("express");
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(PostgresSQL);
app.use("/", routes);
app.use((err, req, res, _next) => {
  let error = err;
  let errorMessage = "";
  let errorStatusCode = 500;
  if (error.message === "File too large") {
    errorMessage = messages["FILE_IS_LARGE"];
    errorStatusCode = 400;
  } else {
    errorMessage = messages[error.message] || "Internal Server Error";
    errorStatusCode = error.statusCode || 500;
  }

  console.log("Error in error handling middleware:", error);
  console.log("Check if there is error status code:", error.statusCode);
  console.log("Check if there is error message:", error.message);

  res.status(errorStatusCode).json({
    error: errorMessage,
  });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
