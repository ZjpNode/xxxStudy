const HTTP = require("http");
const HOSTNAME = "127.0.0.1";
const PORT = "2000";

HTTP.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("hello World\n");
}).listen(PORT, HOSTNAME, () => {
    console.log(`Server running at http://${HOSTNAME}:${PORT}`);
});
