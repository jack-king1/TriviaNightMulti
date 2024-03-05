import { useState, useEffect, useContext } from "react";
import { TriviaContext } from "../../TriviaContexts";

function ScreenOverlay() {
    const triviaContext = useContext(TriviaContext);
    const [playerAnim, setPlayerAnim] = useState(false);
    const [displayText, setPlayerText] = useState(false);
    const [answerText, setAnswerText] = useState("");

    useEffect(() => {
        triviaContext.subscribe("userGuess", TriggerAnimation);
    }, []);

    function TriggerAnimation(value) {
        console.log("Player Guess: ", value[0]);
        setPlayerAnim(true);
        setPlayerText(value[0]);
        setAnswerText(value[1]);
        console.log("THE CORRECT ANSWER!!!: ", value[1]);
        setTimeout(() => {
            setPlayerAnim(false);
        }, 1900); // Adjust the interval as needed
    }

    return (
        <div
            className={`absolute h-screen w-screen pointer-events-none flex flex-col justify-center items-center ${
                playerAnim ? "animate-slide-in-out" : ""
            }`}
        >
            {playerAnim ? (
                <div className="w-full mx-auto">
                    <div
                        className={`text-8xl text-white w-full text-center mb-4 ${
                            displayText ? "bg-green-500" : "bg-red-500"
                        }`}
                    >
                        <div>{displayText ? "CORRECT!" : "INCORRECT!"}</div>
                        <div className="text-6xl">{answerText}</div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default ScreenOverlay;
