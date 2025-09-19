import React, { useRef, useState, useEffect } from "react";
import { LuUpload, LuUser, LuTrash } from "react-icons/lu";

const ProfileImageUpload = ({ image, setImage }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (image) {
      setPreviewUrl(URL.createObjectURL(image));
    } else {
      setPreviewUrl(null);
    }
  }, [image]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // update parent state
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    inputRef.current.value = null;
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!image ? (
        <div className="flex flex-col items-center gap-2">
          <LuUser className="text-gray-400" size={48} />
          <button
            type="button"
            onClick={onChooseFile}
            className="flex items-center gap-2 text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            <LuUpload size={18} />
            Upload Image
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={previewUrl}
            alt="profile photo"
            className="w-32 h-32 object-cover rounded-full border shadow"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
          >
            <LuTrash size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileImageUpload;
// import React, { useRef, useState } from "react";
// import { LuUpload, LuUser, LuTrash } from "react-icons/lu";

// const ProfileImageUpload = () => {
//   const [image, setImage] = useState(null); => removed
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const inputRef = useRef(null);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//       setPreviewUrl(URL.createObjectURL(file));
//     }
//   };

//   const handleRemoveImage = () => {
//     setImage(null);
//     setPreviewUrl(null);
//     inputRef.current.value = null;
//   };

//   const onChooseFile = () => {
//     inputRef.current.click();
//   };

//   return (
//     <div className="w-full flex flex-col items-center gap-4">
//       <input
//         type="file"
//         accept="image/*"
//         ref={inputRef}
//         onChange={handleImageChange}
//         className="hidden"
//       />

//       {!image ? (
//         <div className="flex flex-col items-center gap-2">
//           <LuUser className="text-gray-400" size={48} />

//           <button
//             type="button"
//             onClick={onChooseFile}
//             className="flex items-center gap-2 text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//           >
//             <LuUpload size={18} />
//             Upload Image
//           </button>
//         </div>
//       ) : (
//         <div className="relative">
//           <img
//             src={previewUrl}
//             alt="profile photo"
//             className="w-32 h-32 object-cover rounded-full border shadow"
//           />
//           <button
//             type="button"
//             onClick={handleRemoveImage}
//             className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
//           >
//             <LuTrash size={16} />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfileImageUpload;
