let net = require("net");
let count = 0;
let server = net.createServer(conn => {
  // res.writeHead(200, { "Content-Type": "text/html" });
  // res.end("<h1>hello World</h1>");
  console.log("\033[96m     new connection\033[39m");
  count++;
  conn.write(
    "\r\n > welcome to \033[92m node-chat \033[39m !" +
      "\r\n > " +
      count +
      " other people are connected at this time." +
      "\r\n > please write your name ad press enter: "
  );
  conn.setEncoding("utf8");
  conn.on("data", data => {
    console.log(data);
  });
  conn.on("close", () => {
    count--;
  });
});
server.listen(3000, () => {
  console.log("\033[96m     server listening on *:3000\033[39m");
});
