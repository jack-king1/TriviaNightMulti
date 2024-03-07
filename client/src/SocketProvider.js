import React, { createContext, useState, useEffect } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

const socket = io("http://localhost:5000");

export const SocketProvider = ({ children }) => {
    const [roomId, setRoomId] = useState("");
    const [playerList, setPlayerList] = useState([]);
    const [eventListeners, setEventListeners] = useState({});
    const [mySocketId, setMySocketId] = useState("");

    //useEffect setup component
    useEffect(() => {}, []);

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

    //function for syncing all players from server.
    socket.on("player-joined", (players) => {
        //server sends all players updated list of players.
        console.log("New Player List: ", players);
    });

    socket.on("player-list", (playerList) => {
        setPlayerList(playerList);
        console.log("@player-list: ", playerList);
    });

    //User Events
    //Create Room - roomId to join, function when complete.
    function CreateRoom(roomId, playerName, callback) {
        socket.emit("create-room", roomId, playerName, callback);
    }

    function JoinRoom(roomId, playerName, callback) {
        socket.emit("join-room", roomId, playerName, callback);
    }

    function OnJoinRoomSuccess(roomId) {
        //Client joined room successfully - save roosssssssssssssssssmID.
        setRoomId(roomId);
    }

    //Subscribe to event
    const subscribe = (eventName, callback) => {
        setEventListeners((prevListeners) => ({
            ...prevListeners,
            [eventName]: [...(prevListeners[eventName] || []), callback],
        }));
        console.log("Subscribed!");
    };

    //calls all subsribed functions
    const emit = (eventName, payload) => {
        const listeners = eventListeners[eventName] || [];
        console.log("Calling all subs!", listeners);
        listeners.forEach((callback) => callback(payload));
    };

    // Value provided by the AuthContext
    const socketContextValue = {
        roomId,
        playerList,
        CreateRoom,
        JoinRoom,
        setRoomId,
    };

    return (
        <SocketContext.Provider value={socketContextValue}>
            {children}
        </SocketContext.Provider>
    );
};
