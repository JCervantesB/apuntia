/* eslint-disable */
'use client'
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Montserrat } from 'next/font/google'
import { cn } from '@/lib/utils'

const font = Montserrat({
    weight: '600',
    subsets: ['latin'],
});

const Navigation = () => {
    const { user } = useUser();

    return (
        <nav className="fixed top-0 left-0 w-full h-16 bg-white/40 backdrop-blur-md shadow-md z-50">
            <div className="container mx-auto flex items-center justify-between h-full px-2 sm:px-4">
                <a href="/research" className="flex items-center space-x-1">
                    <div className='relative h-8 w-8'>
                        <Image src='/logo.png' alt='Logo' fill />
                    </div>
                    <h1 className={cn("text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent whitespace-nowrap", font.className)}>
                        Apunt IA
                    </h1>
                </a>

                <div className="flex items-center gap-4">
                    {user && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <img
                                    src={user.imageUrl}
                                    alt="avatar"
                                    className="w-10 h-10 rounded-full cursor-pointer"
                                />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel className='flex items-center'><User /> {user.username}</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href={"/panel"}>Configuración</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <SignOutButton>
                                        <a >Cerrar sesión</a>
                                    </SignOutButton>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navigation