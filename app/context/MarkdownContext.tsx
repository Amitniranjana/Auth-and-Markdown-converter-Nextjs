'use client'

import {useState, createContext } from 'react'

type markdownType = {
  markdown: string
  setMarkdown: React.Dispatch<React.SetStateAction<string>>
}

export const MarkdownContext = createContext<markdownType| null>(null)

export default function MarkdownProvider({children}:{children:React.ReactNode}) {
  const [markdown , setMarkdown]=useState("write markdown here \n")
  return <MarkdownContext.Provider value={{markdown , setMarkdown}}>{children}</MarkdownContext.Provider>
}