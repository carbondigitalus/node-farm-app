// Core Modules
const fs = require('fs');
const http = require('http');
const url = require('url');

// read file
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);

// write file
// console.log('---BREAK---');
// fs.writeFileSync('./txt/output.txt', `This is what we know about avacados. \n \n ${textIn} \n \n Created on: ${Date.now()}`);
// console.log('file created');

const templateOverview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');
const templateProduct = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');

// server
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  if (pathname == '/' || pathname == '/overview') {
    res.writeHead(200, {
      'Content-type': 'text/html'
    });

    res.end(templateOverview);
  } else if (pathname == '/product') {
      res.writeHead(200, {
        'Content-type': 'text/html'
      });

      res.end(templateProduct);
    } else {
    res.writeHead(404, {
      'Content-type': 'text/html'
    });
    res.end('<h1>Page not found!</h1>');
  }

});

const port = 8000;
const host = '127.0.0.1';

// listener for server
server.listen(port, host, () => {
  console.log(`app running on address ${host}, port ${port}`);
});
