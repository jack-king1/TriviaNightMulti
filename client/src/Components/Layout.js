import React from "react";
import Navbar from "./Navbar";
import Home from "./Home";

function Layout() {
    return (
        <div className="w-full h-screen flex flex-col">
            <Navbar />
            <Home />
        </div>
    );
}

export default Layout;
