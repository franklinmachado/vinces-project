const app = require("express");
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: { origin: "http://localhost:5173" },
});

io.on("connection", (socket) => {
  // confere o id
  console.log(`User connected, id: ${socket.id}`);

  socket.on("disconnect", (raeson) => {
    console.log(`User disconnected, id: ${socket.id}`);
  });

  socket.on("set_username", (userName) => {
    socket.data.userName = userName;
    console.log(socket.data.userName);
  });

  socket.on("message", (text) => {
    io.emit("reciveMessage", {
      text,
      author: socket.data.userName,
      authorId: socket.id,
    });
  });
});

const PORT = 3001;

server.listen(PORT, () => {
  console.log(`Server running at port: ${PORT}`);
});
