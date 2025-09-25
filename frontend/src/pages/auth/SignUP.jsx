import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Inputs from "../../components/inputs/Inputs";
import ProfileImageUpload from "../../components/inputs/Profile";
import { validateEmail } from "../../utils/helper";
import { UserContext } from "../../context/UserContext";
import { uploadImage } from "../../utils/uploadImage";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const SignUp = ({ setCurrentPage, onClose }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  // Handle Sign Up Form Submit
  const handleSignUp = async (e) => {
    e.preventDefault();
    // Handle sign-up logic here
    let profileImageUrl = "";
    if (!fullName) {
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
      if (profilePic) {
        const imgUploader = await uploadImage(profilePic);
        profileImageUrl = imgUploader.imageUrl || "";
      }
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
      });
      const { token } = response.data;
      if (token) {
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
    <div className="min-h-screen flex w-screen relative">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
      >
        <svg
          className="w-4 h-4 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Left Column - Promotional Content */}
      <div className="hidden lg:flex lg:w-3/5 bg-black relative overflow-hidden">
        {/* Dark Tech Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black to-zinc-900"></div>

        {/* Hexagonal Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-16 h-16 border border-white/20 rotate-45"></div>
          <div className="absolute top-32 right-32 w-12 h-12 border border-white/15 rotate-12"></div>
          <div className="absolute bottom-32 left-32 w-20 h-20 border border-white/25 -rotate-12"></div>
          <div className="absolute bottom-20 right-20 w-14 h-14 border border-white/20 rotate-45"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 border border-white/10 rotate-45"></div>
        </div>

        {/* Circuit-like Lines */}
        <div className="absolute inset-0 opacity-15">
          {/* Main circuit path */}
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"></div>
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent"></div>
          <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/25 to-transparent"></div>

          {/* Vertical connectors */}
          <div className="absolute top-1/4 left-1/4 w-px h-32 bg-gradient-to-b from-cyan-400/30 to-transparent"></div>
          <div className="absolute top-1/2 right-1/4 w-px h-24 bg-gradient-to-b from-blue-400/20 to-transparent"></div>
          <div className="absolute bottom-1/4 left-1/2 w-px h-28 bg-gradient-to-b from-purple-400/25 to-transparent"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0">
          {/* Glowing dots */}
          <div className="absolute top-16 left-16 w-3 h-3 bg-cyan-400/40 rounded-full blur-sm animate-pulse"></div>
          <div
            className="absolute top-24 right-24 w-2 h-2 bg-blue-400/50 rounded-full blur-sm animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-24 left-24 w-2.5 h-2.5 bg-purple-400/40 rounded-full blur-sm animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute bottom-16 right-16 w-1.5 h-1.5 bg-cyan-400/60 rounded-full blur-sm animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
        </div>

        {/* Corner Tech Elements */}
        <div className="absolute inset-10">
          <div className="absolute top-8 left-8 w-8 h-8 border-l-2 border-t-2 border-cyan-400/30"></div>
          <div className="absolute top-8 right-8 w-8 h-8 border-r-2 border-t-2 border-blue-400/30"></div>
          <div className="absolute bottom-8 left-8 w-8 h-8 border-l-2 border-b-2 border-purple-400/30"></div>
          <div className="absolute bottom-8 right-8 w-8 h-8 border-r-2 border-b-2 border-cyan-400/30"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-26 text-white">
          <h2 className="text-[3vw] font-bold mb-4 leading-tight text-center px-7">
            Join the Future of Interview Preparation!
          </h2>

          <p className="text-lg text-gray-300">
            Get started with AI-powered learning, personalized questions, and
            comprehensive preparation tools. Your journey to interview success
            begins here.
          </p>
        </div>
      </div>

      {/* Right Column - SignUp Form */}
      <div className="w-full lg:w-2/5 bg-white flex flex-col justify-center px-8 lg:px-16">
        {/* Main Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Create your account
        </h1>

        {/* Login Link */}
        <p className="text-gray-600 mb-8">
          Already have an account?{" "}
          <button
            className="text-blue-600 hover:underline font-medium"
            onClick={() => setCurrentPage("login")}
          >
            Log In
          </button>
        </p>

        {/* SignUp Form */}
        <form onSubmit={handleSignUp} className="space-y-4">
          {/* Profile Image Upload */}
          <div className="flex justify-center mb-4">
            <ProfileImageUpload image={profilePic} setImage={setProfilePic} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              placeholder="Enter your full name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-neutral-500 text-neutral-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-neutral-500 text-neutral-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-neutral-500 text-neutral-700"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-neutral-900 text-neutral-300 py-3 px-4 rounded-lg font-medium hover:bg-neutral-800 transition-colors"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
