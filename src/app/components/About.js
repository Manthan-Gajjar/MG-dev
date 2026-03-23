"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import myImage from "./logos/image.png";
import Skills from "./Skills";

export default function AboutUs() {
  return (
    <section className="relative w-full pt-4 pb-16 md:pb-24 overflow-hidden">
      {/* Background Smoke/Atmospheric Drift */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,_transparent_0%,_#050505_70%)] z-10"></div>
        <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] animate-drift"></div>
        <div className="absolute bottom-[20%] left-[20%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] animate-drift animation-delay-5000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-600/5 rounded-[100%] blur-[100px] rotate-[-20deg] animate-pulse-slow"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {/* Profile Section Wrapper */}
        <div className="min-h-[60vh] md:min-h-[80vh] flex flex-col justify-center py-4 md:py-8">

          {/* Image & Content */}
          <div className="flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto gap-10 lg:gap-20">
            {/* Profile Image with Advanced Styling */}
            <div className="w-full md:w-5/12 flex justify-center md:justify-end">
              <div className="relative group">
                {/* Integrated Availability Badge */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -top-12 -left-4 z-20"
                >
                  <div className="px-4 py-1.5 rounded-full bg-[#0a0a0a] border border-green-500/30 flex items-center gap-2 backdrop-blur-xl shadow-[0_0_20px_rgba(34,197,94,0.15)]">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-[10px] font-black text-green-400 tracking-widest font-poppins uppercase">AVAILABLE FOR NEW PROJECTS</span>
                  </div>
                </motion.div>

                {/* Glowing Aura behind image */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-[2.5rem] opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-500"></div>

                <div className="relative w-full max-w-[260px] sm:max-w-[300px] md:max-w-[320px] lg:max-w-[360px] overflow-hidden shadow-3xl rounded-[2.5rem] border border-white/10 transition-all duration-700 hover:scale-[1.02] bg-[#0a0a0a]">
                  <Image
                    src={myImage}
                    alt="Manthan Gajjar - MG Dev"
                    width={500}
                    height={600}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                    priority
                  />
                  {/* Glassmorphism Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <div className="text-white">
                      <p className="text-sm font-bold tracking-tight">Manthan Gajjar</p>
                      <p className="text-xs text-blue-400 font-medium">Software Engineer</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* About Content */}
            <div className="font-poppins w-full md:w-7/12 text-center md:text-left">
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-3 leading-tight"
              >
                Building <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-200 to-purple-500 bg-300% animate-shimmer">
                  Digital Products
                </span>
                <br className="hidden md:block" />
                that scale.
              </motion.h3>

              <div className="space-y-4 text-gray-400 max-w-2xl">
                <p className="text-lg md:text-xl font-medium text-gray-200">
                  I'm Manthan, a freelance <span className="text-blue-400">Full-Stack Dev</span> based in India.
                </p>
                <p className="text-sm md:text-base leading-relaxed">
                  I specialize in turning complex ideas into high-performance web applications. My focus is on scalability, performance, and pixel-perfect UI. Whether you're a startup or an established business, I build tools that grow with you.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
                <a href="#contact" className="group relative px-8 py-3.5 bg-blue-600 text-white font-black rounded-2xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1">
                  <span className="relative z-10 flex items-center gap-2">
                    START A PROJECT
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </a>

                <a href="https://wa.me/918141930612" target="_blank" rel="noopener noreferrer" className="px-8 py-3.5 bg-zinc-900/50 border border-white/10 hover:border-blue-500/50 text-white font-bold rounded-2xl transition-all duration-300 hover:bg-zinc-900 group">
                  <span className="flex items-center gap-2">
                    WHATSAPP ME
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-2.135 0-3.869 1.731-3.869 3.861 0 .741.211 1.455.611 2.071L8.031 15.1l3.078-.804c.594.323 1.259.493 1.942.493 2.135 0 3.869-1.733 3.869-3.861s-1.734-3.756-3.889-3.756zm3.12 5.567c-.126.17-.354.249-.607.135-.252-.112-1.488-.733-1.714-.816-.226-.083-.39-.126-.554.126-.164.252-.638.816-.782.981-.144.165-.29.186-.542.072-.252-.112-1.066-.393-2.029-1.252-.751-.667-1.258-1.491-1.405-1.742-.146-.252-.016-.39.11-.512.112-.112.253-.29.38-.435.126-.144.169-.247.253-.412.083-.165.042-.31-.021-.433-.064-.124-.554-1.336-.76-1.832-.198-.483-.404-.417-.554-.425l-.474-.01c-.164 0-.433.062-.658.31-.226.248-.865.845-.865 2.064 0 1.22.886 2.396 1.01 2.56.124.166 1.742 2.66 4.22 3.731.59.255 1.05.408 1.408.523.593.189 1.13.161 1.557.098.475-.072 1.464-.598 1.67-1.176.206-.577.206-1.074.144-1.176-.062-.102-.226-.164-.48-.278z" /></svg>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <Skills />
      </div>
    </section>
  );
}
