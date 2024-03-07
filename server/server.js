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
        //Get this players socket player object
        //Get this players socket player object
        cb({
            msg: `Joined ${roomId}`,
            myplayer: {
                username: socket.username,
                id: socket.id,
                isHost: socket.isHost,
            },
        });
        //console.log("Possible room names: ", io.sockets.adapter.rooms);

        //get all players from room then emit to all sockets in that room
        let playerList = await GetPlayerList(roomId);
        console.log("Player List: ", playerList);
        io.in(roomId).emit("player-list", playerList);
    });

    //check to see if room exists, then join it and send callback.
    socket.on("join-room", async (roomId, playerName, cb) => {
        if (!io.sockets.adapter.rooms.get(roomId)) {
            cb({ msg: `Joined ${roomId}`, myPlayer: null });
            return;
        }
        socket.join(roomId);
        //assign socket a name and isHost
        socket.username = playerName;
        socket.isHost = false;
        //Get this players socket player object
        cb({
            msg: `Joined ${roomId}`,
            myplayer: {
                username: socket.username,
                id: socket.id,
                isHost: socket.isHost,
            },
        });
        //console.log("Possible room names: ", io.sockets.adapter.rooms);
        //new player has joined, sync data to all clients.
        //create player

        //get all players from room then emit to all sockets in that room
        let playerList = await GetPlayerList(roomId);
        console.log("Player List: ", playerList);
        io.in(roomId).emit("player-list", playerList);
    });

    //sync questions from host to all connected room clients
    socket.on("sync-questions", (questions) => {
        //emit to all]
        console.log("syncing questions...");
        socket.broadcast.emit("quiz-questions", questions);
    });

    //function for host to start game for a room.
    socket.on("start-game", async (roomId, cb) => {
        console.log("starting game...");
        io.in(roomId).emit("enter-game-scene");
    });

    //function from a socket for a guess, verify on server to prevent syncing issues across clients.
    socket.on("user-guess", (answerguess, cb) => {
        io.in(roomId).emit("correct-guess");
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

async function GetPlayer(roomId, socket) {
    let sockets = await io.in(roomId).fetchSockets();
    let player;
    sockets.map((val, key) => {
        if ((val.id = socket.id)) {
            player = {
                username: val.username,
                socket: val.id,
                isHost: val.isHost,
            };
        }
    });
    console.log("@GetPlayer: ", player);
    return player;
}
