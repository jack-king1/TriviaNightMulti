import React from "react";

export default function StartScreen(props) {
    return (
        <div className="flex justify-center items-center flex-col my-auto">
            <div className="text-6xl font-kanit mb-4">
                Welcome To Trivia Night!
            </div>
            <button
                onClick={props.action}
                className="font-kanit text-3xl w-2/3 h-20 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            >
                Start Game
            </button>
            <button className="font-kanit bg-red-500 hover:bg-blue-400  border-red-700 hover:border-red-500 rounded"></button>
            <button className=" bg-green-500 hover:bg-green-400 border-green-700 hover:border-green-500"></button>
            <button className=" bg-yellow-500 hover:bg-yellow-400  border-yellow-700 hover:border-yellow-500"></button>
        </div>
    );
}
