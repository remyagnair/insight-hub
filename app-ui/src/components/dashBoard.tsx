// src/pages/Dashboard.tsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { AuthState, logout } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import ListComponent from './listComponent';
const Dashboard: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth as AuthState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome, {user?.firstName}!</h1>
      <p>Email: {user?.email}</p>
      <p>Name: {user?.firstName} {user?.lastName}</p>
      <button
        onClick={() => {
          dispatch(logout());
          navigate("/login");
        }}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
      <ListComponent/>
    </div>
  );
};

export default Dashboard;
