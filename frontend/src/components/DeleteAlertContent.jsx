import React from 'react';

const DeleteAlertContent = ({ content, onDelete }) => {
  return (
    <div className="p-5">
      <p className="text-[14px]">{content}</p>
      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAlertContent;