const express = require('express');
const app = express();

const port = process.env.PORT || 3100;

//wake up http server
const http = require('http');

//Enable to receive requests access to the specified port
const server = http.createServer(app).listen(port, function() {
  console.log('Server listening at port %d', port);
});

app.get('/', function(req, res) {
  res.json({});
});
