import React, { useContext, useState } from "react";
import IMG_HERO from "../assets/HER0-IMG.jpg";
import { useNavigate } from "react-router-dom";
import { APP_FEATURES } from "../utils/data";
import Modal from "../components/Modal";
import Login from "./auth/Login";
import SignUP from "./auth/SignUP";
import { UserContext } from "../context/UserContext";
import ProfileInfoCard from "../components/cards/ProfileInfoCard";
import prepgrid from "../../public/prepgrid.svg";
import prepgridIcon from "../../public/prepgrid-icon.svg";
import Footer from "../components/Footer";
import { FaArrowUpRightFromSquare, FaCopy } from "react-icons/fa6";

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [openModal, setOpenModal] = useState(false);
  const [currModal, setCurrModal] = useState("login");

  const Handlelogin = () => {
    setOpenModal(true);
    setCurrModal("login");
  };
  const HandleSignUp = () => {
    setOpenModal(true);
    setCurrModal("signup");
  };
  const HandleCTA = () => {
    if (!user) setOpenModal(true);
    else navigate("/dashboard");
  };
  return (
    <div className="bg-secondary">
      <div className="w-full min-h-screen bg-secondary relative">
        {/* Technical measurement lines - positioned above the main text */}
        <div className="absolute top-3/7 left-0 w-full h-0.5 border-t border-dashed border-neutral-700/80 -translate-y-20"></div>
        <div className="absolute top-0 left-1/2 h-full w-0.5   ">
          <div className="h-1/6 border-l relative top-8 right-0.5 border-dashed border-neutral-800 "></div>
        </div>

        <div className="container mx-auto px-4 pt-6 pb-16 relative z-10">
          {/* Header */}
          <header className="flex justify-between items-center mb-7">
            <div className="w-1/3">
              <img src={prepgrid} alt="PREPGRID" className=" h-6 " />
            </div>
            <img
              src={prepgridIcon}
              alt=""
              className="w-1/3 h-7 hidden md:block"
            />

            <div className="w-1/3 flex items-center justify-end-safe">
              {user ? (
                <ProfileInfoCard />
              ) : (
                <div className="gap-3 flex font-bold text-lg text-neutral-300">
                  <button
                    className="hover:bg-[#222222]  transition-colors duration-300 ease-in-out px-3 py-1 rounded-xl pb-2 "
                    onClick={() => Handlelogin()}
                  >
                    Log In
                  </button>
                  <button
                    className="bg-[#222222]/80 hover:bg-[#222222]  transition-colors duration-300 ease-in-out px-3 py-1 rounded-xl pb-1"
                    onClick={() => HandleSignUp()}
                  >
                    Register
                  </button>
                </div>
              )}
            </div>
          </header>

          {/* Hero Content - Centered */}
          <div className="flex flex-col items-center justify-center text-center min-h-[60vh]">
            <h1 className="text-5xl md:text-6xl font-extrabold text-neutral-200 mb-2 leading-tight border p-2 px-10 bg-secondary border-neutral-700/50 font-display tracking-wide">
              Level Up, Land Your
              <br />
              <span className="">Dream With AI</span>
            </h1>

            <p className="text-xs text-gray-400 mb-6 max-w-2xl p-7">
              Get role-specific questions, expand answers when you need them,
              dive deeper into concepts, and organize everything your way. From
              preparation to mastery — your ultimate interview toolkit is here.
            </p>

            <div className="bg-block w-1/3 p-2 flex items-center justify-between rounded-lg">
              <h3 className="pl-4 text-neutral-300">
                Do you want role-specific preparation?
              </h3>
              <button
                className="bg-white/60 text-black text-sm font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-gray-200 transition duration-300"
                onClick={HandleCTA}
              >
                Get Started
              </button>
            </div>
          </div>
          <div className="w-screen flex items-center justify-center ">
            <div className=" w-2/3">
              <div className="flex gap-2 items-center ">
                <img src={prepgridIcon} alt="" className="h-5" />
                <p>/ website overview</p>
              </div>
              <div className="flex items-center h-[80vh] pt-10 gap-4">
                <div className="w-2/3 h-full bg-block rounded-lg"></div>
                <div className="w-1/3 h-full flex flex-col items-center justify-center gap-4">
                  <div className="w-full h-2/3 bg-block rounded-lg"></div>
                  <div className="w-full h-1/3 bg-block rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full min-h-full py-20 px-6 bg-secondary">
        <section className="max-w-7xl mx-auto">
          <h2 className="text-4xl capitalize w-full text-center  text-neutral-200 mb-12">Features that you would love</h2>
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 md:gap-0">
            {APP_FEATURES.map((feature) => (
              <div key={feature.id} className="feature-card-clean bg-block hover:bg-block/80 transition-colors duration-300 ease-in-out hover:shadow-md hover:shadow-neutral-900 border border-neutral-950/50 rounded flex flex-col items-center justify-center">
                {/* Feature Number */}
                <span className="feature-number-clean">{feature.id}</span>

                {/* Feature Title */}
                <h3 className="feature-title-clean">{feature.title}</h3>

                {/* Feature Icon */}
                <div className={`feature-icon-clean ${feature.icon}-icon`}>
                  {feature.icon === "diamond" && (
                    <svg viewBox="0 0 24 24" fill="white">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  )}
                  {feature.icon === "target" && (
                    <svg viewBox="0 0 24 24" fill="white">
                      <circle cx="12" cy="12" r="10" />
                      <circle cx="12" cy="12" r="6" />
                      <circle cx="12" cy="12" r="2" />
                    </svg>
                  )}
                  {feature.icon === "brain" && (
                    <svg viewBox="0 0 24 24" fill="white">
                      <path d="M9.5 2A2.5 2.5 0 0 0 7 4.5v.5a2.5 2.5 0 0 0-2.5 2.5v.5a2.5 2.5 0 0 0 2.5 2.5h.5a2.5 2.5 0 0 0 2.5 2.5v.5a2.5 2.5 0 0 0 2.5-2.5h.5a2.5 2.5 0 0 0 2.5-2.5v-.5a2.5 2.5 0 0 0-2.5-2.5h-.5a2.5 2.5 0 0 0-2.5-2.5v-.5A2.5 2.5 0 0 0 9.5 2Z" />
                    </svg>
                  )}
                  {feature.icon === "chart" && (
                    <svg viewBox="0 0 24 24" fill="white">
                      <path d="M3 3v18h18V3H3zm16 16H5V5h14v14zm-8-2h2v-4h-2v4zm4-6h2V7h-2v4zm-8 0h2V9H7v2z" />
                    </svg>
                  )}
                </div>

                {/* Feature Description */}
                <p className=" text-sm text-neutral-600 px-2 w-full md:w-2/3 ">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
      {/* Feedback */}
      <div className="flex w-screen h-[45vh] flex-col items-center justify-center gap-6 pb-15 mb-15">
        <h3 className="text-lg text-neutral-500">
          Please Share yours thoughts!
        </h3>
        <div className=" flex items-center justify-center gap-1">
          <h3 className="text-xl bg-block rounded-lg p-2 px-4">
            {" "}
            koushik.network07@gmail.com
          </h3>
          <div className="text-xl bg-block rounded-lg p-3 px-4 hover:bg-neutral-300 hover:text-black transition-colors duration-300 ease-in-out cursor-pointer">
            <FaCopy />
          </div>
          <div className="text-xl bg-block rounded-lg p-3 px-4 hover:bg-neutral-300 hover:text-black transition-colors duration-300 ease-in-out cursor-pointer">
            <FaArrowUpRightFromSquare />
          </div>
        </div>
      </div>
      <Footer />

      <Modal
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
          setCurrModal("login");
        }}
        hideHeader
      >
        <div>
          {currModal === "login" && (
            <Login
              setCurrentPage={setCurrModal}
              onClose={() => setOpenModal(false)}
            />
          )}
          {currModal === "signup" && (
            <SignUP
              setCurrentPage={setCurrModal}
              onClose={() => setOpenModal(false)}
            />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default LandingPage;
