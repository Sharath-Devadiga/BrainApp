import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export const Signin = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function signIn() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await api.post("/user/signin", {
        username,
        password,
      });
      
      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Sign in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      signIn();
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col justify-center items-center px-4">
      <div className="mb-8">
        <Link to="/" className="text-4xl font-bold text-indigo-500">
          🧠 Brain
        </Link>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">
          Welcome Back
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Sign in to access your brain
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <div className="space-y-5" onKeyPress={handleKeyPress}>
          <div className="w-full">
            <Input ref={usernameRef} placeholder="Username" />
          </div>
          <div className="w-full">
            <Input ref={passwordRef} placeholder="Password" type="password" />
          </div>
          <div className="w-full pt-2">
            <Button 
              onClick={signIn} 
              variant="primary" 
              text={loading ? "Signing in..." : "Sign In"} 
              fullWidth={true}
              disabled={loading}
            />
          </div>
        </div>

        <p className="text-sm text-gray-600 text-center mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-500 font-semibold hover:text-indigo-600 transition-colors"
          >
            Sign Up
          </Link>
        </p>
      </div>

      <p className="text-gray-500 text-sm mt-8">
        © 2025 Brain App. All rights reserved.
      </p>
    </div>
  );
};