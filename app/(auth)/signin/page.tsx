"use client"

import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useUser } from '@/app/context/UserContext'




const LoginPage = () => {
  const { setInfo } = useUser();

   const router = useRouter()
  // 1. Sirf 2 fields ki state banayi
  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  // 2. Same 'handleChange' logic jo aapne Signup me use kiya tha
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value })
  }

  // 3. Form submit handle karne ke liye
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log("Login ke liye data bheja:", user);


    try {
      // API call to login route
      const res = await axios.post('/api/login', user);

      if (res.status === 200) {
        alert("Login Successful! 🎉");
        // Login hone ke baad form clear kar diya (ya aap user ko dashboard par redirect kar sakte hain)
        router.push('/dashboard');
        setInfo(res.data.user)
        setUser({ email: '', password: '' });

      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        alert('Login failed: ' + (err.response?.data?.message || err.message));
      } else {
        console.log('An unknown error occurred');
      }
    }
  }

  return (
    <div className='min-h-screen flex flex-col justify-center items-center py-10 bg-gray-900'>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-80 border-white border-2 p-8 rounded-lg shadow-lg">
        <h2 className="text-white text-3xl font-bold text-center mb-2">Login</h2>

        {/* Email Field */}
        <div className='flex flex-col gap-2'>
          <label htmlFor="email" className="text-gray-300 font-medium">Email</label>
          <input
            id="email"
            name='email'
            value={user.email}
            onChange={handleChange}
            className='bg-slate-700 px-3 py-2 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Password Field */}
        <div className='flex flex-col gap-2'>
          <label htmlFor="password" className="text-gray-300 font-medium">Password</label>
          <input
            id="password"
            name='password'
            value={user.password}
            onChange={handleChange}
            className='bg-slate-700 px-3 py-2 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
            type="password"
            placeholder="Enter your password"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-200 mt-2"
        >
          Login
        </button>
<p>not have account go to <Link className='color-red italic text-blue-700 underline' href={'/signup'}>signup</Link> </p>
      </form>
    </div>
  )
}

export default LoginPage;