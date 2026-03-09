'use client';
import React, { useState } from 'react';


const MarkdownPage = () => {
  const [markdown, setMarkdown] = useState("# Heading\nStart typing...");



  return (
    <div className='flex h-screen w-full'>
      {/* LEFT SIDE: Input Area */}
      <div className='w-1/2 h-screen bg-zinc-900 border-r border-zinc-700'>
        <textarea
          className='w-full h-full p-6 outline-none resize-none font-mono text-sm bg-transparent text-emerald-400'
          // text-emerald-400 makes the typing text green like a code editor
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          placeholder="Write Markdown..."
        />
      </div>

      {/* RIGHT SIDE: Preview Area */}
      <div className='w-1/2 h-screen bg-white p-6 overflow-y-auto'>
        <div className='prose prose-slate max-w-none text-slate-700'>
          {/* text-slate-700 changes the color of the rendered HTML text */}

        </div>
      </div>
    </div>
  );
};

export default MarkdownPage;
