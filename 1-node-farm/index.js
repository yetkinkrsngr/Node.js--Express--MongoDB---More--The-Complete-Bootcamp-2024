const fs = require("fs");
const http = require("http");
const url = require("url");
///////// File
/* // Blocking, synchronous way
//okunacak dosya ve karakter seti sekron olarak
const textIn = fs.readFileSync("txt/input.txt", "utf-8");
console.log(textIn);

let year = new Date();

const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${year.getFullYear()}`;
//dosyası yazdırma ve dosya adı
fs.writeFileSync("txt/output.txt", textOut);
console.log("File written!");
 */
/* 
// Non-blocking, asynchronous way
const textIn = fs.readFile("txt/start.txt", "utf-8", (err, data) => {
  console.log(data);
});
console.log("will read file!");

const text = fs.readFile("txt/append.txt", "utf-8", (err, data) => {
  if (err) return console.log("ERROR!");
  console.log(data);
  const textOut = fs.writeFile("txt/end.txt", data, (err, data2) => {
    if (err) return console.log("ERROR!");
    console.log("dosya yazılıyor");
  });
});
*/

///////// Server
let replaceTemplate = (element, product) => {
  let output = element.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if (!product.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
    return output;
  }
  return output;
};

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  //Overview page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });
    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output);
  }
  // Product page
  else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
  }
  // API
  else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  }
  // Not found
  else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>Page not found!</h1>");
  }
});

const port = 3000;
server.listen(port, `127.0.0.1`, () => {
  console.log(`http://localhost:${port}`);
});
