'use client'
import React, { useState } from 'react'

const Page = () => {
    const [markdownn , setMarkdownn]=useState('');
  return (
    <div className='h-screen w-full flex leftSide'>
        <div className=' h-screen w-1/2 bg-red-500'>
<textarea
value={markdownn}
onChange={(e)=>{
    setMarkdownn(e.target.value)
}}
className='bg-white text-slate-700 h-screen w-full ' placeholder='write your markdoown here '></textarea>
        </div>
        <div className='h-screen w-1/2 bg-slate-500 '>
<pre>{markdownn}</pre>
        </div>
    </div>
  )
}

export default Page