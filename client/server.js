const express = require('express')
const ParseServer = require('parse-server').ParseServer

const app = express();

const server = new ParseServer({
  databaseURI: 'mongodb+srv://aveocod:fJOHqZiYxJa6D1gC@gratiotprod.nmb1s6c.mongodb.net/gratiot',
  appId: 'myAppId',
  masterKey: 'myMasterKey', 
  serverURL: 'http://localhost:1338/parse'
});

// Serve the Parse API on the /parse URL prefix
app.use('/parse', server.app);

// Start server
server.start();

app.listen(1338, function() {
  console.log('parse-server-example running on port 1338.');
});