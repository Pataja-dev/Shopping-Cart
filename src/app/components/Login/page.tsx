"use client"
import { useState } from "react";
import { useMutation } from "convex/react"; 
import { api } from "../../../../convex/_generated/api"; 
import { useRouter } from "next/navigation";


export default function LoginForm() {
  const login = useMutation(api.user.login); 
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      await login({ username: userName, password });
      setSuccess("Login successful!");
    } catch (error) {
      setError("Login failed. Please try again.");
      console.error(error);
    }
  };
  const router = useRouter()
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        
        <div className="mb-4">
          <label htmlFor="userName" className="block text-sm font-medium text-gray-700">User Name</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        <button
          onClick={() => router.push('/')}
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Login
        </button>

        {error && <p className="mt-4 text-red-500 text-sm text-center">{error}</p>}
        {success && <p className="mt-4 text-green-500 text-sm text-center">{success}</p>}
        <button
            type="button"
            onClick={() => router.push('/components/Signup')}
            className="w-full text-blue-500 py-2 mt-4"
          >
            Switch to Sign Up
          </button>
      </form>
    </div>
  );
}