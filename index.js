const crypto = require('crypto');
const express = require('express');
const app = express();
const Worker = require('webworker-threads').Worker;

app.get('/', (req, res) => {
  const worker = new Worker(function() {
    this.onmessage = function() {
      // step 2
      let counter = 0;
      while (counter < 1e9) {
        counter++;
      }

      postMessage(counter); // step 3
    };
  });

  // step 4
  worker.onmessage = function(message) {
    console.log(message.data);
    res.send('' + message.data);
  };

  worker.postMessage(); // step 1
});

app.get('/fast', (req, res) => {
  res.send('That was fast!');
});

app.listen(3000);
