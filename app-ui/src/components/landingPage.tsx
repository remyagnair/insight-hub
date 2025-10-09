import React, { useState } from "react";
import Login from "./login";
import ListComponent from "./listComponent";
import Register from "./register";
import { useNavigate } from "react-router-dom";
import coinIcon from "../assets/coin-logo.gif";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import type { AuthState } from "../store/slices/authSlice";



const LandingPage=()=>{
    const navigate = useNavigate();
    const { user } = useSelector((state: RootState) => state.auth as AuthState);
    const [open, setOpen] = useState(false);
    return(
        <div className="h-screen flex flex-col justify-start ">
            <div className="flex justify-between items-center p-5">
            <div className="flex justify-start items-start w-20 h-20">
                <img src={coinIcon} alt="logo" />
            </div>
            <div className="flex justify-end items-end gap-4  ">
                {user ? (
                    <div className="relative">
                        <button
                          type="button"
                          className="button-style flex items-center gap-2"
                          aria-haspopup="menu"
                          aria-expanded={open}
                          onClick={() => setOpen((p) => !p)}
                        >
                          <span className="font-medium">{user.firstName} {user.lastName}</span>
                          <svg className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor"><path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"/></svg>
                        </button>
                        {open && (
                          <div role="menu" aria-label="User menu" className="absolute right-0 mt-2 w-56 rounded-md border bg-white shadow-lg z-10">
                            <div className="px-4 py-3">
                              <p className="text-sm text-gray-500">Signed in as</p>
                              <p className="text-sm font-medium text-gray-900 truncate">{user.firstName} {user.lastName}</p>
                              <p className="text-sm text-gray-700 truncate">{user.email}</p>
                            </div>
                          </div>
                        )}
                    </div>
                ) : (
                    <>
                      <button className="button-style" onClick={()=>{navigate("/login")}}>Login</button>
                      <button className="button-style" onClick={()=>{navigate("/register")}}>Register</button>
                    </>
                )}
            </div>
            </div>
            <div className="flex justify-center items-center"><ListComponent/></div>
        </div>
    )
}           
export default LandingPage;