"use client";

import { motion } from "framer-motion";
import { FaCode, FaRocket, FaMobileAlt, FaDatabase } from "react-icons/fa";

const services = [
  {
    title: "Full-Stack Web Apps",
    description: "End-to-end development of scalable web applications using Next.js, Node.js, and modern databases.",
    icon: <FaCode className="w-8 h-8 text-blue-500" />,
    features: ["Performance Optimized", "SEO Friendly", "Secure Auth"]
  },
  {
    title: "SaaS Platforms",
    description: "Building subscription-based products with multi-tenancy, payment integration (Stripe), and admin panels.",
    icon: <FaRocket className="w-8 h-8 text-purple-500" />,
    features: ["Stripe Integration", "Analytics Dashboard", "Role-based Access"]
  },
  {
    title: "Mobile-First Design",
    description: "Responsive and fluid user interfaces that look stunning on everything from iPhones to Ultra-wide monitors.",
    icon: <FaMobileAlt className="w-8 h-8 text-indigo-500" />,
    features: ["PWA Support", "Touch Optimized", "Pixel-Perfect UI"]
  },
  {
    title: "API & Backend Architecture",
    description: "Robusting backends using Express or Next.js API routes with MongoDB or PostgreSQL databases.",
    icon: <FaDatabase className="w-8 h-8 text-cyan-500" />,
    features: ["REST/GraphQL", "Real-time WebSockets", "Cloud Deployment"]
  }
];

export default function Services() {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-black mb-3 text-white"
          >
            How Can I <span className="text-blue-500">Help You?</span>
          </motion.h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-[2rem] hover:bg-white/10 transition-all duration-300 group hover:-translate-y-2 hover:border-blue-500/50"
            >
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature, fIndex) => (
                  <li key={fIndex} className="text-xs font-semibold text-gray-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
