import { useState, useEffect, useContext } from "react";
import SocketController from "../../API/WebSocket";
import { SocketContext } from "../../SocketProvider";
function LobbyScreen() {
    //set up event listener to retrieve
    const socketContext = useContext(SocketContext);

    const colours = ["red", "green", "blue", "yellow"];

    return (
        <div className="flex flex-row flex-wrap gap-2 w-full justify-center h-72">
            {socketContext.playerList.map((val, index) => {
                return (
                    <div
                        className={`bg-${colours[index]}-500 hover:bg-${colours[index]}-400 text-white font-bold py-2 px-4 border-b-4 border-${colours[index]}-700 hover:border-${colours[index]}-500 rounded w-[49%] rounded-xl items-center flex text-center`}
                    >
                        <div className="text-center mx-auto">
                            {val.username}
                        </div>
                    </div>
                );
            })}
            <button className="font-kanit text-3xl w-2/3 h-20 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded">
                Join Lobby
            </button>
        </div>
    );
}

export default LobbyScreen;
