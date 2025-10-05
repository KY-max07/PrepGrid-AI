import React from "react";


const Footer = () => {
  const openLink = (url) => window.open(url, "_blank", "noopener,noreferrer");
  return (
    <div className="w-screen  flex flex-col items-center justify-center bg-secondary pb-4 transition-colors duration-300 ease-in-out text-xs md:text-sm">
      <div className="flex md:gap-6 gap-2 items-center border-b border-neutral-700 md:w-1/2 p-2 px-4 text-neutral-600">
        <h3 >All Rights Reserved &copy; 2025</h3>
        <h3 >Terms & Conditions</h3>
        <h3 className=" cursor-pointer hover:text-neutral-400 transition-colors duration-300 ease-in-out" onClick={() => openLink("https://github.com/KY-max07/PrepGrid-AI")}>GitHub</h3>
      </div>
      <div className="md:w-1/2 p-2 px-4 flex md:gap-6 items-center text-neutral-600 gap-3">
      
        <h1>KoushikYerraguntla </h1>
        <h2 onClick={() => openLink("https://www.linkedin.com/in/koushik-yerraguntla/")} className="cursor-pointer hover:text-neutral-400 transition-colors duration-300 ease-in-out">LinkedIn</h2>
        <h2 onClick={() => openLink("https://koushik-champ.vercel.app/")} className="cursor-pointer hover:text-neutral-400 transition-colors duration-300 ease-in-out">Portfolio</h2>
      </div>
    </div>
  );
};

export default Footer;
