"use client"

import { useState, useEffect } from "react"
import { Github, Linkedin, Mail, Twitter, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Portfolio() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Starry background effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-white rounded-full animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-white rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-1/3 right-1/2 w-1 h-1 bg-white rounded-full animate-pulse delay-1500"></div>
        <div className="absolute top-3/4 left-1/2 w-1 h-1 bg-white rounded-full animate-pulse delay-700"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Astronaut icon */}
          <div className="mb-8 flex justify-center">
            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center text-4xl">🧑‍🚀</div>
          </div>

          {/* Main heading */}
          <div className="mb-6">
            <h1 className="text-5xl md:text-7xl font-light text-white mb-2">{"I'm"}</h1>
            <h1 className="text-5xl md:text-7xl font-light text-white">Your Name Here</h1>
          </div>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 font-light">
            I make random things, mostly using JavaScript.
          </p>

          {/* Navigation and Social links */}
          <div className="flex flex-col items-center space-y-8 mb-16">
            <div className="flex justify-center space-x-6">
              <Button
                variant="outline"
                className="text-white border-white/20 hover:bg-white/10 hover:border-white/40"
                asChild
              >
                <Link href="/blog">View Blog</Link>
              </Button>

              <Button
                variant="outline"
                className="text-white border-white/20 hover:bg-white/10 hover:border-white/40"
                asChild
              >
                <Link href="/admin">Admin</Link>
              </Button>
            </div>

            <div className="flex justify-center space-x-6">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white transition-colors duration-200 hover:bg-white/10"
                asChild
              >
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Twitter className="w-6 h-6" />
                  <span className="sr-only">Twitter</span>
                </a>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white transition-colors duration-200 hover:bg-white/10"
                asChild
              >
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="w-6 h-6" />
                  <span className="sr-only">GitHub</span>
                </a>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white transition-colors duration-200 hover:bg-white/10"
                asChild
              >
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-6 h-6" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white transition-colors duration-200 hover:bg-white/10"
                asChild
              >
                <a href="mailto:your.email@example.com">
                  <Mail className="w-6 h-6" />
                  <span className="sr-only">Email</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-gray-400 text-sm mb-2">Scroll Down</p>
        <ChevronDown className="w-6 h-6 text-gray-400 mx-auto animate-bounce" />
      </div>
    </div>
  )
}
