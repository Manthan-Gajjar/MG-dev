import { FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import css from "./button.css";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white m-5 py-6 button-85">
      <div className="container mx-auto px-6 flex flex-col items-center justify-center text-center">
        <p className="text-lg sm:text-xl font-bold font-poppins">&copy; 2024 MG Dev. All rights reserved.</p>
        
        {/* Social Icons */}
        <div className="flex space-x-6 mt-4">
          <a href="https://wa.me/918141930612" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 transition text-2xl">
            <FaWhatsapp />
          </a>
          <a href="https://in.linkedin.com/in/manthan-gajjar-7654b52a5" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 transition text-2xl">
            <FaLinkedin />
          </a>
          <a href="https://instagram.com/mgdev.coder" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-400 transition text-2xl">
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
}
