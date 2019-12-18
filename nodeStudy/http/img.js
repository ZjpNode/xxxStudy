let http = require("http");
let fs = require("fs");
http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "image/jpeg" });
    fs.ReadStream("./static/image.jpg").pipe(res);
  })
  .listen(3000);
