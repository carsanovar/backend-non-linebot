/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// initial app config
require("dotenv").config();
const {onRequest} = require("firebase-functions/v2/https");
//const logger = require("firebase-functions/logger");
const express = require("express");
const cookieParser = require("cookie-parser");
// const port = process.env.PORT;
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
// Add middleware to authenticate requests
// app.use(myMiddleware);

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.listen(45060, () => {
  console.log("Server is listening on port " + 45060);
});

// enable CORS
app.use((req, res, next) => {

  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();

});

// Import Models
const test = require("./backend-non/routes/test");
app.use("/test", test);

const lineApi = require("./backend-non/routes/lineApi");
app.use("/lineApi", lineApi);

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.status(200).send("Hello from Firebase!");
// });

// exports.backEndNon = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.status(200).send("Hello from Firebase!");
// });

exports.backEndNon = onRequest(app);
