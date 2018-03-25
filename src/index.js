const express = require('express');
const parser = require('body-parser');
const app = express();
const port = 8080;

const RequestHandler = require('./request-handler');
var request_handler = new RequestHandler();

console.log("Creating Server...");

app.use((request, response, next) => {
    console.log(request.headers);
    next();
})

app.use(parser.json());

app.use((request, response, next) => {
    console.log(request.body);
    next();
})

app.get("/", (request, response) => request_handler.index(request, response));

app.use((err, request, response, next) => {
  // log the error, for now just console.log
  console.log(err);
  response.status(500).send('Something broke!');
})

app.listen(port);


