import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { PasswordInput } from "../components/PasswordInput";

export const Signup = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function signUp() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await api.post("/user/signup", {
        username,
        password,
      });

      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Sign up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      signUp();
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col justify-center items-center px-4">
      <div className="mb-8">
        <Link to="/" className="flex items-center gap-3">
          <img src="/brain.png" alt="Brain Logo" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full" />
          <span className="text-4xl font-bold text-indigo-500">Brain</span>
        </Link>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">
          Create Account
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Start building your second brain today
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
            <PasswordInput ref={passwordRef} placeholder="Password (min 6 characters)" />
          </div>
          <div className="w-full pt-2">
            <Button 
              onClick={signUp} 
              variant="primary" 
              text={loading ? "Creating account..." : "Sign Up"} 
              fullWidth={true}
              disabled={loading}
            />
          </div>
        </div>

        <p className="text-sm text-gray-600 text-center mt-6">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-indigo-500 font-semibold hover:text-indigo-600 transition-colors"
          >
            Sign In
          </Link>
        </p>
      </div>

      <p className="text-gray-500 text-sm mt-8">
        © 2025 Brain App. All rights reserved.
      </p>
    </div>
  );
};