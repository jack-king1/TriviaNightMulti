const io = require("socket.io")(5000, {
    cors: {
        origin: ["http://localhost:3000"],
    },
});

io.on("connection", (socket) => {
    console.log(socket.id);
    //functionality
    //Create room was called
    socket.on("create-room", (roomId, cb) => {
        socket.join(roomId);
        cb(`Joined ${roomId}`);
    });
});
