import { useState, useContext } from "react";
import AnswerBtn from "../Btns/AnswerBtn";
import { TriviaContext } from "../../TriviaContexts";

function BooleanLayout(props) {
    const triviaContext = useContext(TriviaContext);

    return (
        <div className="flex flex-row gap-4 items-center justify-center flex-grow">
            {console.log(triviaContext)}
            <AnswerBtn
                action={triviaContext.UserGuess}
                answer={"True"}
                color={"green"}
            />
            <AnswerBtn
                action={triviaContext.UserGuess}
                answer={"False"}
                color={"red"}
            />
        </div>
    );
}

export default BooleanLayout;
