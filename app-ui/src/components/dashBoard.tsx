// src/pages/Dashboard.tsx
import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { AuthState, logout } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import ListComponent from './listComponent';
import coinIcon from "../assets/coin-logo.gif";
import userIcon from "../assets/userIcon.svg";
const Dashboard: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth as AuthState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showUser, setShowUser] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setShowUser((prev) => !prev);
  const onKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = (e) => {
    if (e.key === 'Escape') setShowUser(false);
  };

  return (
    <div className="p-6">
      
      <div className="flex justify-between items-center p-5">
        <div className="flex justify-start items-start w-20 h-20">
          <img src={coinIcon} alt="logo" />
        </div>
        <div className="flex justify-end items-center gap-4  ">
        <h1 className="text-2xl font-bold">Welcome, {user?.firstName}!</h1>
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              className=" flex items-center gap-2"
              aria-haspopup="menu"
              aria-expanded={showUser}
              onClick={toggleMenu}
              onKeyDown={onKeyDown}
            >
              <div className="relative w-10 h-10 overflow-hidden flex justify-center items-center bg-gray-100 rounded-full dark:bg-gray-600">
              <img src={userIcon} alt="profile" className="w-6 h-6" />
              </div>
             
              <svg className={`w-6 h-6 transition-transform ${showUser ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor"><path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" /></svg>
            </button>
            {showUser && (
              <div
                role="menu"
                aria-label="User menu"
                className="absolute right-0 mt-2 w-56 rounded-md border bg-white shadow-lg z-10"
              >
                <div className="px-4 py-3">
                  <p className="text-sm text-gray-500">Signed in as</p>
                  <p className="text-sm font-medium text-gray-900 truncate">{user?.firstName} {user?.lastName}</p>
                  <p className="text-sm text-gray-700 truncate">{user?.email}</p>
                </div>
              </div>
            )}
          </div>
          <button
            onClick={() => {
              dispatch(logout());
              navigate("/landing");
            }}
            className="button-style"
          >
            Logout
          </button>
        </div>
      </div>



      <ListComponent />
    </div>
  );
};

export default Dashboard;
