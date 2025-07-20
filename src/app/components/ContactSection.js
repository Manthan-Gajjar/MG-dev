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
    <section id="contact" className="py-16 bg-black text-white rounded-lg shadow-lg px-6 md:px-12 lg:px-20">
  <div className="container mx-auto flex flex-col items-center text-justify ">
    
    {/* Section Heading */}
    <div className="mb-12 font-poppins">
      <h2 className="text-xl sm:text-1xl md:text-2xl font-bold mb-4">Hey, a question?</h2>
      <div className="w-16 sm:w-24 h-1 bg-blue-500 mx-auto"></div>
    </div>

    {/* Contact Info */}
    <div className="space-y-6 font-poppins">
      <p className="text-lg">Have a question or just want to say hi? I'd love to hear from you!</p>

      {/* Clickable Email */}
      <a href="mailto:mgdev.coder@gmail.com" className="flex items-center space-x-3 text-blue-400 hover:underline">
        <FaEnvelope className="text-blue-400 text-xl" />
        <span>mgdev.coder@gmail.com</span>
      </a>

      {/* WhatsApp */}
      <a href="https://wa.me/918141930612" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 text-green-400 hover:underline">
        <FaWhatsapp className="text-green-400 text-xl" />
        <span>+91 8141930612</span>
      </a>

      {/* Social Links */}
      <div className="flex space-x-6 mt-6">
        <a href="https://in.linkedin.com/in/manthan-gajjar-7654b52a5" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 transition">
          <FaLinkedin size={30} />
        </a>
        <a href="https://instagram.com/mgdev.coder" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-400 transition">
          <FaInstagram size={30} />
        </a>
        <a href="https://www.fiverr.com/s/7YdQ2zL" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-400 transition">
          <TbBrandFiverr size={30} />
        </a>
        <a href="https://www.upwork.com/freelancers/~011bf95dc6874f0a46?mp_source=share" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-400 transition">
          <FaSquareUpwork size={30} />
        </a>
      </div>
    </div>

  </div>
</section>

  );
}