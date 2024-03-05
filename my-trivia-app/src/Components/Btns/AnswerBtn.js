import React from "react";

function AnswerBtn(props) {
    return (
        <button
            onClick={() => props.action(props.answer)}
            className={`col-span-2 font-kanit text-3xl w-full h-full max-h-40 bg-${props.color}-500 hover:bg-${props.color}-400 text-white font-bold py-2 px-4 border-b-4 border-${props.color}-700 hover:border-${props.color}-500 rounded rounded-3xl`}
        >
            {props.answer}
        </button>
    );
}

export default AnswerBtn;
