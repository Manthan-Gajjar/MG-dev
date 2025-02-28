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
import Supabase from "./logos/supabase.png";
import JavaScript from "./logos/javascript.png";
import TypeScript from "./logos/typescript.png";
import myImage from "./logos/mycanva.png";

// Full skill list
const allSkills = [
  { name: "HTML", logo: HTML },
  { name: "CSS", logo: CSS },
  { name: "Bootstrap", logo: Bootstrap },
  { name: "Firebase", logo: Firebase },
  { name: "Supabase", logo: Supabase },
  { name: "JavaScript", logo: JavaScript },
  { name: "TypeScript", logo: TypeScript },
  { name: "Tailwind CSS", logo: TailwindCSS },
  { name: "Express.js", logo: Expressjs },
  { name: "MongoDB", logo: MongoDB },
  { name: "PostgreSQL", logo: PostgreSQL },
  { name: "Next.js", logo: Nextjs },
  { name: "Node.js", logo: Nodejs },
  { name: "React.js", logo: Reactjs },
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
      } 
      else {
        skillRows = [
          allSkills.slice(0, 7), // 7 skills
          allSkills.slice(7, 11), // 4 skills
          allSkills.slice(11, 14), // 3 skills
        ];
      }

      setSkills(skillRows);
    };

    updateSkills();
    window.addEventListener("resize", updateSkills);
    return () => window.removeEventListener("resize", updateSkills);
  }, []);

  return (
    <section className="w-full py-12 md:py-24 bg-black text-white">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <div className="w-16 sm:w-24 h-1 bg-blue-500 mx-auto"></div>
        </div>

        {/* Image & Content */}
        <div className="flex flex-col md:flex-row items-center max-w-5xl mx-auto">
          {/* Profile Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative w-32 h-32 sm:w-48 sm:h-48 md:w-72 md:h-72 lg:w-80 lg:h-80 overflow-hidden shadow-xl">
              <Image
                src={myImage}
                alt="Profile Picture"
                width={400}
                height={400}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>

          {/* About Content */}
          <div className="w-full md:w-1/2 text-center md:text-left p-4 md:p-6">
            <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6">
              I'm a passionate Full Stack Developer with expertise in modern web technologies. I specialize in building
              responsive, user-friendly applications using JavaScript, React, and Node.js.
            </p>
            <p className="text-sm sm:text-base md:text-lg leading-relaxed">
              With experience across the entire development stack, I can take your project from concept to completion,
              writing clean and efficient code to enhance user experience.
            </p>
          </div>
        </div>

        {/* Dynamic Upside-Down Pyramid Skills */}
        <div className="mt-12 flex flex-col items-center space-y-3 sm:space-y-4">
          {skills.map((row, rowIndex) => (
            <div 
              key={rowIndex} 
              className="flex flex-wrap justify-center gap-2 sm:gap-4"
              style={{ width: `${100 - rowIndex * 15}%` }}  
            >
              {row.map((skill, skillIndex) => (
                <div
                  key={skillIndex}
                  className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white p-2 sm:p-3 rounded-xl shadow-md flex flex-col items-center justify-center
                  hover:shadow-lg hover:scale-110 hover:-translate-y-1 transition-all duration-300"
                >
                  <Image
                    src={skill.logo}
                    alt={skill.name}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                  <span className="text-[10px] phone:text-[6px] tablate:text-[8px] sm:text-xs md:text-xs text-black mt-1 sm:mt-2 font-medium text-center">{skill.name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
