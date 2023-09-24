require("dotenv").config();
const cors = require('cors');
const mongoose = require('mongoose');
const express = require("express")
const userRoutes = require('./routes/userRoutes')
const messageRoutes=require('./routes/messageRoutes');
const socket  = require("socket.io");
const app = express()


app.use(cors())
app.use(express.json());
app.use('/api/auth', userRoutes)
app.use('/api/msg',messageRoutes)
mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(() => {
    console.log('db connection success');
}).catch((err) => {
    console.log(err);
})
const port = process.env.PORT || 3001;
const server=app.listen(port, ()=>{console.log(`listening to the port ${port}...`)})

const io =socket(server,{
    cors: {
        origin: "http://localhost:3000",
        Credential:true
    }
}
)
global.onlineUsers=new Map()
io.on('connection', (socket) => {
    global.chatSocket = socket;
    socket.on('add-user', (userId) => {
        onlineUsers.set(userId, socket.id)
    })
    socket.on('send-msg', (data) => {
        const sendUserSocket = onlineUsers.get(data.to)
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit('recv-msg',data.msg)
        }
        
    })
})