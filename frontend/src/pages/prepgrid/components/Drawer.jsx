import React from 'react';
import { LuX } from 'react-icons/lu';

const Drawer = ({ isOpen, onClose, title, children }) => {
  return (
    <div
      className={`fixed top-0 md:top-[95px] right-0 z-40 h-screen  md:h-[calc(100dvh-64px)] p-4 overflow-y-auto transition-transform duration-300 ease-in-out  w-screen md:w-[40vw]  shadow-2xl shadow-cyan-800/10 scrollbar-hidden border-l-gray-800 rounded bg-block  ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      tabIndex="-1"
      aria-labelledby="drawer-right-label"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h5
          id="drawer-right-label"
          className="flex items-center text-base font-semibold text-neutral-200"
        >
          {title}
        </h5>
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="text-neutral-400 cursor-pointer  bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex items-center justify-center"
        >
          <LuX className="text-lg" />
        </button>
      </div>

      {/* Body Content */}
      <div className="text-sm px-2 mb-6 text-neutral-500">{children}</div>
    </div>
  );
};

export default Drawer;