"use client";

import { useAuth } from "@clerk/nextjs"
import Link from "next/link";
import { Typewriter } from 'react-simple-typewriter';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Sparkles, Zap, FileText, Search, Download } from "lucide-react";

export const LandingHero = () => {
    const { isSignedIn } = useAuth();

    return (
        <div className="relative w-full overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <div className="relative w-full max-w-7xl mx-auto text-white font-bold py-20 md:py-32 text-center space-y-8 px-4">
                {/* Badge */}
                <div className="flex justify-center mb-8">
                    <Badge variant="premium" className="px-4 py-2 text-sm font-medium">
                        <Brain className="w-4 h-4 mr-2 animate-pulse" />
                        Investigación Automatizada con IA
                    </Badge>
                </div>

                {/* Main heading */}
                <div className="space-y-6">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
                        <span className="block mb-4">
                            Revoluciona tu forma de
                        </span>
                        <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
                            <Typewriter
                                words={["investigar", "estudiar", "crear contenido", "escribir blogs", "generar reportes"]}
                                loop={true}
                                cursor
                                cursorStyle="|"
                                typeSpeed={80}
                                deleteSpeed={60}
                                delaySpeed={1500}
                            />
                        </div>
                    </h1>
                </div>

                {/* Subtitle */}
                <div className="max-w-4xl mx-auto space-y-4">
                    <p className="text-xl md:text-2xl font-light text-gray-300 leading-relaxed">
                        <span className="font-semibold text-white">Deep Search AI</span> automatiza completamente tu proceso de investigación.
                    </p>
                    <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
                        Desde la búsqueda web hasta la generación de reportes profesionales en PDF y Markdown.
                        <br className="hidden md:block" />
                        Todo potenciado por inteligencia artificial avanzada.
                    </p>
                </div>

                {/* Feature highlights */}
                <div className="flex flex-wrap justify-center gap-4 md:gap-6 my-8">
                    <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                        <Search className="w-4 h-4 text-blue-400" />
                        <span className="text-sm font-medium">Búsqueda Automática</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                        <Zap className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm font-medium">Análisis Instantáneo</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                        <FileText className="w-4 h-4 text-green-400" />
                        <span className="text-sm font-medium">Reportes Profesionales</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                        <Download className="w-4 h-4 text-purple-400" />
                        <span className="text-sm font-medium">Export PDF/MD</span>
                    </div>
                </div>

                {/* CTA Button */}
                <div className="pt-4">
                    <Link href={isSignedIn ? "/research" : "/sign-up"}>
                        <Button 
                            variant="pro" 
                            className="group relative md:text-lg px-8 py-4 md:px-10 md:py-6 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
                        >
                            <Sparkles className="w-5 h-5 mr-2 group-hover:animate-spin" />
                            Comienza tu investigación gratis
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                        </Button>
                    </Link>
                </div>
                
                {/* Trust indicators */}
                <div className="pt-4 space-y-2">
                    <p className="text-gray-400 text-sm md:text-base font-normal">
                        ✨ Sin tarjeta de crédito • 🚀 3 investigaciones gratuitas • 🔒 100% seguro
                    </p>
                    <p className="text-gray-500 text-xs md:text-sm">
                        Únete a miles de investigadores, estudiantes y profesionales
                    </p>
                </div>
            </div>
        </div>
    )
}