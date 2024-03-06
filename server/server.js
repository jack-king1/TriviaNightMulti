const io = require("socket.io")(5000, {
    cors: {
        origin: ["http://localhost:3000"],
    },
});

//player object
const currentPlayers = [];

io.on("connection", async (socket) => {
    console.log(socket.id);
    //functionality
    //Create room was called
    socket.on("create-room", (roomId, playerName, cb) => {
        socket.join(roomId);
        cb(`Joined ${roomId}`);
        console.log("Possible room names: ", io.sockets.adapter.rooms);
        currentPlayers.push({ id: socket.id, pName: playerName });
    });

    //check to see if room exists, then join it and send callback.
    socket.on("join-room", (roomId, playerName, cb) => {
        console.log("Possible room names: ", io.sockets.adapter.rooms);
        if (!io.sockets.adapter.rooms.get(roomId)) {
            cb(`Room ${roomId} doesn't exist.`);
            return;
        }
        socket.join(roomId);
        cb(`Joined ${roomId}`);
        //new player has joined, sync data to all clients.
        //create player
        currentPlayers.push({ id: socket.id, pName: playerName });

        //emit to all sockets that player joined
        socket.to(roomId).emit("player-joined", currentPlayers);
    });
});
