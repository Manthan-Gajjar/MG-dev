"use client";

import { useState } from "react";
import { FaInstagram, FaLinkedin, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { FaSquareUpwork } from "react-icons/fa6";
import { TbBrandFiverr } from "react-icons/tb";
import css from "./button.css";
import { Pointer } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-16 bg-black text-white rounded-lg px-6 md:px-12 lg:px-20 mt-16">
  <div className="container mx-auto flex flex-col items-center text-center">
    
    {/* Section Heading */}
    <div className="mb-12 font-poppins">
      <h2 className="text-2xl sm:text-3xl md:text-3xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Hey, a question?</h2>
      <div className="w-16 sm:w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
    </div>

    {/* Contact Info */}
    <div className="space-y-6 font-poppins flex flex-col items-center bg-white/5 p-8 rounded-2xl border border-white/10 shadow-lg shadow-blue-500/10 max-w-2xl w-full">
      <p className="text-lg text-gray-300">Have a question or just want to say hi? I'd love to hear from you!</p>

      {/* Clickable Email */}
      <a href="mailto:mgdev.coder@gmail.com" className="flex items-center space-x-3 text-blue-400 hover:text-blue-300 transition hover:underline">
        <FaEnvelope className="text-2xl" />
        <span className="text-lg">mgdev.coder@gmail.com</span>
      </a>

      {/* WhatsApp */}
      <a href="https://wa.me/918141930612" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 text-green-400 hover:text-green-300 transition hover:underline">
        <FaWhatsapp className="text-2xl" />
        <span className="text-lg">+91 8141930612</span>
      </a>

      {/* Social Links */}
      <div className="flex justify-center space-x-6 mt-8 pt-6 border-t border-white/10 w-full">
        <a href="https://in.linkedin.com/in/manthan-gajjar-7654b52a5" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 hover:scale-110 transition-transform duration-300">
          <FaLinkedin size={35} />
        </a>
        <a href="https://instagram.com/mgdev.coder" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-400 hover:scale-110 transition-transform duration-300">
          <FaInstagram size={35} />
        </a>
        <a href="https://www.fiverr.com/s/7YdQ2zL" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-400 hover:scale-110 transition-transform duration-300">
          <TbBrandFiverr size={35} />
        </a>
        <a href="https://www.upwork.com/freelancers/~011bf95dc6874f0a46?mp_source=share" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-400 hover:scale-110 transition-transform duration-300">
          <FaSquareUpwork size={35} />
        </a>
      </div>
    </div>

  </div>
</section>

  );
}