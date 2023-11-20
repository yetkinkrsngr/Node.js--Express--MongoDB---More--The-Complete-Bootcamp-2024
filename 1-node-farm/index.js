const fs = require("fs");
//okunacak dosya ve karakter seti
const textIn = fs.readFileSync("txt/input.txt", "utf-8");
console.log(textIn);
