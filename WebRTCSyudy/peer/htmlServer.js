const tls = require("tls");
const https = require("live-server-https");

const server = tls.createServer(https, socket => {
  console.log(
    "server connected",
    socket.authorized ? "authorized" : "unauthorized"
  );
  socket.write("welcome!\n");
  socket.setEncoding("utf8");
  socket.pipe(socket);
});
server.listen(8000, () => {
  console.log("server bound");
});
