import { useState, useContext } from "react";
import { TriviaContext } from "../../TriviaContexts";
import BooleanLayout from "../Questions/BooleanLayout";
import MultipleLayout from "../Questions/MultipleLayout";
import TimerBar from "../TimerBar";

function QuizScreen(props) {
    const triviaContext = useContext(TriviaContext);

    //add context here.
    return (
        <div className="w-full h-full flex flex-col">
            <div className="col-span-4 text-start text-2xl flex justify-between mb-6">
                <div className="text-4xl">
                    Q:{triviaContext.playerQuestionCount + 1}{" "}
                    {triviaContext.decodeHtml(
                        triviaContext.GetCurrentQuestion().category
                    )}
                </div>
                <div className="text-3xl font-bold">
                    Score: {triviaContext.score}
                </div>
            </div>
            <div className="col-span-4 text-5xl pt-4 text-center mb-12">
                {triviaContext.decodeHtml(
                    triviaContext.GetCurrentQuestion().question
                )}
            </div>
            {triviaContext.GetCurrentQuestion().type == "boolean" ? (
                <BooleanLayout colors={props.colors} />
            ) : (
                <MultipleLayout colors={props.colours} />
            )}
            <div>
                <TimerBar
                    action={triviaContext.TimeOut}
                    maxTime={triviaContext.maxTimer}
                />
            </div>
        </div>
    );
}

export default QuizScreen;
