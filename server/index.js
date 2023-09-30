require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");
const socket = require("socket.io");
const app = express();

app.use(express.static("./public"));

app.use(cors());
app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/api/msg", messageRoutes);
mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {})
  .catch((err) => {
    console.log("first");
  });
const port = process.env.PORT || 3001;
const server = app.listen(port, () => {});

const io = socket(server, {
  cors: {
    origin: ["http://localhost:3001","https://chattingapplication.onrender.com"],
    Credential: true,
  },
});
global.onlineUsers = new Map();
io.on("connection", async (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });
  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("recv-msg", data.msg);
    }
  });
  // await longRunningOperation();
});
