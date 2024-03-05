import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

//socket on - on -- event -- from server do something
socket.on("connect", () => {
    console.log(`Connected with ID: ${socket.id}`);
});

//User Events
//Create Room - roomId to join, function when complete.
function CreateRoom(roomId, callback) {
    socket.emit("create-room", roomId, callback);
}

const SocketController = {
    CreateRoom,
};

export default SocketController;
