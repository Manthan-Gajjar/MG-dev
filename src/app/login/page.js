'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Login failed');
      router.push('/admin')
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className="min-h-[calc(100vh-100px)] flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8 font-poppins">
      <div className="max-w-md w-full space-y-8 bg-[#111] p-8 sm:p-10 rounded-3xl border border-white/5 shadow-[0_0_50px_rgba(59,130,246,0.15)] backdrop-blur-md">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-white">
            Access Dashboard
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            For MG dev admin only
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <input type="hidden" name="remember" value="true" />
          <div className="space-y-4">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none block w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 placeholder-gray-500 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none block w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 placeholder-gray-500 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] transition-all duration-300 transform hover:-translate-y-1"
            >
              Secure Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
