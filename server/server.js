const io = require("socket.io")(5000, {
    cors: {
        origin: ["http://localhost:3000"],
    },
});

//player object
const connectectClient = [];

io.on("connection", (socket) => {
    console.log(socket.id);
    //functionality
    //Create room was called
    socket.on("create-room", async (roomId, playerName, cb) => {
        socket.join(roomId);
        //assign socket a name and isHost
        socket.username = playerName;
        socket.isHost = true;
        cb(`Joined ${roomId}`);
        console.log("Possible room names: ", io.sockets.adapter.rooms);

        //get all players from room then emit to all sockets in that room
        let playerList = await GetPlayerList(roomId);
        console.log("@playerList before emit: ", playerList);
        io.in(roomId).emit("player-list", playerList);
    });

    //check to see if room exists, then join it and send callback.
    socket.on("join-room", async (roomId, playerName, cb) => {
        if (!io.sockets.adapter.rooms.get(roomId)) {
            cb(`Room ${roomId} doesn't exist.`);
            return;
        }
        socket.join(roomId);
        //assign socket a name and isHost
        socket.username = playerName;
        socket.isHost = false;
        cb(`Joined ${roomId}`);
        console.log("Possible room names: ", io.sockets.adapter.rooms);
        //new player has joined, sync data to all clients.
        //create player

        //get all players from room then emit to all sockets in that room
        let playerList = await GetPlayerList(roomId);
        console.log("@playerList before emit: ", playerList);
        io.in(roomId).emit("player-list", playerList);
    });
});

async function GetPlayerList(roomId) {
    let sockets = await io.in(roomId).fetchSockets();
    let playerList = [];
    sockets.map((val, key) => {
        playerList.push({
            username: val.username,
            socket: val.id,
            isHost: val.isHost,
        });
    });
    console.log(playerList);
    return playerList;
}
