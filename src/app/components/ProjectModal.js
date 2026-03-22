import { useState } from "react";
import Image from "next/image";
import css from "./button.css";

export default function ProjectModal({ project, onClose }) {
  // Filter out any broken or empty strings just to be safe
  const validImages = Array.isArray(project.images) 
    ? project.images.filter(img => img && typeof img === 'string' && img.trim() !== '')
    : [];

  const [activeIndex, setActiveIndex] = useState(0);
  const mainImage = validImages.length > 0 ? validImages[activeIndex] : null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 font-poppins">
      {/* Blurred Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative bg-[#0f0f0f] border border-white/10 rounded-2xl w-full max-w-5xl max-h-[90vh] shadow-2xl overflow-y-auto flex flex-col md:flex-row animate-[fadeIn_0.3s_ease-out]">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white transition-all duration-300"
          title="Close Modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>

        {/* Left: Gallery Section */}
        <div className="w-full md:w-3/5 bg-black flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/5 relative p-4">
          {/* Main Image */}
          <div className="w-full max-w-2xl relative aspect-[16/10] sm:aspect-video rounded-xl overflow-hidden border border-white/5 shadow-lg bg-[#111]">
            {mainImage ? (
              <Image
                src={mainImage}
                alt={`${project.name} preview`}
                fill
                className="object-contain"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
                <span className="text-sm">No Preview Available</span>
              </div>
            )}
          </div>

          {/* Thumbnails Row */}
          {validImages.length > 1 && (
            <div className="flex gap-3 mt-6 p-2 overflow-x-auto w-full max-w-2xl pb-2 scrollbar-hide">
              {validImages.map((image, index) => (
                <div 
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`relative w-24 h-16 flex-shrink-0 cursor-pointer rounded-lg overflow-hidden border transition-all duration-300 shadow-md ${
                    activeIndex === index 
                      ? "border-blue-500 opacity-100 scale-[1.05]" 
                      : "border-white/10 opacity-50 hover:opacity-100 hover:scale-[1.05]"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Content Section */}
        <div className="w-full md:w-2/5 p-6 sm:p-10 flex flex-col bg-[#0f0f0f]">
          <div className="mb-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 leading-tight">
              {project.name}
            </h2>
            <div className="w-12 h-1 bg-blue-500 rounded-full mt-4"></div>
          </div>
          
          <div className="flex-grow">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">About this project</h3>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
              {project.description}
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-3.5 bg-white text-black font-semibold rounded-xl overflow-hidden transition-transform active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
              <span className="relative z-10 flex items-center gap-2">
                Visit Live Site 
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
              </span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}