import React from 'react';

import './App.css';
import './index.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector } from "./store/hooks";
import type { RootState } from "./store";
import type { AuthState } from "./store/slices/authSlice";

import Login from "./components/login";
import Register from "./components/register";
import Dashboard from "./components/dashBoard";
function App() {
  const user = useAppSelector((state: RootState) => (state.auth as AuthState).user);
  return (
    <div className="App">
   
      <Router>
        <Routes>
          {/* Default route based on auth state */}
          <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              user ? <Dashboard /> : <Navigate to="/login" replace />
            }
          />
          {/* Fallback: send users based on auth state */}
          <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} replace />} />
        </Routes>
      </Router>
    
    </div>
  );
}

export default App;
