import React from "react";
import Login from "./login";
import ListComponent from "./listComponent";
import Register from "./register";
import { useNavigate } from "react-router-dom";
import coinIcon from "../assets/coin-logo.gif";



const LandingPage=()=>{
    const navigate = useNavigate();
    return(
        <div className="h-screen flex flex-col justify-start ">
            <div className="flex justify-between items-center p-5">
            <div className="flex justify-start items-start w-20 h-20">
                <img src={coinIcon} alt="logo" />
            </div>
            <div className="flex justify-end items-end gap-4  ">
                <button className="button-style" onClick={()=>{navigate("/login")}}>Login</button>
                <button className="button-style" onClick={()=>{navigate("/register")}}>Register</button>
            </div>
            </div>
            <div className="flex justify-center items-center"><ListComponent/></div>
        </div>
    )
}           
export default LandingPage;