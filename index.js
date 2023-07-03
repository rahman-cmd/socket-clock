const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("A client connected");

  // Send the current time minite , second , hour to the connected client
  setInterval(() => {
    let date = new Date();
    socket.emit("time", {
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds(),
    });
  }, 1000);
});

// show realtime time on the client side
app.get("/time", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
