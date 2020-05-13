# node lesson 004

Small node app for selling farm grown fruit and veggies!

## Table of Contents

1. [Quick Notes](#quickNotes)

1. [Reading the Data](#readData)

1. [Rename Template Files](#renameFiles)

1. [Create Template Card File](#createTempCards)

1. [Update Card Template](#updateCardTemp)

1. [Card Temp Read File](#cardTempReadFile)

1. [Time for Slugify](#slugify)

1. [Setting Dynamic Overview Template](#dynamicOverview)

1. [Custom Module to Replace Dynamic Values](#createCustomModule)

1. [Using the Custom Module](#useCustomModule)

1. [Reference Links](#reference)

## Quick Notes <a name="quickNotes"></a>

All of the recorded videos will be uploaded to YouTube. The only way you can access these videos is by using the URL for the playlist. The title of the video will match the repo title.

[YouTube Playlist](https://www.youtube.com/watch?v=-u9l3c6QkSM&list=PLZXCmxSrWXSmpNi6q-N9k2NwJP1qMSU_Q)


## Reading the Data <a name="readData"></a>

It's time to begin working with data in our Node project.

- Here we are using the readFileSync function to read the data file and store it in a variable.
```
// data
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
```

- Next, we're updating our list our routes to include the "/api" route. Update the code like so.

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

  } else {
  res.writeHead(404, {
    'Content-type': 'text/html'
  });
  res.end('<h1>Page not found!</h1>');
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
```

- Now you can run the project, and open up the "/api" page.


## Rename Template Files <a name="renameFiles"></a>

It's time to begin working with data in our Node project.

- Here we are using the readFileSync function to read the data file and store it in a variable.
FOLDER: templates/

BEFORE FILE LIST
overview.html
product.html

AFTER FILE LIST
template-overview.html
template-product.html

- Now, we've got to update our readFileSync functions. Update the file name, and while we are at it, we'll update the variable name.

```
// html files
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
```
- In the route function, update our variables "templateOverview" and "templateProduct" to be "tempProduct" and "tempOverview"

```
if (pathname == '/' || pathname == '/overview') {
  res.writeHead(200, {
    'Content-type': 'text/html'
  });

  res.end(tempOverview);

} else if (pathname == '/product') {
    res.writeHead(200, {
      'Content-type': 'text/html'
    });

    res.end(tempProduct);

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
```


## Create Template Card File <a name="createTempCards"></a>

- Oven the template-overview.html file. In the body, find the <figure> tags. Copy the first figure tag and all code under it, and paste it into a new file. Save this file with the name ```template-card.html```.

```
<figure class="card">
  <div class="card__emoji">🥑🥑</div>

  <div class="card__title-box">
    <h2 class="card__title">Fresh Avocado</h2>
  </div>

  <div class="card__details">
    <div class="card__detail-box">
      <h6 class="card__detail card__detail--organic">Organic!</h6>
    </div>

    <div class="card__detail-box">
      <h6 class="card__detail">4 🥑 per 📦</h6>
    </div>

    <div class="card__detail-box">
      <h6 class="card__detail card__detail--price">6.50€</h6>
    </div>
  </div>

  <a class="card__link" href="#">
    <span>Detail <i class="emoji-right">👉</i></span>
  </a>
</figure>
```

- Delete all <figure> tags replace it with the below code. This will be the only code in the <div> with "cards-container" class.

```
{%PRODUCT_CARDS%}
```


## Update Card Template <a name="updateCardTemp"></a>

- It's time to update the template-card.html file with dynamic variables. Here are the variables we are adding.
- - {%IMAGE%}
- - {%PRODUCTNAME%}
- - {%NOT_ORGANIC%}
- - {%QUANTITY%}
- - {%PRICE%}
- - {%ID%}

THE END CODE SHOULD MATCH THIS:
```
<figure class="card">
  <div class="card__emoji">{%IMAGE%} {%IMAGE%}</div>

  <div class="card__title-box">
    <h2 class="card__title">{%PRODUCTNAME%}</h2>
  </div>

  <div class="card__details">
    <div class="card__detail-box {%NOT_ORGANIC%}">
      <h6 class="card__detail card__detail--organic">Organic!</h6>
    </div>

    <div class="card__detail-box">
      <h6 class="card__detail">{%QUANTITY%} per 📦</h6>
    </div>

    <div class="card__detail-box">
      <h6 class="card__detail card__detail--price">${%PRICE%}</h6>
    </div>
  </div>

  <a class="card__link" href="/product?id={%ID%}">
    <span>Detail <i class="emoji-right">👉</i></span>
  </a>
</figure>

```


## Card Temp Read File <a name="cardTempReadFile"></a>

- Here we are using the readFileSync function to read the template-card.html file and store it in a variable.

```
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
```


## Time for Slugify <a name="slugify"></a>

- Next, we'll use the JSON.parse function to be able to read through the JSON data.
```
const dataObj = JSON.parse(data);
```

- Install the slugify package
```
npm install slugify
```

- Require the slugify package
```
// NPM Modules
const slugify = require('slugify');
```

- Next, we'll create the .map function to loop through each object in the data.json file. Each "productName" item the data, will be converted to lower case letters, then all spaces will be replaced with a "-".
```
const slugs = dataObj.map(el => slugify(el.productName, { lower: true }));
console.log(slugs);
```

## Setting Dynamic Overview Template <a name="dynamicOverview"></a>

Now, we're working on the overview template, to make the page dynamic.

- Remove the following code.
```
res.end(tempOverview);
```

- Replace it with the following code. Here the .map function will loop through each data element on the first line. On the second line, the {%PRODUCT_CARDS%} code that we added to the template-overview.html file will be replaced with the template-card file for each object in the data.
```
const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
res.end(output);
```

- Run the project
- Open the overview page on "/" or "/overview". You can see the


## Custom Module to Replace Dynamic Values <a name="createCustomModule"></a>

Now, we're going to create the custom module that will replace our dynamic variables.

- Create a new folder called "modules"
- Create a new file in the modules folder called "replaceTemplate.js"
- Paste the following code in the replaceTemplate file.
```
module.exports = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');

  return output;
}

```

## Using the Custom Module <a name="useCustomModule"></a>

- In order to use the replace template module, we have to require it in our project.
```
// Custom Modules
const replaceTemplate = require('./modules/replaceTemplate');
```

- Now you can save the file, and open up the browser to "/overview" and see it in action!

## Update the Product Route <a name="updateProductRoute"></a>

Lastly, we'll update the product route so that we can make the product page dynamic too.

- First let's update the template-product.html file. Find the <figure> in the product file and input the dynamic variables. Those variables are below:
- - {%NOT_ORGANIC%}
- - {%IMAGE%}
- - {%PRODUCTNAME%}
- - {%FROM%}
- - {%NUTRIENTS%}
- - {%QUANTITY%}
- - {%PRICE%}
- - {%ID%}
- - {%DESCRIPTION%}

UPDATED FIGURE TAG CODE:
```
<figure class="product">
  <div class="product__organic {%NOT_ORGANIC%}"><h5>Organic</h5></div>
  <a href="/" class="product__back">
    <span class="emoji-left">👈</span>Back
  </a>
  <div class="product__hero">
    <span class="product__emoji product__emoji--1">{%IMAGE%}</span>
    <span class="product__emoji product__emoji--2">{%IMAGE%}</span>
    <span class="product__emoji product__emoji--3">{%IMAGE%}</span>
    <span class="product__emoji product__emoji--4">{%IMAGE%}</span>
    <span class="product__emoji product__emoji--5">{%IMAGE%}</span>
    <span class="product__emoji product__emoji--6">{%IMAGE%}</span>
    <span class="product__emoji product__emoji--7">{%IMAGE%}</span>
    <span class="product__emoji product__emoji--8">{%IMAGE%}</span>
    <span class="product__emoji product__emoji--9">{%IMAGE%}</span>
  </div>
  <h2 class="product__name">{%PRODUCTNAME%}</h2>
  <div class="product__details">
    <p><span class="emoji-left">🌍</span> From {%FROM%}</p>
    <p><span class="emoji-left">❤️</span> {%NUTRIENTS%}</p>
    <p><span class="emoji-left">📦</span> {%QUANTITY%}</p>
    <p><span class="emoji-left">🏷</span> ${%PRICE%}</p>
  </div>

  <a href="/product?id={%ID%}" class="product__link">
    <span class="emoji-left">🛒</span>
    <span>Add to shopping card (${%PRICE%})</span>
  </a>

  <p class="product__description">{%DESCRIPTION%}</p>
</figure>
```

- Remove the following code from the index.js "/product" route's if function.
```
res.end(tempProduct);
```

- Replace it with the following code. Here we are using the URL query parameters to pull in the product id used in the data, then, using that id number, we are displaying the content on the page.
```
const product = dataObj[query.id];
const output = replaceTemplate(tempProduct, product);
res.end(output);
```

- Save the file.
- Run the project in the terminal if you need to.
- Open your browser and test all the pages are showing up correctly. 


## Reference Links <a name="reference"></a>

- [Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
- [MDN Template Literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
- [NPM Slufigy](https://www.npmjs.com/package/slugify)
- [Node FS Read File Sync](https://nodejs.org/api/fs.html#fs_fs_readfilesync_path_options)
- [Node HTTP Create Server](https://nodejs.org/api/http.html#http_http_createserver_options_requestlistener)
- [Node HTTP Write Head](https://nodejs.org/api/http.html#http_response_writehead_statuscode_statusmessage_headers)
- [Node HTTP Response Data Callback](https://nodejs.org/api/all.html#http_response_end_data_encoding_callback)
