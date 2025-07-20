
import "./globals.css"
import { Inter, Poppins } from "next/font/google"
import Header from "./components/Header"
import Footer from "./components/Footer"

// Import both fonts
const inter = Inter({ subsets: ["latin"], variable: '--font-inter' })
const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ["400", "600", "700"], 
  variable: '--font-poppins' 
})

export const metadata = {
  title: "MG Dev Portfolio",
  description: "Portfolio website for MG Dev",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-inter"> {/* Default font */}
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
