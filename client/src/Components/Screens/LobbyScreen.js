import { useState, useEffect, useContext } from "react";
import SocketController from "../../API/WebSocket";
function LobbyScreen() {
    return (
        <div className="flex flex-col">
            <div>Current Lobby Players</div>
            {console.log("@LobbyScrren: ", SocketController.socket)}
        </div>
    );
}

export default LobbyScreen;
