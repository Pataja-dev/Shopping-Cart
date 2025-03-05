"use client"
import React, { useState } from 'react';
import { useMutation } from "convex/react"; // Adjust this import based on your setup
import { api } from "../../../convex/_generated/api"; // Adjust the import path as necessary
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

interface AuthProps {
  onLogin: (username: string, password: string) => void;
  onSignup: (username: string, email: string, password: string) => void;
  isLoading: boolean;
  error: string | null;
}

const Auth: React.FC<AuthProps> = ({ onLogin, onSignup, isLoading, error }) => {
  const signUp = useMutation(api.user.create); // Use the correct hook for the mutation
  const login = useMutation(api.user.login); // Assuming you have a login mutation defined
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoginMode) {
      try {
        await login({ username: username, password });
        // setSuccess("Login successful!");
        router.push("/"); 
      } catch (error) {
        // setError("Login failed. Please try again.");
        console.error(error);
      }
      onLogin(username, password);
    } else {
      try {
        await signUp({ username: username, email, password });
        // setSuccess("Sign up successful!"); 
        // redirect("/")
        setIsLoginMode((prevMode) => !prevMode)
      } catch (error) {
        // setError("Sign up failed. Please try again."); 
        console.error(error); 
      }
      onSignup(username, email, password);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          {isLoginMode ? 'Login' : 'Sign Up'}
        </h2>
        <form onSubmit={handleSubmit}>
          {!isLoginMode && (
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter your username"
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            {isLoading ? 'Loading...' : isLoginMode ? 'Login' : 'Sign Up'}
          </button>
          <button
            type="button"
            onClick={() => setIsLoginMode((prevMode) => !prevMode)}
            className="w-full text-blue-500 py-2 mt-4"
          >
            {isLoginMode ? 'Switch to Sign Up' : 'Switch to Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;