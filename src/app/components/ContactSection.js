"use client";

import { FaEnvelope, FaExternalLinkAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeading from "./SectionHeading";

// SVG imports
import LinkedInIcon from "./logos/transparent/linkedin.svg";
import InstagramIcon from "./logos/transparent/instagram.svg";
import WhatsAppIcon from "./logos/transparent/whatsapp.svg";
import UpworkIcon from "./logos/transparent/upwork.svg";
import FiverrIcon from "./logos/transparent/fiverr.svg";

export default function ContactSection() {
  const contactMethods = [
    {
      name: "WhatsApp",
      value: "+91 8141930612",
      icon: <Image src={WhatsAppIcon} alt="WA" width={24} height={24} className="w-6 h-6 object-contain" />,
      link: "https://wa.me/918141930612",
      color: "text-green-400",
      bg: "bg-green-500/10",
      border: "border-green-500/20"
    },
    {
      name: "Email",
      value: "mgdev.coder@gmail.com",
      icon: <FaEnvelope className="w-6 h-6" />,
      link: "mailto:mgdev.coder@gmail.com",
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20"
    }
  ];

  const socialLinks = [
    { name: "LinkedIn", icon: LinkedInIcon, link: "https://in.linkedin.com/in/manthan-gajjar-7654b52a5", hover: "hover:border-blue-500/50" },
    { name: "Instagram", icon: InstagramIcon, link: "https://instagram.com/mgdev.coder", hover: "hover:border-pink-500/50" },
    { name: "Upwork", icon: UpworkIcon, link: "https://www.upwork.com/freelancers/~011bf95dc6874f0a46", hover: "hover:border-emerald-500/50" },
    { name: "Fiverr", icon: FiverrIcon, link: "https://www.fiverr.com/s/7YdQ2zL", hover: "hover:border-green-500/50" }
  ];

  return (
    <section id="contact" className="py-16 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeading 
          title="Ready to Scale?" 
          highlight="Let's Talk" 
          gradientFrom="blue-500" 
          gradientTo="purple-500" 
        />

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {contactMethods.map((method, index) => (
              <motion.a
                key={index}
                href={method.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex items-center p-6 rounded-3xl border ${method.border} ${method.bg} backdrop-blur-md group hover:scale-[1.02] transition-all duration-300`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mr-6 ${method.color} bg-white/5 border border-white/10 group-hover:scale-110 transition-transform`}>
                  {method.icon}
                </div>
                <div>
                  <h4 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">{method.name}</h4>
                  <p className="text-white font-bold text-lg group-hover:text-blue-400 transition-colors">{method.value}</p>
                </div>
                <FaExternalLinkAlt className="ml-auto text-gray-600 group-hover:text-white transition-colors" size={14} />
              </motion.a>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white/5 border border-white/10 rounded-[2.5rem] p-6 md:p-10 text-center backdrop-blur-xl relative overflow-hidden group"
          >
            <div className="relative z-10">
              <h3 className="text-xl md:text-2xl font-black text-white mb-6">
                Connect with me on <span className="text-blue-400">Social Media</span>
              </h3>
              <div className="flex flex-wrap justify-center gap-4 md:gap-7">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative w-14 h-14 md:w-16 md:h-16 bg-zinc-900/60 border border-white/5 rounded-2xl flex items-center justify-center transition-all duration-300 transform hover:-translate-y-2 ${social.hover} hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] group`}
                    title={social.name}
                  >
                    <Image 
                      src={social.icon} 
                      alt={social.name} 
                      width={32} 
                      height={32} 
                      className="w-7 h-7 md:w-8 md:h-8 object-contain transition-transform group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 rounded-2xl bg-white/0 group-hover:bg-white/5 transition-colors" />
                  </a>
                ))}
              </div>
              <p className="mt-10 text-gray-400 text-sm font-medium">
                © {new Date().getFullYear()} Manthan Gajjar | Building products that matter.
              </p>
            </div>
            
            {/* Animated Gradient Border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}