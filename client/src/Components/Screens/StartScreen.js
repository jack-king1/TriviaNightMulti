import { useContext, useState } from "react";

function StartScreen(props) {
    const [nameInput, setNameInput] = useState(null);

    function GetButtonStyle() {
        if (nameInput == null || nameInput != "") {
            return "font-kanit text-3xl w-2/3 h-20 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded";
        }

        return "font-kanit text-3xl w-2/3 h-20 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded";
    }

    function SetInput(value) {
        console.log(value.target.value);
        setNameInput(value.target.value);
    }
    return (
        <div className="flex justify-center items-center flex-col my-auto">
            <div className="text-6xl font-kanit mb-4">
                Welcome To Trivia Night!
            </div>
            <button
                disabled={nameInput == null}
                onClick={() => props.action(nameInput)}
                className={GetButtonStyle()}
            >
                Start Game
            </button>
            <input
                onChange={SetInput}
                className="p-2 rounded-xl text-black mt-4 w-2/3"
                placeholder="Player Name"
            ></input>
            {/* Player Input name here. */}
            <button className="font-kanit bg-red-500 hover:bg-blue-400  border-red-700 hover:border-red-500 rounded"></button>
            <button className=" bg-green-500 hover:bg-green-400 border-green-700 hover:border-green-500"></button>
            <button className=" bg-yellow-500 hover:bg-yellow-400  border-yellow-700 hover:border-yellow-500"></button>
        </div>
    );
}

export default StartScreen;
