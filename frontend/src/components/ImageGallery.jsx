import { useState } from "react";

const images = [
  "/prepgrid-dashboard.png",
  "/prepgrid-addnew.png",
  "/prepgrid-interviewqns.png",
  "/prepgrid-explanation.png",
];

export default function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState(images[3]);

  return (
    <div className="flex items-center  md:flex-row flex-col justify-center w-full h-full gap-8 md:p-8 p-2 py-8">
      {/* Thumbnails */}
      <div className="md:flex gap-1 flex-col hidden">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Thumbnail ${index}`}
            className={`rounded h-10 w-15 cursor-pointer ${
              selectedImage === img
                ? "p-1 border-2 border-blue-500/20"
                : "p-0.5 border-2 border-blue-500/0"
            } transition-all`}
            onClick={() => setSelectedImage(img)}
          />
        ))}
      </div>

      {/* Modal for showing big image */}
      {selectedImage && (
        <div className="border-2 border-white/40 rounded-lg p-2 w-7/8">
          <img
            src={selectedImage}
            alt="Large view"
            className=" w-full h-full"
          />
        </div>
        
      )}
      <div className="md:hidden gap-1  flex">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Thumbnail ${index}`}
            className={`rounded h-10 w-15 cursor-pointer ${
              selectedImage === img
                ? "p-1 border-2 border-blue-500/20"
                : "p-0.5 border-2 border-blue-500/0"
            } transition-all`}
            onClick={() => setSelectedImage(img)}
          />
        ))}
      </div>

    </div>
  );
}
