// // 'use client';
// // import React, { useState } from 'react';
// // import ReactMarkdown from 'react-markdown';

// // const Page = () => {
// //   const [markdown, setMarkdown] = useState("# Heading\nStart typing...");

// //   return (
// //     <div className='flex h-screen w-full'>
// //       {/* LEFT SIDE: Input Area */}
// //       <div className='w-1/2 h-screen bg-zinc-900 border-r border-zinc-700'>
// //         <textarea
// //           className='w-full h-full p-6 outline-none resize-none font-mono text-sm bg-transparent text-emerald-400'
// //           // text-emerald-400 makes the typing text green like a code editor
// //           value={markdown}
// //           onChange={(e) => setMarkdown(e.target.value)}
// //           placeholder="Write Markdown..."
// //         />
// //       </div>

// //       {/* RIGHT SIDE: Preview Area */}
// //       <div className='w-1/2 h-screen bg-white p-6 overflow-y-auto'>
// //         <div className='prose prose-slate max-w-none text-slate-700'>
// //           {/* text-slate-700 changes the color of the rendered HTML text */}
// //           <ReactMarkdown>{markdown}</ReactMarkdown>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Page;
// 'use client'
// import React, { useState } from 'react';
// import { marked } from 'marked';

// const MarkdownPreviewer = () => {
//   const [markdown, setMarkdown] = useState('');

//   const handleInputChange = (event) => {
//     setMarkdown(event.target.value);
//   };

//   const getHTML = () => {
//     return { __html: marked(markdown) };
//   };

//   return (
//     <div style={{ display: 'flex', gap: '20px' }}>
//       <textarea
//         style={{ width: '50%', height: '90vh' }}
//         value={markdown}
//         onChange={handleInputChange}
//         placeholder="यहाँ Markdown लिखो..."
//       />
//       <div
//         style={{ width: '50%', height: '90vh', overflow: 'auto', border: '1px solid #ccc', padding: '10px' }}
//         dangerouslySetInnerHTML={getHTML()}
//       />
//     </div>
//   );
// };

// export default MarkdownPreviewer;

import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page