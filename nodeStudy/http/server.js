let http = require("http");
http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("Hello ");
    setTimeout(() => {
      res.end("<b>World</b>!");
    }, 500);
  })
  .listen(3000);
