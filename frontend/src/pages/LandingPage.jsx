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
import toast from "react-hot-toast";
import ImageGallery from "../components/ImageGallery";
import { LuPin, LuSparkles } from "react-icons/lu";
const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [openModal, setOpenModal] = useState(false);
  const [currModal, setCurrModal] = useState("login");
  const [selectedTab, setSelectedTab] = useState("Interview Questions");

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
        <div className="hidden lg:block absolute top-3/7 left-0 w-full h-0.5 border-t border-dashed border-neutral-700/80 -translate-y-20"></div>
        <div className="absolute top-0 left-1/2 h-full w-0.5 hidden lg:block  ">
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

            <div className="md:w-1/3 flex items-center justify-end-safe">
              {user ? (
                <ProfileInfoCard />
              ) : (
                <div className="gap-3 flex font-bold md:text-lg text-xs text-neutral-300  ">
                  <button
                    className="hover:bg-[#222222]  transition-colors duration-300 ease-in-out md:px-3 py-1 rounded-xl pb-2 "
                    onClick={() => Handlelogin()}
                  >
                    Log In
                  </button>
                  <button
                    className="bg-[#222222]/80 hover:bg-[#222222]  transition-colors duration-300 ease-in-out md:px-3 px-2  py-1 rounded-xl pb-1"
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
            <h1 className="text-xl md:text-6xl font-extrabold text-neutral-200 mb-2 leading-tight border p-2 px-10 bg-secondary border-neutral-700/50 font-display tracking-wide">
              Level Up, Land Your
              <br />
              <span className="">Dream With AI</span>
            </h1>

            <p className="text-xs  text-gray-400 mb-6 max-w-2xl p-7">
              Get role-specific questions, expand answers when you need them,
              dive deeper into concepts<span className="hidden md:block">, and organize everything your way. From
              preparation to mastery — your ultimate interview toolkit is here.</span>
            </p>

            <div className="md:bg-block w-full md:w-1/2 lg:w-1/3 p-2 flex items-center justify-center md:justify-between rounded-lg text-sm md:text-md">
              <h3 className="pl-4 text-neutral-300 text-xs hidden md:block">
                Do you want role-specific preparation?
              </h3>
              <button
                className="bg-white/60 text-black text-xs md:text-sm font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-gray-200 transition duration-300"
                onClick={HandleCTA}
              >
                Get Started
              </button>
            </div>
          </div>
          {/* website overview */}
          <div className=" flex items-center justify-center ">
            <div className=" w-full lg:w-2/3">
              <div className="flex gap-2 items-center justify-start ">
                <img src={prepgridIcon} alt="" className="h-5" />
                <p className="text-neutral-400">/ website overview</p>
              </div>
              <div className="flex items-center md:h-[80vh] pt-10 gap-4">
                <div className="lg:w-2/3 w-full h-full bg-block rounded-lg">
                  <ImageGallery />
                </div>
                <div className="w-1/3 h-full hidden lg:flex flex-col items-center justify-center gap-4">
                  <div className="w-full h-2/3 bg-block rounded-lg p-5">
                    <div className="flex items-center justify-center  mb-6 text-neutral-400 bg-neutral-800 rounded-lg p-1 w-full transition-colors duration-300 ease-in-out">
                      <h3
                        onClick={() => setSelectedTab("Dashboard")}
                        className={`cursor-pointer rounded py-1 w-3/8 px-2 text-center ${
                          selectedTab === "Dashboard"
                            ? "bg-neutral-700/30"
                            : ""
                        }`}
                      >
                        Dashboard
                      </h3>
                      <h3
                        onClick={() => setSelectedTab("Interview Questions")}
                        className={`cursor-pointer  rounded py-1 w-5/8 px-2 text-center ${
                          selectedTab === "Interview Questions"
                            ? "bg-neutral-700/30" 
                            : ""
                        }`}
                      >
                        Interview Questions
                      </h3>
                    </div>

                   
                    <div className="p-2  rounded shadow">
                      {selectedTab === "Dashboard" && (
                        <div>
                          <img src="/prepgrid-dashboard.png" alt="Dashboard" className="border-2  rounded border-neutral-800/80" />
                          <p className=" text-xs text-neutral-500 pt-4 ">The Dashboard provides information about all your sessions, with a summary based on the most recently created sessions. </p>
                          <p className=" text-xs text-neutral-500 pt-2"> It gives you a detailed overview of the sessions you have created.</p>

                        </div>
                      )}

                      {selectedTab === "Interview Questions" && (
                        <div>
                        <img src="/prepgrid-interviewqns.png" alt="Dashboard" className="border-2  rounded border-neutral-800/80" />
                        <p className="text-xs text-neutral-500 pt-4 ">The Interview Questions page provides questions based on job role, experience level, and topics to focus on. </p>
                        <p className="text-xs text-neutral-500 pt-2"> Using AI, it generates detailed questions along with simplified solutions. You can also choose to view a more detailed explanation if you prefer.</p>

                      </div>
                      )}
                    </div>
                  </div>
                  <div className="w-full h-1/3 bg-block rounded-lg p-2 pt-4">
                  <h2 className="text-md  mb-2 w-full capitalize text-neutral-400 flex gap-2 items-center justify-center ">  <LuPin />Pin & learn more <LuSparkles /></h2>
                  
                  <div className="flex flex-col  gap-2 p-4">
                    <p className="text-xs text-neutral-500 flex gap-2  ">
                        Pin a question. Click on the sparkles to learn more about the question.
                    </p>
                    <p className="text-xs text-neutral-500 ">
                     <span className="">Pinging a question is helpful for getting quick insights, and explanations make it easier to understand.</span> 
                    </p>
                  </div>
                  
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full min-h-full py-20 px-6 bg-secondary">
        <section className="max-w-5xl mx-auto">
          <h2 className="text-4xl capitalize w-full text-center  text-neutral-200 mb-12">
            Features that you would love
          </h2>
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 md:gap-0">
            {APP_FEATURES.map((feature) => (
              <div
                key={feature.id}
                className="feature-card-clean bg-block hover:bg-block/80 transition-colors duration-300 ease-in-out hover:shadow-md hover:shadow-neutral-900 border border-neutral-950/50 rounded flex flex-col items-center justify-center"
              >
                <span className="feature-number-clean">{feature.id}</span>

                <h3 className="feature-title-clean">{feature.title}</h3>

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

                <p className=" text-sm text-neutral-600 px-2 w-full md:w-2/3 ">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
      {/* Feedback */}
      <div className=" w-screen h-[45vh] flex-col items-center justify-center gap-6 pb-15 mb-15 sm:flex hidden">
        <h3 className="text-lg text-neutral-500">
          Please Share yours thoughts!
        </h3>
        <div className=" flex items-center justify-center gap-1">
          <h3 className="md:text-xl text-sm bg-block rounded-lg p-2 px-4 text-neutral-500">
            {" "}
            koushik.network07@gmail.com
          </h3>
          <div
            className="md:text-xl text-sm bg-block rounded-lg p-3 text-neutral-700 px-4 hover:bg-neutral-300 hover:text-black transition-colors duration-300 ease-in-out cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText("koushik.network07@gmail.com");
              toast.success("Copied to clipboard");
            }}
          >
            <FaCopy />
          </div>
          <div
            className="md:text-xl text-sm bg-block rounded-lg p-3 text-neutral-700 px-4 hover:bg-neutral-300 hover:text-black transition-colors duration-300 ease-in-out cursor-pointer"
            onClick={() =>
              window.open(
                "mailto:koushik.network07@gmail.com",
                "_blank",
                "noopener,noreferrer"
              )
            }
          >
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
