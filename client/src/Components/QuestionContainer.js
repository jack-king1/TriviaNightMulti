import React, { useState, useEffect, useContext } from "react";
import { TriviaContext } from "../TriviaContexts";
import StartScreen from "./Screens/StartScreen";
import BooleanLayout from "./Questions/BooleanLayout";
import MultipleLayout from "./Questions/MultipleLayout";
import QuizScreen from "./Screens/QuizScreen";
import EndGameScreen from "./Screens/EndGameScreen";
import LobbyScreen from "./Screens/LobbyScreen";

function QuestionContainer(props) {
    const triviaContext = useContext(TriviaContext);
    const [startQuiz, setStartQuiz] = useState(false);

    const colours = ["green", "red", "blue", "yellow"];

    async function StartQuiz(playerName) {
        //load trivia questions here.
        triviaContext.fetchData(playerName);
    }

    function GoToLobby(playerName) {
        triviaContext.SetGameState("LOBBY");
        triviaContext.PlayerName(playerName);
    }

    function GetScreen() {
        switch (triviaContext.gameState) {
            case "START":
                return (
                    <StartScreen action={StartQuiz} lobbyaction={GoToLobby} />
                );
            case "LOBBY":
                return <LobbyScreen />;
            case "GAME":
                return <QuizScreen colours={colours} />;
            case "END":
                return <EndGameScreen />;
            default:
                break;
        }
    }

    return (
        <div
            className={`text-white flex w-full h-full ${
                triviaContext != "GAME" ? "justify-center" : "justify-start"
            }`}
        >
            {GetScreen()}
        </div>
    );
}

export default QuestionContainer;
