"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Nodejs from "./logos/nodejs.png";
import Reactjs from "./logos/react.png";
import Nextjs from "./logos/next.png";
import Expressjs from "./logos/Express.png";
import MongoDB from "./logos/mongoDB.png";
import PostgreSQL from "./logos/postgresql.png";
import TailwindCSS from "./logos/tailwind.png";
import HTML from "./logos/html.png";
import CSS from "./logos/css.png";
import Bootstrap from "./logos/boostrap.png";
import Firebase from "./logos/firebase.png";

import JavaScript from "./logos/javascript.png";
import TypeScript from "./logos/typescript.png";
import myImage from "./logos/image.png";

// Full skill list
const allSkills = [
  { name: "Next.js", logo: Nextjs },
  { name: "Node.js", logo: Nodejs },
  { name: "React.js", logo: Reactjs },
  { name: "Tailwind CSS", logo: TailwindCSS },
  { name: "Express.js", logo: Expressjs },
  { name: "MongoDB", logo: MongoDB },
  { name: "PostgreSQL", logo: PostgreSQL },
  { name: "Firebase", logo: Firebase },

  { name: "JavaScript", logo: JavaScript },
  { name: "TypeScript", logo: TypeScript },
  { name: "Bootstrap", logo: Bootstrap },
  { name: "HTML", logo: HTML },
  { name: "CSS", logo: CSS },
];

export default function AboutUs() {
  const [skills, setSkills] = useState([]);

  // Adjust skill rows dynamically based on screen size
  useEffect(() => {
    const updateSkills = () => {
      let screenWidth = window.innerWidth;
      let skillRows = [];

      if (screenWidth > 1024) {
        skillRows = [
          allSkills.slice(0, 8), // 8 skills
          allSkills.slice(8, 12), // 4 skills
          allSkills.slice(12, 14), // 2 skills
        ];
      } else if (screenWidth > 768) {
        skillRows = [
          allSkills.slice(0, 7), // 7 skills
          allSkills.slice(7, 11), // 4 skills
          allSkills.slice(11, 14), // 3 skills
        ];
      } else if (screenWidth > 600) {
        skillRows = [
          allSkills.slice(0, 6), // 6 skills
          allSkills.slice(6, 9), // 3 skills
          allSkills.slice(9, 14), // 5 skills
        ];
      } else if (screenWidth > 375) {
        skillRows = [
          // allSkills.slice(0, 6), // 6 skills
          allSkills.slice(0, 7), // 3 skills
          allSkills.slice(7, 14), // 5 skills
        ];
      } 
      else {
        skillRows = [
          allSkills.slice(0, 12), // 7 skills
          allSkills.slice(12, 14), // 4 skills
        ];
      }

      setSkills(skillRows);
    };

    updateSkills();
    window.addEventListener("resize", updateSkills);
    return () => window.removeEventListener("resize", updateSkills);
  }, []);

  return (
    <section className="font-poppins w-full py-4 md:py-4 bg-black text-white">
      <div className="container mx-auto px-4">
        
        {/* Full Screen Viewport Wrapper for About */}
        <div className="min-h-[85vh] flex flex-col justify-center pb-8">
          {/* Section Heading */}
          <div className="text-center mb-4 md:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-2 font-poppins">About Me</h2>
            <div className="w-16 sm:w-20 h-1 bg-blue-500 mx-auto"></div>
          </div>

          {/* Image & Content */}
          <div className="flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto gap-6 md:gap-10 pt-2 pb-6">
            {/* Profile Image */}
            <div className="w-full md:w-5/12 flex justify-center md:justify-end">
              <div className="relative w-full max-w-[240px] sm:max-w-[280px] md:max-w-[300px] lg:max-w-[360px] overflow-hidden shadow-2xl rounded-3xl border-4 border-white/5 transition-transform duration-500 hover:scale-105 bg-zinc-900">
                <Image
                  src={myImage}
                  alt="Profile Picture"
                  width={500}
                  height={600}
                  className="w-full h-auto object-contain rounded-3xl"
                  style={{ height: 'auto' }}
                  priority
                />
              </div>
            </div>

            {/* About Content */}
            <div className="font-poppins w-full md:w-7/12 text-center md:text-left px-2 sm:px-0">
              <h3 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold mb-1 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Manthan Gajjar <span className="text-gray-400 text-sm md:text-xl font-medium inline-block ml-2">| MG dev</span>
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-gray-300 font-semibold mb-4">
                Full Stack Web Developer
              </p>
              
              <div className="space-y-3 sm:space-y-3 text-sm sm:text-base md:text-base text-gray-400 leading-relaxed md:text-left">
                <p>
                  🚀 <strong className="text-gray-200">Looking for a high-performance, modern, and fully customized web application? You're in the right place!</strong>
                </p>
                <p>
                  Hi! I'm Manthan Gajjar, a passionate and experienced Full Stack Web Developer working as a freelancer. I specialize in building scalable, responsive, and custom websites using modern technologies like JavaScript, TypeScript, Node.js, React, Next.js, MongoDB, PostgreSQL, and Tailwind CSS.
                </p>
                <p>
                  Whether you need a single-page app, full SaaS platform, admin dashboard, or custom website, I can bring your vision to life with clean code, optimized performance, and beautiful UI/UX.
                </p>
                <div className="border-l-4 border-blue-500 pl-4 py-1.5 mt-3 italic bg-white/5 rounded-r-lg text-xs sm:text-sm md:text-base">
                  I work independently, but if your project requires more hands, I can bring in my trusted team of developers to scale up and meet your deadlines.
                </div>
              </div>
              
              <div className="mt-5 md:mt-6 flex flex-col sm:flex-row justify-center md:justify-start gap-3 sm:gap-4">
                <a href="#contact" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] transition-all duration-300 transform hover:-translate-y-1 text-center text-sm md:text-base">
                  💬 Let's Talk!
                </a>
                <a href="https://wa.me/918141930612" target="_blank" rel="noopener noreferrer" className="px-6 py-2.5 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl shadow-[0_0_15px_rgba(22,163,74,0.4)] hover:shadow-[0_0_25px_rgba(22,163,74,0.6)] transition-all duration-300 transform hover:-translate-y-1 text-center text-sm md:text-base">
                  WhatsApp Me
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Upside-Down Pyramid Skills */}
        <div className="mt-16 md:mt-24 flex flex-col items-center space-y-3 sm:space-y-4">
          {skills.map((row, rowIndex) => (
            <div 
              key={rowIndex} 
              className="flex flex-wrap justify-center gap-2 sm:gap-4"
              style={{ width: `${100 - rowIndex * 15}%` }}  
            >
              {row.map((skill, skillIndex) => (
                <div
                  key={skillIndex}
                  className="relative w-12 h-12 sm:w-16 sm:h-16 phone:p-3 mini:p-3 md:w-20 md:h-20 bg-white p-2 sm:p-3 rounded-xl shadow-md flex flex-col items-center justify-center
                  hover:shadow-lg hover:scale-110 hover:-translate-y-1 transition-all duration-300"
                >
                  <Image
                    src={skill.logo}
                    alt={skill.name}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                  <span className="text-[10px] phone:text-[6px] mini:text-[6px]  tablate:text-[8px] sm:text-xs md:text-xs text-black mt-1 sm:mt-2 font-medium text-center">{skill.name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
