import Image from "next/image";
import "./button.css";

// SVG imports
import LinkedInIcon from "./logos/transparent/linkedin.svg";
import InstagramIcon from "./logos/transparent/instagram.svg";
import WhatsAppIcon from "./logos/transparent/whatsapp.svg";

export default function Footer() {
  return (
    <footer className="mt-20 py-20 border-t border-white/5 bg-[#050505] relative overflow-hidden">
      {/* Background Smoke Effect for Footer */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] animate-drift"></div>
        <div className="absolute top-[20%] left-[-5%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] animate-drift animation-delay-3000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="text-center md:text-left group">
            <h2 className="MGdev text-3xl md:text-4xl font-black text-white mb-3 tracking-tighter group-hover:text-blue-600 transition-colors duration-500">
              MG dev
            </h2>
            <p className="text-gray-500 text-sm font-medium max-w-sm mx-auto md:mx-0 leading-relaxed">
              Crafting high-performance digital experiences with precision, scalability, and modern architecture.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-6">
            <div className="flex space-x-4 md:space-x-6">
              {[
                { icon: WhatsAppIcon, link: "https://wa.me/918141930612", color: "hover:border-green-500/50" },
                { icon: LinkedInIcon, link: "https://in.linkedin.com/in/manthan-gajjar-7654b52a5", color: "hover:border-blue-500/50" },
                { icon: InstagramIcon, link: "https://instagram.com/mgdev.coder", color: "hover:border-pink-500/50" }
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`relative w-12 h-12 md:w-14 md:h-14 bg-zinc-900/60 border border-white/5 rounded-2xl flex items-center justify-center transition-all duration-300 transform hover:-translate-y-2 ${social.color} hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] group`}
                >
                  <Image 
                    src={social.icon} 
                    alt="Social" 
                    width={28} 
                    height={28} 
                    className="w-6 h-6 md:w-7 md:h-7 object-contain transition-transform group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 rounded-2xl bg-white/0 group-hover:bg-white/5 transition-colors" />
                </a>
              ))}
            </div>
            <div className="flex flex-col items-center md:items-end">
              <p className="text-gray-600 text-[10px] font-black tracking-[0.2em] uppercase mb-1">
                EST. 2024 • BASED IN INDIA
              </p>
              <p className="text-gray-400 text-xs font-bold tracking-widest uppercase">
                &copy; {new Date().getFullYear()} MG DEV • ALL RIGHTS RESERVED
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
