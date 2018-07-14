// crypto and os make use of the fs module (threadpool)
// HTTPS makes use of OS, no threadpool
// when we call fs.readFile, it gets stats on the file
// which requires harddrive access
// after node has stats, it can go read the file
// eventually calls the callback
// two distinct causes: just waiting for harddrive to
// give back data, and also when the file is reading
// contents

process.env.UV_THREADPOOL_SIZE = 5;

const https = require('https');
const crypto = require('crypto');
const fs = require('fs');

const start = Date.now();

function doRequest() {
  https
    .request('https://www.google.com/', res => {
      res.on('data', () => {});
      res.on('end', () => {
        console.log('Request:', Date.now() - start);
      });
    })
    .end();
}

function doHash() {
  crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('Hash:', Date.now() - start);
  });
}

doRequest();

fs.readFile('multitask.js', 'utf8', () => {
  console.log('FS:', Date.now() - start);
});

// if you don't invoke these, fs takes like 25ms
// if you invoke these, it taks as long as the hash
doHash();
doHash();
doHash();
doHash();
