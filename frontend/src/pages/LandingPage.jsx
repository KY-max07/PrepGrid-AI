import React, { useContext, useState } from "react";
import IMG_HERO from "../assets/HER0-IMG.jpg";
import { useNavigate } from "react-router-dom";
import { APP_FEATURES } from "../utils/data";
import Modal from "../components/Modal";
import Login from "./auth/Login";
import SignUP from "./auth/SignUP";
import { UserContext } from "../context/UserContext";
import ProfileInfoCard from "../components/cards/ProfileInfoCard";

const LandingPage = () => {
  const navigate = useNavigate();
  const {user} = useContext(UserContext);

  const [openModal, setOpenModal] = useState(false);
  const [currModal, setCurrModal] = useState("login");

  const HandleCTA = () => {
    if(!user) setOpenModal(true);
    else navigate("/dashboard");
  };
  return (
    <>
      <div className="w-full min-h-full bg-neutral-200">
        <div className="w-[500px] h-[500px] bg-amber-200/20 blur-xl  absolute top-0 left-0" />

        <div className="container mx-auto px-4 pt-6 pb-[200px] relative z-10">
          {/* Header */}
          <header className="flex justify-between items-center mb-16">
            <div className="text-xl text-black font-bold">
              Interview Prep AI
            </div>

            {user ? <ProfileInfoCard/> : <button className="bg-linear-to-r from-[#FF9324] to-[#e99a4b] text-white"
              onClick={() => setOpenModal(true)}
            >
              Login / Sign Up
            </button>}
          </header>
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 pr-4 mb-8 md:mb-0">
              <div className="flex items-center justify-left mb-2">
                <div className="flex items-center gap-2 text-[13px] text-amber-600 font-semibold">
                  AI Powered
                </div>
              </div>

              <h1 className="text-5xl text-black font-medium mb-6 leading-tight">
                Ace Interviews with <br />
                <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,#FF9324,#e99a4b)]">
                  AI-Powered
                </span>{" "}
                Learning
              </h1>
            </div>
            <div className="w-full md:w-1/2">
              <p className="text-[17px] text-gray-900 mr-0 md:mr-20 mb-6">
                Get role-specific questions, expand answers when you need them,
                dive deeper into concepts, and organize everything your way.
                From preparation to mastery — your ultimate interview toolkit is
                here.
              </p>

              <button
                className="bg-black text-sm font-semibold text-white px-7 py-2 rounded-lg shadow-md hover:bg-gray-800 transition duration-300"
                onClick={HandleCTA}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full min-h-full relative z-10">
        <section className="flex items-center justify-center -mt-36 mb-56">
          <img
            src={IMG_HERO}
            alt="Hero Image"
            className="w-[80vw] max-w-4xl rounded-xl shadow-lg object-cover"
          />
        </section>
      </div>
      <div className="w-full min-h-full bg-[#FFFCF9] py-16 px-6">
        <section className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
            Features That Make You Shine
          </h2>

          {/* First 3 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {APP_FEATURES.slice(0, 3).map((feature) => (
              <div
                key={feature.id}
                className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Remaining cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {APP_FEATURES.slice(3).map((feature) => (
              <div
                key={feature.id}
                className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Modal
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
          setCurrModal("login");
        }}
       
        hideHeader
      >
        <div>
          {currModal === "login" && <Login setCurrentPage={setCurrModal} />}
          {currModal === "signup" && <SignUP setCurrentPage={setCurrModal} />}
        </div>
      </Modal>
    </>
  );
};

export default LandingPage;
