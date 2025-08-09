'use client'

import React, { useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useUser, SignOutButton } from "@clerk/nextjs"
import { User, Menu, Brain, BookOpen, Search, Upload, Settings, LogOut } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const Navigation = () => {
  const { user } = useUser()
  const [open, setOpen] = useState(false)

  const handleClose = () => setOpen(false)

  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50 shadow-lg z-50">
      <div className="container mx-auto flex items-center justify-between h-full px-2 sm:px-4">
        <Link href="/" className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center transform rotate-12 hover:rotate-0 transition-transform duration-300">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              ApuntIA
            </h1>
            <Badge variant="outline" className="text-xs border-purple-500/30 text-purple-300">
              Powered by AI
            </Badge>
          </div>
        </Link>

        {/* Desktop avatar dropdown */}
        <div className="hidden md:flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            <Button variant="link" asChild className="text-gray-300 hover:text-white transition-colors">
              <Link href="/research">Investigación</Link>
            </Button>
            <Button variant="link" asChild className="text-gray-300 hover:text-white transition-colors">
              <Link href="/upload">Subir PDF</Link>
            </Button>
            <Button variant="link" asChild className="text-gray-300 hover:text-white transition-colors">
              <Link href="/dashboard">Mis Apuntes</Link>
            </Button>
          </div>
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Image
                  src={user.imageUrl}
                  alt="avatar"
                  width={40}
                  height={40}
                  className="rounded-full cursor-pointer"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel className='flex items-center gap-2'>
                  <User className="w-4 h-4" /> {user.username}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Mis apuntes</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/panel">Configuración</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <SignOutButton>
                    <a>Cerrar sesión</a>
                  </SignOutButton>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Mobile menu */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-slate-800">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="top"
              className="bg-slate-900/95 backdrop-blur-xl border-slate-700 shadow-xl transition-all duration-300 ease-in-out"
            >
              <SheetHeader>
                <SheetTitle className="text-lg font-bold flex items-center gap-2 text-white">
                  <User className="w-6 h-6" /> {user?.username}
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-3 mt-6 px-4 py-2">
                <Link 
                  href="/dashboard" 
                  onClick={handleClose} 
                  className="flex items-center gap-3 p-4 rounded-xl bg-slate-800/50 hover:bg-slate-700/70 text-gray-300 hover:text-white transition-all duration-200 group border border-slate-700/50 hover:border-purple-500/30"
                >
                  <BookOpen className="w-5 h-5 text-purple-400 group-hover:text-purple-300" />
                  <span className="font-medium">Mis Apuntes</span>
                </Link>
                <Link 
                  href="/research" 
                  onClick={handleClose} 
                  className="flex items-center gap-3 p-4 rounded-xl bg-slate-800/50 hover:bg-slate-700/70 text-gray-300 hover:text-white transition-all duration-200 group border border-slate-700/50 hover:border-purple-500/30"
                >
                  <Search className="w-5 h-5 text-purple-400 group-hover:text-purple-300" />
                  <span className="font-medium">Investigación</span>
                </Link>
                <Link 
                  href="/upload" 
                  onClick={handleClose} 
                  className="flex items-center gap-3 p-4 rounded-xl bg-slate-800/50 hover:bg-slate-700/70 text-gray-300 hover:text-white transition-all duration-200 group border border-slate-700/50 hover:border-purple-500/30"
                >
                  <Upload className="w-5 h-5 text-purple-400 group-hover:text-purple-300" />
                  <span className="font-medium">Subir PDF</span>
                </Link>

                {user && (
                  <div className="flex flex-col gap-3 border-t border-slate-700/70 pt-4 mt-4">
                    <Link 
                      href="/panel" 
                      onClick={handleClose} 
                      className="flex items-center gap-3 p-4 rounded-xl bg-slate-800/50 hover:bg-slate-700/70 text-gray-300 hover:text-white transition-all duration-200 group border border-slate-700/50 hover:border-blue-500/30"
                    >
                      <Settings className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
                      <span className="font-medium">Configuración</span>
                    </Link>
                    <SignOutButton>
                      <button className="flex items-center gap-3 p-4 rounded-xl bg-red-900/30 hover:bg-red-800/50 text-red-400 hover:text-red-300 transition-all duration-200 group border border-red-700/50 hover:border-red-500/50 w-full">
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Cerrar sesión</span>
                      </button>
                    </SignOutButton>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
