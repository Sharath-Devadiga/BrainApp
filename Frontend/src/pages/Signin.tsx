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
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col justify-center items-center px-4 py-8 sm:px-6">
      <div className="mb-6 sm:mb-8">
        <Link to="/" className="flex items-center gap-2.5 sm:gap-3 hover:scale-105 transition-transform active:scale-95">
          <img src="/brain.png" alt="Brain Logo" className="w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg" />
          <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">Brain</span>
        </Link>
      </div>

      <div className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-md border-2 border-gray-100">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-2">
          {showForgotPassword ? "Reset Password" : "Welcome Back"}
        </h2>
        <p className="text-sm sm:text-base text-gray-600 text-center mb-6 sm:mb-8">
          {showForgotPassword ? "Enter your username and new password" : "Sign in to access your brain"}
        </p>

        {error && (
          <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3.5 rounded-xl mb-5 text-sm sm:text-base font-medium">
            {error}
          </div>
        )}

        {resetMessage && (
          <div className="bg-green-50 border-2 border-green-200 text-green-700 px-4 py-3.5 rounded-xl mb-5 text-sm sm:text-base font-medium">
            {resetMessage}
          </div>
        )}

        <div className="space-y-4 sm:space-y-5" onKeyPress={handleKeyPress}>
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
                  className="py-3.5 text-base sm:text-lg font-bold shadow-lg hover:shadow-xl"
                />
                <Button 
                  onClick={() => {
                    setShowForgotPassword(false);
                    setError("");
                    setResetMessage("");
                    if (passwordRef.current) passwordRef.current.value = "";
                    if (newPasswordRef.current) newPasswordRef.current.value = "";
                    if (confirmPasswordRef.current) confirmPasswordRef.current.value = "";
                  }} 
                  variant="secondary" 
                  text="Back to Sign In" 
                  fullWidth={true}
                  disabled={loading}
                  className="py-3.5 text-base sm:text-lg font-bold"
                />
              </div>
            ) : (
              <Button 
                onClick={signIn} 
                variant="primary" 
                text={loading ? "Signing in..." : "Sign In"} 
                fullWidth={true}
                disabled={loading}
                className="py-3.5 text-base sm:text-lg font-bold shadow-lg hover:shadow-xl"
              />
            )}
          </div>
        </div>

        {!showForgotPassword && (
          <div className="text-center mt-5">
            <button
              onClick={() => {
                setShowForgotPassword(true);
                setError("");
                setResetMessage("");
                if (passwordRef.current) passwordRef.current.value = "";
              }}
              className="text-sm sm:text-base text-indigo-600 hover:text-indigo-700 font-semibold transition-colors active:scale-95"
            >
              Forgot Password?
            </button>
          </div>
        )}

        <p className="text-sm sm:text-base text-gray-600 text-center mt-6 sm:mt-8">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-600 font-bold hover:text-indigo-700 transition-colors active:scale-95 inline-block"
          >
            Sign Up
          </Link>
        </p>
      </div>

      <p className="text-gray-500 text-xs sm:text-sm mt-6 sm:mt-8 text-center">
        © 2025 Brain App. All rights reserved.
      </p>
    </div>
  );
};