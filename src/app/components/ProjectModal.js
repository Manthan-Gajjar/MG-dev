import { useState } from "react";
import Image from "next/image";

export default function ProjectModal({ project, onClose }) {
  const [mainImage, setMainImage] = useState(project.images[0]);
  const [thumbnails, setThumbnails] = useState(project.images.slice(1));

  const handleImageSwap = (clickedImage) => {
    setThumbnails([mainImage, ...thumbnails.filter((img) => img !== clickedImage)]);
    setMainImage(clickedImage);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50">
      <div className="bg-black text-white rounded-lg max-w-4xl w-full shadow-lg relative">
        {/* Close Button in Top Right */}
        <button onClick={onClose} className="absolute top-3 right-3 text-white text-2xl font-bold">
          &times;
        </button>

        <div className="p-6 flex flex-col items-center">
          <h2 className="text-3xl font-bold mb-4 phone:text-lg mini:text-lg text-center">{project.name}</h2>

          {/* Main Image Display */}
          <div className="w-full flex flex-col items-center">
            <Image
              src={mainImage || "/placeholder.svg"}
              alt={`${project.name} main image`}
              width={900}
              height={500}
              className="rounded-lg object-cover mb-4 w-full max-h-[400px]"
            />

            {/* Thumbnail Images */}
            <div className="flex overflow-x-auto space-x-3 p-2">
              {thumbnails.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  width={120}
                  height={80}
                  className="rounded-md cursor-pointer hover:opacity-80 transition"
                  onClick={() => handleImageSwap(image)}
                />
              ))}
            </div>
          </div>

          <p className="text-gray-300 text-center text-lg tablate:text-xl md:text-md my-4 px-4 phone:text-xs mini:text-xs">{project.description}</p>

          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="button-85 mt-4"
          >
            View Site
          </a>
        </div>
      </div>
    </div>
  );
}