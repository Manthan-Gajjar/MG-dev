
import "./globals.css"
import { Inter, Poppins } from "next/font/google"
import Header from "./components/Header"
import Footer from "./components/Footer"
import ClientSideComponents from "./components/ClientSideComponents"

// Import both fonts
const inter = Inter({ 
  subsets: ["latin"], 
  variable: '--font-inter',
  display: 'swap', // Optimization: show fallback font while loading
})

const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700"], 
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata = {
  title: "MG Dev Portfolio",
  description: "Portfolio website for MG Dev",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} scroll-smooth`}>
      <body className="font-inter bg-[#0a0a0a] text-white">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <ClientSideComponents />
      </body>
    </html>
  )
}


