import React, { useState, useEffect, useContext } from "react";
import { TriviaContext } from "../TriviaContexts";
import StartScreen from "./Screens/StartScreen";
import BooleanLayout from "./Questions/BooleanLayout";
import MultipleLayout from "./Questions/MultipleLayout";
import QuizScreen from "./Screens/QuizScreen";
import EndGameScreen from "./Screens/EndGameScreen";

function QuestionContainer(props) {
    const triviaContext = useContext(TriviaContext);
    const [startQuiz, setStartQuiz] = useState(false);

    const colours = ["green", "red", "blue", "yellow"];

    function StartQuiz(playerName) {
        triviaContext.SetGameState("GAME");
        triviaContext.PlayerName(playerName);
    }

    function GetScreen() {
        switch (triviaContext.gameState) {
            case "START":
                return <StartScreen action={StartQuiz} />;

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
            className={`text-white flex h-full ${
                triviaContext != "GAME"
                    ? "justify-center items-center"
                    : "justify-start"
            }`}
        >
            {GetScreen()}
        </div>
    );
}

export default QuestionContainer;
