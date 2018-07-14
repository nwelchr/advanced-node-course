process.env.UV_THREADPOOL_SIZE = 1;
const cluster = require('cluster');

// first time around cluster.isMaster will be true
// so we call .fork which creates a worker thread
// which runs index.js again but where cluster.isMaster
// is false :)
if (cluster.isMaster) {
  cluster.fork();
  cluster.fork();
  cluster.fork();
  cluster.fork();
} else {
  const crypto = require('crypto');
  const express = require('express');
  const app = express();

  app.get('/', (req, res) => {
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
      res.send('Hi there');
    });
  });

  app.get('/fast', (req, res) => {
    res.send('That was fast!');
  });

  app.listen(3000);
}
