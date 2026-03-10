"use client"

import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useUser } from '@/app/context/UserContext'


const SignupPage = () => {
  // Initial state ko ek variable mein rakh liya taaki reset karne mein aasaani ho
  const initialState = {
    username: '',
    email: '',
    phone: '',
    city: '',
    pincode: '',
    password: ''
  };

  const [user, setUser] = useState(initialState)
  const { setInfo } = useUser();
  const handleChange = (event: any) => {
    const { name, value } = event?.target;
    setUser({ ...user, [name]: value })
  }

  // 1. Function ko async banaya
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log("Form Submitted:", user);



    try {
      // 2. axios.post likha (lowercase) aur await lagaya
      // Note: '/api/signup' ko small letters mein rakhna best practice hai Next.js mein
      const res = await axios.post('/api/signup', user);

      // 3. Axios mein status code check karte hain (200 OK, ya 201 Created)
      if (res.status === 200 || res.status === 201) {
        console.log("Signup successfully");
        alert("sign up successfully")
        // 4. State ko wapas uski initial empty values par set kiya
        setUser(initialState);
        setInfo(user);
      } else {
        console.log("Problem in backend res in signup");
      }

    } catch (err: unknown) {
      // 5. Error handling theek ki (Axios specific error message nikalne ke liye)
      if (axios.isAxiosError(err)) {
        console.log('Signup error:', err.response?.data || err.message);
        alert('Signup error:' + (err.response?.data || err.message))
      } else if (err instanceof Error) {
        console.log('Signup error:', err.message);
        alert('Signup error:' + ( err.message))
      } else {
        console.log('An unknown error occurred');
        alert('unknown error')
      }
    }
  }

  return (
    <div className='border-white border-4 min-h-screen flex flex-col justify-center items-center py-10'>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
        {/* 1. Username */}
        <div className='flex justify-between items-center gap-4'>
          <label htmlFor="username" className="text-white">Username</label>
          <input
            name='username' value={user.username} onChange={handleChange}
            className='bg-slate-400 px-2 py-1 rounded text-black w-2/3' type="text"
          />
        </div>

        {/* 2. Email */}
        <div className='flex justify-between items-center gap-4'>
          <label htmlFor="email" className="text-white">Email</label>
          <input
            name='email' value={user.email} onChange={handleChange}
            className='bg-slate-400 px-2 py-1 rounded text-black w-2/3' type="email"
          />
        </div>

        {/* 3. Phone */}
        <div className='flex justify-between items-center gap-4'>
          <label htmlFor="phone" className="text-white">Phone</label>
          <input
            name='phone' value={user.phone} onChange={handleChange}
            className='bg-slate-400 px-2 py-1 rounded text-black w-2/3' type="text"
          />
        </div>

        {/* 4. City */}
        <div className='flex justify-between items-center gap-4'>
          <label htmlFor="city" className="text-white">City</label>
          <input
            name='city' value={user.city} onChange={handleChange}
            className='bg-slate-400 px-2 py-1 rounded text-black w-2/3' type="text"
          />
        </div>

        {/* 5. Pincode */}
        <div className='flex justify-between items-center gap-4'>
          <label htmlFor="pincode" className="text-white">Pincode</label>
          <input
            name='pincode' value={user.pincode} onChange={handleChange}
            className='bg-slate-400 px-2 py-1 rounded text-black w-2/3' type="text"
          />
        </div>

        {/* 6. Password */}
        <div className='flex justify-between items-center gap-4'>
          <label htmlFor="password" className="text-white">Password</label>
          <input
            name='password' value={user.password} onChange={handleChange}
            className='bg-slate-400 px-2 py-1 rounded text-black w-2/3' type="password"
          />
        </div>

        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mt-4">
          Sign Up
        </button>
     <p>already have account <Link className='italic font-light text-blue-900' href="/signin">Signin</Link></p>
      </form>
    </div>
  )
}

export default SignupPage;