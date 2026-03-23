"use client";

import { useState } from "react";
import Image from "next/image";
import ProjectModal from "./ProjectModal";

export default function ProjectCard({ project }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Directly calculate the image URL during render
  const validImages = Array.isArray(project.images) 
    ? project.images.filter(img => img && typeof img === 'string' && img.trim() !== '')
    : [];
    
  const initialImageUrl = validImages.length > 0 ? validImages[0] : "/placeholder.svg";


  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="group relative flex flex-col font-poppins bg-[#0c0c0c] border border-white/5 rounded-[2rem] overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-3 hover:border-blue-500/50 hover:shadow-[0_20px_50px_rgba(59,130,246,0.1)] h-full"
      >
        {/* Image Header with sophisticated overlay */}
        <div className="relative h-48 md:h-56 w-full overflow-hidden bg-black/50">
          <Image
            src={initialImageUrl}
            alt={project.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
            priority={project.isPriority}
          />

          {/* New Interactive Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-transparent to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-70" />
          
          {/* Tech Chips - Positioned on the image */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-[-10px] group-hover:translate-y-0">
            {project.technologies?.slice(0, 3).map((tech, i) => (
              <span key={i} className="px-3 py-1 bg-blue-600/20 backdrop-blur-md border border-blue-500/30 text-blue-400 text-[10px] font-bold rounded-full uppercase tracking-widest">
                {tech}
              </span>
            ))}
          </div>

          {/* View Project Pill */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
            <span className="bg-white text-black text-xs font-black px-6 py-2.5 rounded-full shadow-2xl flex items-center gap-2 hover:scale-105 transition-transform">
              EXPLORE CASE STUDY
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </span>
          </div>
        </div>
        
        {/* Content Body with improved typography */}
        <div className="p-6 md:p-8 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl md:text-2xl font-black text-white group-hover:text-blue-400 transition-colors leading-tight">
              {project.name}
            </h3>
          </div>
          <p className="text-gray-400 text-xs md:text-sm leading-relaxed line-clamp-3 mb-6 flex-grow font-medium">
            {project.description}
          </p>
          
          <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
            <div className="flex -space-x-3">
              {validImages.slice(0, 4).map((img, i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0c0c0c] overflow-hidden relative shadow-lg">
                  <Image src={img} alt="" fill sizes="40px" className="object-cover" />
                </div>
              ))}
              {validImages.length > 4 && (
                <div className="w-10 h-10 rounded-full border-2 border-[#0c0c0c] bg-zinc-800 flex items-center justify-center text-xs text-white font-black relative z-10 shadow-lg">
                  +{validImages.length - 4}
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2 text-xs font-black text-gray-500 group-hover:text-white transition-colors uppercase tracking-widest">
              Details
              <div className="w-6 h-px bg-gray-700 transition-all group-hover:w-10 group-hover:bg-blue-500" />
            </div>
          </div>
        </div>
      </div>
      
      {isModalOpen && <ProjectModal project={project} onClose={() => setIsModalOpen(false)} />}
    </>
  );
}
