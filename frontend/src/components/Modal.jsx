import React from "react";

const Modal = ({ children, isOpen, onClose, title, hideHeader }) => {
  if (!isOpen) return null; // Don't render modal if not open

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-50">
      {/* Modal Content */}
      <div className="relative flex flex-col bg-white shadow-lg rounded-lg p-6">
        
        {/* Modal Header */}
        {hideHeader && (
          <div className="flex justify-between items-center  pb-3 mb-4 absolute right-4 top-4">
            <h3 className="text-lg font-semibold text-gray-800 bg-red-300">{title}</h3>
            <button
              type="button"
              className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Modal Body (Scrollable if content is big) */}
        <div className="overflow-y-auto ">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
