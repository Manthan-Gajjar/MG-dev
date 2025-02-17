"use client";

import { useState } from "react";
import { FaInstagram, FaLinkedin, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import css from "./button.css";

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
      <div className="container mx-auto">
        <h2 className="text-2xl font-extrabold text-center my-10 text-blue-400">Get in Touch</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <p className="text-lg">Have a question or just want to say hi? I'd love to hear from you!</p>
            <div className="flex items-center space-x-3">
              <FaEnvelope className="text-blue-400 text-xl" />
              <p>mgdev.coder@gmail.com</p>
            </div>
            <div className="flex items-center space-x-3">
              <FaWhatsapp className="text-green-400 text-xl" />
              <a href="https://wa.me/918141930612" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">+91 8141930612</a>
            </div>
            <div className="flex space-x-4 mt-4">
              <a href="https://in.linkedin.com/in/manthan-gajjar-7654b52a5" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 transition">
                <FaLinkedin size={30} />
              </a>
              <a href="https://instagram.com/mgdev.coder" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-400 transition">
                <FaInstagram size={30} />
              </a>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="bg-black p-6 rounded-lg shadow-lg">
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-300 font-medium mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-black border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-400 text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-300 font-medium mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-black border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-400 text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-300 font-medium mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 bg-black border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-400 text-white"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
