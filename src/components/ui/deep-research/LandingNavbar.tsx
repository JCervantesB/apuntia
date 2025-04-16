"use client"

import React from 'react'

import { Montserrat } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@clerk/nextjs'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const font = Montserrat({
    weight: '600',
    subsets: ['latin'],
});


const LandingNavbar = () => {
    const { isSignedIn } = useAuth()

  return (
    <nav className='p-4 bg-transparent flex items-center justify-between'>
        <Link href='/' className='flex items-center'>
            <div className='relative h-8 w-8 mr-4'>
                <Image src='/logo.png' alt='Logo' fill />
                <h1 className={cn("text-2xl font-bold text-white ml-7", font.className)}>ApuntIA</h1>
            </div>
        </Link>
        <div className='flex items-center gap-x-2'>
            <Link href={isSignedIn ? "/research" : "/sign-up"}>
                <Button variant="outline" className='rounded-full'>
                    Comienza ahora
                </Button>
            </Link>
        </div>
    </nav>
  )
}

export default LandingNavbar