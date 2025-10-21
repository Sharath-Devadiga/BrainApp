import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "../src/pages/Dashboard";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { SharedContentPage } from "./pages/SharedContentPage";
import Landing from "./pages/Landing";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/share/:hash" element={<SharedContentPage />} />
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
