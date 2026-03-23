
import "./globals.css"
import { Inter, Poppins } from "next/font/google"
import Header from "./components/Header"
import Footer from "./components/Footer"
import ClientSideComponents from "./components/ClientSideComponents"

// Simple Scroll Progress Component
const ScrollProgress = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[100]">
      <div 
        className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-150 ease-out" 
        id="scroll-progress-bar"
        style={{ width: '0%' }}
      />
    </div>
  );
};

// Import both fonts
const inter = Inter({ 
  subsets: ["latin"], 
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700"], 
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata = {
  title: "MG Dev Portfolio",
  description: "High-performance Portfolio for MG Dev - Web Developer specialized in Next.js, Node.js & SaaS",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} scroll-smooth`}>
      <body className="font-inter bg-[#050505] text-white selection:bg-blue-500/30 selection:text-white">
        <div className="noise-bg"></div>
        <ScrollProgress />
        <Header />
        <main className="min-h-screen relative z-10">{children}</main>
        <Footer />
        <ClientSideComponents />
        
        {/* Simple Client Script for Scroll Progress */}
        <script dangerouslySetInnerHTML={{
          __html: `
            window.addEventListener('scroll', () => {
              const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
              const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
              const scrolled = (winScroll / height) * 100;
              const bar = document.getElementById('scroll-progress-bar');
              if (bar) bar.style.width = scrolled + '%';
            });
          `
        }} />
      </body>
    </html>
  )
}


