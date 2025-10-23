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
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col justify-center items-center px-4 py-8 sm:px-6">
      <div className="mb-6 sm:mb-8">
        <Link to="/" className="flex items-center gap-2.5 sm:gap-3 hover:scale-105 transition-transform active:scale-95">
          <img src="/brain.png" alt="Brain Logo" className="w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg" />
          <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">Brain</span>
        </Link>
      </div>

      <div className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-md border-2 border-gray-100">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-2">
          Create Account
        </h2>
        <p className="text-sm sm:text-base text-gray-600 text-center mb-6 sm:mb-8">
          Start building your second brain today
        </p>

        {error && (
          <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3.5 rounded-xl mb-5 text-sm sm:text-base font-medium">
            {error}
          </div>
        )}

        <div className="space-y-4 sm:space-y-5" onKeyPress={handleKeyPress}>
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
              className="py-3.5 text-base sm:text-lg font-bold shadow-lg hover:shadow-xl"
            />
          </div>
        </div>

        <p className="text-sm sm:text-base text-gray-600 text-center mt-6 sm:mt-8">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-indigo-600 font-bold hover:text-indigo-700 transition-colors active:scale-95 inline-block"
          >
            Sign In
          </Link>
        </p>
      </div>

      <p className="text-gray-500 text-xs sm:text-sm mt-6 sm:mt-8 text-center">
        © 2025 Brain App. All rights reserved.
      </p>
    </div>
  );
};