import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Inputs";
import SpinnerLoader from "../../components/loader/spinnerLoader";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const CreateSessionForm = () => {
  const [formData, setFormData] = useState({
    role: "",
    experience: "",
    topicsToFocus: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleCreateSession = async (e) => {
    e.preventDefault();
    const { role, experience, topicsToFocus } = formData;

    if (!role || !experience || !topicsToFocus) {
      setError("Please fill all the required fields.");
      return;
    }
    setError("");
    setIsLoading(true);
    try {
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role,
          experience,
          topicsToFocus,
          numberOfQuestions: 10,
        }
      );
      const generatedQuestions = aiResponse.data;
      const response = await axiosInstance.post(API_PATHS.SESSION.CREATE, {
        ...formData,
        questions: generatedQuestions,
      });
      if (response.data?.session?._id) {
        navigate(`/prep-grid/${response.data?.session?._id}`);
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("something went wrong. please try again");
      }
    } finally {
      setIsLoading(false);
    }

    // This part of the code is not shown in the image, so it's incomplete
  };

  return (
    <div className="w-[90vw] md:w-[35vw] p-6  rounded-lg shadow-md text-white ">
      <h3 className="text-3xl font-bold mb-4 text-center text-black/80">
        Start a New Interview Journey
      </h3>
      <p className="text-gray-800 mb-6 text-center">
        Fill out a few quick details and unlock your personalized set of
        interview questions!
      </p>

      <form onSubmit={handleCreateSession} className="space-y-4 flex-col flex ">
        {/* Input for Target Role */}

        <Input
          id="role"
          value={formData.role}
          onChange={({ target }) => handleChange("role", target.value)}
          placeholder="(e.g., Frontend Developer, UI/UX Designer, etc.)"
          type="text"
          label="Target role"
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-600 placeholder:text-neutral-800"
        />

        {/* Input for Years of Experience */}

        <Input
          id="experience"
          value={formData.experience}
          onChange={({ target }) => handleChange("experience", target.value)}
          placeholder="(e.g., 1 year, 3 years, 5+ years)"
          type="number"
          label=" Years of Experience"
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none  text-white"
        />

        {/* Input for Topics to Focus On */}

        <Input
          id="topicsToFocus"
          value={formData.topicsToFocus}
          onChange={({ target }) => handleChange("topicsToFocus", target.value)}
          placeholder="(Comma-separated, e.g., React, Node.js, MongoDB)"
          type="text"
          label="Topics to Focus On"
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
        />

        {/* Input for Description */}

        <Input
          id="description"
          value={formData.description}
          onChange={({ target }) => handleChange("description", target.value)}
          placeholder="(Any specific goals or notes for this session)"
          type="text"
          label="Description"
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-500 text-white"
        />

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-black hover:bg-neutral-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none   disabled:cursor-not-allowed transition duration-300 flex items-center justify-center gap-2"
          disabled={isLoading}
        >
          {isLoading && <SpinnerLoader />} Create Session
        </button>
      </form>
    </div>
  );
};

export default CreateSessionForm;
