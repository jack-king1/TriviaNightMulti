import React, { useState, useEffect, useContext } from "react";
import { TriviaContext } from "../TriviaContexts";
function TimerBar(props) {
    const [count, setCount] = useState(props.maxTime);
    const triviaContext = useContext(TriviaContext);

    function ResetTimer() {
        setCount(props.maxTime);
    }

    useEffect(() => {
        triviaContext.subscribe("userGuess", ResetTimer);
    }, []);

    useEffect(() => {
        if (count <= 0) {
            //callback function here.
            props.action();
            setCount(props.maxTime);
        } // Exit early when count reaches 0

        const timer = setInterval(() => {
            setCount((prevCount) => prevCount - 1);
        }, 1000);

        return () => clearInterval(timer); // Cleanup function
    }, [count]);
    return <div className="text-center text-6xl text-amber-400">{count}</div>;
}

export default TimerBar;
