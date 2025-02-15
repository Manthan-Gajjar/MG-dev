"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@supabase/supabase-js"
import css from "./button.css"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const handleLogoClick = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (user) {
      router.push("/admin")
    } else {
      router.push("/login")
    }
  }
  return (
    <header className="bg-gray-800 text-white button-85 m-5">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="cursor-pointer" onClick={handleLogoClick}>
            <button className="text-lg sm:text-xl font-bold button-85" role="button">MG dev</button>
          </div>
          <h2 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-extrabold text-center text-blue-400">
            &lt;/coder&gt;
          </h2>
  
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-gray-300 text-lg">
              Home
            </Link>
            <Link href="/#contact" className="hover:text-gray-300 text-lg">
              Contact
            </Link>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                {isOpen ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2z"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-2">
              <Link href="/" className="block text-lg hover:text-gray-300">
                Home
              </Link>
              <Link href="/#contact" className="block text-lg hover:text-gray-300">
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

