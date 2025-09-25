import React from "react";

const Footer = () => {
  return (
    <div className="w-screen  flex flex-col items-center justify-self-center bg-secondary pb-4">
      <div className="flex gap-6 items-center border-b border-neutral-700 w-1/2 p-2 px-4">
        <h3 className=" cursor-pointer">All Rights Reserved &copy; 2025</h3>
        <h3 className=" cursor-pointer">Terms & Conditions</h3>
        <h3 className=" cursor-pointer">GitHub</h3>
      </div>
      <div className="w-1/2 p-2 px-4 flex gap-6 items-center">
        <h1>Koushik Y </h1>
        <h2>LinkedIn</h2>
        <h2>Portfolio</h2>
      </div>
    </div>
  );
};

export default Footer;
