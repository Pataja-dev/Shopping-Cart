import React, { useState } from 'react';

interface AuthProps {
  onLogin: (email: string, password: string) => void;
  onSignup: (username: string, email: string, password: string) => void;
  isLoading: boolean;
  error: string | null;
}

const Auth: React.FC<AuthProps> = ({ onLogin, onSignup, isLoading, error }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoginMode) {
      onLogin(email, password);
    } else {
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