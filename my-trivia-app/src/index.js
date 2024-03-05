import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { TriviaContext, TriviaProvider } from "./TriviaContexts";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <TriviaProvider>
        <App />
    </TriviaProvider>
);
