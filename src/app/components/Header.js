

"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@supabase/supabase-js"
import "./button.css"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  return (
    <header className="bg-gray-800 text-white p-4 sm:p-5 shadow-lg button-85 m-5 rounded-2xl">
      <nav className="container mx-auto flex items-center justify-between relative">
        {/* Logo Button */}
        <button
          className="MGdev text-xl sm:text-2xl"
          onClick={async () => {
            const {
              data: { user },
            } = await supabase.auth.getUser()
            router.push(user ? "/admin" : "/login")
          }}
        >
          MG dev
        </button>

        {/* Centered Title */}
        <h2 className="MGdev absolute left-1/2 -translate-x-1/2 text-xl sm:text-2xl md:text-3xl font-extrabold text-blue-400">
          &lt;/coder&gt;
        </h2>

        {/* Desktop Nav */}
        <div className="MGdev hidden md:flex space-x-6">
          <Link href="/" className="hover:text-red-300 text-lg">
            Home
          </Link>
          <Link href="/#contact" className="hover:text-red-300 text-lg">
            Contact
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
            <svg className="h-6 w-6 fill-current" viewBox="0 -4 24 24">
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
      </nav>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="MGdev md:hidden px-4 py-3 space-y-2 bg-black">
          <Link href="/" className="block text-base sm:text-lg hover:text-gray-300">
            Home
          </Link>
          <Link href="/#contact" className="block text-base sm:text-lg hover:text-gray-300">
            Contact
          </Link>
        </div>
      )}
    </header>
  )
}
