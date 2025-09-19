import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Inputs from "../../components/inputs/Inputs";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContext";

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const {updateUser} = useContext(UserContext);

  const navigate = useNavigate();

  // Handle Login Form Submit
  const handleLogin = async (e) => {
    e.preventDefault();
  
    // Basic validations
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
  
    if (!password) {
      setError("Please enter the password.");
      return;
    }
  
    // Clear previous error
    setError("");
  
    // API call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
        email,
        password,
      });
     
      const {token} = response.data;
      if(token){
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }
      // await axios.post(...) or your login API
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };
  
  return (
    <div className="">
      <h3 className="">Welcome Back</h3>
      <p className="">Please enter your details to log in</p>

      <form onSubmit={handleLogin}>
        <Inputs
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label="Email Address"
          placeholder="john@example.com"
          type="text"
        />

        <Inputs
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          label="Password"
          placeholder="Min 8 Characters"
          type="password"
        />
        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          LOGIN
        </button>

        <p className="text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <button
            className="text-blue-600 hover:underline"
            onClick={() => {
              setCurrentPage("signup");
            }}
          >
            SignUp
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
