import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Link ,useNavigate} from "react-router-dom";
import { useRef } from "react";
import { BACKEND_URL } from "../config";
import  axios  from "axios";

export const Signup = () => {
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const navigate  = useNavigate();

  async function signUp() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
      username,
      password
    });
    
    const jwt = response.data.token;
    localStorage.setItem('token', jwt);
    
    navigate('/dashboard');
    alert("You have signed up!");
  }
  return (
    <div className="h-screen w-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">Sign Up</h2>
        <div className="space-y-4">
          <div className="w-full">
            <Input ref={usernameRef} placeholder="Username" />
          </div>
          <div className="w-full">
            <Input ref={passwordRef} placeholder="Password"  />
          </div>
          <div className="w-full flex justify-center">
            <Button onClick={signUp} variant="primary" text="Sign Up" />
          </div>
        </div>
        <p className="text-sm text-gray-600 text-center mt-4">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-blue-500 font-medium hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};
