import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { PasswordInput } from "../components/PasswordInput";

export const Signin = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetMessage, setResetMessage] = useState("");

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

  async function handleForgotPassword() {
    const username = usernameRef.current?.value;
    const newPassword = newPasswordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;
    
    if (!username) {
      setError("Please enter your username");
      return;
    }

    if (!newPassword || !confirmPassword) {
      setError("Please enter and confirm your new password");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResetMessage("");
      
      const response = await api.post("/user/forgot-password", { 
        username, 
        newPassword 
      });
      
      setResetMessage(response.data.message || "Password reset successful! You can now sign in with your new password.");
      
      if (usernameRef.current) usernameRef.current.value = "";
      if (newPasswordRef.current) newPasswordRef.current.value = "";
      if (confirmPasswordRef.current) confirmPasswordRef.current.value = "";
      
      setTimeout(() => {
        setShowForgotPassword(false);
        setResetMessage("");
      }, 2000);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to reset password. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (showForgotPassword) {
        handleForgotPassword();
      } else {
        signIn();
      }
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
          {showForgotPassword ? "Reset Password" : "Welcome Back"}
        </h2>
        <p className="text-gray-600 text-center mb-8">
          {showForgotPassword ? "Enter your username and new password" : "Sign in to access your brain"}
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {resetMessage && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
            {resetMessage}
          </div>
        )}

        <div className="space-y-5" onKeyPress={handleKeyPress}>
          <div className="w-full">
            <Input ref={usernameRef} placeholder="Username" />
          </div>
          {showForgotPassword ? (
            <>
              <div className="w-full">
                <PasswordInput ref={newPasswordRef} placeholder="New Password" />
              </div>
              <div className="w-full">
                <PasswordInput ref={confirmPasswordRef} placeholder="Confirm New Password" />
              </div>
            </>
          ) : (
            <div className="w-full">
              <PasswordInput ref={passwordRef} placeholder="Password" />
            </div>
          )}
          <div className="w-full pt-2">
            {showForgotPassword ? (
              <div className="space-y-3">
                <Button 
                  onClick={handleForgotPassword} 
                  variant="primary" 
                  text={loading ? "Sending..." : "Reset Password"} 
                  fullWidth={true}
                  disabled={loading}
                />
                <Button 
                  onClick={() => {
                    setShowForgotPassword(false);
                    setError("");
                    setResetMessage("");
                    // Clear password fields when switching back
                    if (passwordRef.current) passwordRef.current.value = "";
                    if (newPasswordRef.current) newPasswordRef.current.value = "";
                    if (confirmPasswordRef.current) confirmPasswordRef.current.value = "";
                  }} 
                  variant="secondary" 
                  text="Back to Sign In" 
                  fullWidth={true}
                  disabled={loading}
                />
              </div>
            ) : (
              <Button 
                onClick={signIn} 
                variant="primary" 
                text={loading ? "Signing in..." : "Sign In"} 
                fullWidth={true}
                disabled={loading}
              />
            )}
          </div>
        </div>

        {!showForgotPassword && (
          <div className="text-center mt-4">
            <button
              onClick={() => {
                setShowForgotPassword(true);
                setError("");
                setResetMessage("");
                // Clear password field when switching to forgot password
                if (passwordRef.current) passwordRef.current.value = "";
              }}
              className="text-sm text-indigo-500 hover:text-indigo-600 font-medium transition-colors"
            >
              Forgot Password?
            </button>
          </div>
        )}

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