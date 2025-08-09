"use client"

import React from 'react'

import { Montserrat } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@clerk/nextjs'
import { Sparkles, ArrowRight } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const font = Montserrat({
    weight: '600',
    subsets: ['latin'],
});

const LandingNavbar = () => {
    const { isSignedIn } = useAuth()

    return (
        <nav className='sticky top-0 z-50 p-4 bg-slate-900/80 backdrop-blur-lg border-b border-slate-800/50 flex items-center justify-between'>
            <Link href='/' className='flex items-center group'>
                <div className='relative h-10 w-10 mr-3 group-hover:scale-110 transition-transform duration-300'>
                    <div className='absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300'></div>
                    <Image 
                        src='/logo.png' 
                        alt='Logo' 
                        fill 
                        className='rounded-lg relative z-10'
                    />
                </div>
                <div className='flex flex-col'>
                    <h1 className={cn("text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent", font.className)}>
                        Deep Search AI
                    </h1>
                    <Badge variant="premium" className="text-xs px-2 py-0 mt-1 w-fit relative overflow-hidden group/badge animate-pulse hover:animate-none transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30">
                        {/* Animated background shimmer */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/badge:translate-x-full transition-transform duration-1000 ease-in-out" />
                        <Sparkles className="w-3 h-3 mr-1 animate-pulse group-hover/badge:animate-spin" />
                        <span className="relative z-10 font-medium bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent animate-bounce group-hover/badge:animate-pulse">
                            Powered by AI
                        </span>
                    </Badge>
                </div>
            </Link>
            
            <div className='flex items-center gap-x-4'>
                {/* Navigation Links */}
                <div className='hidden md:flex items-center gap-x-6 text-sm'>
                    <Link href='#features' className='text-gray-300 hover:text-white transition-colors duration-300'>
                        Características
                    </Link>
                    <Link href='#testimonials' className='text-gray-300 hover:text-white transition-colors duration-300'>
                        Testimonios
                    </Link>
                    <Link href='#pricing' className='text-gray-300 hover:text-white transition-colors duration-300'>
                        Precios
                    </Link>
                </div>
                
                {/* CTA Button */}
                <Link href={isSignedIn ? "/research" : "/sign-up"}>
                    <Button 
                        variant="pro" 
                        className='group rounded-full px-6 py-2 font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25'
                    >
                        <Sparkles className="w-4 h-4 mr-2 group-hover:animate-spin" />
                        {isSignedIn ? "Ir a Investigación" : "Comienza Gratis"}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                </Link>
            </div>
        </nav>
    )
}

export default LandingNavbar