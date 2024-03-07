import React, { createContext, useState, useEffect, useContext } from "react";
import { io } from "socket.io-client";
import { TriviaContext } from "./TriviaContexts";

export const SocketContext = createContext();

const socket = io("http://localhost:5000");

export const SocketProvider = ({ children }) => {
    const triviaContext = useContext(TriviaContext);
    const [roomId, setRoomId] = useState("");
    const [playerList, setPlayerList] = useState([]);
    const [eventListeners, setEventListeners] = useState({});
    const [mySocketPlayer, setMySocketPlayer] = useState("");

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
        //new player joined lobby, sync quizz questions.
        if (mySocketPlayer.isHost) {
            socket.emit("sync-questions", triviaContext.trivia);
        }
    });

    socket.on("quiz-questions", (questions) => {
        triviaContext.setTrivia(questions);
    });

    socket.on("enter-game-scene", (questions) => {
        triviaContext.SetGameState("GAME");
        console.log("Start game... ");
    });

    socket.on("recieve-score", (playerWithScore) => {
        if (triviaContext.multiplayerScores.length <= 0) {
            triviaContext.setMultiplayerScores([playerWithScore]);
        } else {
            triviaContext.setMultiplayerScores([
                ...triviaContext.multiplayerScores,
                playerWithScore,
            ]);
        }
        console.log("Adding to final scores: ", playerWithScore);
    });

    //User Events
    //Create Room - roomId to join, function when complete.
    function CreateRoom(roomId, playerName, callback) {
        console.log("creating room.");
        setRoomId(roomId);
        socket.emit("create-room", roomId, playerName, callback);
    }

    function JoinRoom(roomId, playerName, callback) {
        setRoomId(roomId);
        socket.emit("join-room", roomId, playerName, callback);
    }

    function OnJoinRoomSuccess(callbackdata) {
        //Client joined room successfully
        console.log("My socket player: ", callbackdata.myplayer);
        setMySocketPlayer(callbackdata.myplayer);
    }

    //start games for all clients, sent from host
    function StartGame() {
        console.log("Host starting game...");
        socket.emit("start-game", roomId);
    }

    function ShareScore(score) {
        mySocketPlayer.score = score;
        console.log("sharing score: ", mySocketPlayer, roomId);
        socket.emit("share-score", mySocketPlayer, roomId);
    }

    function isHost() {
        return mySocketPlayer.isHost;
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
        mySocketPlayer,
        CreateRoom,
        JoinRoom,
        setRoomId,
        OnJoinRoomSuccess,
        isHost,
        StartGame,
        ShareScore,
    };

    return (
        <SocketContext.Provider value={socketContextValue}>
            {children}
        </SocketContext.Provider>
    );
};
