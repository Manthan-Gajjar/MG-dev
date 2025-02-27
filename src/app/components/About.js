"use client";

import Image from "next/image";
import { useState } from "react";
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
import myImage from "./logos/my.png";


// Define skill data with imported logos
const skills = [
  { name: "JavaScript", logo: JavaScript },
  { name: "TypeScript", logo: TypeScript },
  { name: "Node.js", logo: Nodejs },
  { name: "React.js", logo: Reactjs },
  { name: "Next.js", logo: Nextjs },
  { name: "Express.js", logo: Expressjs },
  { name: "MongoDB", logo: MongoDB },
  { name: "PostgreSQL", logo: PostgreSQL },
  { name: "Tailwind CSS", logo: TailwindCSS },
  { name: "HTML", logo: HTML },
  { name: "CSS", logo: CSS },
  { name: "Bootstrap", logo: Bootstrap },
  { name: "Firebase", logo: Firebase },
  { name: "Supabase", logo: Supabase },
];

export default function AboutUs() {
  const [activeSkill, setActiveSkill] = useState(null);

  return (
    <section className="w-full py-12 md:py-24 bg-background text-foreground">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
        </div>

        <div className="relative">
          {/* Profile Image Container */}
          <div className="relative z-10 flex justify-center mb-8">
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white shadow-xl">
              <Image
                src={myImage}
                alt="Profile Picture"
                width={256}
                height={256}
                className="object-cover"
                priority
              />
            </div>
          </div>
          

          {/* Skills Circle */}
          <div className="grid grid-cols-2 text-black sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 justify-items-center">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => setActiveSkill(skill.name)}
                onMouseLeave={() => setActiveSkill(null)}
              >
                <div
                  className={`
                    flex flex-col items-center justify-center p-3
                    bg-white rounded-xl shadow-md transition-all duration-300
                    hover:shadow-lg hover:scale-110 hover:-translate-y-1
                    w-20 h-20 md:w-24 md:h-24
                  `}
                >
                  <div className="relative w-10 h-10 md:w-12 md:h-12">
                    <Image
                      src={skill.logo}
                      alt={`${skill.name} logo`}
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>
                  <span
                    className={`
                      text-xs mt-2 text-center font-medium
                      transition-opacity duration-300
                      ${activeSkill === skill.name ? "opacity-100" : "opacity-70"}
                    `}
                  >
                    {skill.name}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* About Text */}
          <div className="mt-16 max-w-3xl mx-auto text-center">
            <p className="text-lg leading-relaxed mb-6">
              I'm a passionate Full Stack Developer with expertise in modern web technologies. I specialize in building
              responsive, user-friendly applications using JavaScript, React, and Node.js. My approach combines
              technical excellence with creative problem-solving.
            </p>
            <p className="text-lg leading-relaxed">
              With experience across the entire development stack, I can take your project from concept to completion.
              I'm dedicated to creating clean, efficient code that delivers exceptional user experiences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
