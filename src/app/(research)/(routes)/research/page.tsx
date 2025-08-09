"use client";

import { Badge } from "@/components/ui/badge";
import QuestionAny from "@/components/ui/deep-research/QuestionAny";
import UserInput from "@/components/ui/deep-research/UserInput";
import { Sparkles } from "lucide-react";

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <section className='min-h-screen flex flex-col items-center justify-center px-4'>
      <div className='mx-auto max-w-4xl w-full'>
        <div className='text-center mb-12'>
          <Badge variant={"premium"} className='p-3 mb-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0'>
            <Sparkles className='h-5 w-5 animate-pulse mr-2' />
            <span className='font-semibold'>Creación de contenido Potenciado con IA</span>
          </Badge>
          <div className='text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6'>
            Comienza tu{' '}
            <span className="relative inline-block">
              <span
                className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-emerald-400/30 -rotate-2 rounded-lg transform -skew-y-1"
                aria-hidden="true"
              />
              <span className="relative z-10 px-2 bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">investigación</span>
            </span>
          </div>
          <div className="text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
            <p className="text-xl mb-4">Solo ingresa un tema y responde algunas preguntas. <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">ApuntIA</span> se encarga del resto.✨</p>
          </div>
        </div>
        <div className='bg-gradient-to-br from-purple-900/40 via-slate-800/50 to-indigo-900/40 backdrop-blur-xl border border-purple-300/30 rounded-2xl p-6 shadow-2xl ring-1 ring-purple-400/20'>
          <UserInput />
          <QuestionAny />
        </div>
      </div>
    </section>
    </div>
  );
}
