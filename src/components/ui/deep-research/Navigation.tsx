'use client'

import React from 'react'
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
import { User, Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Montserrat } from 'next/font/google'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const font = Montserrat({
    weight: '600',
    subsets: ['latin'],
})

const Navigation = () => {
    const { user } = useUser()

    return (
        <nav className="fixed top-0 left-0 w-full h-16 bg-white/30 backdrop-blur-md shadow-md z-50">
            <div className="container mx-auto flex items-center justify-between h-full px-2 sm:px-4">
                <a href="/research" className="flex items-center space-x-1">
                    <div className='relative h-8 w-8'>
                        <Image src='/logo.png' alt='Logo' fill />
                    </div>
                    <h1 className={cn(
                        "text-xl md:text-2xl font-extrabold bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent whitespace-nowrap",
                        font.className
                    )}>
                        Apunt IA
                    </h1>
                </a>
                {/* Desktop avatar dropdown */}
                <div className="hidden md:flex items-center gap-4">
                    {/* Desktop links */}
                    <div className="hidden md:flex items-center gap-4">
                        <Button variant="link" asChild>
                            <Link href="/research">Investigación</Link>
                        </Button>
                        <Button variant="link" asChild>
                            <Link href="/upload">Subir PDF</Link>
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
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side="top"
                            className="bg-gradient-to-br from-primary to-violet-500 shadow-xl rounded-lg transition-all duration-300 ease-in-out"
                        >
                            <SheetHeader>
                                <SheetTitle className="text-lg text-white font-bold flex items-center gap-2">
                                    <User className="w-8 h-8" />{user?.username}
                                </SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col gap-6 mt-4 px-6 py-4">
                                <Link
                                    href="/dashboard"
                                    className="text-lg font-semibold text-white hover:underline transition-colors"
                                >
                                    Mis apuntes
                                </Link>
                                <Link
                                    href="/research"
                                    className="text-lg font-semibold text-white hover:underline transition-colors"
                                >
                                    Investigación
                                </Link>
                                <Link
                                    href="/upload"
                                    className="text-lg font-semibold text-white hover:underline transition-colors"
                                >
                                    Subir PDF
                                </Link>


                                {user && (
                                    <div className="flex flex-col gap-4 border-t pt-4 mt-6">
                                        <Link href="/panel" className="text-xl text-white hover:underline transition-colors">
                                            Configuración
                                        </Link>
                                        <SignOutButton>
                                            <button className="font-bold text-red-500 hover:underline transition-colors">
                                                Cerrar sesión
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
