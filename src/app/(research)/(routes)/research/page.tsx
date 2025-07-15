"use client";

import { Badge } from "@/components/ui/badge";
import QuestionAny from "@/components/ui/deep-research/QuestionAny";
import UserInput from "@/components/ui/deep-research/UserInput";
import { Sparkles } from "lucide-react";

export default function ResearchPage() {
  return (
    <section className='min-h-screen flex flex-col items-center'>
      <div className='mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8'>
        <Badge variant={"premium"} className='p-2'>
          <Sparkles className='h-8 w-8 animate-pulse' />
          <span>Creación de contenido Potenciado con IA</span>
        </Badge>
        <div className='capitalize text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
          Comienza tu{' '}
          <span className="relative inline-block">
            <span
              className="absolute inset-0 bg-yellow-200/50 -rotate-2 rounded-lg transform -skew-y-1"
              aria-hidden="true"
            />
            <span className="relative z-10 px-2">investigación</span>
          </span> {' '}
        </div>
        <div className="mt-2 text-lg leading-8 text-gray-600 max-w-2xl">
          <p className="text-base mb-8">Solo ingresa un tema y responde algunas preguntas. Apunt IA se encarga del resto.✨</p>
        </div>
        <UserInput />
        <QuestionAny />
      </div>
    </section>
  );
}
