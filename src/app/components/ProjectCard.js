// "use client"

// import { useState, useEffect } from "react"
// import Image from "next/image"
// import ProjectModal from "./ProjectModal"

// export default function ProjectCard({ project }) {
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   const [imageUrl, setImageUrl] = useState(null)

//   useEffect(() => {
//     if (Array.isArray(project.images) && project.images.length > 0) {
//       setImageUrl(project.images[0]) // Set the image dynamically
//     } else {
//       setImageUrl("/placeholder.svg")
//     }
//   }, [project.images])

//   if (!imageUrl) return null // Prevent rendering until image URL is set

//   return (
//     <>
//       <div
//         className="bg-black rounded-lg shadow-md overflow-hidden cursor-pointer transform transition duration-500 hover:scale-105"
//         onClick={() => setIsModalOpen(true)}
//       >
//         <Image
//           src={imageUrl}
//           alt={project.name}
//           width={400}
//           height={300}
//           className="w-full h-48 object-cover"
//         />
//         <div className="p-4">
//           <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
//           <p className="text-gray-600 line-clamp-3">{project.description}</p>
//         </div>
//       </div>
//       {isModalOpen && <ProjectModal project={project} onClose={() => setIsModalOpen(false)} />}
//     </>
//   )
// }


"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ProjectModal from "./ProjectModal";

export default function ProjectCard({ project }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (Array.isArray(project.images) && project.images.length > 0) {
      setImageUrl(project.images[0]); // Use the first image
    } else {
      setImageUrl("/placeholder.svg");
    }
  }, [project.images]);

  if (!imageUrl) return null; // Prevent rendering until image URL is set

  return (
    <>
      <div
        className="bg-black rounded-lg shadow-md overflow-hidden cursor-pointer transform transition duration-500 hover:scale-105"
        onClick={() => setIsModalOpen(true)}
      >
        <Image
          src={imageUrl}
          alt={project.name}
          width={400}
          height={300}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
          <p className="text-gray-600 line-clamp-3">{project.description}</p>
        </div>
      </div>
      {isModalOpen && <ProjectModal project={project} onClose={() => setIsModalOpen(false)} />}
    </>
  );
}
