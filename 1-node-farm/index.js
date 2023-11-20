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
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;
  if (pathName === "/" || pathName === "/overview") {
    res.end("This is the OVERVIEW");
  } else if (pathName === "/product") {
    res.end("This is the PRODUCT");
  } else if (pathName === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  } else {
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
