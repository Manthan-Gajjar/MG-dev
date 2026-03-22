"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ProjectModal from "./ProjectModal";

export default function ProjectCard({ project }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const validImages = Array.isArray(project.images) 
    ? project.images.filter(img => img && typeof img === 'string' && img.trim() !== '')
    : [];

  useEffect(() => {
    if (validImages.length > 0) {
      setImageUrl(validImages[0]);
    } else {
      setImageUrl("/placeholder.svg");
    }
  }, [project.images]);

  if (!imageUrl) return null; // Prevent rendering until image URL is set

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="group relative flex flex-col font-poppins bg-[#111] border border-white/5 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/30 hover:shadow-[0_10_40px_rgba(59,130,246,0.15)] h-full"
      >
        {/* Image Header */}
        <div className="relative h-56 w-full overflow-hidden bg-black/50 border-b border-white/5">
          <Image
            src={imageUrl}
            alt={project.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-80" />
          
          {/* View Project Pill - Slides up on hover */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
              View Case Study
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </span>
          </div>
        </div>
        
        {/* Content Body */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-1">
            {project.name}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
            {project.description}
          </p>
          
          <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
            <div className="flex -space-x-2">
              {validImages.slice(0, 3).map((img, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#111] overflow-hidden relative">
                  <Image src={img} alt="" fill className="object-cover" />
                </div>
              ))}
              {validImages.length > 3 && (
                <div className="w-8 h-8 rounded-full border-2 border-[#111] bg-gray-800 flex items-center justify-center text-[10px] text-white font-bold relative z-10">
                  +{validImages.length - 3}
                </div>
              )}
            </div>
            
            <button className="text-xs font-medium text-gray-400 hover:text-white transition-colors flex items-center gap-1">
              Details
            </button>
          </div>
        </div>
      </div>
      
      {isModalOpen && <ProjectModal project={project} onClose={() => setIsModalOpen(false)} />}
    </>
  );
}
