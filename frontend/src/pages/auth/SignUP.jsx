import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Inputs from "../../components/inputs/Inputs";
import ProfileImageUpload from "../../components/inputs/Profile";
import { validateEmail } from "../../utils/helper";
import { UserContext } from "../../context/UserContext";
import { uploadImage } from "../../utils/uploadImage";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const SignUp = ({ setCurrentPage }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const {updateUser} = useContext(UserContext);

  const navigate = useNavigate();

  // Handle Sign Up Form Submit
  const handleSignUp = async (e) => {
    e.preventDefault();
    // Handle sign-up logic here
     let profileImageUrl = "";
    if(!fullName){
      setError("Please enter Your Full Name!");
      return;
    }

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
      if(profilePic){
        
        const imgUploader = await uploadImage(profilePic);
        profileImageUrl = imgUploader.imageUrl || "";
        
      }
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
        name : fullName,
        email,
        password,
        profileImageUrl
      })
      const {token} = response.data;
      if(token){
        localStorage.setItem("token" , token);
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
    <div className="max-w-md w-full mx-auto bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold mb-2 text-center">Create an Account</h3>
      <p className="text-sm text-gray-600 text-center mb-6">
        Join us today by entering your details below.
      </p>

      <form onSubmit={handleSignUp} className="space-y-4">

        <ProfileImageUpload image={profilePic} setImage={setProfilePic}/>
        <Inputs
          value={fullName}
          onChange={({ target }) => setFullName(target.value)}
          label="Full Name"
          placeholder="John"
          type="text"
        />

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

        {error && (
          <p className="text-red-500 text-xs pb-2.5">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          SIGN UP
        </button>
      </form>

      <p className="text-sm text-center text-gray-600 mt-4">
        Already an account?{" "}
        <button
          className="text-blue-600 hover:underline"
          onClick={() => setCurrentPage("login")}
        >
          Login
        </button>
      </p>
    </div>
  );
};

export default SignUp;
