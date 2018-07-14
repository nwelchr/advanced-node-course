// libuv delegates the request making to the OS
// there's no blocking of javascript code in event loop
// not touching the threadloop at all
// ran entirely outside the event loop

const https = require('https');

const start = Date.now();

function doRequest() {
  https
    .request('https://www.google.com/', res => {
      res.on('data', () => {});
      res.on('end', () => {
        console.log(Date.now() - start);
      });
    })
    .end();
}

doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
