import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { TriviaContext, TriviaProvider } from "./TriviaContexts";
import socket from "./API/WebSocket";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <TriviaProvider>
        <App />
    </TriviaProvider>
);
