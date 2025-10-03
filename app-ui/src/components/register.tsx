// src/pages/Register.tsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthState, registerRequest } from "../store/slices/authSlice";
import { RootState } from "../store";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state: RootState) => state.auth as AuthState);

  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerRequest({ user: form, password: form.password }));
  };

  if (user) navigate("/dashboard");

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-bold">Register</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        value={form.email}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        required
        value={form.firstName}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        required
        value={form.lastName}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        value={form.password}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <button
        type="submit"
        className="button-style"
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
};

export default Register;
