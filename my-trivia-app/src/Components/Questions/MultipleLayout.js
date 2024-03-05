import { useState, useContext } from "react";
import AnswerBtn from "../Btns/AnswerBtn";
import { TriviaContext } from "../../TriviaContexts";

function MultipleLayout(props) {
    const triviaContext = useContext(TriviaContext);

    return (
        <div className="flex flex-col gap-4 items-center justify-center flex-grow">
            {console.log("Context: ", triviaContext.GetPossibleAnswers())}
            <div className="grid grid-cols-4 items-center justify-center w-full gap-4">
                {triviaContext.GetPossibleAnswers().map((answer, index) => {
                    return (
                        <AnswerBtn
                            key={index}
                            action={triviaContext.UserGuess}
                            answer={triviaContext.decodeHtml(answer)}
                            color={props.colors[index]}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default MultipleLayout;
