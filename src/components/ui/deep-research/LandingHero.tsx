"use client";

import { useAuth } from "@clerk/nextjs"
import Link from "next/link";
import { Typewriter } from 'react-simple-typewriter';
import { Button } from "../button";

export const LandingHero = () => {
    const { isSignedIn } = useAuth();

    return (
        <div className="text-white font-bold py-36 text-center space-y-5">
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
                <h1>
                    La mejor herramienta para
                </h1>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-500">
                    <Typewriter
                        words={["investigación.", "educación.", "creación de contenido.", "blogs.", "y más."]}
                        loop={true}
                        cursor
                        cursorStyle="_"
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={1000}
                    />
                </div>
            </div>
            <div className="text-sm md:text-xl font-light text-zinc-400">
                Genera apuntes de investigación completos y personalizados en segundos.
                <br />
                Potenciado por IA y diseñado para estudiantes y profesionales.
            </div>

            <div>
                <Link href={isSignedIn ? "/research" : "/sign-up"}>
                    <Button variant={"pro"} className="md:text-lg p-4 md:p-6 rounded-full font-semibold">
                        Comienza gratis ahora
                    </Button>
                </Link>
            </div>
            <div className="text-zinc-400 text-xs md:text-sm font-normal">
                No se requiere tarjeta de crédito.
            </div>
        </div>
    )
}