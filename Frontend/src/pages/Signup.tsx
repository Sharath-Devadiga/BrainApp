import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import api from "../api";

export const Signup = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function signUp() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    const response = await api.post(`/user/signup`, {
      username,
      password,
    });

    const jwt = response.data.token;
    localStorage.setItem("token", jwt);

    navigate("/dashboard");
    alert("You have signed up!");
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col justify-center items-center px-4">
      <div className="mb-8">
        <Link to="/" className="text-4xl font-bold text-indigo-500">
          🧠 Brain
        </Link>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">
          Create Account
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Start building your second brain today
        </p>

        <div className="space-y-5">
          <div className="w-full">
            <Input ref={usernameRef} placeholder="Username" />
          </div>
          <div className="w-full">
            <Input ref={passwordRef} placeholder="Password"  />
          </div>
          <div className="w-full pt-2">
            <Button onClick={signUp} variant="primary" text="Sign Up" fullWidth={true} />
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