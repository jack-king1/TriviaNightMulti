import React, { createContext, useState, useEffect } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

const socket = io("http://localhost:5000");

export const SocketProvider = ({ children }) => {
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

    // Value provided by the AuthContext
    const socketContextValue = {};

    return (
        <SocketContext.Provider value={socketContextValue}>
            {children}
        </SocketContext.Provider>
    );
};
