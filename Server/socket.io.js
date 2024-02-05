const { Server } = require('socket.io')

module.exports = (http) => {
    const io = new Server(http, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    })
    
    //Socket.io Connection
    io.on("connection", (socket) => {
        console.log("Socket.io Connected!");
        io.emit("Test Broadcasting");
    });
    
} 
