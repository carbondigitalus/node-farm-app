# node lesson 003

Small node app for selling farm grown fruit and veggies!

## Table of Contents

1. [Quick Notes](#quickNotes)

1. [Create Project](#initProject)

1. [Read File](#readFileSync)

1. [Write File](#writeFileSync)

1. [Create Server](#createServer)

1. [Directory Name](#directoryName)

1. [Load Pages](#loadPages)

1. [Error Handling](#errorHandling)

1. [Template Literal Variables](#templateLiteral)

1. [Reference Links](#reference)

## Quick Notes <a name="quickNotes"></a>

All of the recorded videos will be uploaded to YouTube. The only way you can access these videos is by using the URL for the playlist. The title of the video will match the repo title. Today's title is "node lesson 001" so that's the video you look for.

[YouTube Playlist](https://www.youtube.com/watch?v=-u9l3c6QkSM&list=PLZXCmxSrWXSmpNi6q-N9k2NwJP1qMSU_Q)

## Read file  <a name="readFileSync"></a>

It's time to begin working with files in our Node project.

- Copy and paste the below code into index.js.
```
const fs = require('fs');

const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log(textIn);
```

- Start project with nodemon

```
npm run start
```
- Save index.js file and see the output in the terminal.

## Write file  <a name="writeFileSync"></a>

- Copy and paste the below code into index.js.
```
fs.writeFileSync('./txt/output.txt', `This is what we know about avacados. \n \n ${textIn} \n \n Created on: ${Date.now()}`);

console.log('file created');
```

- Save the index.js file.
- Review terminal comments.
- Review the output file.


## Create Server <a name="createServer"></a>

- Copy and paste the below code into index.js.

```
const http = require('http');

const server = http.createServer((req, res) => {});

server.listen(8000, '127.0.0.1', () => {
  console.log('app running on address 127.0.0.1, port 8000');
});
```

- When we run our project, the server is created. Now we can look at the browser on the localhost IP address 127.0.0.1 at port 8000. (127.0.0.1:8000). This will create an endless loop becase we haven't defined any code or files to be executed and rendered.


## Directory Name <a name="directoryName"></a>

- Copy and paste the below code into index.js.

```
const templateOverview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');
const templateProduct = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');
```

- The `${__dirname}` variable inside our path will automatically identify what computer, system, server, etc. that you're using, and it will automatically inject that path to the "templates" folder that we've defined here.


## Load Pages <a name="loadPages"></a>

Before we can begin to load pages, we have to include a new module. The URL module lets us get, use and manipulate URLs however we need them.

- Copy and paste the below code into index.js at the top where the other modules are located.

```
const url = require('url');
```
- Here we have "destructuring".

We have the variables "query" and "pathname". Also, at the end of the line of code, we also have ".query" and ".pathname".
```
const query = url.parse(req.url, true).query;
const pathname = url.parse(req.url, true).pathname;
```

We can simplify our code, by removing the ".query" and ".pathname" and the end, and placing our variables in curly braces.
```
const { query } = url.parse(req.url, true);
const { pathname } = url.parse(req.url, true);
```

We can simplify it further, by placing both variable names into the same destructuring brackets.
```
const { query, pathname } = url.parse(req.url, true);
```

- Take our destructured code and add it to the server.
CODE:
```
const { query, pathname } = url.parse(req.url, true);
```
ADD TO SERVER VARIABLE:
```
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
});
```
- In that same function, add the following code:
```
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
  }
```

- Now save the file and run your project.
- You can now view the home page "/", the product page "/product" and the overview page "/overview". In our case, the home page is the overview page.


## Error Handling <a name="errorHandling"></a>

- In our "createServer" function, update the "if/else if" statement:
BEFORE:
```
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
  }
```
AFTER:
```
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
```

- Save the file.
- If your project isn't running, run it now.
- Navigate to your browser and try to load a page that isn't an option. Let's say you typed in "/products" instead of "/product". Now you will get a 404 error stating that the page is not found.


## Template Literal Variables <a name="templateLiteral"></a>

- Copy and paste the below code into index.js. We are creating two variables for our port number and host domain.

```
const port = 8000;
const host = '127.0.0.1';
```

- Update our sever.listen function to now have variables instead of hard coded values. This will be useful when we get into .ENV variables.

BEFORE:
```
server.listen(8000, '127.0.0.1', () => {
  console.log('app running on address 127.0.0.1, port 8000');
});
```
AFTER:
```
server.listen(port, host, () => {
  console.log(`app running on address ${host}, port ${port}`);
});
```

## Reference Links <a name="reference"></a>

- [Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
- [MDN Template Literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
- [NPM Slufigy](https://www.npmjs.com/package/slugify)
- [Node FS Read File Sync](https://nodejs.org/api/fs.html#fs_fs_readfilesync_path_options)
- [Node HTTP Create Server](https://nodejs.org/api/http.html#http_http_createserver_options_requestlistener)
- [Node HTTP Write Head](https://nodejs.org/api/http.html#http_response_writehead_statuscode_statusmessage_headers)
- [Node HTTP Response Data Callback](https://nodejs.org/api/all.html#http_response_end_data_encoding_callback)
