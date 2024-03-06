import { useContext, useState } from "react";
import SocketController from "../../API/WebSocket";
import { NetworkedPlayer } from "../../Multiplayer/PlayerObject";

function StartScreen(props) {
    const [nameInput, setNameInput] = useState(null); //the player name the player wants to use.
    const [lobbyName, setLobbyNameInput] = useState(null); //the lobby the player is trying to joim.

    //depending on if the player has entered a name change style of the button.
    function GetButtonStyle() {
        if (nameInput == null || nameInput != "") {
            return "mt-4 font-kanit text-3xl w-2/3 h-20 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded";
        }

        return "mt-4 font-kanit text-3xl w-2/3 h-20 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded";
    }

    //set player name to current input form value
    function SetInput(value) {
        console.log(value.target.value);
        setNameInput(value.target.value);
    }

    //for hosting a game.
    function CreateMultiplayerLobby() {
        if (nameInput == null) return;
        //Create multiplayer room
        //create new networked player.
        SocketController.CreateRoom(nameInput, nameInput, ChangeScreen);
    }

    //for when a player wants to join a friend
    function JoinMultiplayerLobby() {
        if (nameInput == null) return;
        //Join existing lobby.
        SocketController.JoinRoom(lobbyName, nameInput, ChangeScreen);
    }

    //callback for when player has joined a room/lobby
    function ChangeScreen(msg) {
        console.log(msg);
        props.lobbyaction(nameInput);
    }

    return (
        <div className="flex justify-center items-center flex-col my-auto">
            <div className="text-6xl font-kanit mb-4">
                Welcome To Trivia Night!
            </div>
            <input
                onChange={SetInput}
                className="p-2 rounded-xl text-black mt-4 w-2/3"
                placeholder="Player Name"
            ></input>
            <button
                disabled={nameInput == null}
                onClick={() => props.action(nameInput)}
                className={GetButtonStyle()}
            >
                Start Game
            </button>
            <div className="w-full flex justify-center mt-3 gap-2">
                <div className="flex flex-1 justify-end">
                    <button
                        disabled={nameInput == null}
                        onClick={CreateMultiplayerLobby}
                        className="font-kanit text-2xl w-2/3 h-20 bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-orange-700 hover:border-orange-500 rounded"
                    >
                        Create Lobby
                    </button>
                </div>
                <div className="flex-1">
                    <button
                        disabled={nameInput == null}
                        onClick={JoinMultiplayerLobby}
                        className="font-kanit text-3xl w-2/3 h-20 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
                    >
                        Join Lobby
                    </button>
                    <input
                        onChange={(e) => setLobbyNameInput(e.target.value)}
                        className="p-2 rounded-xl text-black mt-4 w-2/3"
                        placeholder="Lobby Name"
                    ></input>
                </div>
            </div>
            {/* Player Input name here. */}
            {/*These empty divs are to init the css class so they arnt removed on build. */}
            <button className="font-kanit bg-red-500 hover:bg-blue-400  border-red-700 hover:border-red-500 rounded"></button>
            <button className=" bg-green-500 hover:bg-green-400 border-green-700 hover:border-green-500"></button>
            <button className=" bg-yellow-500 hover:bg-yellow-400  border-yellow-700 hover:border-yellow-500"></button>
        </div>
    );
}

export default StartScreen;
