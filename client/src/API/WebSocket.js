import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

//socket on - on -- event -- from server do something
socket.on("connect", () => {
    console.log(`Connected with ID: ${socket.id}`);
    //save this id somewhere to keep track of self in player list.
});

//function for syncing all players from server.
socket.on("player-joined", (players) => {
    //server sends all players updated list of players.
    console.log("New Player List: ", players);
});
//player joined, received message from server.

//User Events
//Create Room - roomId to join, function when complete.
function CreateRoom(roomId, playerName, callback) {
    socket.emit("create-room", roomId, playerName, callback);
}

function JoinRoom(roomId, playerName, callback) {
    socket.emit("join-room", roomId, playerName, callback);
}

const SocketController = {
    socket, //probably should create getter functions rather than giving access to socket here.
    CreateRoom,
    JoinRoom,
};

export default SocketController;
