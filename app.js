const express = require("express");
//const http = require("http"); // node 기본모듈
const app = express();
const path = require("path");
//const server = http.createServer(app);
const socketIO = require("socket.io");
const moment = require("moment");

app.use(express.static(path.join(__dirname, "src")));
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => console.log(`server is running ${PORT}`));

const io = socketIO(server);
io.on("connection", (socket) => {
  socket.on("chatting", (data) => {
    const { name, msg } = data;
    io.emit("chatting", {
      name,
      msg,
      time: moment(Date.now()).format("h:mm A"),
    });
  });
});
