import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useRef } from "react";


export const Signin = () => {

    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const navigate  = useNavigate();

  async function signIn() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`,{
       
        username,
        password
      
    })
    const jwt = response.data.token
    localStorage.setItem('token',jwt)
    navigate('/dashboard')
  }
  return (
    <div className="h-screen w-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">Sign In</h2>
        <div className="space-y-4">
          <div className="w-full">
            <Input ref={usernameRef} placeholder="Username" />
          </div>
          <div className="w-full">
            <Input ref={passwordRef} placeholder="Password" />
          </div>
          <div className="w-full flex justify-center">
            <Button onClick={signIn} variant="primary" text="Sign In" />
          </div>
        </div>
        <p className="text-sm text-gray-600 text-center mt-4">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-500 font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};
