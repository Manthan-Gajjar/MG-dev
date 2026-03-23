"use client";

import { motion } from "framer-motion";

export default function SectionHeading({ title, highlight, gradientClass = "from-blue-600 to-purple-600" }) {
  return (
    <div className="text-center mt-24 mb-16 px-4">
      <motion.h2 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-black mb-3 text-white leading-tight"
      >
        {title} <span className={`text-transparent bg-clip-text bg-gradient-to-r ${gradientClass}`}>{highlight}</span>
      </motion.h2>
      <div className={`w-16 md:w-20 h-1.5 bg-gradient-to-r ${gradientClass} mx-auto rounded-full`}></div>
    </div>
  );
}
