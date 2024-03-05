import React from "react";
import Logo from "../Images/logo.png";
function Navbar() {
    return (
        <div className=" w-full min-h-4 h-28 bg-navbg flex flex-row justify-between p-4 items-center">
            <img className="max-h-10 object-scale-down" src={Logo}></img>
            <div className="flex flex-row gap-4 text-white text-3xl">
                <div>Home</div>
                <div>Games</div>
                <div>Contact</div>
            </div>
        </div>
    );
}

export default Navbar;
