// Core Modules
const fs = require('fs');
const http = require('http');
const url = require('url');

// NPM Modules
const slugify = require('slugify');

// Custom Modules
const replaceTemplate = require('./modules/replaceTemplate');


// read file
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);

// write file
// console.log('---BREAK---');
// fs.writeFileSync('./txt/output.txt', `This is what we know about avacados. \n \n ${textIn} \n \n Created on: ${Date.now()}`);
// console.log('file created');

// html files
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');

// data
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const slugs = dataObj.map(el => slugify(el.productName, { lower: true }));

console.log(slugs);

// server
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  if (pathname == '/' || pathname == '/overview') {
    res.writeHead(200, {
      'Content-type': 'text/html'
    });

    const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    res.end(output);

  } else if (pathname == '/product') {
      res.writeHead(200, {
        'Content-type': 'text/html'
      });

      const product = dataObj[query.id];
      const output = replaceTemplate(tempProduct, product);
      res.end(output);

    } else if (pathname == '/api') {
      res.writeHead(200, {
        'Content-type': 'application/json'
      });
      res.end(data);

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
