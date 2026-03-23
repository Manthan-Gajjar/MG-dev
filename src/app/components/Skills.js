"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

// Logo imports
// New Transparent Logo imports
import Nextjs from "./logos/transparent/nextjs.svg";
import Nodejs from "./logos/transparent/nodejs.svg";
import Reactjs from "./logos/transparent/react.svg";
import TailwindCSS from "./logos/transparent/tailwind.svg";
import Expressjs from "./logos/transparent/express.svg";
import MongoDB from "./logos/transparent/mongodb.svg";
import PostgreSQL from "./logos/transparent/postgresql.svg";
import Firebase from "./logos/transparent/firebase.svg";
import JavaScript from "./logos/transparent/javascript.svg";
import TypeScript from "./logos/transparent/typescript.svg";
import HTML from "./logos/transparent/html.svg";
import CSS from "./logos/transparent/css.svg";
import Supabase from "./logos/transparent/supabase.svg";
import SocketIO from "./logos/transparent/socketio.svg";
import Redux from "./logos/transparent/redux.svg";
import AWS from "./logos/transparent/aws.svg";
import Vercel from "./logos/transparent/vercel.svg";

const allSkills = [
  { name: "Next.js", logo: Nextjs, color: "from-white to-gray-400" },
  { name: "Node.js", logo: Nodejs, color: "from-green-400 to-green-600" },
  { name: "React.js", logo: Reactjs, color: "from-blue-400 to-cyan-500" },
  { name: "Tailwind", logo: TailwindCSS, color: "from-cyan-400 to-blue-500" },
  { name: "Express.js", logo: Expressjs, color: "from-gray-100 to-gray-400" },
  { name: "MongoDB", logo: MongoDB, color: "from-green-500 to-emerald-700" },
  { name: "PostgreSQL", logo: PostgreSQL, color: "from-blue-500 to-indigo-700" },
  { name: "Firebase", logo: Firebase, color: "from-orange-400 to-yellow-500" },
  { name: "JavaScript", logo: JavaScript, color: "from-yellow-300 to-orange-400" },
  { name: "TypeScript", logo: TypeScript, color: "from-blue-500 to-blue-700" },
  { name: "Supabase", logo: Supabase, color: "from-emerald-400 to-green-600" },
  { name: "Socket.io", logo: SocketIO, color: "from-white to-gray-400" },
  { name: "Redux", logo: Redux, color: "from-purple-500 to-purple-800" },
  { name: "AWS", logo: AWS, color: "from-orange-400 to-yellow-500" },
  { name: "Vercel", logo: Vercel, color: "from-white to-gray-400" },
  { name: "HTML", logo: HTML, color: "from-orange-500 to-red-600" },
  { name: "CSS", logo: CSS, color: "from-blue-400 to-blue-600" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0, scale: 0.8 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  },
};

export default function Skills() {
  return (
    <section id="skills" className="py-12 relative">
      <SectionHeading 
        title="Skills &" 
        highlight="Technologies" 
        gradientClass="from-blue-500 to-purple-500" 
      />
      
      <div className="max-w-6xl mx-auto px-4">
        <motion.div 
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4 md:gap-6 justify-items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {allSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              variants={itemVariants}
              whileHover={{ 
                y: -10, 
                scale: 1.05,
                transition: { duration: 0.2 } 
              }}
              className="group relative w-full max-w-[110px]"
            >
              {/* Card Container */}
              <div className="relative aspect-square bg-zinc-900/50 backdrop-blur-xl border-2 border-white/10 rounded-2xl md:rounded-[2rem] p-4 flex flex-col items-center justify-center transition-all duration-500 group-hover:border-blue-500/50 group-hover:bg-zinc-800/80 group-hover:shadow-[0_0_25px_rgba(59,130,246,0.2)] overflow-hidden">
                
                {/* Background Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                {/* Skill Icon */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <Image
                    src={skill.logo}
                    alt={skill.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Pulse Ring */}
                <div className="absolute inset-0 rounded-3xl border border-white/0 group-hover:border-blue-500/20 scale-90 group-hover:scale-100 transition-all duration-500" />
              </div>

              {/* Label below the card */}
              <motion.div 
                className="mt-3 text-center opacity-40 group-hover:opacity-100 transition-opacity duration-300"
              >
                <p className="text-[10px] md:text-xs font-bold tracking-widest text-white uppercase font-poppins">
                  {skill.name}
                </p>
                <div className={`mt-1 h-0.5 w-0 group-hover:w-8 mx-auto bg-gradient-to-r ${skill.color} transition-all duration-500 rounded-full`} />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Background Decorative elements to match other sections */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] animate-pulse-slow delay-1000" />
      </div>
    </section>
  );
}
