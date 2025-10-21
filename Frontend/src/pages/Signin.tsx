import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useRef } from "react";

export const Signin = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function signIn() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
      username,
      password,
    });
    const jwt = response.data.token;
    localStorage.setItem("token", jwt);
    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col justify-center items-center px-4">
      {/* Logo */}
      <div className="mb-8">
        <Link to="/" className="text-4xl font-bold text-indigo-500">
          🧠 Brain
        </Link>
      </div>

      {/* Sign In Card */}
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">
          Welcome Back
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Sign in to access your brain
        </p>

        <div className="space-y-5">
          <div className="w-full">
            <Input ref={usernameRef} placeholder="Username" />
          </div>
          <div className="w-full">
            <Input ref={passwordRef} placeholder="Password" />
          </div>
          <div className="w-full pt-2">
            <Button onClick={signIn} variant="primary" text="Sign In" fullWidth={true} />
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

      {/* Footer */}
      <p className="text-gray-500 text-sm mt-8">
        © 2025 Brain App. All rights reserved.
      </p>
    </div>
  );
};