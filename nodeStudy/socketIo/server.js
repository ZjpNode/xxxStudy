let http = require("http");
let express = require("express");
let bodyParser = require("body-parser");
let sio = require("socket.io");

let app = express();
app.use(bodyParser());
app.use(express.static("public"));

// app.listen(3000, () => {
//   console.log("listening on *:3000");
// });

let server = http.createServer(app);
server.listen(3000, () => {
  console.log("listening on *:3000");
});

let io = sio(server);
io.on("connection", socket => {
  console.log("someone connection");
  socket.on("join", name => {
    socket.nickname = name;
    socket.broadcast.emit("announcement", `${name} join the chat`);
  });
  socket.on("text", (msg, callback) => {
    socket.broadcast.emit("text", socket.nickname, msg);
    // 确认消息已经收到
    callback(Date.now());
  });
});
